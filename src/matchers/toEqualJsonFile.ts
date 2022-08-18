import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualJsonFile(this: MatcherState, receivedPath: string, expectedPath: string) {
  const { equals, isNot, utils } = this

  const receivedFile = getFile(receivedPath, { json: true, type: 'received' })

  if (receivedFile.error) {
    return receivedFile.error
  }

  const expectedFile = getFile(expectedPath, { json: true, type: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  const pass = equals(receivedFile.json, expectedFile.json)

  return getResultWithDiff(
    pass,
    `Expected file JSON content at '${expectedPath}' does${
      isNot ? '' : ' not'
    } equal received file JSON content at '${receivedPath}'`,
    utils.diff(receivedFile.json, expectedFile.json)
  )
}
