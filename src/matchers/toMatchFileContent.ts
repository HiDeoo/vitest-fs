import { getFile } from '../libs/fs'
import { getResultMessageWithDiff } from '../libs/result'

import { type Matcher } from '.'

export const toMatchFileContent: Matcher<string, [string]> = function (receivedContent, expectedPath) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, { type: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  const pass = equals(receivedContent, expectedFile.content)

  return {
    message: getResultMessageWithDiff(
      `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} match received content`,
      utils.diff(expectedFile.content, receivedContent)
    ),
    pass,
  }
}
