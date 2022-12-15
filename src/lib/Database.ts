import Dexie from 'dexie'

export class Database extends Dexie {
  products!: Dexie.Table<Product, number>
  store!: Dexie.Table<StorageEntry, string>

  constructor() {
    super('ihlutirdb')

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(3).stores({
      products: '&id, vendorSku, *keywords',
      store: '&key',
    })
  }
}

export interface Product {
  id: string
  description: string
  vendorDescription: string | null
  vendorSku: string | null
  priceWithoutVat: number
  priceWithVat: number
  link: unknown
  keywords: string[]
}

export type UIProduct = Omit<Product, 'keywords'>

export interface StorageEntry {
  key: string
  value: string
}
