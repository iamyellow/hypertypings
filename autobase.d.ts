declare module 'autobase' {
  import { EventEmitter } from 'node:events'
  import Hypercore from 'hypercore'

  class AutobaseView extends Hypercore {
    private constructor()

    status: { appended: number; truncated: number }

    on(eventName: 'truncate', callback?: (sharedLength?: number) => void): this
    on(eventName: 'append', callback?: () => void): this
  }

  export default class Autobase extends EventEmitter {
    view?: AutobaseView
    _inputsByKey: Map<string, { length: number }>
    localOutput: any

    on(eventName: 'append', callback?: () => void): this

    ready(): Promise<void>
  }
}
