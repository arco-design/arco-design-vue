#!/usr/bin/env node
/**
 * 类型检查门禁（棘轮基线）
 *
 * - 运行 vue-tsc 检查整个包
 * - 按文件统计错误数，与 typecheck-baseline.json 比较
 * - 文件不在基线 / 错误数超过基线 → 失败（阻止新增类型错误）
 * - 错误数下降 → 通过（提示可用 --update 收紧基线）
 *
 * 用法：
 *   node scripts/typecheck.mjs            # 校验
 *   node scripts/typecheck.mjs --update   # 重新生成基线
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baselineFile = path.join(root, 'typecheck-baseline.json');
const tsconfigFile = 'tsconfig.typecheck.json';

// 生成代码，不纳入门禁判定（由 icongen 产出，见 typecheck-baseline.json 的 note）
const IGNORED_PREFIXES = ['components/icon/'];

const update = process.argv.includes('--update');

const normalize = (p) => p.replace(/\\/g, '/');

const readBaseline = () => {
  if (!fs.existsSync(baselineFile)) return {};
  try {
    const data = JSON.parse(fs.readFileSync(baselineFile, 'utf8'));
    return data.files ?? {};
  } catch (e) {
    console.error(`[typecheck] 基线文件解析失败：${baselineFile}`);
    console.error(e.message);
    process.exit(1);
  }
};

const writeBaseline = (files) => {
  const sorted = {};
  for (const key of Object.keys(files).sort()) {
    sorted[key] = files[key];
  }
  const content = {
    version: 1,
    note: '类型检查基线：记录每个文件当前的 TS 错误数。新增错误会让 typecheck 失败；修复后运行 `pnpm run typecheck:update` 收紧。components/icon 为 icongen 生成物，不在此列。',
    files: sorted,
  };
  fs.writeFileSync(baselineFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
};

const runVueTsc = () => {
  // icon 源码是 icongen 生成的，缺失时先给出明确提示，避免看到一片 "Cannot find module"
  if (!fs.existsSync(path.join(root, 'components/icon/index.ts'))) {
    console.error(
      '[typecheck] 未找到 components/icon（由 icongen 生成），请先执行：corepack pnpm run init'
    );
    process.exit(1);
  }

  const binName = process.platform === 'win32' ? 'vue-tsc.CMD' : 'vue-tsc';
  const localBin = path.join(root, 'node_modules', '.bin', binName);
  const command = fs.existsSync(localBin) ? localBin : 'vue-tsc';
  const args = ['--noEmit', '--pretty', 'false', '-p', tsconfigFile];

  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    maxBuffer: 128 * 1024 * 1024,
    env: {
      ...process.env,
      NODE_OPTIONS: process.env.NODE_OPTIONS ?? '--max-old-space-size=6144',
    },
  });

  if (result.error) {
    console.error('[typecheck] 无法运行 vue-tsc：', result.error.message);
    process.exit(1);
  }

  return `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
};

const ERROR_RE = /^(.+?)\((\d+),(\d+)\): error (TS\d+): (.*)$/;

const parseErrors = (output) => {
  const byFile = new Map();
  const details = [];
  let ignored = 0;

  for (const rawLine of output.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = ERROR_RE.exec(line);
    if (!match) continue;

    const file = normalize(match[1]);
    if (IGNORED_PREFIXES.some((prefix) => file.startsWith(prefix))) {
      ignored += 1;
      continue;
    }
    byFile.set(file, (byFile.get(file) ?? 0) + 1);
    details.push(line);
  }

  return { byFile, details, ignored };
};

const { byFile, details, ignored } = parseErrors(runVueTsc());

const total = [...byFile.values()].reduce((sum, n) => sum + n, 0);
const fileCount = byFile.size;

if (ignored > 0) {
  console.log(
    `[typecheck] 已跳过 ${ignored} 个生成文件错误（${IGNORED_PREFIXES.join(', ')}）`
  );
}

if (update) {
  writeBaseline(Object.fromEntries(byFile));
  console.log(
    `[typecheck] 基线已更新：${fileCount} 个文件 / ${total} 个错误 → ${path.relative(
      process.cwd(),
      baselineFile
    )}`
  );
  process.exit(0);
}

const baseline = readBaseline();
const regressions = [];
let fixed = 0;

for (const [file, count] of byFile) {
  const allowed = baseline[file] ?? 0;
  if (count > allowed) {
    regressions.push({ file, count, allowed, extra: count - allowed });
  } else if (count < allowed) {
    fixed += allowed - count;
  }
}

for (const file of Object.keys(baseline)) {
  if (!byFile.has(file)) fixed += baseline[file];
}

if (regressions.length === 0) {
  const remaining = total;
  console.log(
    `[typecheck] ✓ 通过：未新增类型错误（基线剩余 ${fileCount} 个文件 / ${remaining} 个错误）`
  );
  if (fixed > 0) {
    console.log(
      `[typecheck] 本次比基线少了 ${fixed} 个错误，可以运行 \`pnpm run typecheck:update\` 收紧基线`
    );
  }
  process.exit(0);
}

console.error('[typecheck] ✗ 发现新增类型错误：\n');
for (const item of regressions) {
  console.error(`  ${item.file}  ${item.allowed} → ${item.count}（+${item.extra}）`);
}
console.error('\n明细：\n');
for (const line of details) {
  const file = normalize(line.slice(0, line.indexOf('(')));
  const item = regressions.find((r) => r.file === file);
  if (item) console.error(`  ${line}`);
}
console.error(
  '\n修复后重新运行；如果是存量债务确需暂时接受，请说明原因并运行 `pnpm run typecheck:update`。'
);
process.exit(1);
