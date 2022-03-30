import { createUnplugin } from 'unplugin'
import Context from './core/context'
import type { Options } from './types'

export default createUnplugin<Options>((options) => {
  const ctx = new Context(options)

  return {
    name: 'unplugin-vue-image',
    transformInclude(id) {
      return id.endsWith('main.ts')
    },
    transform(code, id) {
      const result = ctx.transform(code, id)
      ctx.generateDeclaration()
      return result
    },
    vite: {
      configResolved(config: any) {
        ctx.setRoot(config.root)

        if (options?.dts)
          ctx.generateDeclaration()
      },
      configureServer(server: any) {
        ctx.setupViteServer(server)
      },
    },
  }
})
