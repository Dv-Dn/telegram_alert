module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recomended', 'plugin:@typescript-exlint/recomended'],
  env: {
    node: true,
  },
};
