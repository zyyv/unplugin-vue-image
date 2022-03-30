import Debug from 'debug'
import type { Transformer } from '../types'

const debug = Debug('unplugin-vue-images:transfrom')

const transformer: Transformer = (ctx) => {
  return (code, id, path, query) => {
    if (!path.endsWith('.vue')) return code

    ctx.searchGlob()
    debug('transfrom', path, query)
    return code.replace('_ctx.Logo', '"/src/assets/images/logo.png"')
  }
}

export default transformer
