import { createServer } from 'vite';
import config from '../../configs/vite.site.dev';

async function run() {
  const server = await createServer(config);
  await server.listen();
}

export default run;
