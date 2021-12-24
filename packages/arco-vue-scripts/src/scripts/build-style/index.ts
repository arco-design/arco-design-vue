import path from 'path';
import fs from 'fs-extra';
import less from 'less';
import CleanCSS from 'clean-css';
import glob from 'glob';
import { build } from 'vite';
// import ora from 'ora';
import paths from '../../utils/paths';
import config from '../../configs/vite.prod.style';
import lessgen from '../lessgen';

const run = async ({ material }: { material: boolean }) => {
  // 更新index.less文件
  if (!material) {
    lessgen();
  }

  // 拷贝less文件到目标文件，index.less编译生成index.css
  const files = glob.sync('**/*.{less,js}', {
    cwd: paths.resolvePath('components'),
  });

  for (const filename of files) {
    const absolute = paths.resolvePath(`components/${filename}`);
    fs.copySync(absolute, paths.resolvePath(`es/${filename}`));
    fs.copySync(absolute, paths.resolvePath(`lib/${filename}`));

    if (/index\.less$/.test(filename)) {
      console.log(`building ${filename}`);

      const lessContent = fs.readFileSync(absolute, 'utf8');
      less.render(
        lessContent,
        {
          filename,
          paths: [
            paths.resolvePath(`components/${path.dirname(filename)}`),
            paths.root,
          ],
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else if (result && result.css) {
            const cssFilename = filename.replace('.less', '.css');
            fs.writeFileSync(
              paths.resolvePath(`es/${cssFilename}`),
              result.css
            );
            fs.writeFileSync(
              paths.resolvePath(`lib/${cssFilename}`),
              result.css
            );
            console.log(`${filename} build success`);
          }
        }
      );
    }
  }

  // 拷贝并编译less入口文件
  console.log('build target css');
  const indexLessPath = paths.resolvePath('components/index.less');
  fs.copySync(indexLessPath, paths.resolvePath('es/index.less'));
  fs.copySync(indexLessPath, paths.resolvePath('lib/index.less'));

  const indexLess = fs.readFileSync(indexLessPath, 'utf8');
  const result = await less.render(indexLess, {
    paths: [paths.components],
  });

  fs.ensureDirSync(paths.resolvePath('dist'));

  fs.writeFileSync(
    paths.resolvePath(material ? 'dist/index.less' : 'dist/arco.less'),
    "@import '../es/index.less';\n\n"
  );

  fs.writeFileSync(
    paths.resolvePath(material ? 'dist/index.css' : 'dist/arco.css'),
    result.css
  );

  const compress = new CleanCSS().minify(result.css);

  fs.writeFileSync(
    paths.resolvePath(material ? 'dist/index.min.css' : 'dist/arco.min.css'),
    compress.styles
  );

  console.log(`target build success`);

  // 构建style/index.ts
  const indexFiles = glob.sync('components/**/style/index.ts', {
    cwd: paths.root,
  });

  const rollupInput = indexFiles.reduce((pre, cur) => {
    pre[cur.slice(11, -3)] = cur;
    return pre;
  }, {} as any);

  const buildIndex = async () => {
    if (config?.build?.rollupOptions) {
      config.build.rollupOptions.input = rollupInput;
    }

    await build(config);
  };

  await buildIndex();
};

export default run;
