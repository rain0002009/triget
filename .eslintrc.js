// .eslintrc.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: ['@antfu'],
  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
  },
}
