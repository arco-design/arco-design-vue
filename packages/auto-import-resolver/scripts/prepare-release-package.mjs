import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nextVersion = process.argv[2];

if (!nextVersion) {
  throw new Error('Missing release version argument.');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const packageJsonPaths = [
  path.resolve(packageRoot, 'package.json'),
  path.resolve(packageRoot, 'dist/package.json'),
];

for (const packageJsonPath of packageJsonPaths) {
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  packageJson.version = nextVersion;
  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
}

process.stdout.write(`Prepared @sdata/web-vue-auto-import-resolver@${nextVersion}\n`);
