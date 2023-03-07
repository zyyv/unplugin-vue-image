import { parse } from 'node:path'
import Debug from 'debug'
import type { Options } from '../types'

export const debug = {
  search: Debug('unplugin-vue-image:context:search'),
  hmr: Debug('unplugin-vue-image:context:hmr'),
  decleration: Debug('unplugin-vue-image:decleration'),
  log: Debug('unplugin-vue-image:log'),
  transform: Debug('unplugin-vue-image:transform'),
  fs: Debug('unplugin-vue-image:fs'),
}

export function stringifyImageImport(path: string, name: string) {
  return `import ${name} from '${path}'`
}

export function parseId(id: string) {
  const index = id.indexOf('?')
  if (index < 0) {
    return { path: id, query: {} }
  }
  else {
    const query = Object.fromEntries(new URLSearchParams(id.slice(index)) as any)
    return {
      path: id.slice(0, index),
      query,
    }
  }
}

export function getNameByPath(path: string, options: Options) {
  const parsedFilePath = parse(path)
  let strippedPath = ''

  for (const dir of (options.dirs || [])) {
    if (parsedFilePath.dir.startsWith(dir)) {
      strippedPath = parsedFilePath.dir.slice(dir.length)
      break
    }
  }

  const folders = strippedPath.slice(1).split('/').filter(Boolean)
  let filename = parsedFilePath.name

  // if (filename.toLowerCase() === 'index')
  //   filename = ''

  if (!isEmpty(folders))
    filename = [...folders, filename].filter(Boolean).join('-')

  return filename
}

export function isEmpty(value: any): boolean {
  return (!value || value === null || value === undefined || (Array.isArray(value) && Object.keys(value).length <= 0))
}

export function pascalCase(str: string): string {
  const camel = camelCase(str)
  return camel[0].toUpperCase() + camel.slice(1)
}

export function camelCase(str: string): string {
  return str.replace(/[-_](\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}
