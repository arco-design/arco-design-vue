#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { changelog } from './index';
import { run } from './copy-github';

const program = new Command();

const packageContent = fs.readFileSync(
  path.resolve(__dirname, '../package.json'),
  'utf8'
);
const packageData: any = JSON.parse(packageContent);

program
  .name('arco-changelog')
  .version(packageData.version)
  .action(async () => {
    await changelog();
  })
  .command('template')
  .option('--gitlab', 'generate gitlab template')
  .action(async ({ gitlab }) => {
    run({ gitlab });
  });

program.parse(process.argv);
