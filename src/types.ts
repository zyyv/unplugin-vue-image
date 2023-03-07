import type { Awaitable } from '@antfu/utils'
import type { FilterPattern } from '@rollup/pluginutils'
import type Context from './core/context'

export interface importInfo {
  name?: string
  importName?: string
  path: string
}

export interface ImageResolveResult extends importInfo {}

export type ImageResolverFunction = (name: string) => Awaitable<string | ImageResolveResult | null | undefined | void>

export type Transformer = (ctx: Context) => (code: string, id: string, path: string, query: Record<string, any>) => string

export interface Options {
  /**
    * Rules to include transforming target.
    *
    * @default [/\.[jt]sx?$/, /\.vue\??/]
    */
  include?: FilterPattern

  /**
     * Rules to exclude transforming target.
     *
     * @default [/node_modules/, /\.git/]
     */
  exclude?: FilterPattern

  /**
   * Relative paths to the directory to search for images.
   * @default 'src/assets/img'
   */
  dirs?: string | string[]

  /**
   * Search for subdirectories
   * @default true
   */
  deep?: boolean

  /**
    * Valid file extensions for images.
    * @default ['jpg', 'jpeg', 'png', 'svg', 'webp']
    */
  extensions?: string[]

  /**
    * Pass a function to resolve the image import path from the image name.
    *
    * Image names are always in PascalCase
    */
  resolvers?: (ImageResolverFunction | ImageResolverFunction[])[]

  /**
    * Custom Regex used to search for variable names.
    * For example, to ensure only capitalized variables are replaced: '([A-Z][a-zA-Z0-9]+)'
    * It MUST include a group
    * @default '([a-zA-Z0-9]+)'
    */
  customSearchRegex?: string

  /**
   * Filepath to generate corresponding .d.ts file.
   * Default enabled when `typescript` is installed locally.
   * Set `false` to disable.
   *
   * @default './auto-import-image.d.ts'
   */
  dts?: string | boolean

  /**
    * Allow overriding imports sources from multiple presets.
    *
    * @default false
    */
  presetOverriding?: boolean

  /**
   * Apply custom transform over the path for importing
   */
  importPathTransform?: (path: string) => string | undefined
}

export type ResolvedOptions = Omit<
Required<Options>,
'resolvers' | 'extensions' | 'dirs'
> & {
  resolvers: ImageResolverFunction[]
  extensions: string[]
  dirs: string[]
  dts: string | false
  root: string
}
