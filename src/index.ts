import { existsSync } from 'node:fs'
import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import chokidar from 'chokidar'
import type { ResolvedConfig, ViteDevServer } from 'vite'
import { MODULE_NAME } from './core/constants'
import Context from './core/context'
import { debug } from './core/utils'
import type { Options } from './types'

export default createUnplugin<Options>((options = {}) => {
  const filter = createFilter(
    options.include || [/\.vue$/, /\.vue\?vue/],
    options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  )

  const ctx = new Context(options)

  return {
    name: MODULE_NAME,
    enforce: 'post',
    transformInclude(id) {
      return filter(id)
    },
    async transform(code, id) {
      try {
        const result = ctx.transform(code, id)
        await ctx.generateDeclaration()
        return result
      }
      catch (e) {
        this.error(e)
      }
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        ctx.setRoot(config.root)

        if (ctx.options.dts) {
          ctx.searchGlob()
          if (!existsSync(ctx.options.dts))
            ctx.generateDeclaration()
        }

        debug.fs('configResolved', ctx.options)

        if (config.build.watch && config.command === 'build')
          ctx.setupWatcher(chokidar.watch(ctx.options.dirs))
      },
      configureServer(server: ViteDevServer) {
        ctx.setupViteServer(server)
      },
    },
  }
})
