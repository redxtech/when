module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'vue'],
  rules: {
    'vue/html-self-closing': 0
  }
}
