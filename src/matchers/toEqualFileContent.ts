import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualFileContent(
  this: MatcherState,
  receivedContent: unknown,
  expectedPath: string,
  options?: ToEqualFileContentOptions
) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, { kind: 'expected', removeWhitespaces: options?.removeWhitespaces })

  if (expectedFile.error) {
    return expectedFile.error
  }

  return getResultWithDiff(
    equals(receivedContent, expectedFile.content),
    `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} equal received content`,
    utils.diff(expectedFile.content, receivedContent)
  )
}

interface ToEqualFileContentOptions {
  removeWhitespaces?: boolean
}
