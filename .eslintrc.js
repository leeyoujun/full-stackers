module.exports = {
  root: true,
  env: { node: true, es2021: true, browser: true },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2021,
  },
  ignorePatterns: ['src/nuxt.config.js'],
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:nuxt/recommended', 'plugin:prettier/recommended'],
  plugins: ['vue', 'nuxt', 'prettier'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': ['warn', { allow: ['debug', 'warn', 'info', 'error'] }],
    'no-unused-vars': 'warn',
    'prettier/prettier': ['error', { trailingComma: 'es5', semi: false, singleQuote: true, printWidth: 160, arrowParens: 'avoid' }],
  },
}
