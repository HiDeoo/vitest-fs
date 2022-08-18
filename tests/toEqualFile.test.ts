import { describe, expect, test } from 'vitest'

import { toEqualFile } from '../src/matchers/toEqualFile'

expect.extend({ toEqualFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toEqualFile('fixtures/file1')).toThrowError(
    `Received file at '${filePath}' does not exist`
  )
})

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('fixtures/file1').toEqualFile(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

describe('to equal', () => {
  test('should fail if the received path content does not equal the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file2'

    expect(() => expect(receivedFilePath).toEqualFile(expectedFilePath)).toThrowError(
      new RegExp(
        `^Expected file content at '${expectedFilePath}' does not equal received file content at '${receivedFilePath}'`
      )
    )
  })

  test('should pass if the received path content equals the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file1-copy'

    expect(() => expect(receivedFilePath).toEqualFile(expectedFilePath)).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path content equals the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file1-copy'

    expect(() => expect(receivedFilePath).not.toEqualFile(expectedFilePath)).toThrowError(
      `Expected file content at '${expectedFilePath}' does equal received file content at '${receivedFilePath}'`
    )
  })

  test('should pass if the received content does not equal the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file2'

    expect(() => expect(receivedFilePath).not.toEqualFile(expectedFilePath)).not.toThrowError()
  })
})
