# unplugin-vue-image (WIP)

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-image?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-image)

## Install

```bash
npm i unplugin-vue-image -D
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

## Usage

`unplugin-vue-image` auto import your image from `assets/images` by default to your Vue component.

You can only use image variables using camelCase.

```
--- aseets
  --- images
    --- logo.png
--- App.vue
```

```vue
--- src/App.vue ---
<template>
  <div>
    <img :src="Logo">
  </div>
</template>
```

## Credits
This plugin was inspired by [vite-plugin-vue-images](https://github.com/sampullman/vite-plugin-vue-images), it's an enhanced version of it.

## License

[MIT](./LICENSE)
