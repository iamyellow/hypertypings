declare module 'hypercore-id-encoding' {
  export function encode(buffer: Uint8Array): string
  export function decode(value: string): Uint8Array
  export function normalize(value: any): Uint8Array
}
