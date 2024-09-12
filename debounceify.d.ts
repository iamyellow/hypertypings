declare module 'debounceify' {
  export default function debounceify<R = void>(
    f: () => R | Promise<R>
  ): () => Promise<R>
}
