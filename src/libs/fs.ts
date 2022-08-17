import fs from 'node:fs'

export function getFile(path: string, options?: FileOptions) {
  const exists = fs.existsSync(path)

  const resultPrefix =
    options?.type === 'expected' ? 'Expected file' : options?.type === 'received' ? 'Received file' : 'File'

  let message = ''

  let content = ''
  let json = {}

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

  const error = didError
    ? {
        message: () => message,
        pass: !didError,
      }
    : undefined

  return { content, error, json }
}

interface FileOptions {
  json?: boolean
  type?: 'expected' | 'received'
}
