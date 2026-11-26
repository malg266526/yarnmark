import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

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
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
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
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks
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
    rules: {
      'no-undef': 0,
      'no-debugger': 1,
      'react/no-unescaped-entities': 0,
      'import/no-unused-modules': 0,
      'import/group-exports': 0,
      'react/jsx-key': 1,
      ...reactHooks.configs['recommended-latest'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/incompatible-library': 'off'
    }
  }
];
