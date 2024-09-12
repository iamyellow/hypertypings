declare module 'hyperdht' {
  import { KeyPair } from '@hyperswarm/secret-stream'
  import BaseDHT from 'dht-rpc'

  export const keyPair: () => KeyPair

  export default class DHT extends BaseDHT {}
}
