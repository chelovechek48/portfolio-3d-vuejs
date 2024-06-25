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
          ['@js', './src/js'],
          ['@components', './src/components'],
          ['@views', './src/views'],
          ['@images', './src/assets/images'],
          ['@icons', './src/assets/icons'],
          ['@fonts', './src/assets/fonts'],
          ['@styles', './src/styles'],
          ['@vars', './src/styles/vars'],
        ],
      },
    },
  },
};
