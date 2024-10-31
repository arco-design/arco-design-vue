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
    'plugin:import/recommended',
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
    // To close Vue, you must specify prop default
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    // Add void ele in prettier
    'vue/html-self-closing': 0,
    '@typescript-eslint/no-explicit-any': 0,
    // TODO: Temporarily closed
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // TODO: Temporarily closed
    '@typescript-eslint/no-non-null-assertion': 0,
    // Allow ts-ignore
    '@typescript-eslint/ban-ts-comment': 0,
    // Redefine the extension detection rules, overwrite airbnb-base
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    // TODO: Temporarily closed
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    // Utils allows export
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    // You can use underscore variable names (private variables)
    'no-underscore-dangle': 0,
    // Allow ternary expression nesting
    'no-nested-ternary': 0,
    // Allow internal variables and external variables to have the same name
    'no-shadow': 0,
    'prefer-template': 1,
    // TODO: Temporarily closed
    'no-param-reassign': 0,
    // Allow to add and subtract
    'no-plusplus': 0,
    // ESLint Problem https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
    'no-use-before-define': 0,
    // Allow for-of traversal (recommended)
    'no-restricted-syntax': 0,
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-bitwise': 0,
    'no-return-assign': 0,
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-continue': 0,
    'no-console': 2,
    // TODO: Temporarily closed
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
};
