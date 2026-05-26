import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// FIXME lint-stage 更新到 17 之后在 windows 上找不到 mise 的 bin，暂时先 hack 一下，后续等待 lint-stage 或 mise 修复后再移除 hack 代码
const require = createRequire(import.meta.url);

const quote = (value) => `"${value}"`;
const nodeBin = quote(process.execPath);

const resolvePackageBin = (packageName, binName) => {
  const packageJsonPath = require.resolve(`${packageName}/package.json`);
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const bin = packageJson.bin;
  const binPath = typeof bin === 'string' ? bin : bin?.[binName];

  if (!binPath) {
    throw new Error(`Cannot resolve bin "${binName}" from package "${packageName}"`);
  }

  return quote(join(dirname(packageJsonPath), binPath));
};

const cli = (packageName, binName, args = '') => {
  const script = resolvePackageBin(packageName, binName);
  return `${nodeBin} ${script}${args ? ` ${args}` : ''}`;
};

const runStylelint = cli('stylelint', 'stylelint', '--allow-empty-input');
const runOxlintFix = cli('oxlint', 'oxlint', '--fix');
const runOxfmt = cli('oxfmt', 'oxfmt', '--no-error-on-unmatched-pattern');

export default {
  '*.{css,scss,sass,less}': [runStylelint],
  '**/*.vue': [runOxlintFix, runStylelint],
  '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}': [runOxlintFix],
  '*': [runOxfmt],
};
