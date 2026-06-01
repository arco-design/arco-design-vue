import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// lint-staged 17 在 Windows 上可能找不到 mise 提供的 bin，这里先显式解析本地 CLI 路径规避该问题。
const require = createRequire(import.meta.url);

const quote = (value) => `"${value}"`;
const nodeBin = quote(process.execPath);
const appendFiles = (files) => (files.length ? ` ${files.map(quote).join(' ')}` : '');

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
  const baseCommand = `${nodeBin} ${script}`;
  const argSuffix = args ? ` ${args}` : '';

  return (files = []) => `${baseCommand}${argSuffix}${appendFiles(files)}`;
};

const runStylelint = cli('stylelint', 'stylelint', '--allow-empty-input');
const runOxlintFix = cli('oxlint', 'oxlint', '--fix');
const runOxfmt = cli('oxfmt', 'oxfmt', '--no-error-on-unmatched-pattern');

export default {
  '*.{css,scss,sass,less}': runStylelint,
  '**/*.vue': (files) => [runOxlintFix(files), runStylelint(files)],
  '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}': runOxlintFix,
  '*': runOxfmt,
};
