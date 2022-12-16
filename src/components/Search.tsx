import { Component, createRenderEffect } from 'solid-js'
import { useData } from './DataProvider'

export const Search: Component = () => {
  let ref: HTMLInputElement
  const { searchQuery, setSearchQuery } = useData()

  createRenderEffect(() => {
    setTimeout(() => {
      if (ref) {
        ref.focus()
      }
    }, 0)
  })

  return (
    <div>
      <input
        ref={ref!}
        value={searchQuery()}
        placeholder="td. Weller..."
        type="text"
        onKeyUp={(e) => {
          setSearchQuery(e.currentTarget.value)
        }}
        class="h-12 border-2 rounded-lg px-5 w-full leading-6 text-lg text-black placeholder:text-gray-300"
      />
    </div>
  )
}
