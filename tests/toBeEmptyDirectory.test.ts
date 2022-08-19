import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { toBeEmptyDirectory } from '../src/matchers/toBeEmptyDirectory'

expect.extend({ toBeEmptyDirectory })

let emptyDirPath: string

beforeAll(async () => {
  emptyDirPath = await fs.mkdtemp(path.join(os.tmpdir(), 'vitest-fs-'))
})

afterAll(async () => {
  await fs.rm(emptyDirPath, { recursive: true })
})

test('should fail if the received path does not exist', () => {
  const filePath = 'non-existing-file-path'

  expect(() => expect(filePath).toBeEmptyDirectory()).toThrowError(`Received path at '${filePath}' does not exist`)
})

describe('to equal', () => {
  test('should fail if the received path is not empty', () => {
    const receivedFilePath = 'fixtures'

    expect(() => expect(receivedFilePath).toBeEmptyDirectory()).toThrowError(
      `Received path at '${receivedFilePath}' is not an empty directory`
    )
  })

  test('should pass if the received path is empty', () => {
    expect(() => expect(emptyDirPath).toBeEmptyDirectory()).not.toThrowError()
  })
})

describe('to not equal', () => {
  test('should fail if the received path is empty', () => {
    expect(() => expect(emptyDirPath).not.toBeEmptyDirectory()).toThrowError(
      `Received path at '${emptyDirPath}' is an empty directory`
    )
  })

  test('should pass if the received path is not empty', () => {
    const receivedFilePath = 'fixtures'

    expect(() => expect(receivedFilePath).not.toBeEmptyDirectory()).not.toThrowError()
  })
})
