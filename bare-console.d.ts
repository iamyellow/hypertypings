declare module 'bare-console' {
  export default class Console extends Object {
    constructor(options: {
      colors?: boolean
      stdout: (value: string) => void
      stderr: (value: string) => void
    })
  }
}
