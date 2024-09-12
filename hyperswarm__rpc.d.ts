declare module '@hyperswarm/rpc' {
  import DHT from 'hyperdht'
  import { type CompactEncoding } from 'compact-encoding'

  export default class RPC {
    constructor(options?: { dht?: DHT })

    public request<T extends object>(
      publicKey: Uint8Array,
      method: string,
      data: T,
      options?: {
        valueEncoding?: CompactEncoding<T>
        requestEncoding?: CompactEncoding<T>
        responseEncoding?: CompactEncoding<T>
      }
    ): Promise<Uint8Array>

    public destroy(): Promise<void>
  }
}
