import { spawn } from 'node:child_process';
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const packageRoot = path.resolve(import.meta.dirname, '..');

const resolveFromRoot = (...segments) => path.resolve(packageRoot, ...segments);

await rm(resolveFromRoot('.temp-types'), { recursive: true, force: true });

try {
  await runVueTsc();
  await moveDirectoryContents(resolveFromRoot('.temp-types', 'components'), resolveFromRoot('es'));
} finally {
  await rm(resolveFromRoot('.temp-types'), { recursive: true, force: true });
}

async function runVueTsc() {
  await new Promise((resolve, reject) => {
    const command = process.platform === 'win32' ? (process.env.ComSpec ?? 'cmd.exe') : 'pnpm';
    const args =
      process.platform === 'win32'
        ? ['/d', '/s', '/c', 'pnpm exec vue-tsc -p tsconfig.build.json']
        : ['exec', 'vue-tsc', '-p', 'tsconfig.build.json'];

    const child = spawn(command, args, {
      cwd: packageRoot,
      stdio: 'inherit',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`vue-tsc exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function moveDirectoryContents(sourceDir, targetDir) {
  const entries = await readdir(sourceDir, { withFileTypes: true });

  await mkdir(targetDir, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.resolve(sourceDir, entry.name);
    const targetPath = path.resolve(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    await copyWithRetry(sourcePath, targetPath);
  }
}

async function copyDirectory(sourceDir, targetDir) {
  await mkdir(targetDir, { recursive: true });

  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.resolve(sourceDir, entry.name);
    const targetPath = path.resolve(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    await copyWithRetry(sourcePath, targetPath);
  }
}

async function copyWithRetry(sourcePath, targetPath, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await cp(sourcePath, targetPath, { recursive: false, force: true });
      return;
    } catch (error) {
      const code = error?.code;
      const isRetriable = code === 'ENOENT' || code === 'EPERM' || code === 'EACCES';

      if (!isRetriable || attempt === maxRetries) {
        throw error;
      }

      await wait(50 * attempt);
    }
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
