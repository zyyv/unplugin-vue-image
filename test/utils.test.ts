import { describe, expect, it } from 'vitest'
import { getNameByPath, pascalCase } from '../src/core/utils'

describe('context describe', () => {
  const files = [
    'src/assets/img/logo.png',
    'src/assets/images/index.png',
    'src/assets/images/test/logo.png',
  ]
  const options = {
    dirs: ['src/assets/img', 'src/assets/images'],
  }
  const names = files.map(path => getNameByPath(path, options))
  const pascalNames = names.map(name => pascalCase(name))
  const map = new Map()
  pascalNames.forEach((name, index) => map.set(name, files[index]))

  it('getNameByPath', () => {
    expect(names).toMatchInlineSnapshot(`
      [
        "logo",
        "index",
        "test-logo",
      ]
    `)
  })

  it('pascalCase', () => {
    expect(pascalNames).toMatchInlineSnapshot(`
      [
        "Logo",
        "Index",
        "TestLogo",
      ]
    `)
  })

  it('cache Map', () => {
    expect(map).toMatchInlineSnapshot(`
      Map {
        "Logo" => "src/assets/img/logo.png",
        "Index" => "src/assets/images/index.png",
        "TestLogo" => "src/assets/images/test/logo.png",
      }
    `)
  })
})
