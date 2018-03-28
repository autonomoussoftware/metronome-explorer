module.exports = {
  root: true,
  parser: 'babel-eslint',

  env: {
    browser: true,
    node: true
  },

  extends: [
    'bloq'
  ],

  plugins: [
    'html'
  ],

  parserOptions: {
    sourceType: 'module'
  },

  rules: {
    'no-shadow': [2, {'builtinGlobals': false, 'hoist': 'functions', 'allow': ['Vue']}],
    'arrow-body-style': ['error', 'as-needed']
  }
}
