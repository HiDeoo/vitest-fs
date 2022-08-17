import { getFile } from '../libs/fs'
import { getResultMessage } from '../libs/result'

import { type Matcher } from '.'

export const toMatchFileContent: Matcher<string, [string]> = function (receivedContent, expectedPath) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, 'expected')

  if (!expectedFile.exists) {
    return expectedFile.result
  }

  const pass = equals(receivedContent, expectedFile.content)

  return {
    message: getResultMessage(
      `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} match received content`,
      utils.diff(expectedFile.content, receivedContent)
    ),
    pass,
  }
}
