#!/usr/bin/env node
/* eslint-disable no-console -- CLI 脚本，需要向终端输出 */
/**
 * 类型检查门禁
 *
 * 运行 vue-tsc 对整个包做类型检查，有任何错误即失败（零错误硬门禁）。
 *
 * 用法：
 *   node scripts/typecheck.mjs
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tsconfigFile = 'tsconfig.typecheck.json';

// icon 源码由 icongen 生成，缺失时先给出明确提示，
// 否则会看到一片 "Cannot find module"
if (!fs.existsSync(path.join(root, 'components/icon/index.ts'))) {
  console.error(
    '[typecheck] 未找到 components/icon（由 icongen 生成），请先执行：pnpm run init'
  );
  process.exit(1);
}

const binName = process.platform === 'win32' ? 'vue-tsc.CMD' : 'vue-tsc';
const localBin = path.join(root, 'node_modules', '.bin', binName);
const command = fs.existsSync(localBin) ? `"${localBin}"` : 'vue-tsc';

// Windows 下 .CMD 需要经由 shell 执行；这里把参数拼成一条命令，避免
// Node 关于 "shell: true 且传 args" 的弃用告警
const result = spawnSync(
  `${command} --noEmit --pretty false -p ${tsconfigFile}`,
  {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: process.env.NODE_OPTIONS ?? '--max-old-space-size=6144',
    },
  }
);

if (result.error) {
  console.error('[typecheck] 无法运行 vue-tsc：', result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error('[typecheck] ✗ 存在类型错误');
  process.exit(result.status ?? 1);
}

console.log('[typecheck] ✓ 通过');
