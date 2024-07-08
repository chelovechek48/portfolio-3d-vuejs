module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'vue/max-attributes-per-line': 'off',
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src/'],
          ['@js', './src/scripts'],
          ['@components', './src/components'],
          ['@images', './src/assets/images'],
          ['@models', './src/assets/models'],
          ['@styles', './src/styles'],
          ['@vars', './src/styles/vars'],
        ],
      },
    },
  },
};
