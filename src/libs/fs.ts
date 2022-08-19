import fs from 'node:fs'

import glob from 'fast-glob'

import { getResult } from './result'

export function getFile(path: unknown, options?: FileOptions) {
  if (typeof path !== 'string') {
    return {
      error: getResult(false, `${applyKind('path', options?.kind)} to be a string, but got '${typeof path}'`),
    }
  }

  if (!fs.existsSync(path)) {
    return {
      error: getResult(false, `${applyKind('file', options?.kind)} at '${path}' does not exist`),
    }
  }

  let content = fs.readFileSync(path, 'utf8')
  let json = {}

  if (options?.removeWhitespaces) {
    content = content.replace(/\s/g, '')
  }

  if (options?.json) {
    try {
      json = JSON.parse(content)
    } catch {
      return {
        error: getResult(false, `${applyKind('file', options?.kind)} at '${path}' is not a valid JSON file`),
      }
    }
  }

  return { content, json }
}

export function getStats(path: unknown, options?: OptionsWithKind) {
  if (typeof path !== 'string') {
    return { error: getResult(false, `${applyKind('path', options?.kind)} to be a string, but got '${typeof path}'`) }
  }

  if (!fs.existsSync(path)) {
    return { error: getResult(false, `${applyKind('path', options?.kind)} at '${path}' does not exist`) }
  }

  const stats = fs.lstatSync(path)

  return { stats }
}

export function getDirectory(path: unknown, options?: OptionsWithKind) {
  if (typeof path !== 'string') {
    return { error: getResult(false, `${applyKind('path', options?.kind)} to be a string, but got '${typeof path}'`) }
  }

  if (!fs.existsSync(path)) {
    return { error: getResult(false, `${applyKind('path', options?.kind)} at '${path}' does not exist`) }
  }

  return { content: glob.sync('**/*', { cwd: path, dot: true }) }
}

function applyKind(word: string, kind?: Kind) {
  return kind === 'expected'
    ? `Expected ${word}`
    : kind === 'received'
    ? `Received ${word}`
    : word.charAt(0).toUpperCase() + word.slice(1)
}

type Kind = 'expected' | 'received'

interface OptionsWithKind {
  kind?: Kind
}

interface FileOptions extends OptionsWithKind {
  json?: boolean
  removeWhitespaces?: boolean | undefined
}
