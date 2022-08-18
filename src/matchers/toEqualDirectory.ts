import { getDirectory } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualDirectory(this: MatcherState, receivedPath: unknown, expectedPath: string) {
  const { equals, isNot, utils } = this

  const receivedDirectory = getDirectory(receivedPath, { kind: 'received' })

  if (receivedDirectory.error) {
    return receivedDirectory.error
  }

  const expectedDirectory = getDirectory(expectedPath, { kind: 'expected' })

  if (expectedDirectory.error) {
    return expectedDirectory.error
  }

  return getResultWithDiff(
    equals(receivedDirectory.content, expectedDirectory.content),
    `Expected directory structure at '${expectedPath}' does${
      isNot ? '' : ' not'
    } equal received directory structure at '${receivedPath}'`,
    utils.diff(expectedDirectory.content, receivedDirectory.content)
  )
}
