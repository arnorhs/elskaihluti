/// <reference lib="webworker" />
import readXlsxFile from 'read-excel-file/web-worker'
import { Database, Product, UIProduct } from './lib/Database'
import type { KnownMessages } from './lib/messageData'
import z from 'zod'
import { tokenizerRegex } from './lib/tokenizerRegex'

declare var self: Worker
declare function postMessage(data: KnownMessages): void

const db = new Database()

self.onmessage = function (e: MessageEvent) {
  const [type, data] = e.data as KnownMessages

  console.log(`Worker: received message ${type}`)

  switch (type) {
    case 'fetchInitial':
      fetchInitial(data)
      break
    case 'search':
      search(data)
  }
}

const search = async (query: string) => {
  if (!query || query.length < 2) {
    return postMessage(['searchResults', []])
  }

  const [word, ...words] = query.split(tokenizerRegex)
  const wordRegexes = words.map((word) => new RegExp('^' + word, 'i'))

  // i really would want a .startsWithAllIgnoreCase() method here, but we only have .startsWithAnyIgnoreCase()
  // so now we query for the first word, and then filter the results afterwards for only entries including
  // all the supplied search words
  // TODO: Take a look at this detailed comment: https://github.com/dexie/Dexie.js/issues/281
  const collection = db.products
    .where('keywords')
    // use the index for the first word
    .startsWithIgnoreCase(word)
    .and((product) =>
      wordRegexes.every((regex) => product.keywords.some((keyword) => keyword.match(regex))),
    )
    .limit(100)

  const arr = await collection.toArray()

  postMessage(['searchResults', arr.map(({ keywords, ...product }) => product as UIProduct)])
}

const fetchInitial = async (url: string) => {
  const { value: lastFile } = (await db.store.get('lastFile')) ?? {}

  if (lastFile === url) {
    return postMessage(['ready', undefined])
  }

  const response = await fetch(url)

  if (!response.ok) {
    return postMessage(['error', response.statusText])
  }

  const blob = await response.blob()
  const rows = await readXlsxFile(blob)

  const schema = z
    .tuple([
      // id
      z.string(),
      // desc
      z.string(),
      // vendor desc
      z.string().nullable(),
      // vendor sku
      z.string().nullable(),
      // price
      z.number(),
      // price w vat
      z.number(),
      z.unknown(),
      z.unknown(),
    ])
    .transform(
      ([
        id,
        description,
        vendorDescription,
        vendorSku,
        priceWithoutVat,
        priceWithVat,
        _dunno,
        link,
      ]) => ({
        id,
        description,
        vendorDescription,
        vendorSku,
        priceWithoutVat,
        priceWithVat,
        link,
        keywords: [
          ...description.split(tokenizerRegex),
          ...(vendorDescription?.split(tokenizerRegex) ?? []),
        ],
      }),
    )

  // first row in the excel file is a header with column names
  const [_header, ...rowsWithoutHeader] = rows

  // filter out empty rows, and parse each row into a Product object
  const newPutRows: Product[] = rowsWithoutHeader
    .filter(([id, desc]) => id && desc)
    .map((row) => schema.parse(row))

  await db.products.bulkPut(newPutRows)

  await db.store.put({ key: 'lastFile', value: url })

  postMessage(['ready', undefined])
}

export default null
