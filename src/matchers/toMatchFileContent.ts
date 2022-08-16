import fs from 'node:fs'

import { type Matcher } from '.'

export const toMatchFileContent: Matcher<string, string> = function (receivedContent, expectedPath) {
  const { equals, isNot, utils } = this

  if (!fs.existsSync(expectedPath)) {
    return {
      message: () => `Expected file at '${expectedPath}' does not exist`,
      pass: false,
    }
  }

  const expectedContent = fs.readFileSync(expectedPath, 'utf8')

  const pass = equals(receivedContent, expectedContent)

  return {
    message: () => {
      const message = `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} match received content`
      const diff = utils.diff(expectedContent, receivedContent)

      if (!diff) {
        return message
      }

      return `Expected file content at '${expectedPath}' does${isNot ? '' : ' not'} match received content

${diff}`
    },
    pass,
  }
}