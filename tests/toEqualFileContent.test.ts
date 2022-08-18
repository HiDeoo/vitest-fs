import fs from 'node:fs'

import { describe, expect, test } from 'vitest'

import { toEqualFileContent } from '../src/matchers/toEqualFileContent'

expect.extend({ toEqualFileContent })

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('content').toEqualFileContent(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

describe('to equal', () => {
  test('should fail if the received content does not equal the expected path content', () => {
    const filePath = 'fixtures/file1'
    const receivedContent = fs.readFileSync('fixtures/file2', 'utf8')

    expect(() => expect(receivedContent).toEqualFileContent(filePath)).toThrowError(
      new RegExp(`^Expected file content at '${filePath}' does not equal received content`)
    )
  })

  test('should pass if the received content equals the expected path content', () => {
    const content = fs.readFileSync('fixtures/file1-copy', 'utf8')

    expect(() => expect(content).toEqualFileContent('fixtures/file1')).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received content equals the expected path content', () => {
    const filePath = 'fixtures/file1'
    const content = fs.readFileSync('fixtures/file1-copy', 'utf8')

    expect(() => expect(content).not.toEqualFileContent(filePath)).toThrowError(
      `Expected file content at '${filePath}' does equal received content`
    )
  })

  test('should pass if the received content does not equal the expected path content', () => {
    const receivedContent = fs.readFileSync('fixtures/file2', 'utf8')

    expect(() => expect(receivedContent).not.toEqualFileContent('fixtures/file1')).not.toThrowError()
  })
})
