import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ styleId: 'cio-agent-overview-styles' }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/standalone.tsx'),
      name: 'CioAgentOverview',
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
