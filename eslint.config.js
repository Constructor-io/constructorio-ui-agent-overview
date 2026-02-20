import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import storybookPlugin from 'eslint-plugin-storybook';
import cspellPlugin from '@cspell/eslint-plugin';
import vitestPlugin from 'eslint-plugin-vitest';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import noSnapshotPlugin from 'eslint-plugin-no-snapshot-testing';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '*.config.js',
      'lib/**/*.js',
      'lib/**/*.d.ts',
      'docs/**/*.js',
      'spec/setup.ts',
      'node_modules/',
      'dist/',
      'storybook-static/',
    ],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint.plugin,
      '@cspell': cspellPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/stories/**/*.*',
            '**/.storybook/**/*.*',
            '**/spec/**/*.*',
            '**/*.test.{js,jsx,ts,tsx}',
          ],
          peerDependencies: true,
        },
      ],
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'prettier/prettier': ['error'],
      'react/require-default-props': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prefer-stateless-function': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'prefer-const': 'error',
      'global-require': 'off',
      'max-len': [
        'error',
        120,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'object-curly-newline': 'off',
      'padded-blocks': 'off',
      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 5],
      'max-params': ['error', 4],
      complexity: ['error', 20],
      '@cspell/spellchecker': ['error'],
    },
  },
  {
    files: [
      'stories/**/*.stories.{js,jsx,ts,tsx}',
      '.storybook/**/*.{js,jsx,ts,tsx}',
    ],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['spec/**/*.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
    },
    plugins: {
      vitest: vitestPlugin,
      import: importPlugin,
      'testing-library': testingLibraryPlugin,
      'no-snapshot-testing': noSnapshotPlugin,
    },
    rules: {
      ...vitestPlugin.configs['flat/recommended'].rules,
      ...testingLibraryPlugin.configs['flat/react'].rules,
      'vitest/consistent-test-it': [
        'error',
        { fn: 'test', withinDescribe: 'it' },
      ],
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/require-top-level-describe': 'error',
      'no-snapshot-testing/no-snapshot-testing': 'error',
      'testing-library/no-node-access': [
        'error',
        { allowContainerFirstChild: true },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, peerDependencies: true },
      ],
    },
  }
);
