module.exports = {
  presets: [
    ['@babel/preset-env'],
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
        isTSX: true,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@vue/babel-plugin-jsx',
  ],
};
