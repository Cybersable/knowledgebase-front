import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// console.log(...compat.extends('next/core-web-vitals', 'next/typescript'));

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'unused-imports/no-unused-imports': 'error',

      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',

      'react/no-children-prop': 'off',
      'react/display-name': 'off',

      'react/jsx-max-props-per-line': [2, { maximum: 1 }],
      'react/jsx-indent-props': [2, 2],
      // 'react/jsx-first-prop-new-line': [2, 'multiline'],

      'quotes': ['error', 'single',
        { 'avoidEscape': true, 'allowTemplateLiterals': true },
      ],

      'no-multi-spaces': ['error'],

      'object-curly-spacing': ['error', 'always',
        {
          'arraysInObjects': false,
          'objectsInObjects': false,
        }
      ],

      // 'padding-line-between-statements': [
      //   'error',
      //   { 'blankLine': 'always', 'prev': 'function', 'next': 'function' },
      //   { 'blankLine': 'always', 'prev': 'function', 'next': 'block' },
      //   { 'blankLine': 'always', 'prev': 'block', 'next': 'function' },
      // ],

      'indent': ['error', 2,
        {
          'FunctionDeclaration': { 'body': 1, 'parameters': 1 },
          'FunctionExpression': { 'body': 1, 'parameters': 1 },
        }
      ],
      'function-paren-newline': ['error', 'consistent'],

      'max-len': ['error', {
        'code': 90,
        'ignoreComments': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
      }],

      // 'react/jsx-first-prop-new-line': `"always" | "never" | "multiline" | "multiprop" | "multiline-multiprop"`
      'react/jsx-first-prop-new-line': 'error',

      'semi': ['error', 'never'],

      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'comma-dangle': ['error', {
        'arrays': 'only-multiline',
        'objects': 'always-multiline',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never',
      }],
    },
  },
]

export default eslintConfig
