declare module 'hypercore' {
  import NoiseSecretStream, { type KeyPair } from '@hyperswarm/secret-stream'
  import { type EventEmitter } from 'node:events'
  import RandomAccessStorage from 'random-access-storage'
  import { Readable } from 'streamx'

  export type HypercoreOptions = {
    createIfMissing?: boolean // create a new Hypercore key pair if none was present in storage
    overwrite?: boolean // overwrite any old Hypercore that might already exist
    sparse?: boolean // enable sparse mode, counting unavailable blocks towards core.length and core.byteLength
    valueEncoding?: 'json' | 'utf-8' | 'binary' // defaults to binary
    encodeBatch?: (bath: {}) => void // optionally apply an encoding to complete batches
    keyPair?: KeyPair // optionally pass the public key and secret key as a key pair
    encryptionKey?: Uint8Array // optionally pass an encryption key to enable block encryption
    onwait?: () => void // hook that is called if gets are waiting for download
  }

  export type HypercoreStorage =
    | string
    | RandomAccessStorage
    | ((filename: string) => RandomAccessStorage)

  export type HypercoreRange = {
    destroy(): void
    done(): Promise<void>
  }

  export default class Hypercore extends EventEmitter {
    constructor(
      storage: HypercoreStorage,
      key?: Uint8Array | HypercoreOptions,
      options?: HypercoreOptions
    )

    readonly writable: boolean
    readonly key: Uint8Array
    readonly discoveryKey: Uint8Array
    readonly length: number

    ready(): Promise<void>
    truncate(newLength: number, forkId?: number): Promise<void>
    update(opts?: { wait: boolean }): Promise<void>
    clear(start: number, end?: number): Promise<void>
    purge(): Promise<void>
    close(): Promise<void>

    append(data: Uint8Array | Array<Uint8Array>): Promise<void>
    get(
      index: number,
      opts?: Partial<{
        wait: boolean // wait for block to be downloaded
        onwait: () => void // hook that is called if the get is waiting for download
        timeout: number // wait at max some milliseconds (0 means no timeout)
        valueEncoding: 'json' | 'utf-8' | 'binary' // defaults to the core's valueEncoding
      }>
    ): Promise<Uint8Array>

    replicate(stream: NoiseSecretStream): NoiseSecretStream

    download(
      opts?: Partial<{
        start: number
        end: number
        blocks: Array<number>
        linear: boolean
      }>
    ): HypercoreRange

    createReadStream(
      opts?: Partial<{
        start: number
        end: number
        live: boolean
        snapshot: boolean
      }>
    ): Readable<Uint8Array>

    findingPeers(): () => void
  }
}
