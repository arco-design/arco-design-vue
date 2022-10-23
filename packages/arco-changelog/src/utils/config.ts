import path from 'path';
import fs from 'fs-extra';

export const getConfig = async () => {
  const filename = path.resolve(process.cwd(), 'changelog.config.ts');
  try {
    await fs.access(filename);
    return import(filename);
  } catch {
    return {};
  }
};
let packageCache: Record<string, any>;

export const getPackage = async (): Promise<Record<string, any>> => {
  if (!packageCache) {
    const content = await fs.readFile(
      path.resolve(process.cwd(), 'package.json'),
      'utf8'
    );
    try {
      packageCache = JSON.parse(content);
    } catch {}
  }

  return packageCache ?? {};
};
