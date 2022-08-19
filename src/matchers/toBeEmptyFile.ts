import { getStats } from '../libs/fs'
import { getResult } from '../libs/result'

import { type MatcherState } from '.'

export function toBeEmptyFile(this: MatcherState, receivedPath: unknown) {
  const { isNot } = this

  const receivedStats = getStats(receivedPath, { kind: 'received' })

  if (receivedStats.error) {
    return receivedStats.error
  }

  return getResult(
    receivedStats.stats.size === 0,
    `Received path at '${receivedPath}' is${isNot ? '' : ' not'} an empty file`
  )
}
