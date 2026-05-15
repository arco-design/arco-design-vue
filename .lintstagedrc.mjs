export default {
  '*.{css,scss,sass,less}': [
    'oxfmt --no-error-on-unmatched-pattern',
    'stylelint --allow-empty-input',
  ],
  '**/*.vue': [
    'oxfmt --no-error-on-unmatched-pattern',
    'oxlint --fix',
    'stylelint --allow-empty-input',
    'vue-tsc --noEmit',
  ],
  '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}': ['oxfmt --no-error-on-unmatched-pattern', 'oxlint --fix'],
  '**/*.{json,jsonc,md,yml,yaml}': ['oxfmt --no-error-on-unmatched-pattern'],
  '**/*.{ts,tsx}': ['tsgo --noEmit'],
};
