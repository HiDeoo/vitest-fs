import { getFile } from '../libs/fs'
import { getResultMessageWithDiff } from '../libs/result'

import { type Matcher } from '.'

export const toMatchJsonFile: Matcher<string, [string]> = function (receivedPath, expectedPath) {
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

  return {
    message: getResultMessageWithDiff(
      `Expected file JSON content at '${expectedPath}' does${
        isNot ? '' : ' not'
      } match received file JSON content at '${receivedPath}'`,
      utils.diff(receivedFile.json, expectedFile.json)
    ),
    pass,
  }
}
