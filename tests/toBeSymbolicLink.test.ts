import { describe, expect, test } from 'vitest'

import { toBeSymbolicLink } from '../src/matchers/toBeSymbolicLink'

expect.extend({ toBeSymbolicLink })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeSymbolicLink()).toThrowError(`Received path at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not a symbolic link', () => {
    const receivedLinkPath = 'fixtures/file1'

    expect(() => expect(receivedLinkPath).toBeSymbolicLink()).toThrowError(
      `Received path at '${receivedLinkPath}' is not a symbolic link`
    )
  })

  test('should pass if the received path is a symbolic link', () => {
    const receivedLinkPath = 'fixtures/link1'

    expect(() => expect(receivedLinkPath).toBeSymbolicLink()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is a symbolic link', () => {
    const receivedLinkPath = 'fixtures/link1'

    expect(() => expect(receivedLinkPath).not.toBeSymbolicLink()).toThrowError(
      `Received path at '${receivedLinkPath}' is a symbolic link`
    )
  })

  test('should pass if the received path is not a symbolic link', () => {
    const receivedLinkPath = 'fixtures/file1'

    expect(() => expect(receivedLinkPath).not.toBeSymbolicLink()).not.toThrowError()
  })
})
