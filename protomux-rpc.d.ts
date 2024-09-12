declare module 'protomux-rpc' {
  import { type CompactEncoding } from 'compact-encoding'
  import { type Duplex } from 'streamx'

  export type EncodingOptions<Request, Response = void> = {
    requestEncoding?: CompactEncoding<Request>
    responseEncoding?: CompactEncoding<Response>
  }

  export default class RPC<Handshake> {
    constructor(
      stream: Duplex,
      options: {
        id?: Uint8Array
        protocol: string
        handshake: Handshake
        handshakeEncoding?: CompactEncoding<Handshake>
      }
    )

    on(event: 'open', handler: (handshake: Handshake) => void): void
    on(event: 'close', handler: () => void): void

    readonly closed: boolean
    readonly stream: Duplex

    request<Request, Response>(
      method: string,
      request: Request,
      options?: EncodingOptions<Request, Response>
    ): Promise<Response>

    respond<Request, Response>(
      method: string,
      options: EncodingOptions<Request, Response>,
      handler: (req: Request) => Response
    ): void
    respond<Request, Response>(
      method: string,
      handler: (req: Request) => Response
    ): void

    event<Request>(
      method: string,
      data: Request,
      options?: EncodingOptions<Request>
    ): void

    end(): Promise<void>
    destroy(reason?: number): void
  }
}
