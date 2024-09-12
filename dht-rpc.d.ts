declare module 'dht-rpc' {
  import { EventEmitter } from 'node:events'

  export default class DHT extends EventEmitter {
    ready(): Promise<void>
    readonly port: number
    readonly host: string | null

    public on(
      eventName: 'nat-update',
      callback?: (host: string, port: number) => void
    ): this
  }
}
