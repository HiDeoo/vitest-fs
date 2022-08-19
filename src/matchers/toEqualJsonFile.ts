import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualJsonFile(this: MatcherState, receivedPath: string, expectedPath: string) {
  const { equals, isNot, utils } = this

  const receivedFile = getFile(receivedPath, { json: true, kind: 'received' })

  if (receivedFile.error) {
    return receivedFile.error
  }

  const expectedFile = getFile(expectedPath, { json: true, kind: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  return getResultWithDiff(
    equals(receivedFile.json, expectedFile.json),
    `Expected file JSON content at '${expectedPath}' does${
      isNot ? '' : ' not'
    } equal received file JSON content at '${receivedPath}'`,
    utils.diff(receivedFile.json, expectedFile.json)
  )
}
