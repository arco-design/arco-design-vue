---
name: modules
description: ES Modules and CommonJS patterns
metadata:
  tags: modules, esm, commonjs, imports, exports
---

# Node.js Modules

## Prefer ES Modules

Use ES Modules (ESM) for new projects:

```json
// package.json
{
  "type": "module"
}
```

```typescript
// Named exports (preferred)
export function processData(data: Data): Result {
  // ...
}

export const CONFIG = {
  timeout: 5000,
};

// Named imports
import { processData, CONFIG } from './utils.js';
```

## File Extensions in ESM

Always include file extensions in ESM imports:

```typescript
// GOOD - explicit extension
import { helper } from './helper.js';
import config from './config.json' with { type: 'json' };

// BAD - missing extension (works in bundlers but not native ESM)
import { helper } from './helper';
```

## Barrel Exports

Use index files to simplify imports:

```typescript
// src/utils/index.ts
export { formatDate, parseDate } from './date.js';
export { formatCurrency } from './currency.js';
export { validateEmail } from './validation.js';

// Consumer
import { formatDate, formatCurrency } from './utils/index.js';
```

## Default vs Named Exports

Prefer named exports for better refactoring and tree-shaking:

```typescript
// GOOD - named exports
export function createServer(config: Config): Server {
  // ...
}

export function createClient(config: Config): Client {
  // ...
}

// AVOID - default exports
export default function createServer(config: Config): Server {
  // ...
}
```

## Dynamic Imports

Use dynamic imports for code splitting and conditional loading:

```typescript
async function loadPlugin(name: string): Promise<Plugin> {
  const module = await import(`./plugins/${name}.js`);
  return module.default;
}

// Conditional loading
const { default: heavy } = await import('./heavy-module.js');
```

## **dirname and **filename in ESM

Use `import.meta.dirname` and `import.meta.filename` (Node.js 20.11+):

```typescript
import { join } from 'node:path';

const configPath = join(import.meta.dirname, 'config.json');
const currentFile = import.meta.filename;
```
