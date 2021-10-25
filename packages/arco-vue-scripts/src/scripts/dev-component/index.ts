import ora from 'ora';
import chalk from 'chalk';
import { build, InlineConfig } from 'vite';
import { RollupWatcher } from 'rollup';
import config from '../../configs/vite.dev';

const run = async () => {
  const spinner = ora();
  spinner.start(chalk.cyan('启动组件开发环境...\n'));
  const watcher = (await build(config as InlineConfig)) as RollupWatcher;

  watcher.on('event', async (event) => {
    if (event.code === 'START' || event.code === 'END') {
      spinner.start(chalk.cyan('开始监听文件变化...'));
    } else if (event.code === 'BUNDLE_START') {
      spinner.start(chalk.cyan('检测到文件变化，重新编译文件\n'));
    } else if (event.code === 'BUNDLE_END') {
      console.log(chalk.green('编译完成！\n'));
    } else if (event.code === 'ERROR') {
      console.log(chalk.red('编译失败！\n'));
      console.error(event.error);
    }
  });
};

export default run;
