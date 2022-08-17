import { getFile } from '../libs/fs'
import { getResultError, getResultMessageWithDiff } from '../libs/result'

import { type Matcher } from '.'

export const toMatchJsonFile: Matcher<string, [string]> = function (receivedPath, expectedPath) {
  const { equals, isNot, utils } = this

  const receivedFile = getFile(receivedPath, 'received')

  if (!receivedFile.exists) {
    return receivedFile.result
  }

  const expectedFile = getFile(expectedPath, 'expected')

  if (!expectedFile.exists) {
    return expectedFile.result
  }

  let receivedFileJson

  try {
    receivedFileJson = JSON.parse(receivedFile.content)
  } catch {
    return getResultError('Received file is not a valid JSON file')
  }

  let expectedFileJson

  try {
    expectedFileJson = JSON.parse(expectedFile.content)
  } catch {
    return getResultError('Expected file is not a valid JSON file')
  }

  const pass = equals(receivedFileJson, expectedFileJson)

  return {
    message: getResultMessageWithDiff(
      `Expected file JSON content at '${expectedPath}' does${
        isNot ? '' : ' not'
      } match received file JSON content at '${receivedPath}'`,
      utils.diff(receivedFileJson, expectedFileJson)
    ),
    pass,
  }
}
