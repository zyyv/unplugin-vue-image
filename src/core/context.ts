import { throttle } from '@antfu/utils'
import Debug from 'debug'
import fg from 'fast-glob'
import { resolveOptions, resovleDtsPath } from './options'
import { generateDeclaration as gtDeclaration } from './dts'
import { parseId } from './utils'
import transformer from './transform'
import type { ViteDevServer } from 'vite'
import type { Options, ResolvedOptions } from '../types'

const debug = {
  search: Debug('unplugin-vue-image:context:search'),
  hmr: Debug('unplugin-vue-image:context:hmr'),
  decleration: Debug('unplugin-vue-image:decleration'),
}

export default class Context {
  options: ResolvedOptions
  private _serached = false
  root = process.cwd()

  private _server: ViteDevServer | undefined

  constructor(private rawOptions: Options = {}) {
    this.options = resolveOptions(rawOptions, this.root)
    debug.search('options', this.options)
    this.generateDeclaration = throttle(500, false, this.generateDeclaration.bind(this))
  }

  transform(code: string, id: string) {
    const { path, query } = parseId(id)
    return transformer(this)(code, id, path, query)
  }

  async searchGlob() {
    if (this._serached) return

    const root = this.options.root
    const globs = this.options.dirs.map(d => `${d}/**/*.${this.options.extensions.join(',')}`)
    const files = await fg(globs, {
      ignore: ['**/node_modules/**'],
      onlyFiles: true,
      cwd: root,
    })

    debug.search('searching', globs, files)

    this._serached = true
  }

  setRoot(root: string) {
    this.root = root
    this.options.root = root
    this.options.dts = resovleDtsPath(root, this.options.dts)
  }

  generateDeclaration() {
    if (!this.options.dts)
      return

    debug.decleration('generating')
    gtDeclaration(this, this.options.dts)
  }

  setupViteServer(server: ViteDevServer) {
    this._server = server

    //   server.watcher
    //     .on('add', (path) => {
    //       const relPath = appRelativePath(path, this.root)
    //       if (fileInDirs(this.dirs, relPath) && hasExtension(path, this.extensions)) {
    //         this.addImages([relPath])
    //         this.onUpdate(relPath)
    //       }
    //     })
    //     .on('unlink', (path) => {
    //       // Remove non-app section of path
    //       const relPath = appRelativePath(path, this.root)
    //       if (this.removeImage(relPath))
    //         this.onUpdate(relPath)
    //     })
  }
}
