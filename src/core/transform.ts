import { pascalCase, stringifyImageImport } from './utils'
import type { Transformer } from '../types'

const transformer: Transformer = (ctx) => {
  return (code, _id, _path, _query) => {
    ctx.searchGlob()

    let _idx = 0
    const head: string[] = []
    const imgVariavleRE = /_ctx\.([A-Z][a-zA-Z0-9]*)/g

    const transformed = code.replace(imgVariavleRE, (match, name) => {
      if (name) {
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

    return `${head.join('\n')}\n${transformed}`
  }
}

export default transformer
