module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    ecmaVersion: 2018,
    sourceType: 'module',
    ignores: ['./eslintrc.js'],
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js'],
      },
    },
    'import/ignore': ['node_modules', './.eslintrc.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect',
    },
  },
  rules: {
    'jsx-a11y/alt-text': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 0,
    'no-undef': 0,
    'object-curly-spacing': ['error', 'always'],
    'no-debugger': 1,
    'react/no-unescaped-entities': 0,
    'react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow',
      },
    ],

    '@typescript-eslint/no-unused-vars': 2,
    // 'typescript/no-undef': 2,
    'import/no-unused-modules': 0,
    'import/group-exports': 0,
    'react/jsx-key': 1,

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
