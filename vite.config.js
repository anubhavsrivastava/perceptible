import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Perceptor',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'umd' ? 'bundle.js' : 'bundle.mjs'
    },
    outDir: 'dist',
    sourcemap: true
  }
});
