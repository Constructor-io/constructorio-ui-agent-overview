import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: ['stories/**'],
      thresholds: {
        branches: 80,
        functions: 85,
        lines: 85,
        statements: 85,
      },
    },
    projects: [
      {
        extends: true,
        resolve: {
          alias: {
            '@src': path.resolve(dirname, 'src'),
            '@spec': path.resolve(dirname, 'spec'),
            '@stories': path.resolve(dirname, 'stories'),
            'embla-carousel-react': path.resolve(
              dirname,
              'spec/__mocks__/embla-carousel-react.ts'
            ),
          },
        },
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./spec/setup.ts'],
          include: ['spec/**/*.{test,spec}.{ts,tsx}'],
          exclude: [
            'stories/**/*.stories.{ts,tsx}',
            'stories/**/*.stories.{js,jsx}',
          ],
          globals: true,
          server: {
            deps: {
              inline: ['@constructor-io/constructorio-ui-components'],
            },
          },
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        optimizeDeps: {
          include: ['storybook/test'],
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
