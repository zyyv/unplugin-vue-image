import { throttle } from '@antfu/utils'
import Debug from 'debug'
import { resolveOptions, resovleDtsPath } from './options'
import { generateDeclaration } from './dts'
import { parseId } from './utils'
import transformer from './transform'
import type { Options, ResolvedOptions } from '../types'
import type { ViteDevServer } from 'vite'

const debug = {
  components: Debug('unplugin-vue-components:context:components'),
  search: Debug('unplugin-vue-components:context:search'),
  hmr: Debug('unplugin-vue-components:context:hmr'),
  decleration: Debug('unplugin-vue-components:decleration'),
  env: Debug('unplugin-vue-components:env'),
}

export default class Context {
  options: ResolvedOptions

  root = process.cwd()

  private _server: ViteDevServer | undefined

  constructor(private rawOptions: Options = {}) {
    this.options = resolveOptions(rawOptions, this.root)
    this.generateDeclaration = throttle(500, false, this.generateDeclaration.bind(this))
  }

  transform(code: string, id: string) {
    const { path, query } = parseId(id)
    return transformer(code, id, path, query)
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
    generateDeclaration(this, this.options.dts)
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
