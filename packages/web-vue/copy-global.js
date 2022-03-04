#!/usr/bin/env node

const fs = require('fs-extra');

fs.copySync(
  'global.d.ts',
  'es/global.d.ts',
  {
    overwrite: true,
  }
);
