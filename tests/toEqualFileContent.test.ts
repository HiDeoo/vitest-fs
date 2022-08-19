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
    const receivedContent = fs.readFileSync('fixtures/file1-copy', 'utf8')

    expect(() => expect(receivedContent).toEqualFileContent('fixtures/file1')).not.toThrowError()
  })

  test('should pass if the received content equals the expected path content with whitespaces removed', () => {
    const receivedContent = fs.readFileSync('fixtures/file1-no-whitespaces', 'utf8')

    expect(() =>
      expect(receivedContent).toEqualFileContent('fixtures/file1', { removeWhitespaces: true })
    ).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received content equals the expected path content', () => {
    const filePath = 'fixtures/file1'
    const receivedContent = fs.readFileSync('fixtures/file1-copy', 'utf8')

    expect(() => expect(receivedContent).not.toEqualFileContent(filePath)).toThrowError(
      `Expected file content at '${filePath}' does equal received content`
    )
  })

  test('should fail if the received content equals the expected path content with whitespaces removed', () => {
    const filePath = 'fixtures/file1'
    const receivedContent = fs.readFileSync('fixtures/file1-no-whitespaces', 'utf8')

    expect(() => expect(receivedContent).not.toEqualFileContent(filePath, { removeWhitespaces: true })).toThrowError(
      `Expected file content at '${filePath}' does equal received content`
    )
  })

  test('should pass if the received content does not equal the expected path content', () => {
    const receivedContent = fs.readFileSync('fixtures/file2', 'utf8')

    expect(() => expect(receivedContent).not.toEqualFileContent('fixtures/file1')).not.toThrowError()
  })
})
