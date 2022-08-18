import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualJsonFileContent(this: MatcherState, receivedContent: unknown, expectedPath: string) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, { json: true, kind: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  return getResultWithDiff(
    equals(receivedContent, expectedFile.json),
    `Expected file JSON content at '${expectedPath}' does${isNot ? '' : ' not'} equal received JSON content`,
    utils.diff(expectedFile.content, receivedContent)
  )
}
