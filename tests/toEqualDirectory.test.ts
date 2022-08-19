import { describe, expect, test } from 'vitest'

import { toEqualDirectory } from '../src/matchers/toEqualDirectory'

expect.extend({ toEqualDirectory })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toEqualDirectory('fixtures')).toThrowError(
    `Received path at '${filePath}' does not exist`
  )
})

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('fixtures').toEqualDirectory(filePath)).toThrowError(
    `Expected path at '${filePath}' does not exist`
  )
})

describe('to equal', () => {
  test('should fail if the received path directory does not equal the expected path directory', () => {
    const receivedDirectoryPath = 'fixtures/directory1'
    const expectedDirectoryPath = 'fixtures/directory2'

    expect(() => expect(receivedDirectoryPath).toEqualDirectory(expectedDirectoryPath)).toThrowError(
      new RegExp(
        `^Expected directory structure at '${expectedDirectoryPath}' does not equal received directory structure at '${receivedDirectoryPath}'`
      )
    )
  })

  test('should pass if the received path directory equals the expected path directory', () => {
    const receivedDirectoryPath = 'fixtures/directory1'
    const expectedDirectoryPath = 'fixtures/directory1-copy'

    expect(() => expect(receivedDirectoryPath).toEqualDirectory(expectedDirectoryPath)).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path directory equals the expected path directory', () => {
    const receivedDirectoryPath = 'fixtures/directory1'
    const expectedDirectoryPath = 'fixtures/directory1-copy'

    expect(() => expect(receivedDirectoryPath).not.toEqualDirectory(expectedDirectoryPath)).toThrowError(
      `Expected directory structure at '${expectedDirectoryPath}' does equal received directory structure at '${receivedDirectoryPath}'`
    )
  })

  test('should pass if the received path directory equals the expected path directory', () => {
    const receivedFilePath = 'fixtures/directory1'
    const expectedFilePath = 'fixtures/directory2'

    expect(() => expect(receivedFilePath).not.toEqualDirectory(expectedFilePath)).not.toThrow()
  })
})
