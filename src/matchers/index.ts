import { type expect } from 'vitest'

export type Matcher<TReceived, TReceivedArgs extends readonly unknown[]> = (
  this: MatcherState,
  received: TReceived,
  ...receivedArgs: TReceivedArgs
) => ExpectationResult

export type Expected<TMatcher extends Matcher<never, never>> = (...expectedArgs: DropFirstParameter<TMatcher>) => void

type MatcherState = ReturnType<Vi.ExpectStatic['getState']>
type ExpectationResult = ReturnType<Parameters<typeof expect['extend']>[0][string]>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DropFirstParameter<T extends (...args: any) => any> = Parameters<T> extends [unknown, ...infer U] ? U : never
