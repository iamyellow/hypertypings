declare module 'pump' {
  import { Duplex, Writable } from 'streamx'

  type Pumpable<T> = Writable<T> | Duplex<T>

  export default function pump<T = unknown>(
    source: Pumpable<T>,
    ...dest: Pumpable<T>[]
  ): Writable<T>
}
