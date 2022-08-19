import { describe, expect, test } from 'vitest'

import { toBeEmptyFile } from '../src/matchers/toBeEmptyFile'

expect.extend({ toBeEmptyFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeEmptyFile()).toThrowError(`Received path at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not empty', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).toBeEmptyFile()).toThrowError(
      `Received path at '${receivedFilePath}' is not an empty file`
    )
  })

  test('should pass if the received path is empty', () => {
    const receivedFilePath = 'fixtures/file5'

    expect(() => expect(receivedFilePath).toBeEmptyFile()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is empty', () => {
    const receivedFilePath = 'fixtures/file5'

    expect(() => expect(receivedFilePath).not.toBeEmptyFile()).toThrowError(
      `Received path at '${receivedFilePath}' is an empty file`
    )
  })

  test('should pass if the received path is not empty', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).not.toBeEmptyFile()).not.toThrowError()
  })
})
