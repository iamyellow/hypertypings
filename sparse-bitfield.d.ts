declare module 'sparse-bitfield' {
  export type SparseBitfield = {
    set(index: number, value: boolean): void
    get(index: number): boolean
    toBuffer(): Uint8Array
  }

  export type SparseBitfieldOptions = {
    pageSize?: number
    buffer?: Uint8Array
    trackUpdates?: boolean
  }

  export default function bitfield(opts?: SparseBitfieldOptions): SparseBitfield
}
