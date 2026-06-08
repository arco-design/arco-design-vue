---
name: node-modules-exploration
description: Navigating and analyzing node_modules directories
metadata:
  tags: node, nodejs, npm, yarn, pnpm, dependencies, packages
---

# Exploring node_modules

## When to Explore node_modules

Explore node_modules when you need to:

- Find specific packages and their versions
- Analyze dependencies and dependency trees
- Examine package contents
- Investigate dependency conflicts
- Understand how a package works internally

## Core Techniques

### Finding Package Versions

```bash
# Check actual installed version
cat node_modules/fastify/package.json | grep '"version"'

# For scoped packages
cat node_modules/@fastify/cors/package.json | grep '"version"'

# List all versions with npm
npm ls fastify
```

### Navigating Directory Structure

```bash
# List package contents
ls node_modules/fastify/

# Find TypeScript definitions
ls node_modules/fastify/*.d.ts
ls node_modules/@types/node/

# Check main entry point
cat node_modules/fastify/package.json | grep '"main"\|"exports"'
```

### Understanding Package Manager Differences

**npm/yarn (node_modules hoisting):**

```
node_modules/
  fastify/
  pino/          # hoisted from fastify's dependencies
  @fastify/cors/
```

**pnpm (content-addressable storage):**

```
node_modules/
  .pnpm/
    fastify@4.0.0/
      node_modules/
        fastify/
        pino/    # symlinked, not hoisted
  fastify -> .pnpm/fastify@4.0.0/node_modules/fastify
```

## Finding Package READMEs

**CRITICAL: Never use `find`, `grep`, or `rg` for locating READMEs. Follow this sequence:**

1. **Direct Read attempts (try in order):**

   ```
   node_modules/[package-name]/README.md
   node_modules/[package-name]/readme.md
   node_modules/[package-name]/README
   ```

   For scoped packages: `node_modules/@scope/package-name/README.md`

2. **If not found, list directory contents:**

   ```bash
   ls node_modules/[package-name]/
   ```

   Look for README files in output, then read the exact filename.

3. **Alternative locations:**
   ```
   node_modules/[package-name]/docs/README.md
   ```
   Or check `readme` field in `package.json`.

## Analyzing Dependency Trees

```bash
# See why a package is installed
npm why lodash

# Full dependency tree
npm ls --all

# Only production dependencies
npm ls --prod

# Find duplicates
npm ls --all 2>&1 | grep -E "^\s+.*@[0-9]" | sort | uniq -d
```

## Investigating Conflicts

### Peer Dependency Issues

```bash
# Check peer dependencies
cat node_modules/some-plugin/package.json | grep -A 10 '"peerDependencies"'

# See what's actually installed vs. what's expected
npm ls react
```

### Duplicate Packages

When the same package appears multiple times:

```bash
# Find all instances of a package
find node_modules -name "package.json" -path "*/lodash/*" 2>/dev/null

# Check for version mismatches
npm ls lodash
```

## Examining Package Internals

### Entry Points

```bash
# Check exports field (modern)
node -e "console.log(JSON.stringify(require('./node_modules/fastify/package.json').exports, null, 2))"

# Check main field (legacy)
cat node_modules/fastify/package.json | grep '"main"'
```

### TypeScript Definitions

```bash
# Find type definitions
ls node_modules/fastify/*.d.ts
cat node_modules/fastify/package.json | grep '"types"\|"typings"'

# For DefinitelyTyped packages
ls node_modules/@types/
```

### Source Files

```bash
# Examine source structure
ls node_modules/fastify/lib/
head -50 node_modules/fastify/lib/server.js
```

## Debugging Module Resolution

```bash
# See how Node.js resolves a module
node -e "console.log(require.resolve('fastify'))"

# With full resolution paths
node --print "require.resolve.paths('fastify')"
```
