import { describe, expect, test } from 'vitest'

import { toBeFile } from '../src/matchers/toBeFile'

expect.extend({ toBeFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeFile()).toThrowError(`Received path at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not a file', () => {
    const receivedFilePath = 'fixtures'

    expect(() => expect(receivedFilePath).toBeFile()).toThrowError(
      `Received path at '${receivedFilePath}' is not a file`
    )
  })

  test('should pass if the received path is a file', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).toBeFile()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is a file', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).not.toBeFile()).toThrowError(
      `Received path at '${receivedFilePath}' is a file`
    )
  })

  test('should pass if the received path is not a file', () => {
    const receivedFilePath = 'fixtures'

    expect(() => expect(receivedFilePath).not.toBeFile()).not.toThrowError()
  })
})
