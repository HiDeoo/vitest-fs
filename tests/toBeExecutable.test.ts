import { describe, expect, test } from 'vitest'

import { toBeExecutable } from '../src/matchers/toBeExecutable'

expect.extend({ toBeExecutable })

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeExecutable()).toThrowError(`Received path at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not executable', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).toBeExecutable()).toThrowError(
      `Received path at '${receivedFilePath}' is not executable`
    )
  })

  test('should pass if the received path is executable', () => {
    const receivedFilePath = 'fixtures/executable'

    expect(() => expect(receivedFilePath).toBeExecutable()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is executable', () => {
    const receivedFilePath = 'fixtures/executable'

    expect(() => expect(receivedFilePath).not.toBeExecutable()).toThrowError(
      `Received path at '${receivedFilePath}' is executable`
    )
  })

  test('should pass if the received path is not executable', () => {
    const receivedFilePath = 'fixtures/file1'

    expect(() => expect(receivedFilePath).not.toBeExecutable()).not.toThrowError()
  })
})
