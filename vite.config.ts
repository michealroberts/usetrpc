/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import typescript from '@rollup/plugin-typescript'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    typescript({
      tsconfig: './tsconfig.json'
    })
  ],
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@trpc/vue',
      fileName: format => `trpc-vue.${format}.js`
    },
    rollupOptions: {
      output: {
        sourcemap: true
      }
    }
  }
})
