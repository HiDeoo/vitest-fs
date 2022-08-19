import { type Matcher } from './matchers'
import { toBeDirectory } from './matchers/toBeDirectory'
import { toBeEmptyDirectory } from './matchers/toBeEmptyDirectory'
import { toBeEmptyFile } from './matchers/toBeEmptyFile'
import { toBeExecutable } from './matchers/toBeExecutable'
import { toBeFile } from './matchers/toBeFile'
import { toBeJsonFile } from './matchers/toBeJsonFile'
import { toBeSymbolicLink } from './matchers/toBeSymbolicLink'
import { toEqualDirectory } from './matchers/toEqualDirectory'
import { toEqualFile } from './matchers/toEqualFile'
import { toEqualFileContent } from './matchers/toEqualFileContent'
import { toEqualJsonFile } from './matchers/toEqualJsonFile'
import { toEqualJsonFileContent } from './matchers/toEqualJsonFileContent'

export {
  toBeDirectory,
  toBeEmptyDirectory,
  toBeEmptyFile,
  toBeExecutable,
  toBeFile,
  toBeJsonFile,
  toBeSymbolicLink,
  toEqualDirectory,
  toEqualFile,
  toEqualFileContent,
  toEqualJsonFile,
  toEqualJsonFileContent,
}

export interface Matchers {
  /**
   * Asserts that the specified path is a directory.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is a directory', () => {
   *  expect('path/to/directory').toBeDirectory()
   * })
   * ```
   */
  toBeDirectory: Matcher<typeof toBeDirectory>

  /**
   * Asserts that the specified path is an empty directory.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is an empty directory', () => {
   *  expect('path/to/empty/directory').toBeEmptyDirectory()
   * })
   * ```
   */
  toBeEmptyDirectory: Matcher<typeof toBeEmptyDirectory>

  /**
   * Asserts that the specified path is an empty file.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is an empty file', () => {
   *  expect('path/to/empty/file').toBeEmptyFile()
   * })
   * ```
   */
  toBeEmptyFile: Matcher<typeof toBeEmptyFile>

  /**
   * Asserts that the specified path is an executable.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is an executable', () => {
   *  expect('path/to/executable').toBeExecutable()
   * })
   * ```
   */
  toBeExecutable: Matcher<typeof toBeExecutable>

  /**
   * Asserts that the specified path is a file.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is a file', () => {
   *  expect('path/to/file').toBeFile()
   * })
   * ```
   */
  toBeFile: Matcher<typeof toBeFile>

  /**
   * Asserts that the specified path is a valid JSON file.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is a valid JSON file', () => {
   *  expect('path/to/json/file').toBeJsonFile()
   * })
   * ```
   */
  toBeJsonFile: Matcher<typeof toBeJsonFile>

  /**
   * Asserts that the specified path is a symbolic link.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a path is a symbolic link', () => {
   *  expect('path/to/symbolic/link').toBeSymbolicLink()
   * })
   * ```
   */
  toBeSymbolicLink: Matcher<typeof toBeSymbolicLink>

  /**
   * Asserts that the directory structure of the specified path is equal to another one.
   *
   * @remarks
   * Only the directory structures should be equal for this matcher to pass, not the content of the files in the
   * directories.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if directory structures are the same', () => {
   *  expect('path/to/directory').toEqualDirectory('path/to/other/directory')
   * })
   * ```
   */
  toEqualDirectory: Matcher<typeof toEqualDirectory>

  /**
   * Asserts that a file content is equal to the content of another file.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if two files are the same', () => {
   *  expect('path/to/file').toEqualFile('path/to/other/file')
   * })
   * ```
   *
   * @example Remove whitespaces for the assertion.
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if two files are the same with whitespaces removed', () => {
   *  expect('path/to/file').toEqualFile('path/to/other/file', { removeWhitespaces: true })
   * })
   * ```
   */
  toEqualFile: Matcher<typeof toEqualFile>

  /**
   * Asserts that a file content is equal to a specific content.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a file content is equal to a specific content', () => {
   *  expect('path/to/file').toEqualFileContent('file content')
   * })
   * ```
   *
   * @example Remove whitespaces for the assertion.
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a file content is equal to a specific content with whitespaces removed', () => {
   *  expect('path/to/file').toEqualFileContent('filecontent', { removeWhitespaces: true })
   * })
   * ```
   */
  toEqualFileContent: Matcher<typeof toEqualFileContent>

  /**
   * Asserts that a JSON file is equal to another JSON file.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if two JSON files are the same', () => {
   *  expect('path/to/json/file').toEqualJsonFile('path/to/other/json/file')
   * })
   * ```
   */
  toEqualJsonFile: Matcher<typeof toEqualJsonFile>

  /**
   * Asserts that a JSON file is equal to a specific JSON content.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if two files are the same', () => {
   *  expect('path/to/file').toEqualJsonFileContent({ key: 'value' })
   * })
   * ```
   */
  toEqualJsonFileContent: Matcher<typeof toEqualJsonFileContent>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
