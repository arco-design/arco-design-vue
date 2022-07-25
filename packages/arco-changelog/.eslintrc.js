module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'prettier/prettier': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/ban-ts-comment': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'no-shadow': 0,
    'prefer-template': 1,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'no-restricted-syntax': 0,
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-bitwise': 0,
    'no-return-assign': 0,
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-continue': 0,
  },
};
