// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default tseslint.config(
  eslint.configs.recommended,
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
      ...tseslint.configs.recommended.rules,
      ...sveltePlugin.configs.recommended.rules,
      'no-inner-declarations': 'off'
    }
  },
  {
    ignores: ['.svelte-kit/**/*']
  }
);
