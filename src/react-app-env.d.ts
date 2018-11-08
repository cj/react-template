/// <reference types="react-scripts" />

// FIXME: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30129#issuecomment-434529524
// this is important, otherwise you'll completely replace the `'react'` module
export {}

declare module 'react' {
  export interface ExoticComponent<P = {}> {
    /**
     * # WARNING
     *
     * Exotic components are not actually callable
     *
     * @deprecated Exotic components are not callable
     */
    (props: P): ReactElement<any> | null
    readonly $$typeof: symbol
  }

  export type ComponentProps
    <T extends ComponentType<any>
  > = T extends ComponentType<infer P> ? P : {}
  export type ComponentPropsWithRef
    <T extends ComponentType<any>
  > = T extends ComponentClass<infer P>
    ? P & ClassAttributes<InstanceType<T>>
    : T extends SFC<infer P> ? P : {}

  export function memo<P extends object>(
    Component: SFC<P>,
    // eslint-disable-next-line max-len
    propsAreEqual?: (
      prevProps: Readonly<P & { children?: ReactNode }>,
      nextProps: Readonly<P & { children?: ReactNode }>,
    ) => boolean,
  ): ExoticComponent<P>
  export function memo<T extends ComponentType<any>>(
    Component: T,
    // eslint-disable-next-line max-len
    propsAreEqual?: (
      prevProps: Readonly<ComponentProps<T>>,
      nextProps: Readonly<ComponentProps<T>>,
    ) => boolean,
  ): ExoticComponent<ComponentPropsWithRef<T>>

  /**
   * This feature is not yet available for server-side rendering.
   * Suspense support will be added in a later release.
   */
  export const Suspense: ExoticComponent<{
    children?: ReactNode

    /** A fallback react tree to show when a Suspense child (like React.lazy) suspends */
    fallback: NonNullable<ReactNode> | null

    /** how long to wait until the fallback component is shown */
    maxDuration?: number

    // I tried looking at the code but I have no idea what it does.
    // https://github.com/facebook/react/issues/13206#issuecomment-432489986
    /**
     * Not implemented yet, requires unstable_ConcurrentMode
     */
    // maxDuration?: number
  }>

  export function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
  ): ExoticComponent<ComponentPropsWithRef<T>>

  function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void]
  function useEffect(
    create: () => void | (() => void),
    inputs?: ReadonlyArray<unknown>,
  ): void
  function useContext<T>(foo: React.Context<T>): T
  function useReducer<S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S,
  ): [S, (action: A) => void]
  function useCallback<F extends (...args: never[]) => unknown>(
    callback: F,
    inputs?: ReadonlyArray<unknown>,
  ): F
  function useMemo<T>(create: () => T, inputs?: ReadonlyArray<unknown>): T
  function useRef<T extends unknown>(initialValue?: T): React.RefObject<T>
  function useImperativeMethods<T>(
    ref: React.Ref<T>,
    createInstance: () => T,
    inputs?: ReadonlyArray<unknown>,
  ): void
  const useMutationEffect: typeof useEffect
  const useLayoutEffect: typeof useEffect
}
