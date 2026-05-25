import axios from 'axios';
import { parseTOML, stringifyTOML } from 'confbox';
import { writeFileSync, readFileSync } from 'node:fs';
import { format as oxfmtFormat } from 'oxfmt';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const mise = parseTOML(readFileSync('.mise.toml', 'utf8'));

const pnpmVersion = pkg.packageManager?.split('@')[1];
const nodeVersion = await getNodeLtsVersion();

if (!pnpmVersion) {
  throw new Error('packageManager not found in package.json');
}

if (!nodeVersion) {
  throw new Error('node version not found');
}

if (!pkg.engines) {
  pkg.engines = {};
}

if (!mise.tools) {
  mise.tools = {};
}

pkg.engines.node = `~${nodeVersion}`;
mise.tools.node = nodeVersion;

console.log('格式化配置...');
const pkgResult = await oxfmtFormat('package.json', JSON.stringify(pkg), {
  sortPackageJson: false,
});

const miseResult = await oxfmtFormat('.mise.toml', stringifyTOML(mise), {
  parser: 'toml',
});

const errors = [...pkgResult.errors, ...miseResult.errors];

if (errors.length > 0) {
  throw new Error(errors.map((error) => error.message).join('\n'));
}

writeFileSync('package.json', pkgResult.code, 'utf-8');
writeFileSync('.mise.toml', miseResult.code, 'utf-8');

async function getNodeLtsVersion() {
  return (await axios.get('https://cdn.npmmirror.com/binaries/node/index.json')).data
    .find((v) => v.lts)
    .version.replace('v', '');
}
