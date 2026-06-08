export default {
  '*.{css,scss,sass,less}': ['stylelint --allow-empty-input'],
  '**/*.vue': ['oxlint --fix --no-error-on-unmatched-pattern', 'stylelint --allow-empty-input'],
  '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}': ['oxlint --fix --no-error-on-unmatched-pattern'],
  '*': ['oxfmt --no-error-on-unmatched-pattern'],
};
