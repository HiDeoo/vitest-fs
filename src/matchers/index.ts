import { type ExpectationResult } from '../libs/result'
import { type DropFirstParameter } from '../libs/typescript'

export type Matcher<TReceived, TReceivedArgs extends readonly unknown[]> = (
  this: MatcherState,
  received: TReceived,
  ...receivedArgs: TReceivedArgs
) => ExpectationResult

export type Expected<TMatcher extends Matcher<never, never>> = (...expectedArgs: DropFirstParameter<TMatcher>) => void

type MatcherState = ReturnType<Vi.ExpectStatic['getState']>
