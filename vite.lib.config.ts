import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@constructor-io/constructorio-client-javascript',
      ],
      output: {
        assetFileNames: 'styles.css',
      },
    },
    outDir: 'dist',
  },
});
