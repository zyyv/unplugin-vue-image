import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { MODULE_NAME } from './core/constants'
import Context from './core/context'
import type { Options } from './types'
import type { ResolvedConfig, ViteDevServer } from 'vite'

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
      } catch (e) {
        this.error(e)
      }
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        ctx.setRoot(config.root)

        if (options.dts)
          ctx.generateDeclaration()
      },
      configureServer(server: ViteDevServer) {
        ctx.setupViteServer(server)
      },
    },
  }
})
