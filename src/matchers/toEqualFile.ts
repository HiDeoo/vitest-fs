import { getFile } from '../libs/fs'
import { getResultWithDiff } from '../libs/result'

import { type MatcherState } from '.'

export function toEqualFile(
  this: MatcherState,
  receivedPath: unknown,
  expectedPath: string,
  options?: ToEqualFileOptions
) {
  const { equals, isNot, utils } = this

  const receivedFile = getFile(receivedPath, { kind: 'received', removeWhitespaces: options?.removeWhitespaces })

  if (receivedFile.error) {
    return receivedFile.error
  }

  const expectedFile = getFile(expectedPath, { kind: 'expected', removeWhitespaces: options?.removeWhitespaces })

  if (expectedFile.error) {
    return expectedFile.error
  }

  return getResultWithDiff(
    equals(receivedFile.content, expectedFile.content),
    `Expected file content at '${expectedPath}' does${
      isNot ? '' : ' not'
    } equal received file content at '${receivedPath}'`,
    utils.diff(expectedFile.content, receivedFile.content)
  )
}

interface ToEqualFileOptions {
  removeWhitespaces?: boolean
}
