declare module 'brittle' {
  export type BrittleTestRunner = (
    title: string,
    runner: (
      t: Record<string, any> & { test: BrittleTestRunner }
    ) => Promise<any>
  ) => Promise<any>

  const test: BrittleTestRunner

  export default test
}
