export default {
  '*.{css,scss,sass,less}': ['pnpm stylelint --allow-empty-input'],
  '**/*.vue': ['pnpm oxlint --fix', 'pnpm stylelint --allow-empty-input'],
  '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}': ['pnpm oxlint --fix'],
  '*': ['oxfmt --no-error-on-unmatched-pattern'],
};
