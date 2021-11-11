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
    // Vue: Recommended rules to be closed or modify
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    // Vue: Add extra rules
    'vue/custom-event-name-casing': [2, 'camelCase'],
    'vue/no-v-text': 2,
    'vue/padding-line-between-blocks': 2,
    'vue/require-direct-export': 2,
    // TODO: Remove gradually
    '@typescript-eslint/no-explicit-any': 0,
    // TODO: Remove gradually
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 1,
    // Allow @ts-ignore comment
    '@typescript-eslint/ban-ts-comment': 0,
    // Redefine the extension detection rules, overwrite airbnb-base
    'import/extensions': [
      2,
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    // ESLint Problem https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
    'no-use-before-define': 0,
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-unused-expressions': [
      2,
      { allowShortCircuit: true, allowTernary: true },
    ],
    'prefer-template': 1,
    // Allow use these features
    'no-bitwise': 0,
    'no-continue': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-return-assign': 0,
    'no-shadow': 0,
    // You can use underscore variable names (private variables)
    'no-underscore-dangle': 0,
  },
};
