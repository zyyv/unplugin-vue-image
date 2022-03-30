# unplugin-vue-image

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-image?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-image)

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:

```bash
npx degit antfu/unplugin-vue-image my-unplugin
```

And do a global replace of `unplugin-vue-image` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i unplugin-vue-image
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Image from 'unplugin-vue-image/vite'

export default defineConfig({
  plugins: [
    Image({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Image from 'unplugin-vue-image/rollup'

export default {
  plugins: [
    Image({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-image/webpack')({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-vue-image/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-image/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>
