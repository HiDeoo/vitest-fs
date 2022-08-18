import { getFile } from '../libs/fs'
import { getResult } from '../libs/result'

import { type MatcherState } from '.'

export function toBeJsonFile(this: MatcherState, receivedPath: unknown) {
  const { isNot } = this

  const receivedFile = getFile(receivedPath, { json: true, kind: 'received' })

  if (receivedFile.error) {
    return receivedFile.error
  }

  return getResult(true, `Received path at '${receivedPath}' is${isNot ? '' : ' not'} a valid JSON file`)
}
