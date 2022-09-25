import { throttle } from '@antfu/utils'
import fg from 'fast-glob'
import { resolveOptions, resovleDtsPath } from './options'
import { generateDeclaration as gtDeclaration } from './dts'
import { debug, getNameByPath, parseId, pascalCase } from './utils'
import transformer from './transform'
import type fs from 'fs'
import type { ViteDevServer } from 'vite'
import type { Options, ResolvedOptions } from '../types'

export default class Context {
  options: ResolvedOptions
  private _serached = false
  root = process.cwd()

  private _server: ViteDevServer | undefined
  _cache = new Map<string, string>()

  constructor(private rawOptions: Options = {}) {
    this.options = resolveOptions(rawOptions, this.root)
    this.generateDeclaration = throttle(500, false, this.generateDeclaration.bind(this))
  }

  transform(code: string, id: string) {
    const { path, query } = parseId(id)
    return transformer(this)(code, id, path, query)
  }

  searchGlob() {
    if (this._serached) return

    const root = this.options.root
    const suffix = this.options.extensions.join(',')
    const globs = this.options.dirs.map(d => `${d}/**/*.{${suffix}}`)
    const files = fg.sync(globs, {
      ignore: ['**/node_modules/**'],
      onlyFiles: true,
      cwd: root,
    })

    for (const file of files) {
      const name = pascalCase(getNameByPath(file, this.options))
      this._cache.set(name, `/${file}`)
    }

    this._serached = true
  }

  setRoot(root: string) {
    this.root = root
    this.options.root = root
    this.options.dts = resovleDtsPath(root, this.options.dts)
  }

  async generateDeclaration() {
    if (!this.options.dts)
      return

    await gtDeclaration(this, this.options.dts)
  }

  findPathFromCache(name: string): string | undefined {
    if (this._cache.has(name))
      return this._cache.get(name)
  }

  setupViteServer(server: ViteDevServer) {
    if (this._server === server)
      return

    this._server = server
    this.setupWatcher(server.watcher)
  }

  setupWatcher(watcher: fs.FSWatcher) {
    watcher
      .on('add', (_path) => {
        debug.fs('add', _path)

        const path = _path.slice(this.options.root.length + 1)
        if (this.options.dirs.some(dir => path.startsWith(dir)) && this.options.extensions.some(ext => path.endsWith(ext))) {
          this.addImages([path])
          this.onUpdate(path)
        }
      })
      .on('unlink', (_path) => {
        debug.fs('unlink', _path)

        // const path = _path.slice(this.options.root.length + 1)
        // console.log(path)
        // Remove non-app section of path
        // const relPath = appRelativePath(path, this.root)
        // if (this.removeImage(relPath))
        //   this.onUpdate(relPath)
      })
  }

  addImages(paths: string[]) {

  }

  removeImages(paths: string[]) {}

  onUpdate(path: string) {
    if (!this._server) {

    }
  }
}
