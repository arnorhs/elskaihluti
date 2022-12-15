import { createContext, createEffect, createSignal, onCleanup, useContext } from 'solid-js'
import type { Component, JSX } from 'solid-js'
import MyWorker from '../worker?worker'
import type { KnownMessages } from '../lib/messageData'
import { UIProduct } from '../lib/Database'

const DataContext = createContext({
  isReady: (): boolean => false,
  searchQuery: (): string => '',
  setSearchQuery: (_: string): void => {},
  searchResults: (): UIProduct[] => [],
})

declare namespace MyTypedWorker {
  class Worker extends MyWorker {
    postMessage(data: KnownMessages): void
  }
}

export const DataProvider: Component<{ children: JSX.Element }> = (props) => {
  console.log('DataProvider', import.meta.env.VITE_XSLX_URL)
  const [isReady, setIsReady] = createSignal(false)
  const [searchQuery, setSearchQuery] = createSignal('')
  const [searchResults, setSearchResults] = createSignal<UIProduct[]>([])

  const myWorker: MyTypedWorker.Worker = new MyWorker()

  myWorker.onerror = function (e) {
    console.error(e)
  }

  myWorker.postMessage(['fetchInitial', import.meta.env.VITE_XSLX_URL])

  const listener = (e: MessageEvent<KnownMessages>) => {
    const [type, data] = e.data
    console.log(`JS: received message type "${type}"`)
    switch (type) {
      case 'ready':
        setIsReady(true)
        break
      case 'searchResults':
        setSearchResults(data)
        break
    }
  }

  createEffect(() => {
    myWorker.addEventListener('message', listener)

    onCleanup(() => {
      myWorker.removeEventListener('message', listener)
    })
  })

  createEffect(() => {
    const query = searchQuery()

    myWorker.postMessage(['search', query])
  })

  return (
    <DataContext.Provider
      value={{
        isReady,
        searchQuery,
        setSearchQuery,
        searchResults,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
