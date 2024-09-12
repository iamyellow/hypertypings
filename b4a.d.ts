declare module 'b4a' {
  export function toString(data: Uint8Array, econding?: BufferEncoding): string
  export function from(data: string, econding?: BufferEncoding): Uint8Array
  export function from(data: Array<number>): Uint8Array
  export function isBuffer(data: any): boolean
  export function concat(
    buffers: Uint8Array[],
    totalLength?: number
  ): Uint8Array
  export function alloc(size: number, fill?: string): Uint8Array
  export function allocUnsafe(size: number): Uint8Array
  export function alloc(size: number): Uint8Array
  export function equals(data1: Uint8Array, data2: Uint8Array): boolean
  export function compare(data1: Uint8Array, data2: Uint8Array): -1 | 0 | 1
}
