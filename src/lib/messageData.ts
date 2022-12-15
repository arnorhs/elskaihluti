import { UIProduct } from './Database'

export type OnMessageData<T, D> = [T, D]

export type MDFetchInitial = OnMessageData<'fetchInitial', string>
export type MDError = OnMessageData<'error', any>
export type MDDataReceived = OnMessageData<'ready', void>
export type MDSearchQuery = OnMessageData<'search', string>
export type MDSearchResults = OnMessageData<'searchResults', UIProduct[]>

export type KnownMessages =
  | MDFetchInitial
  | MDError
  | MDDataReceived
  | MDSearchQuery
  | MDSearchResults
