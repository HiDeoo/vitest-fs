import fs from 'node:fs'

import { getResult } from './result'

export function getFile(path: unknown, options?: FileOptions) {
  let content = ''
  let json = {}

  if (typeof path !== 'string') {
    return {
      content,
      error: getResult(false, `${applyKind('path', options?.kind)} to be a string, but got '${typeof path}'`),
      json,
    }
  }

  const exists = fs.existsSync(path)

  let message = ''

  if (exists) {
    content = fs.readFileSync(path, 'utf8')

    if (options?.removeWhitespaces) {
      content = content.replace(/\s/g, '')
    }

    if (options?.json) {
      try {
        json = JSON.parse(content)
      } catch {
        message = `${applyKind('file', options?.kind)} at '${path}' is not a valid JSON file`
      }
    }
  } else {
    message = `${applyKind('file', options?.kind)} at '${path}' does not exist`
  }

  const didError = message.length > 0
  const error = didError ? getResult(!didError, message) : undefined

  return { content, error, json }
}

export function getStats(path: unknown, options?: StatsOptions) {
  if (typeof path !== 'string') {
    return { error: getResult(false, `${applyKind('path', options?.kind)} to be a string, but got '${typeof path}'`) }
  }

  if (!fs.existsSync(path)) {
    return { error: getResult(false, `${applyKind('path', options?.kind)} at '${path}' does not exist`) }
  }

  const stats = fs.lstatSync(path)

  return { stats }
}

function applyKind(word: string, kind?: Kind) {
  return kind === 'expected'
    ? `Expected ${word}`
    : kind === 'received'
    ? `Received ${word}`
    : word.charAt(0).toUpperCase() + word.slice(1)
}

type Kind = 'expected' | 'received'

interface FileOptions {
  json?: boolean
  kind?: Kind
  removeWhitespaces?: boolean | undefined
}

interface StatsOptions {
  kind?: Kind
}
