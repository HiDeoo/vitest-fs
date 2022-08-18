import { getDirectory } from '../libs/fs'
import { getResult } from '../libs/result'

import { type MatcherState } from '.'

export function toBeEmptyDirectory(this: MatcherState, receivedPath: unknown) {
  const { equals, isNot } = this

  const receivedDirectory = getDirectory(receivedPath, { kind: 'received' })

  if (receivedDirectory.error) {
    return receivedDirectory.error
  }

  return getResult(
    equals(receivedDirectory.content, []),
    `Received path at '${receivedPath}' is${isNot ? '' : ' not'} an empty directory`
  )
}
