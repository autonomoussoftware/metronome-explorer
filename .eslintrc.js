module.exports = {
  root: true,
  parser: 'babel-eslint',

  env: {
    browser: true,
    node: true
  },

  extends: [
    'standard',
    'plugin:vue/base'
  ],

  plugins: [
    'html'
  ],

  rules: {},
  globals: {}
}
