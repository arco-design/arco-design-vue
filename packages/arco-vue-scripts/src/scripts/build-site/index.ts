import { build } from 'vite';
import config from '../../configs/vite.site.prod';

async function run() {
  await build(config);
}

export default run;
