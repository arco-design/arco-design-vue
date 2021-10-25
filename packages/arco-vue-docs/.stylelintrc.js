module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['plugin'],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
