import path from 'path';

const root = process.cwd();

function resolvePath(...relativePath: any[]) {
  return path.resolve(root, ...relativePath);
}

// components相关
const components = resolvePath('./components');

// icon相关
const icon = resolvePath('./icon');
const iconSvgs = resolvePath('./icon/_svgs');
const iconComponents = resolvePath('./components/icon');

export default {
  resolvePath,
  root,
  icon,
  iconSvgs,
  iconComponents,
  components,
};
