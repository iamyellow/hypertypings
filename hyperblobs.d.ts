declare module 'hyperblobs' {
  import Hypercore from 'hypercore'
  import { Readable, Writable } from 'streamx'

  export type HyperblobId = {
    // Hyperblobs id that can be used to fetch the blob associated with this entry
    blockOffset: number
    blockLength: number
    byteOffset: number
    byteLength: number
  }

  export default class Hyperblobs {
    readonly core: Hypercore

    constructor(
      core: Hypercore,
      opts?: Partial<{
        blockSize: number // The block size that will be used when storing large blobs.
      }>
    )

    put(
      blob: Uint8Array,
      opts?: Partial<{
        blockSize: number // The block size that will be used when storing large blobs.
        start: number // Relative offset to start within the blob
        end: number // End offset within the blob (inclusive)
        length: number // Number of bytes to read.
        core: Hypercore // A custom core to write (overrides the default core)
      }>
    ): Promise<HyperblobId>

    get(
      id: HyperblobId,
      opts?: Partial<{
        core: Hypercore // A custom core to read from (overrides the default core)
        wait: boolean // Wait for block to be downloaded
        timeout: number // Wait at max some milliseconds (0 means no timeout)
      }>
    ): Promise<Uint8Array>

    clear(id: HyperblobId, opts?: Partial<{}>): Promise<void>

    createReadStream(
      path: HyperblobId,
      opts?: Parameters<Hyperblobs['get']>[1]
    ): Readable

    createWriteStream(
      id: HyperblobId,
      opts?: Parameters<Hyperblobs['put']>[1]
    ): Writable & { id: HyperblobId }
  }
}
