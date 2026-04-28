import path from 'path';
import { spawn } from 'child_process';

export default async (components: string[], options: string[]) => {
  const componentPatterns = components.map((item) => `components/${item}`);
  const args = [
    'run',
    '--config',
    path.resolve(process.cwd(), 'vitest.config.ts'),
    ...options,
    ...componentPatterns,
  ];

  await new Promise<void>((resolve, reject) => {
    const cp = spawn('vitest', args, {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd(),
    });

    cp.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Vitest exited with code ${code ?? -1}`));
      }
    });

    cp.on('error', reject);
  });
};
