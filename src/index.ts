import { type Expected } from './matchers'
import { toMatchFile } from './matchers/toMatchFile'
import { toMatchFileContent } from './matchers/toMatchFileContent'

export { toMatchFile, toMatchFileContent }

export interface Matchers {
  toMatchFile: Expected<typeof toMatchFile>
  toMatchFileContent: Expected<typeof toMatchFileContent>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
