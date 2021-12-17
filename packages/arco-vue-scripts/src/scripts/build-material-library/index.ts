import fs from 'fs-extra';
import path from 'path';
import { build } from 'vite';
import config from '../../configs/vite.material.library';
import getUmdConfig from '../../configs/vite.material.library.umd';
import { getPackage } from '../../utils/get-package';

async function run() {
  await fs.emptyDir(path.resolve(process.cwd(), 'es'));
  await fs.emptyDir(path.resolve(process.cwd(), 'lib'));
  await build(config);

  const packageData = await getPackage();
  const name = packageData.umd?.module ?? 'ArcoComponents';

  await fs.emptyDir(path.resolve(process.cwd(), 'dist'));
  await build(getUmdConfig({ name }));
}

export default run;
