import fs from 'node:fs'

import { getResult } from './result'

export function getFile(path: unknown, options?: FileOptions) {
  let content = ''
  let json = {}

  if (typeof path !== 'string') {
    return { content, error: getResult(false, `Expected path to be a string, but got '${typeof path}'`), json }
  }

  const exists = fs.existsSync(path)

  const resultPrefix =
    options?.type === 'expected' ? 'Expected file' : options?.type === 'received' ? 'Received file' : 'File'

  let message = ''

  if (exists) {
    content = fs.readFileSync(path, 'utf8')

    if (options?.json) {
      try {
        json = JSON.parse(content)
      } catch {
        message = `${resultPrefix} at '${path}' is not a valid JSON file`
      }
    }
  } else {
    message = `${resultPrefix} at '${path}' does not exist`
  }

  const didError = message.length > 0
  const error = didError ? getResult(!didError, message) : undefined

  return { content, error, json }
}

interface FileOptions {
  json?: boolean
  type?: 'expected' | 'received'
}
