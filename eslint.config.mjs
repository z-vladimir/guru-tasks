import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    plugins: {
      boundaries,
      import: importPlugin,
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    plugins: ['boundaries', 'import'],

    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],

      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  }),
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',

      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'pages',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],

      'boundaries/entry-point': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              target: ['widgets', 'features', 'entities'],
              allow: ['index.ts'],
            },
          ],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/widgets',
              message: 'Import from a specific slice (widgets/...)',
            },
            {
              name: '@/features',
              message: 'Import from a specific slice (features/...)',
            },
            {
              name: '@/entities',
              message: 'Import from a specific slice (entities/...)',
            },
          ],
        },
      ],

      'import/no-relative-packages': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
