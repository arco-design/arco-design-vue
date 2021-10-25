module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
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
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/no-named-as-default': 0,
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
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
};
