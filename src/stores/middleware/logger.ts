import { State, StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T extends State>(
  f: PopArgument<StateCreator<T, [], []>>,
  name?: string,
) => PopArgument<StateCreator<T, [], []>>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>
  const loggedSet: typeof set = (...a) => {
    set(...a)
    console.log(...(name ? [`${name}:`] : []), get())
  }
  store.setState = loggedSet

  return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger

type PopArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never
