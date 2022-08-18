import { type Matcher } from './matchers'
import { toBeDirectory } from './matchers/toBeDirectory'
import { toBeFile } from './matchers/toBeFile'
import { toBeSymbolicLink } from './matchers/toBeSymbolicLink'
import { toEqualFile } from './matchers/toEqualFile'
import { toEqualFileContent } from './matchers/toEqualFileContent'
import { toEqualJsonFile } from './matchers/toEqualJsonFile'
import { toEqualJsonFileContent } from './matchers/toEqualJsonFileContent'

export {
  toBeDirectory,
  toBeFile,
  toBeSymbolicLink,
  toEqualFile,
  toEqualFileContent,
  toEqualJsonFile,
  toEqualJsonFileContent,
}

export interface Matchers {
  toBeDirectory: Matcher<typeof toBeDirectory>
  toBeFile: Matcher<typeof toBeFile>
  toBeSymbolicLink: Matcher<typeof toBeSymbolicLink>
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
