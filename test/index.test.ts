import { describe, expect, it } from 'vitest'
import Context from '../src/core/context'

describe('context describle', () => {
  const ctx = new Context()

  it('trnasform parse', () => {
    const code = `<template>
    <img alt="Vue logo" src="./assets/images/logo.png">
  </template>`
    const id = 'test/index.vue'
    expect(ctx.transform(code, id))
      .toMatchInlineSnapshot(`
        "
        <template>
            <img alt=\\"Vue logo\\" src=\\"./assets/images/logo.png\\">
          </template>"
      `)
  })
})
