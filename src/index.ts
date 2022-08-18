import { type Matcher } from './matchers'
import { toEqualFile } from './matchers/toEqualFile'
import { toEqualFileContent } from './matchers/toEqualFileContent'
import { toEqualJsonFile } from './matchers/toEqualJsonFile'
import { toEqualJsonFileContent } from './matchers/toEqualJsonFileContent'

export { toEqualFile, toEqualFileContent, toEqualJsonFile, toEqualJsonFileContent }

export interface Matchers {
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
