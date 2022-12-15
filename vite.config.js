// vite.config.ts
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  worker: {
    format: 'es',
  },
  plugins: [solidPlugin({})],
})
