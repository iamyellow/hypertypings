declare module 'udx-native' {
  import { EventEmitter } from 'node:events'
  import { type Duplex } from 'streamx'

  export interface Address {
    host: string
    family: string
    port: number
  }

  export class UDXStream extends Duplex {
    readonly udx: UDX
    readonly socket: UDXSocket
    readonly remoteId: number
    readonly remoteHost: string
    readonly remotePort: number
    readonly userData: Uint8Array | null

    public connect(socket: UDXSocket, remoteId: number, port: number): void
  }

  export class UDXSocket extends EventEmitter {
    private constructor()

    public on(
      eventName: 'message',
      callback?: (buffer: Uint8Array, address: Address) => void
    ): this
    public on(
      eventName: 'close' | 'idle' | 'busy' | 'listening',
      callback?: () => void
    ): this

    public bind(port: number, host?: string): void
    public address(): Address
    public close(): Promise<boolean>
  }

  export default class UDX {
    public constructor()

    public lookup(
      host: string,
      opts?: { family: number }
    ): Promise<{ family: number; host: string }>

    public networkInterfaces(): Array<any>

    public createSocket(): UDXSocket
    public createStream(
      id: number,
      opts?: { firewall?: () => boolean }
    ): UDXStream
  }
}
