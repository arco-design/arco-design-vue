import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(packageRoot, '../..');
const distDir = path.resolve(packageRoot, 'dist');

await mkdir(distDir, { recursive: true });

const packageJsonPath = path.resolve(packageRoot, 'package.json');
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
const publishConfig = packageJson.publishConfig ?? {};

const publishPackageJson = {
  ...packageJson,
  main: publishConfig.main ?? packageJson.main,
  module: publishConfig.module ?? packageJson.module,
  types: publishConfig.types ?? packageJson.types,
  exports: publishConfig.exports ?? packageJson.exports,
  publishConfig: {
    access: publishConfig.access ?? 'public',
  },
};

delete publishPackageJson.scripts;
delete publishPackageJson.devDependencies;

await writeFile(
  path.resolve(distDir, 'package.json'),
  `${JSON.stringify(publishPackageJson, null, 2)}\n`,
);

await cp(path.resolve(packageRoot, 'README.md'), path.resolve(distDir, 'README.md'));
await cp(path.resolve(packageRoot, 'CHANGELOG.md'), path.resolve(distDir, 'CHANGELOG.md'));
await cp(path.resolve(workspaceRoot, 'LICENSE'), path.resolve(distDir, 'LICENSE'));
