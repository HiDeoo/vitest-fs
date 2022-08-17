import { getFile } from '../libs/fs'

import { type Matcher } from '.'

export const toMatchFileContent: Matcher<string, [string]> = function (receivedContent, expectedPath) {
  const { equals, isNot, utils } = this

  const expectedFile = getFile(expectedPath, 'expected')

  if (!expectedFile.exists) {
    return expectedFile.result
  }

  const pass = equals(receivedContent, expectedFile.content)

  return {
    message: () => {
      const message = `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} match received content`
      const diff = utils.diff(expectedFile.content, receivedContent)

      if (!diff) {
        return message
      }

      return `${message}

${diff}`
    },
    pass,
  }
}
