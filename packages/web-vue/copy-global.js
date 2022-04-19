#!/usr/bin/env node

const fs = require('fs-extra');

fs.copySync('components/global.d.ts', 'es/global.d.ts', {
  overwrite: true,
});
