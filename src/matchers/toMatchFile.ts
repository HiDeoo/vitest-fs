import { getFile } from '../libs/fs'

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
    message: () => {
      const message = `Expected file content at '${expectedPath}' does${
        isNot ? '' : ' not'
      } match received file content at '${receivedPath}'`
      const diff = utils.diff(expectedFile.content, receivedFile.content)

      if (!diff) {
        return message
      }

      return `${message}

${diff}`
    },
    pass,
  }
}
