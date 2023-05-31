module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    // 0 关闭 1 警告 2 错误
    'react-refresh/only-export-components': 1, // 检查是否有导出组件
    'no-fallthrough': [0], // 禁止 case 语句落空
    '@typescript-eslint/no-empty-function': 1,
    'linebreak-style': [0, 'error', 'lf'] // 换行符使用 lf
  }
};
