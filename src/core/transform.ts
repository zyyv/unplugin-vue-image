import { debug, pascalCase, stringifyImageImport } from './utils'
import type { Transformer } from '../types'

const transformer: Transformer = (ctx) => {
  return (code, id, path, _query) => {
    if (!path.endsWith('.vue')) return code

    ctx.searchGlob()

    let _idx = 0
    const head: string[] = []
    const imgVariavleRE = /_ctx\.([A-Z][a-zA-Z0-9]*)/g

    let transformed = code.replace(imgVariavleRE, (match, name) => {
      if (name && !name.startsWith('_')) {
        name = pascalCase(name)
        const path = ctx.findPathFromCache(name)
        if (path) {
          const varName = `__vite_images_${_idx}`
          head.push(stringifyImageImport(path, varName))
          _idx++
          return varName
        }
      }
      return match
    })

    transformed = `${head.join('\n')}\n${transformed}`

    debug.transform('transform success', transformed)

    return transformed
  }
}

export default transformer
