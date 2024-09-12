declare module 'hyperswarm' {
  import NoiseSecretStream, { KeyPair } from '@hyperswarm/secret-stream'
  import DHT from 'hyperdht'
  import { EventEmitter } from 'node:events'

  export interface PeerInfo {
    client: boolean
    publicKey: Uint8Array
  }

  export interface Discovery {
    flushed: () => Promise<void>
    refresh: (opts: { client: boolean; server: boolean }) => Promise<void>
    destroy: () => Promise<void>
  }

  export default class Hyperswarm extends EventEmitter {
    constructor(options?: { keyPair?: KeyPair; maxPeers?: number })

    readonly keyPair: KeyPair
    readonly dht: DHT
    readonly connections: Set<NoiseSecretStream>

    public flush(): Promise<void>
    public leave(topic: Uint8Array): Promise<void>
    public destroy(): Promise<void>

    public resume(): Promise<void>
    public suspend(): Promise<void>

    public on(eventName: 'update', callback?: () => void): this
    public on(
      eventName: 'connection',
      callback?: (stream: NoiseSecretStream, peerInfo: PeerInfo) => void
    ): this

    public join(
      topic: Uint8Array,
      options?: { server?: boolean; client?: boolean }
    ): Discovery
  }
}
