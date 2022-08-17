import { type Expected } from './matchers'
import { toMatchFile } from './matchers/toMatchFile'
import { toMatchFileContent } from './matchers/toMatchFileContent'
import { toMatchJsonFile } from './matchers/toMatchJsonFile'

export { toMatchFile, toMatchFileContent, toMatchJsonFile }

export interface Matchers {
  toMatchFile: Expected<typeof toMatchFile>
  toMatchFileContent: Expected<typeof toMatchFileContent>
  toMatchJsonFile: Expected<typeof toMatchJsonFile>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
