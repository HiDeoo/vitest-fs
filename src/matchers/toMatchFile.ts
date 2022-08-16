import fs from 'node:fs'

import { type Matcher } from '.'

export const toMatchFile: Matcher<string, string> = function (receivedPath, expectedPath) {
  const { equals, isNot, utils } = this

  if (!fs.existsSync(receivedPath)) {
    return {
      message: () => `Received file at '${receivedPath}' does not exist`,
      pass: false,
    }
  }

  if (!fs.existsSync(expectedPath)) {
    return {
      message: () => `Expected file at '${expectedPath}' does not exist`,
      pass: false,
    }
  }

  const receivedContent = fs.readFileSync(receivedPath, 'utf8')
  const expectedContent = fs.readFileSync(expectedPath, 'utf8')

  const pass = equals(receivedContent, expectedContent)

  return {
    message: () => {
      const message = `Expected file content at '${expectedPath}' does${
        isNot ? '' : ' not'
      } match received file content at '${receivedPath}'`
      const diff = utils.diff(expectedContent, receivedContent)

      if (!diff) {
        return message
      }

      return `${message}

${diff}`
    },
    pass,
  }
}
