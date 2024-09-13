declare module 'compact-encoding' {
  export interface State {
    start: number
    end: number
    buffer: Uint8Array | null
  }

  export type CompactEncoding<T = any, E = unknown> = {
    preencode(state: State, value: T): void
    encode(state: State, value: T): void
    decode(state: State, extra?: E): T
  }

  export const string: CompactEncoding<string>
  export const json: CompactEncoding<Record<string, any>>
  export const any: CompactEncoding<any>
  export const none: CompactEncoding<void>

  export const uint: CompactEncoding<number>
  export const uint8: CompactEncoding<number>
  export const uint16: CompactEncoding<number>
  export const uint32: CompactEncoding<number>
  export const int: CompactEncoding<number>
  export const int32: CompactEncoding<number>
  export const int64: CompactEncoding<number>
  export const float32: CompactEncoding<number>
  export const float64: CompactEncoding<number>

  export const bool: CompactEncoding<boolean>

  export const buffer: CompactEncoding<Uint8Array>
  export const uint8array: CompactEncoding<Uint8Array>
  export const fixed32: CompactEncoding<Uint8Array>

  export function array<T>(encoding: CompactEncoding<T>): CompactEncoding<T[]>

  export const state: () => State

  export function encode<T>(
    encoding: CompactEncoding<T>,
    message: T
  ): Uint8Array
  export function decode<T>(encoding: CompactEncoding<T>, buffer: Uint8Array): T
}
