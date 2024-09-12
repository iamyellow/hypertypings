declare module 'sodium-native' {
  export const crypto_box_SEALBYTES: number
  export const crypto_box_SECRETKEYBYTES: number
  export const crypto_box_PUBLICKEYBYTES: number

  export function crypto_box_keypair(pk: Uint8Array, sk: Uint8Array): void

  export function crypto_box_seal(
    c: Uint8Array,
    m: Uint8Array,
    pk: Uint8Array
  ): void

  export function crypto_box_seal_open(
    m: Uint8Array,
    c: Uint8Array,
    pk: Uint8Array,
    sk: Uint8Array
  ): boolean
}
