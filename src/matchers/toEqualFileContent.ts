import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualFileContent(this: MatcherState, receivedContent: unknown, expectedPath: string) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, { type: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  const pass = equals(receivedContent, expectedFile.content)

  return getResultWithDiff(
    pass,
    `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} equal received content`,
    utils.diff(expectedFile.content, receivedContent)
  )
}
