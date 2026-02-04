import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('@3angletech/eslint-config/angular'),

  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      globals: {
        browser: true,
        jasmine: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^~[^/]+/[^/]+$',
            '@angular/common/http',
            '@angular/core/testing',
          ],
        },
      ],
      'import/no-deprecated': 'off',
      'no-any': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'capitalized-comments': 'off',
      'max-params': 'off',
      'indent': 'off',
    },
  },

  {
    ignores: [
      'node_modules/',
      'dist/',
      '.eslintrc.js',
      'src/test.ts',
      'coverage/',
    ],
  },
];