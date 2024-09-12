declare module 'corestore' {
  import NoiseSecretStream, { type KeyPair } from '@hyperswarm/secret-stream'
  import Hypercore, { type HypercoreStorage } from 'hypercore'
  import ReadyResource from 'ready-resource'

  export default class Corestore extends ReadyResource {
    constructor(storage: HypercoreStorage)

    readonly cores: Map<string, Hypercore>
    namespace(name: string): Corestore

    replicate(stream: boolean | NoiseSecretStream): NoiseSecretStream
    createKeyPair(seed: string): Promise<KeyPair>

    get(opts: { key: Uint8Array } | { name: string }): Hypercore
    get(key: Uint8Array): Hypercore

    findingPeers(): () => void

    suspend(): Promise<void>
    resume(): Promise<void>
  }
}
