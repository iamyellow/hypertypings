declare module 'bare-signals' {
  import { EventEmitter } from 'bare-events'

  export default class Signal extends EventEmitter<{
    signal: [signum: string]
    close: []
  }> {
    constructor(signum: string)

    start(): void
    stop(): void
    close(): Promise<void>
  }
}
