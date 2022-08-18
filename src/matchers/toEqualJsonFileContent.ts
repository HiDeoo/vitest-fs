import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualJsonFileContent(this: MatcherState, receivedContent: unknown, expectedPath: string) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, { json: true, type: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  const pass = equals(receivedContent, expectedFile.json)

  return getResultWithDiff(
    pass,
    `Expected file JSON content at '${expectedPath}' does${isNot ? '' : ' not'} equal received JSON content`,
    utils.diff(expectedFile.content, receivedContent)
  )
}
