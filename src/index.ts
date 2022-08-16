import { type Expected } from './matchers'
import { toMatchFileContent } from './matchers/toMatchFileContent'

export { toMatchFileContent }

export interface Matchers {
  toMatchFileContent: Expected<typeof toMatchFileContent>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
