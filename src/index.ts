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
  toBeDirectory: Matcher<typeof toBeDirectory>
  toBeEmptyDirectory: Matcher<typeof toBeEmptyDirectory>
  toBeEmptyFile: Matcher<typeof toBeEmptyFile>
  toBeExecutable: Matcher<typeof toBeExecutable>
  toBeFile: Matcher<typeof toBeFile>
  toBeJsonFile: Matcher<typeof toBeJsonFile>
  toBeSymbolicLink: Matcher<typeof toBeSymbolicLink>
  toEqualDirectory: Matcher<typeof toEqualDirectory>
  toEqualFile: Matcher<typeof toEqualFile>
  toEqualFileContent: Matcher<typeof toEqualFileContent>
  toEqualJsonFile: Matcher<typeof toEqualJsonFile>
  toEqualJsonFileContent: Matcher<typeof toEqualJsonFileContent>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
