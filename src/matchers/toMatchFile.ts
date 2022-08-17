import { getFile } from '../libs/fs'
import { getResultMessageWithDiff } from '../libs/result'

import { type Matcher } from '.'

export const toMatchFile: Matcher<string, [string]> = function (receivedPath, expectedPath) {
  const { equals, isNot, utils } = this

  const receivedFile = getFile(receivedPath, 'received')

  if (!receivedFile.exists) {
    return receivedFile.result
  }

  const expectedFile = getFile(expectedPath, 'expected')

  if (!expectedFile.exists) {
    return expectedFile.result
  }

  const pass = equals(receivedFile.content, expectedFile.content)

  return {
    message: getResultMessageWithDiff(
      `Expected file content at '${expectedPath}' does${
        isNot ? '' : ' not'
      } match received file content at '${receivedPath}'`,
      utils.diff(expectedFile.content, receivedFile.content)
    ),
    pass,
  }
}
