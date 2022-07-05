import { describe, expect, it } from 'vitest'
import Context from '../src/core/context'

const ctx = new Context()

describe('context describle', () => {
  it('trnasform parse', () => {
    const code = 'xxx _ctx.Logo xxx'
    const id = 'test/index.vue'
    expect(ctx.transform(code, id))
      .toMatchInlineSnapshot(`
        "
        xxx _ctx.Logo xxx"
      `)
  })
})
