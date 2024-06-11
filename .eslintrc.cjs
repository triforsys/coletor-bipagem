module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@rocketseat/eslint-config/react'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'semi'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'semi/semi': ['error', 'never'],
    semi: 'off',
    quotes: 'off',
    'react/prop-types': ['error', { ignore: ['children'] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
