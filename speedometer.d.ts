declare module 'speedometer' {
  export type Speedometer = (data: number) => number
  export default function speedometer(): Speedometer
}
