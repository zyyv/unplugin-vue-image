import { resolve } from 'path'
import { toArray } from '@antfu/utils'
import { isPackageExists } from 'local-pkg'
import type { ImageResolverFunction, Options, ResolvedOptions } from '../types'

export const defaultOptions: Omit<Required<Options>, 'include' | 'exclude'> = {
  dirs: 'src/assets/img',
  extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],

  deep: true,
  resolvers: [],

  customSearchRegex: '([a-zA-Z0-9]+)',
  dts: isPackageExists('typescript'),
  //   dts: '/auto-import-image.d.ts',
  presetOverriding: false,

  importPathTransform: v => v
}

function normalizeResolvers(resolvers: (ImageResolverFunction | ImageResolverFunction[])[]) {
  return toArray(resolvers).flat()
}

export function resovleDtsPath(root: string, dts: string | boolean) {
  return !dts
    ? false
    : resolve(
      root,
      typeof dts === 'string'
        ? dts
        : 'auto-import-image.d.ts'
    )
}

export function resolveOptions(options: Options, root: string): ResolvedOptions {
  const resolved = Object.assign({}, defaultOptions, options) as ResolvedOptions

  resolved.resolvers = normalizeResolvers(resolved.resolvers)
  resolved.extensions = toArray(resolved.extensions)
  resolved.root = root

  resolved.dirs = toArray(resolved.dirs)

  resolved.dts = resovleDtsPath(root, resolved.dts)

  return resolved
}
