#!/usr/bin/env node

const fs = require('fs-extra');

fs.copySync('components/components.d.ts', 'es/components.d.ts', {
  overwrite: true,
});
