import type { Transformer } from '../types'

const transformer: Transformer = (code, id, path, query) => {
  return `${code + id + path + query}`
}

export default transformer
