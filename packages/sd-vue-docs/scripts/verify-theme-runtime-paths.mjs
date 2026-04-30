import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = path.resolve(import.meta.dirname, '..');

const checks = [
  {
    file: 'src/components/generated/config-provider/theme-mode.vue',
    mustContain: [
      'runtimePayload',
      ':theme="runtimePayload.theme"',
      ':theme-mode="runtimePayload.mode"',
    ],
  },
  {
    file: 'src/components/home/HomeThemePreview.vue',
    mustContain: [
      'buildThemeRuntimePayload',
      'activeRuntimePayload',
      ':theme="activeRuntimePayload.theme"',
      ':theme-mode="activeRuntimePayload.mode"',
      ':inherit-provider="true"',
    ],
  },
  {
    file: 'src/components/theme/ThemeEditorPlayground.vue',
    mustContain: [
      'previewRuntimePayload',
      'buildThemeRuntimePayload',
      ':theme="previewRuntimePayload.theme"',
      ':theme-mode="previewRuntimePayload.mode"',
    ],
  },
];

const failures = [];

for (const check of checks) {
  const absolutePath = path.resolve(rootDir, check.file);
  const content = fs.readFileSync(absolutePath, 'utf8');

  for (const pattern of check.mustContain) {
    if (!content.includes(pattern)) {
      failures.push(`${check.file} missing: ${pattern}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Theme runtime path verification failed.');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Theme runtime path verification passed.');
