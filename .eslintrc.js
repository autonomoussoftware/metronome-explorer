module.exports = {
  root: true,
  parser: 'babel-eslint',

  env: {
    browser: true,
    node: true
  },

  parserOptions: {
    sourceType: 'module'
  },

  extends: [
    'bloq'
  ],

  plugins: [
    'html'
  ],

  rules: {
    complexity: 'off'
  },
  globals: {}
}
