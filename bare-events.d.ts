declare module 'bare-events' {
  export type EventDeclaration = Record<string, Array<any>>
  export class EventEmitter<Events extends EventDeclaration = {}> {
    public addListener<K extends keyof Events>(
      event: K,
      callback?: (...args: Events[K]) => void
    ): this
    public on: typeof this.addListener
    public prependListener: typeof this.addListener

    public addOnceListener: typeof this.addListener
    public once(event: keyof Events, callback?: () => void): this
    public prependOnceListener: typeof this.addListener

    public removeListener: typeof this.addListener
    public off: typeof this.removeListener
    public removeAllListeners(event: keyof Events): this

    public emit<K extends keyof Events>(event: K, ...args: Events[K]): this
  }

  export const defaultMaxListeners: number
}
