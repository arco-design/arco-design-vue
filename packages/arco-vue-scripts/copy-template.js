#!/usr/bin/env node

const fs = require('fs-extra');

fs.copySync(
  'src/scripts/changelog/template',
  'dist/scripts/changelog/template',
  {
    overwrite: true,
  }
);
