---
name: typescript
description: TypeScript configuration and type stripping in Node.js
metadata:
  tags: typescript, type-stripping, ts-node, configuration
---

# TypeScript in Node.js

## Use Type Stripping

Node.js 22.6+ supports running TypeScript files directly by stripping types at runtime. In Node.js 23.6+ and 24+, type stripping is enabled by default.

### node.js 20.x and 22.x

Enable with the experimental flag:

```bash
node --experimental-strip-types app.ts
```

### Node.js 22.19+, 23.6+ and 24+

TypeScript files run directly without flags:

```bash
node app.ts
```

## Type Stripping Requirements

Type stripping works by removing type annotations without transforming code. Your TypeScript must follow these rules:

### Use Type-Only Imports

Always use `type` keyword for type imports:

```typescript
// GOOD - type-only import
import type { User, Config } from './types.ts';
import { createUser } from './user.ts';

// GOOD - inline type imports
import { createUser, type User } from './user.ts';

// BAD - may fail with type stripping
import { User, createUser } from './user.ts';
```

### No Enums

Enums require code transformation. Use const objects instead:

```typescript
// BAD - enums don't work with type stripping
enum Status {
  Active = 'active',
  Inactive = 'inactive',
}

// GOOD - const object with type
const Status = {
  Active: 'active',
  Inactive: 'inactive',
} as const;

type Status = (typeof Status)[keyof typeof Status];
```

### No Namespaces

Namespaces require transformation:

```typescript
// BAD - namespaces don't work
namespace Utils {
  export function format(s: string): string {
    return s.trim();
  }
}

// GOOD - use modules
export function format(s: string): string {
  return s.trim();
}
```

### No Constructor Parameter Properties

Parameter properties require transformation:

```typescript
// BAD - parameter properties don't work
class User {
  constructor(
    public name: string,
    private age: number,
  ) {}
}

// GOOD - explicit property declaration
class User {
  name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### No Legacy Decorators

Use the TC39 decorator syntax (stage 3):

```typescript
// BAD - legacy/experimental decorators
@Injectable()
class Service {}

// Decorators support depends on Node.js version
// Check compatibility before using
```

## File Extensions

Use `.ts` extensions in imports. TypeScript will rewrite them to `.js` during build:

```typescript
// GOOD - .ts extension (works with type stripping, rewritten during build)
import { helper } from './helper.ts';
import type { Config } from './types.ts';

// JSON imports
import config from './config.json' with { type: 'json' };
```

## tsconfig.json for Development

Configure TypeScript for development with type stripping:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "lib": ["ES2022"],
    "types": ["node"]
  },
  "include": ["src/**/*.ts", "test/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Key options:

- `noEmit`: No compilation, Node.js runs TypeScript directly
- `allowImportingTsExtensions`: Allow `.ts` imports
- `verbatimModuleSyntax`: Enforces type-only imports
- `isolatedModules`: Ensures compatibility with type stripping

## tsconfig.build.json for Publishing

Create a separate config for building distributable packages:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "lib": ["ES2022"],
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "test"]
}
```

Key build options:

- `rewriteRelativeImportExtensions`: Rewrites `.ts` imports to `.js` in output
- `declaration`: Generates `.d.ts` type declaration files
- `declarationMap`: Generates source maps for declarations
- `outDir`: Output directory for compiled files

## Running Tests

Use the built-in test runner with TypeScript:

```bash
# Node.js 22.19+/23.6+/24+
node --test test/*.test.ts
```

## Building for Distribution

Use `tsc` with the build config for publishing packages:

```bash
# Build with tsc
tsc -p tsconfig.build.json
```

## package.json Configuration

Configure package.json for ESM with TypeScript:

```json
{
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "clean": "rm -rf dist",
    "prepublishOnly": "npm run clean && npm run build",
    "test": "node --test test/*.test.ts",
    "typecheck": "tsc --noEmit"
  },
  "engines": {
    "node": ">=22.6.0"
  }
}
```

## Development Workflow

Run type checking separately since type stripping doesn't validate types:

```bash
# Check types without emitting
tsc --noEmit

# Watch mode for development
tsc --noEmit --watch
```
