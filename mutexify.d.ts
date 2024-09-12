declare module 'mutexify/promise' {
  export type Release = () => Promise<void>
  export type Lock = () => Promise<Release>

  export default function mutexify(): Lock
}
