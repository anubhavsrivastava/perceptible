import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Perceptor',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'umd' ? 'bundle.js' : 'bundle.mjs'
    },
    outDir: 'dist',
    sourcemap: true
  }
});
