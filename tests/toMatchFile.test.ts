import { describe, expect, test } from 'vitest'

import { toMatchFile } from '../src/matchers/toMatchFile'

expect.extend({ toMatchFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toMatchFile('fixtures/file1')).toThrowError(
    `Received file at '${filePath}' does not exist`
  )
})

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('fixtures/file1').toMatchFile(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

describe('to match', () => {
  test('should fail if the received path content does not match the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file2'

    expect(() => expect(receivedFilePath).toMatchFile(expectedFilePath)).toThrowError(
      new RegExp(
        `^Expected file content at '${expectedFilePath}' does not match received file content at '${receivedFilePath}'`
      )
    )
  })

  test('should pass if the received path content matches the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file1-copy'

    expect(() => expect(receivedFilePath).toMatchFile(expectedFilePath)).not.toThrowError()
  })
})

describe('to not match', () => {
  test('should fail if the received path content matches the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file1-copy'

    expect(() => expect(receivedFilePath).not.toMatchFile(expectedFilePath)).toThrowError(
      `Expected file content at '${expectedFilePath}' does match received file content at '${receivedFilePath}'`
    )
  })

  test('should pass if the received content does not match the expected path content', () => {
    const receivedFilePath = 'fixtures/file1'
    const expectedFilePath = 'fixtures/file2'

    expect(() => expect(receivedFilePath).not.toMatchFile(expectedFilePath)).not.toThrowError()
  })
})
