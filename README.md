<div align="center">
  <h1>vitest-fs 💾</h1>
  <p>Custom Vitest file system matchers</p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/vitest-fs/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/vitest-fs/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/vitest-fs/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/vitest-fs" />
  </a>
  <br />
  <br />
</div>

A set of custom [Vitest](https://vitest.dev) matchers for interactions with the file system.

- [Usage](#usage)
- [Matchers](#matchers)
  - [toBeDirectory](#tobedirectory)
  - [toBeEmptyDirectory](#tobeemptydirectory)
  - [toBeEmptyFile](#tobeemptyfile)
  - [toBeExecutable](#tobeexecutable)
  - [toBeFile](#tobefile)
  - [toBeJsonFile](#tobejsonfile)
  - [toBeSymbolicLink](#tobesymboliclink)
  - [toEqualDirectory](#toequaldirectory)
  - [toEqualFile](#toequalfile)
  - [toEqualFileContent](#toequalfilecontent)
  - [toEqualJsonFile](#toequaljsonfile)
  - [toEqualJsonFileContent](#toequaljsonfilecontent)

## Usage

Install `vitest-fs` with your favorite package manager:

```shell
$ pnpm add -D vitest-fs
```

Add a setup file to your [Vitest configuration](https://vitest.dev/config/#configuration):

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['tests-setup.ts'],
  },
})
```

Extends the built-in Vitest matchers with some or all matchers of `vitest-fs` in your setup file:

```ts
import { expect } from 'vitest'

// Use all matchers of `vitest-fs`.
import * as matchers from 'vitest-fs'
expect.extend(matchers)

// Use some matchers of `vitest-fs`.
import { toBeFile, toEqualFile } from 'vitest-fs'
expect.extend({ toBeFile, toEqualFile })
```

## Matchers

### toBeDirectory

Asserts that the specified path is a directory.

```ts
import { expect, test } from 'vitest'

test('should test if a path is a directory', () => {
  expect('path/to/directory').toBeDirectory()
})
```

### toBeEmptyDirectory

Asserts that the specified path is an empty directory.

```ts
import { expect, test } from 'vitest'

test('should test if a path is an empty directory', () => {
  expect('path/to/empty/directory').toBeEmptyDirectory()
})
```

### toBeEmptyFile

Asserts that the specified path is an empty file.

```ts
import { expect, test } from 'vitest'

test('should test if a path is an empty file', () => {
  expect('path/to/empty/file').toBeEmptyFile()
})
```

### toBeExecutable

Asserts that the specified path is an executable.

```ts
import { expect, test } from 'vitest'

test('should test if a path is an executable', () => {
  expect('path/to/executable').toBeExecutable()
})
```

### toBeFile

Asserts that the specified path is a file.

```ts
import { expect, test } from 'vitest'

test('should test if a path is a file', () => {
  expect('path/to/file').toBeFile()
})
```

### toBeJsonFile

Asserts that the specified path is a valid JSON file.

```ts
import { expect, test } from 'vitest'

test('should test if a path is a valid JSON file', () => {
  expect('path/to/json/file').toBeJsonFile()
})
```

### toBeSymbolicLink

Asserts that the specified path is a symbolic link.

```ts
import { expect, test } from 'vitest'

test('should test if a path is a symbolic link', () => {
  expect('path/to/symbolic/link').toBeSymbolicLink()
})
```

### toEqualDirectory

Asserts that the directory structure of the specified path is equal to another one.

> **Note**
> Only the directory structures should be equal for this matcher to pass, not the content of the files in the directories.

```ts
import { expect, test } from 'vitest'

test('should test if directory structures are the same', () => {
  expect('path/to/directory').toEqualDirectory('path/to/other/directory')
})
```

### toEqualFile

Asserts that a file content is equal to the content of another file.

```ts
import { expect, test } from 'vitest'

test('should test if two files are the same', () => {
  expect('path/to/file').toEqualFile('path/to/other/file')
})
```

You can also remove whitespaces for the assertion.

```ts
import { expect, test } from 'vitest'

test('should test if two files are the same with whitespaces removed', () => {
  expect('path/to/file').toEqualFile('path/to/other/file', { removeWhitespaces: true })
})
```

### toEqualFileContent

Asserts that a file content is equal to a specific content.

```ts
import { expect, test } from 'vitest'

test('should test if a file content is equal to a specific content', () => {
  expect('path/to/file').toEqualFileContent('file content')
})
```

You can also remove whitespaces for the assertion.

```ts
import { expect, test } from 'vitest'

test('should test if a file content is equal to a specific content with whitespaces removed', () => {
  expect('path/to/file').toEqualFileContent('filecontent', { removeWhitespaces: true })
})
```

### toEqualJsonFile

Asserts that a JSON file is equal to another JSON file.

```ts
import { expect, test } from 'vitest'

test('should test if two JSON files are the same', () => {
  expect('path/to/json/file').toEqualJsonFile('path/to/other/json/file')
})
```

### toEqualJsonFileContent

Asserts that a JSON file is equal to a specific JSON content.

```ts
import { expect, test } from 'vitest'

test('should test if two files are the same', () => {
  expect('path/to/file').toEqualJsonFileContent({ key: 'value' })
})
```

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/vitest-fs/blob/main/LICENSE) for more information.
