import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ styleId: 'cio-agent-overview-styles' }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/bundled.ts'),
      name: 'CIOAgentOverview',
      fileName: () => 'constructorio-ui-agent-overview.standalone.js',
      formats: ['umd'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    outDir: 'dist/standalone',
  },
});
