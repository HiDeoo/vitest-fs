import { describe, expect, test } from 'vitest'

import { toBeJsonFile } from '../src/matchers/toBeJsonFile'

expect.extend({ toBeJsonFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeJsonFile()).toThrowError(`Received file at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not a JSON file', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).toBeJsonFile()).toThrowError(
      `Received file at '${receivedFilePath}' is not a valid JSON file`
    )
  })

  test('should pass if the received path is a JSON file', () => {
    const receivedFilePath = 'fixtures/file3.json'

    expect(() => expect(receivedFilePath).toBeJsonFile()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is a JSON file', () => {
    const receivedFilePath = 'fixtures/file3.json'

    expect(() => expect(receivedFilePath).not.toBeJsonFile()).toThrowError(
      `Received path at '${receivedFilePath}' is a valid JSON file`
    )
  })

  test('should pass if the received path is not a JSON file', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).not.toBeJsonFile()).not.toThrowError()
  })
})
