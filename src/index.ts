import { type Matcher } from './matchers'
import { toBeDirectory } from './matchers/toBeDirectory'
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
