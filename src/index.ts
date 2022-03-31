import { createUnplugin } from 'unplugin'
import { MODULE_NAME } from './core/constants'
import Context from './core/context'
import type { Options } from './types'
import type { ResolvedConfig, ViteDevServer } from 'vite'

export default createUnplugin<Options>((options) => {
  const ctx = new Context(options)

  return {
    name: MODULE_NAME,
    enforce: 'post',
    // transformInclude(id) {
    //   return id.endsWith('main.ts')
    // },
    async transform(code, id) {
      const result = ctx.transform(code, id)
      await ctx.generateDeclaration()
      return result
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        ctx.setRoot(config.root)

        if (options?.dts)
          ctx.generateDeclaration()
      },
      configureServer(server: ViteDevServer) {
        ctx.setupViteServer(server)
      },
    },
  }
})
