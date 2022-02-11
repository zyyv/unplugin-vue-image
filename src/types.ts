export type ImageResolveResult = string | { path: string }

export type ImageResolver = (name: string) => ImageResolveResult | null | undefined | void

export interface Options {
  /**
   * Relative paths to the directory to search for images.
   * @default 'src/assets/img'
   */
  dirs?: string[]

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
  resolvers?: ImageResolver[]

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
   * @default './auto-imports.d.ts'
   */
  dts?: string | boolean

  /**
    * Allow overriding imports sources from multiple presets.
    *
    * @default false
    */
  presetOverriding?: boolean

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
}
