module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },

  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],

  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'no-console': 0,
    "space-before-function-paren": [0, "never"]
  }
}

