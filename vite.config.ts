import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { RollupOptions } from 'rollup'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/index.tsx',
    } as RollupOptions,
  },
})
