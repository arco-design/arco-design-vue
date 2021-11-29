import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import less from 'less';
import { build } from 'vite';
import getConfig from '../../configs/vite.material.prod';
import styleConfig from '../../configs/vite.material.style';
import { getUserConfig } from '../../utils/config';
import { getPackage } from '../../utils/get-package';

async function buildLess() {
  try {
    // 存在style.css时，将其移动到css目录
    await fs.access('dist/style.css');

    fs.moveSync('dist/style.css', 'dist/css/index.css');
  } catch {
    // 不存在产物时，通过index.less构建
    const lessContent = fs.readFileSync('src/style/index.less', 'utf8');
    less.render(
      lessContent,
      { paths: [path.resolve(process.cwd(), 'src')] },
      (err, result) => {
        if (err) {
          console.log(err);
        } else if (result && result.css) {
          fs.writeFileSync('dist/css/index.css', result.css);
        }
      }
    );
  }
}

async function buildStyle() {
  fs.ensureDirSync('dist/css');
  await buildLess();
  // 编译less文件入口
  await build(styleConfig);
  // 复制less文件到dist/css目录下
  const lessFiles = glob.sync('src/style/**/*.less');
  for (const file of lessFiles) {
    const filename = file.match(/src\/style\/(.*)/)?.[1];
    fs.copyFileSync(file, `dist/css/${filename}`);
  }
}

async function run(buildInput: string) {
  const packageData = await getPackage();
  const input = packageData.buildInput ?? buildInput;
  const name = packageData.umd?.module ?? 'ArcoMaterial';
  const baseConfig = getConfig({ input, name });
  const userConfig = await getUserConfig('vite.config.js');
  const mergedConfig = userConfig?.(baseConfig) ?? baseConfig;

  await build(mergedConfig);
  await buildStyle();
}

export default run;
