declare module 'hyperbee' {
  import { CompactEncoding } from 'compact-encoding'
  import Hypercore from 'hypercore'
  import ReadyResource from 'ready-resource'
  import { Readable } from 'streamx'

  type Result<K, V> = { seq: number; key: K; value: V }
  type CompareAndSwap = (prev: any, next: any) => boolean

  type EncodingOptions<K, V> = {
    keyEncoding?: CompactEncoding<K>
    valueEncoding?: CompactEncoding<V>
  }

  export default class Hyperbee<K = string, V = any> extends ReadyResource {
    constructor(feed: Hypercore, options?: EncodingOptions<K, V>)

    readonly core: Hypercore
    readonly key: Uint8Array

    update: Hypercore['update']

    put<putV = V>(
      key: K,
      value: putV,
      opts?: EncodingOptions<K, putV>
    ): Promise<void>

    get<getV = V>(
      key: K,
      opts?: EncodingOptions<K, getV>
    ): Promise<Result<K, getV> | null>

    del(key: K): Promise<void>

    createReadStream(
      range?: Partial<{
        gt: K //'only return keys > than this',
        gte: K //'only return keys >= than this'
        lt: K //'only return keys < than this'
        lte: K //'only return keys <= than this'
      }>,
      opts?: Partial<{
        reverse: boolean // If true get from the newest to the oldest
        limit: number // Set to the max number of entries you want
      }>
    ): Readable<Result<K, V>>

    createHistoryStream(
      opts?: Partial<{
        live: boolean // If true the stream will wait for new data and never end
        reverse: boolean // If true get from the newest to the oldest
        gte: number // Start with this seq (inclusive)
        gt: number // Start after this index
        lte: number // Stop after this index
        lt: number // Stop before this index
        limit: number // Set to the max number of entries you want
      }>
    ): Readable<Result<K, V>>
  }
}
