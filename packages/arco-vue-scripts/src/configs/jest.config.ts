import { Config } from '@jest/types';
import path from 'path';

const jestConfig = (collectCoverageFrom: string[]): Config.InitialOptions => ({
  transform: {
    '^.+\\.[jt]sx?$': require.resolve('babel-jest'),
    '^.+\\.vue$': require.resolve('vue-jest'),
    // 编译后的目标文件
    '^.+\\.md$': path.resolve(__dirname, '../plugins/md-vue-jest/index.js'),
  },
  collectCoverageFrom: collectCoverageFrom.concat([
    'src/**/*.{vue,tsx,ts}',
    '!components/icon/**/*',
    '!**/style/*',
  ]),
  coverageDirectory: '.coverage',
});

export default jestConfig;
