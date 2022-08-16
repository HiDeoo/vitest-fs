import fs from 'node:fs'

import { describe, expect, test } from 'vitest'

import { toMatchFileContent } from '../src/matchers/toMatchFileContent'

expect.extend({ toMatchFileContent })

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('content').toMatchFileContent(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

describe('to match', () => {
  test('should fail if the received content does not match the expected path content', () => {
    const filePath = 'fixtures/file1'
    const receivedContent = fs.readFileSync('fixtures/file2', 'utf8')

    expect(() => expect(receivedContent).toMatchFileContent(filePath)).toThrowError(
      new RegExp(`^Expected file content at '${filePath}' does not match received content`)
    )
  })

  test('should pass if the received content matches the expected path content', () => {
    const content = fs.readFileSync('fixtures/file1-copy', 'utf8')

    expect(() => expect(content).toMatchFileContent('fixtures/file1')).not.toThrowError()
  })
})

describe('to not match', () => {
  test('should fail if the received content matches the expected path content', () => {
    const filePath = 'fixtures/file1'
    const content = fs.readFileSync('fixtures/file1-copy', 'utf8')

    expect(() => expect(content).not.toMatchFileContent(filePath)).toThrowError(
      `Expected file content at '${filePath}' does match received content`
    )
  })

  test('should pass if the received content does not match the expected path content', () => {
    const receivedContent = fs.readFileSync('fixtures/file2', 'utf8')

    expect(() => expect(receivedContent).not.toMatchFileContent('fixtures/file1')).not.toThrowError()
  })
})
