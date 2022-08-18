import { getFile } from '../libs/fs'
import { getResultMessageWithDiff } from '../libs/result'

import { type Matcher } from '.'

export const toEqualJsonFileContent: Matcher<unknown, [string]> = function (receivedContent, expectedPath) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, { json: true, type: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  const pass = equals(receivedContent, expectedFile.json)

  return {
    message: getResultMessageWithDiff(
      `Expected file JSON content at '${expectedPath}' does${isNot ? '' : ' not'} equal received JSON content`,
      utils.diff(expectedFile.content, receivedContent)
    ),
    pass,
  }
}
