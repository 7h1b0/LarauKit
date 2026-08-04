// @ts-check

import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default defineConfig(
  ...tseslint.configs.recommended,
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte']
      }
    },
    plugins: {
      svelte: sveltePlugin,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      'no-inner-declarations': 'off'
    }
  },
  {
    ignores: ['.svelte-kit/**/*']
  }
);
