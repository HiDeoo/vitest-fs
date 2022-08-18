import { type Expected } from './matchers'
import { toEqualFile } from './matchers/toEqualFile'
import { toEqualFileContent } from './matchers/toEqualFileContent'
import { toEqualJsonFile } from './matchers/toEqualJsonFile'

export { toEqualFile, toEqualFileContent, toEqualJsonFile }

export interface Matchers {
  toEqualFile: Expected<typeof toEqualFile>
  toEqualFileContent: Expected<typeof toEqualFileContent>
  toEqualJsonFile: Expected<typeof toEqualJsonFile>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
