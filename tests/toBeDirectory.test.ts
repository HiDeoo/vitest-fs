import { describe, expect, test } from 'vitest'

import { toBeDirectory } from '../src/matchers/toBeDirectory'

expect.extend({ toBeDirectory })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeDirectory()).toThrowError(`Received path at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not a directory', () => {
    const receivedDirectoryPath = 'fixtures/file1'

    expect(() => expect(receivedDirectoryPath).toBeDirectory()).toThrowError(
      `Received path at '${receivedDirectoryPath}' is not a directory`
    )
  })

  test('should pass if the received path is a directory', () => {
    const receivedDirectoryPath = 'fixtures'

    expect(() => expect(receivedDirectoryPath).toBeDirectory()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is a directory', () => {
    const receivedDirectoryPath = 'fixtures'

    expect(() => expect(receivedDirectoryPath).not.toBeDirectory()).toThrowError(
      `Received path at '${receivedDirectoryPath}' is a directory`
    )
  })

  test('should pass if the received path is not a directory', () => {
    const receivedDirectoryPath = 'fixtures/file1'

    expect(() => expect(receivedDirectoryPath).not.toBeDirectory()).not.toThrowError()
  })
})
