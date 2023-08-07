module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-refresh', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any
    '@typescript-eslint/no-empty-interface': 'off', // 禁止空接口
    'no-fallthrough': [0], // 禁止 case 语句落空
    '@typescript-eslint/no-var-requires': 'off', // 禁止使用 var
    '@typescript-eslint/no-unused-vars': 'error' // 禁止未使用过的变量
  }
};
