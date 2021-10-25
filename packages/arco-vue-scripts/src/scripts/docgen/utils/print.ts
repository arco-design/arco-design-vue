import chalk from 'chalk';

type LogLevelType = 'info' | 'warn' | 'success' | 'error';

function log(...args: unknown[]) {
  console.log(...args);
}

function print(color: string, ...args: any) {
  if (args.length > 1) {
    log(
      (chalk as any)[`bg${color.replace(/^\w/, (w) => w.toUpperCase())}`](
        ` ${args[0]} `
      ),
      (chalk as any)[color](args.slice(1))
    );
  } else {
    log((chalk as any)[color](...args));
  }
}

log.info = print.bind(null, 'gray');
log.warn = print.bind(null, 'yellow');
log.error = print.bind(null, 'red');
log.success = print.bind(null, 'green');
log.chalk = chalk;

/**
 * 打印分割线
 * @param {'info' | 'warn' | 'success' | 'error'} level
 */
log.divider = (level: LogLevelType = 'info') => {
  const logger = log[level] || log.info;
  logger(
    '---------------------------------------------------------------------------------------'
  );
};

export default log;
