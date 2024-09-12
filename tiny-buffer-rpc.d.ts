declare module 'tiny-buffer-rpc' {
  import { type CompactEncoding } from 'compact-encoding'
  import { type Duplex } from 'streamx'

  type Send = (data: Uint8Array) => void

  class Method<Req, Resp> {
    send(message: Req): void
    request(message: Req): Promise<Resp>
    createRequestStream(): Duplex<Resp>
  }

  export default class RPC {
    constructor(send: Send)

    recv(data: Uint8Array): void
    register<Req, Resp>(
      index: number,
      options: {
        request?: CompactEncoding<Req>
        response?: CompactEncoding<Resp>
        onrequest?: (message: Req) => Resp | Promise<Resp>
        onstream?: (stream: Duplex<Resp, void>) => void
      }
    ): Method<Req, Resp>
  }

  export type { Method }
}

declare module 'tiny-buffer-rpc/any' {
  import { type CompactEncoding } from 'compact-encoding'

  const encoding: CompactEncoding<any>

  export default encoding
}
