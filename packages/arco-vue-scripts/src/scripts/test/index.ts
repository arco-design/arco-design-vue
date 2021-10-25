import { run } from 'jest';
import jestConfig from '../../configs/jest.config';
import { getUserConfig } from '../../utils/config';

export default async (components: string[], options: string[]) => {
  const userConfig = await getUserConfig('jest.config.js');

  const collectCoverageFrom =
    components.length > 0
      ? components.map((item) => `components/${item}/**/*.{vue,tsx,ts}`)
      : ['components/**/*.{vue,tsx,ts}'];

  const baseConfig = jestConfig(collectCoverageFrom);

  const mergedConfig = userConfig?.(baseConfig) ?? baseConfig;

  await run(['--config', JSON.stringify(mergedConfig), ...options]);
};
