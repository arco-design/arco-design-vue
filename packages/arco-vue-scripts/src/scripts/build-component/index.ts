import fs from 'fs-extra';
import path from 'path';
import { build } from 'vite';
import config from '../../configs/vite.prod';
import getUmdConfig from '../../configs/vite.prod.umd';

async function run({ umd = false }) {
  await fs.emptyDir(path.resolve(process.cwd(), 'es'));
  await fs.emptyDir(path.resolve(process.cwd(), 'lib'));
  await build(config);
  await fs.copy(
    path.resolve(process.cwd(), 'components/icon/@types/icon'),
    path.resolve(process.cwd(), 'es/icon'),
    {
      overwrite: true,
    }
  );

  if (umd) {
    await fs.emptyDir(path.resolve(process.cwd(), 'dist'));
    await build(getUmdConfig('component'));
    await build(getUmdConfig('icon'));
  }
}

export default run;
