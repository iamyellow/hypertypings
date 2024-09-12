declare module 'ready-resource' {
  import { EventEmitter, type EventDeclaration } from 'bare-events'

  export default class ReadyResource<
    E extends EventDeclaration = {
      close: [error?: Error]
    }
  > extends EventEmitter<E> {
    public opening: Promise<void> | null
    public closing: Promise<void> | null

    public opened: boolean
    public closed: boolean

    public ready(): Promise<void>
    protected _open(): Promise<void>

    public close(): Promise<void>
    protected _close(): Promise<void>
  }
}
