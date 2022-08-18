import { type Expected } from './matchers'
import { toEqualFile } from './matchers/toEqualFile'
import { toEqualFileContent } from './matchers/toEqualFileContent'
import { toEqualJsonFile } from './matchers/toEqualJsonFile'
import { toEqualJsonFileContent } from './matchers/toEqualJsonFileContent'

export { toEqualFile, toEqualFileContent, toEqualJsonFile, toEqualJsonFileContent }

export interface Matchers {
  toEqualFile: Expected<typeof toEqualFile>
  toEqualFileContent: Expected<typeof toEqualFileContent>
  toEqualJsonFile: Expected<typeof toEqualJsonFile>
  toEqualJsonFileContent: Expected<typeof toEqualJsonFileContent>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
