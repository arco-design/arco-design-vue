#!/usr/bin/env node

const fs = require('fs-extra');

fs.copySync('src/vue/template.en-US.njk', 'dist/vue/template.en-US.njk', {
  overwrite: true,
});
fs.copySync('src/vue/template.zh-CN.njk', 'dist/vue/template.zh-CN.njk', {
  overwrite: true,
});
fs.copySync(
  'src/default/template.en-US.njk',
  'dist/default/template.en-US.njk',
  {
    overwrite: true,
  }
);
fs.copySync(
  'src/default/template.zh-CN.njk',
  'dist/default/template.zh-CN.njk',
  {
    overwrite: true,
  }
);
fs.copySync('src/.github', 'dist/.github', {
  overwrite: true,
});
fs.copySync('src/.gitlab', 'dist/.gitlab', {
  overwrite: true,
});
