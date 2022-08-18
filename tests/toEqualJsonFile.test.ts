import { describe, expect, test } from 'vitest'

import { toEqualJsonFile } from '../src/matchers/toEqualJsonFile'

expect.extend({ toEqualJsonFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toEqualJsonFile('fixtures/file3.json')).toThrowError(
    `Received file at '${filePath}' does not exist`
  )
})

test('should fail if the received path is not a valid JSON file', () => {
  const filePath = 'fixtures/file1'

  expect(() => expect(filePath).toEqualJsonFile('fixtures/file3.json')).toThrowError(
    `Received file at '${filePath}' is not a valid JSON file`
  )
})

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('fixtures/file3.json').toEqualJsonFile(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

test('should fail if the expected path is not a valid JSON file', () => {
  const filePath = 'fixtures/file1'

  expect(() => expect('fixtures/file3.json').toEqualJsonFile(filePath)).toThrowError(
    `Expected file at '${filePath}' is not a valid JSON file`
  )
})

describe('to equal', () => {
  test('should fail if the received path JSON content does not equal the expected path JSON content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file4.json'

    expect(() => expect(receivedFilePath).toEqualJsonFile(expectedFilePath)).toThrowError(
      new RegExp(
        `^Expected file JSON content at '${expectedFilePath}' does not equal received file JSON content at '${receivedFilePath}'`
      )
    )
  })

  test('should pass if the received path content equals the expected path content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file3-reordered.json'

    expect(() => expect(receivedFilePath).toEqualJsonFile(expectedFilePath)).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path JSON content equals the expected path JSON content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file3-reordered.json'

    expect(() => expect(receivedFilePath).not.toEqualJsonFile(expectedFilePath)).toThrowError(
      `Expected file JSON content at '${expectedFilePath}' does equal received file JSON content at '${receivedFilePath}'`
    )
  })

  test('should pass if the received JSON content does not equal the expected path JSON content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file4.json'

    expect(() => expect(receivedFilePath).not.toEqualJsonFile(expectedFilePath)).not.toThrowError()
  })
})
