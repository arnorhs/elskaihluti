import * as Solid from 'solid-js'
import { For, Show } from 'solid-js'
import { useData } from './DataProvider'

const formatNumber = (num: number) => {
  return num.toLocaleString('de-DE', {
    maximumFractionDigits: 0,
  })
}

export const SearchResults: Solid.Component = () => {
  const { searchResults } = useData()

  return (
    <Show when={searchResults().length > 0}>
      <div class="my-8 border-t-gray-200 border-t-2">
        <div class="lg:w-10/12 mx-auto py-4">
          <p class="text-gray-800 italic">
            ATH: Vörulisti er birtur með fyrirvara um villur, gengisbreytingar og lagerstöðu.
          </p>
        </div>

        <table class="lg:w-10/12 mx-auto">
          <thead>
            <tr>
              <th class="py-3 px-2 w-1/12 text-left font-bold whitespace-nowrap">Númer</th>
              <th class="py-3 px-2 w-3/12 text-left font-bold whitespace-nowrap">Lýsing</th>
              <th class="py-3 px-2 w-3/12 text-left font-bold whitespace-nowrap">Lýsing birgja</th>
              <th class="py-3 px-2 w-2/12 text-left font-bold whitespace-nowrap">
                Vörunúmer birgja
              </th>
              <th class="py-3 px-2 w-2/12 text-right font-bold whitespace-nowrap">Verð með vsk</th>
              <th class="py-3 px-2 w-1/12 text-right font-bold whitespace-nowrap">Verð án vsk</th>
            </tr>
          </thead>
          <tbody>
            <For each={searchResults()}>
              {(product) => (
                <tr class="odd:bg-gray-100">
                  <td class="py-3 px-2 w-1/12">{product.id}</td>
                  <td class="py-3 px-2 w-3/12">{product.description}</td>
                  <td class="py-3 px-2 w-3/12">{product.vendorDescription}</td>
                  <td class="py-3 px-2 w-2/12">{product.vendorSku}</td>
                  <td class="py-3 px-2 w-2/12 text-right">{formatNumber(product.priceWithVat)}</td>
                  <td class="py-3 px-2 w-1/12 text-right">
                    {formatNumber(product.priceWithoutVat)}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </Show>
  )
}
