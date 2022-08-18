import fs from 'node:fs'

import { getStats } from '../libs/fs'
import { getResult } from '../libs/result'

import { type MatcherState } from '.'

export function toBeExecutable(this: MatcherState, receivedPath: unknown) {
  const { isNot } = this

  const receivedStats = getStats(receivedPath, { kind: 'received' })

  if (receivedStats.error) {
    return receivedStats.error
  }

  const isExecutable = !!(receivedStats.stats.mode & fs.constants.S_IXUSR)

  return getResult(isExecutable, `Received path at '${receivedPath}' is${isNot ? '' : ' not'} executable`)
}
