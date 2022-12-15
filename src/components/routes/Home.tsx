import { A } from '@solidjs/router'
import { Component, Show } from 'solid-js'
import { useData } from '../DataProvider'
import { Search } from '../Search'
import { SearchResults } from '../SearchResults'
import { Container } from '../ui/Container'
import { InlineAnchor } from '../ui/InlineAnchor'
import { Spinner } from '../ui/Spinner'

export const Home: Component = () => {
  const { isReady, searchQuery } = useData()

  return (
    <>
      <Show when={!isReady()}>
        <Container>
          <div class="flex flex-1 justify-evenly items-center self-center text-center">
            <div>
              Staldraðu við, dokaðu við, hinkraðu aðeins.. er að fylla í grunninn úr xlsx skjali...
            </div>
            <div>
              <Spinner />
            </div>
          </div>
        </Container>
      </Show>
      <Show when={isReady()}>
        <Container>
          <h1 class="text-3xl font-bold my-5">
            Elska <InlineAnchor href="https://www.ihlutir.is/">Íhluti</InlineAnchor>.. bara vantar
            leit
          </h1>
          <Search />
        </Container>

        <Show when={searchQuery().trim().length > 2}>
          <SearchResults />
        </Show>
        <Show when={searchQuery().trim().length <= 2}>
          <Container>
            <h3 class="text-lg my-5">
              <A href="/hvad">Hvað er þetta? →</A>
            </h3>
          </Container>
        </Show>
      </Show>
    </>
  )
}
