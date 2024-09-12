declare module '@holepunchto/protopair' {
  import Hyperswarm from 'hyperswarm'
  import { EventEmitter } from 'node:events'
  import ReadyResource from 'ready-resource'

  type ProtoPairInvite = {
    id: Uint8Array
    invite: Uint8Array
    publicKey: Uint8Array
  }

  type ProtoPairServerRequest = {
    readonly remotePublicKey: Uint8Array
    readonly discoveryKey: Uint8Array
    readonly id: Uint8Array
    readonly payload: { key: Uint8Array; encryptionKey: Uint8Array | null }
    readonly key: Uint8Array

    readonly userData: Uint8Array | null
    readonly receipt: Uint8Array | null

    open(publicKey: Uint8Array): Uint8Array
    confirm(encryptionKey?: Uint8Array): void
    deny(): void
  }

  class ProtoPair extends EventEmitter {
    static createInvite: (key: Uint8Array) => ProtoPairInvite
  }

  class PairingSwarm extends ReadyResource {
    constructor(swarm: Hyperswarm)

    flushed(): Promise<void>

    pair(
      invite: Uint8Array,
      opts: { userData: Uint8Array; timeout?: number }
    ): Promise<Uint8Array>

    join(
      key: Uint8Array,
      handler: (req: ProtoPairServerRequest) => unknown
    ): void
  }

  export {
    PairingSwarm,
    ProtoPair,
    type ProtoPairServerRequest,
    type ProtoPairInvite
  }
}
