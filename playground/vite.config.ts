import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Image from '../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    Image({
      dts: 'src/auto-import-image.d.ts',
    }),
  ],
})
