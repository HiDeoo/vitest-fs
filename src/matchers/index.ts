import { type expect } from 'vitest'

type MatcherState = ReturnType<Vi.ExpectStatic['getState']>
type ExpectationResult = ReturnType<Parameters<typeof expect['extend']>[0][string]>

export type Matcher<TReceived, TExpected> = (
  this: MatcherState,
  received: TReceived,
  expected: TExpected
) => ExpectationResult

export type Expected<TMatcher extends Matcher<never, never>> = (expected: Parameters<TMatcher>[1]) => void
