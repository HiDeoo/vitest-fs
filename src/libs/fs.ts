import fs from 'node:fs'

export function getFile(path: string, type?: 'expected' | 'received') {
  const exists = fs.existsSync(path)

  const resultPrefix = type === 'expected' ? 'Expected file' : type === 'received' ? 'Received file' : 'File'

  const result = {
    message: () => `${resultPrefix} at '${path}' does not exist`,
    pass: exists,
  }

  let content = ''

  if (exists) {
    content = fs.readFileSync(path, 'utf8')
  }

  return { content, exists, result }
}
