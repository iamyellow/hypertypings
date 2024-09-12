declare module 'promaphore' {
  export default class Semaphore {
    constructor(limit?: number)

    public wait(): Promise<boolean>
    public signal(): void
    public flush(): Promise<void>
    public destroy(): void
  }
}
