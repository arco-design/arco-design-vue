import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import paths from '../../utils/paths';

const lessgen = () => {
  let lessContent = `@import './style/index.less';\n@import './trigger/style/index.less';\n`;
  const lessFiles = glob.sync('**/style/index.less', {
    cwd: paths.components,
    ignore: ['style/index.less', 'trigger/style/index.less'],
  });
  lessFiles.forEach((value) => {
    lessContent += `@import './${value}';\n`;
  });

  fs.outputFileSync(path.resolve(paths.components, 'index.less'), lessContent);

  console.log('generate index.less success');
};

export default lessgen;
