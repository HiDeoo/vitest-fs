import { getFile } from '../libs/fs'
import { getResultMessageWithDiff } from '../libs/result'

import { type Matcher } from '.'

export const toEqualFile: Matcher<string, [string]> = function (receivedPath, expectedPath) {
  const { equals, isNot, utils } = this

  const receivedFile = getFile(receivedPath, { type: 'received' })

  if (receivedFile.error) {
    return receivedFile.error
  }

  const expectedFile = getFile(expectedPath, { type: 'expected' })

  if (expectedFile.error) {
    return expectedFile.error
  }

  const pass = equals(receivedFile.content, expectedFile.content)

  return {
    message: getResultMessageWithDiff(
      `Expected file content at '${expectedPath}' does${
        isNot ? '' : ' not'
      } equal received file content at '${receivedPath}'`,
      utils.diff(expectedFile.content, receivedFile.content)
    ),
    pass,
  }
}
