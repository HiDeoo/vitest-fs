import fs from 'node:fs'

import { describe, expect, test } from 'vitest'

import { toEqualJsonFileContent } from '../src/matchers/toEqualJsonFileContent'

expect.extend({ toEqualJsonFileContent })

test('should fail if the expected path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect('content').toEqualJsonFileContent(filePath)).toThrowError(
    `Expected file at '${filePath}' does not exist`
  )
})

describe('to equal', () => {
  test('should fail if the received JSON content does not equal the expected path JSON content', () => {
    const filePath = 'fixtures/file3.json'
    const receivedContent = fs.readFileSync('fixtures/file4.json', 'utf8')

    expect(() => expect(receivedContent).toEqualJsonFileContent(filePath)).toThrowError(
      new RegExp(`^Expected file JSON content at '${filePath}' does not equal received JSON content`)
    )
  })

  test('should pass if the received JSON content equals the expected path JSON content', () => {
    const content = JSON.parse(fs.readFileSync('fixtures/file3-reordered.json', 'utf8'))

    expect(() => expect(content).toEqualJsonFileContent('fixtures/file3.json')).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received JSON content equals the expected path JSON content', () => {
    const filePath = 'fixtures/file3.json'
    const receivedContent = JSON.parse(fs.readFileSync('fixtures/file3-reordered.json', 'utf8'))

    expect(() => expect(receivedContent).not.toEqualJsonFileContent(filePath)).toThrowError(
      `Expected file JSON content at '${filePath}' does equal received JSON content`
    )
  })

  test('should pass if the received JSON content does not equal the expected path JSON content', () => {
    const receivedContent = JSON.parse(fs.readFileSync('fixtures/file4.json', 'utf8'))

    expect(() => expect(receivedContent).not.toEqualJsonFileContent('fixtures/file3.json')).not.toThrowError()
  })
})
