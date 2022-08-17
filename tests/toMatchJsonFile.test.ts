import { describe, expect, test } from 'vitest'

import { toMatchJsonFile } from '../src/matchers/toMatchJsonFile'

expect.extend({ toMatchJsonFile })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toMatchJsonFile('fixtures/file3.json')).toThrowError(
    `Received file at '${filePath}' does not exist`
  )
})

test('should fail if the received path is not a valid JSON file', () => {
  const filePath = 'fixtures/file1'

  expect(() => expect(filePath).toMatchJsonFile('fixtures/file3.json')).toThrowError(
    `Received file at '${filePath}' is not a valid JSON file`
  )
})

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('fixtures/file3.json').toMatchJsonFile(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

test('should fail if the expected path is not a valid JSON file', () => {
  const filePath = 'fixtures/file1'

  expect(() => expect('fixtures/file3.json').toMatchJsonFile(filePath)).toThrowError(
    `Expected file at '${filePath}' is not a valid JSON file`
  )
})

describe('to match', () => {
  test('should fail if the received path JSON content does not match the expected path JSON content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file4.json'

    expect(() => expect(receivedFilePath).toMatchJsonFile(expectedFilePath)).toThrowError(
      new RegExp(
        `^Expected file JSON content at '${expectedFilePath}' does not match received file JSON content at '${receivedFilePath}'`
      )
    )
  })

  test('should pass if the received path content matches the expected path content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file3-reordered.json'

    expect(() => expect(receivedFilePath).toMatchJsonFile(expectedFilePath)).not.toThrowError()
  })
})

describe('to not match', () => {
  test('should fail if the received path JSON content matches the expected path JSON content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file3-reordered.json'

    expect(() => expect(receivedFilePath).not.toMatchJsonFile(expectedFilePath)).toThrowError(
      `Expected file JSON content at '${expectedFilePath}' does match received file JSON content at '${receivedFilePath}'`
    )
  })

  test('should pass if the received JSON content does not match the expected path JSON content', () => {
    const receivedFilePath = 'fixtures/file3.json'
    const expectedFilePath = 'fixtures/file4.json'

    expect(() => expect(receivedFilePath).not.toMatchJsonFile(expectedFilePath)).not.toThrowError()
  })
})
