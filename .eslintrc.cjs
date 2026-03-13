module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'unused-imports',
    'prettier',
    'import',
    'jsx-a11y',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'import/order': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
