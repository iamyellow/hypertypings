declare module 'random-access-memory' {
  import RandomAccessStorage from 'random-access-storage'
  export default class RAM extends RandomAccessStorage {
    constructor(buffer?: Uint8Array)

    static reusable(): () => RAM
  }
}
