declare module '@hyperswarm/secret-stream' {
  import { type Duplex } from 'streamx'
  import { UDXStream } from 'udx-native'

  export interface KeyPair {
    publicKey: Uint8Array
    secretKey: Uint8Array
  }

  export interface NoiseSecretStreamOptions {
    keyPair?: KeyPair
  }

  export default class NoiseSecretStream extends Duplex {
    constructor(
      isInitiator: boolean,
      stream?: Duplex,
      options?: NoiseSecretStreamOptions
    )

    public isInitiator: boolean
    public publicKey: Uint8Array
    public remotePublicKey: Uint8Array

    rawStream: UDXStream
  }
}
