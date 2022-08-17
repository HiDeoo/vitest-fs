import { type expect } from 'vitest'

export function getResultMessageWithDiff(message: string, diff: string): SyncExpectationResult['message'] {
  return () => {
    if (!diff) {
      return message
    }

    return `${message}

${diff}`
  }
}

export type ExpectationResult = ReturnType<Parameters<typeof expect['extend']>[0][string]>
type SyncExpectationResult = Awaited<ExpectationResult>
