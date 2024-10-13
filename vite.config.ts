import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {glsl} from "three/src/nodes/code/CodeNode";

export default defineConfig({
  base: '/',
  plugins: [react(),glsl()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.glb']
})
