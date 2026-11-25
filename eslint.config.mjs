import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import prettierRcConfig from './.prettierrc.json' with { type: 'json' };

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off'
    }
  },
  js.configs.recommended,
  prettierConfig,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  importPlugin.flatConfigs.errors,
  importPlugin.flatConfigs.warnings,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        },
        node: {
          extensions: ['.ts', '.tsx', '.js']
        }
      },
      'import/ignore': ['node_modules'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx']
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      react: {
        version: 'detect'
      }
    },
    rules: {
      'jsx-a11y/alt-text': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-unused-vars': 0,
      'no-undef': 0,
      'object-curly-spacing': ['error', 'always'],
      'no-debugger': 1,
      'prettier/prettier': ['error', prettierRcConfig],
      'react/no-unescaped-entities': 0,
      'react/jsx-tag-spacing': [
        2,
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'allow'
        }
      ],
      '@typescript-eslint/no-unused-vars': 2,
      'import/no-unused-modules': 0,
      'import/group-exports': 0,
      'react/jsx-key': 1,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error'
    }
  }
];
