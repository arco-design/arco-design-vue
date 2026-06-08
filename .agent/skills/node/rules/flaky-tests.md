---
name: flaky-tests
description: Identifying and diagnosing flaky tests with node:test
metadata:
  tags: testing, flaky-tests, node-test, debugging, ci
---

# Identifying and Diagnosing Flaky Tests

Flaky tests are tests that pass or fail intermittently without code changes. They erode trust in the test suite and waste debugging time. This guide helps identify root causes and fix them.

## Identifying Which Test/File is Timing Out

When tests timeout, use these techniques to identify the culprit:

### 1. Use --test-reporter for Detailed Output

```bash
# Show each test as it runs (tap format shows test file and name)
node --test --test-reporter=tap

# Use spec reporter for hierarchical view
node --test --test-reporter=spec

# Run with verbose output to see which test hangs
node --test --test-reporter=spec 2>&1 | tee test-output.log
```

### 2. Run Tests with Timeout Tracking

```bash
# Set a global timeout and see which test exceeds it
node --test --test-timeout=5000

# The error message will include the test name and file:
# Error: test timed out after 5000ms
#     at /path/to/test.ts:42:5
```

### 3. Run Individual Test Files

```bash
# Isolate by running files one at a time
for f in src/**/*.test.ts; do
  echo "Running: $f"
  timeout 30s node --test "$f" || echo "TIMEOUT or FAIL: $f"
done
```

### 4. Add Diagnostic Logging to Test Hooks

```typescript
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';

describe('MyTests', () => {
  before(() => console.log('[BEFORE] MyTests starting'));
  after(() => console.log('[AFTER] MyTests complete'));
  beforeEach((t) => console.log(`[BEFORE EACH] Starting: ${t.name}`));
  afterEach((t) => console.log(`[AFTER EACH] Finished: ${t.name}`));

  it('test 1', () => {
    /* ... */
  });
  it('test 2', () => {
    /* ... */
  });
});
```

### 5. Check for Hanging Async Operations

```bash
# Use --inspect to debug hanging tests
node --inspect --test src/hanging.test.ts

# Then connect Chrome DevTools to chrome://inspect
# Check the "Async" call stack to see what's pending
```

### 6. Use wtfnode to Find Open Handles

```typescript
import { describe, it, after } from 'node:test';
import wtfnode from 'wtfnode';

describe('Debug hanging tests', () => {
  after(() => {
    // Dump what's keeping Node.js alive
    wtfnode.dump();
  });

  it('might hang', async () => {
    // Your test
  });
});
```

## Common Causes of Flaky Tests

### 1. Timing and Race Conditions

**Symptom**: Test passes locally but fails in CI, or fails randomly.

```typescript
// BAD - Race condition with setTimeout
it('should process after delay', async (t) => {
  let processed = false;
  processAsync(() => {
    processed = true;
  });

  await new Promise((resolve) => setTimeout(resolve, 100));
  t.assert.equal(processed, true); // May fail if processing takes > 100ms
});

// GOOD - Wait for the actual condition
it('should process after delay', async (t) => {
  const result = await processAsync();
  t.assert.equal(result.processed, true);
});
```

### 2. Uncontrolled Time Dependencies

**Symptom**: Tests fail around midnight, month boundaries, or in different timezones.

```typescript
// BAD - Depends on current time
it('should format today', (t) => {
  const result = formatDate(new Date());
  t.assert.equal(result, '2024-01-15'); // Fails tomorrow
});

// GOOD - Use fixed dates or mock time
it('should format date', (t) => {
  const fixedDate = new Date('2024-01-15T12:00:00Z');
  const result = formatDate(fixedDate);
  t.assert.equal(result, '2024-01-15');
});

// GOOD - Mock Date with node:test
it('should format today', (t) => {
  t.mock.timers.enable({ apis: ['Date'] });
  t.mock.timers.setTime(new Date('2024-01-15T12:00:00Z').getTime());

  const result = formatDate(new Date());
  t.assert.equal(result, '2024-01-15');
});
```

### 3. Port Conflicts

**Symptom**: "EADDRINUSE" errors, tests fail when run in parallel.

```typescript
// BAD - Hardcoded port
it('should start server', async (t) => {
  const server = await startServer({ port: 3000 }); // Conflicts with other tests
  // ...
});

// GOOD - Use dynamic port (port 0)
it('should start server', async (t) => {
  const server = await startServer({ port: 0 });
  const address = server.address();
  const port = address.port; // OS assigns available port
  // ...
});
```

### 4. Shared State Between Tests

**Symptom**: Tests pass individually but fail when run together.

```typescript
// BAD - Module-level state persists between tests
let cache = new Map();

it('test 1', (t) => {
  cache.set('key', 'value1');
  t.assert.equal(cache.get('key'), 'value1');
});

it('test 2', (t) => {
  t.assert.equal(cache.get('key'), undefined); // FAILS - still has 'value1'
});

// GOOD - Reset state in beforeEach or use test-scoped state
describe('cache tests', () => {
  let cache;

  beforeEach(() => {
    cache = new Map();
  });

  it('test 1', (t) => {
    cache.set('key', 'value1');
    t.assert.equal(cache.get('key'), 'value1');
  });

  it('test 2', (t) => {
    t.assert.equal(cache.get('key'), undefined); // PASSES
  });
});
```

### 5. Test Order Dependencies

**Symptom**: Tests pass with `--test` but fail with `--test --parallel`.

```typescript
// BAD - Test 2 depends on side effect from Test 1
it('test 1: create user', async (t) => {
  await db.insert({ id: 1, name: 'John' });
  t.assert.ok(true);
});

it('test 2: find user', async (t) => {
  const user = await db.findById(1); // Fails if test 1 didn't run first
  t.assert.equal(user.name, 'John');
});

// GOOD - Each test sets up its own data
it('test 2: find user', async (t) => {
  await db.insert({ id: 1, name: 'John' }); // Setup within test
  const user = await db.findById(1);
  t.assert.equal(user.name, 'John');
});
```

### 6. Unhandled Promise Rejections

**Symptom**: Test appears to pass but process exits with error, or random failures.

```typescript
// BAD - Fire-and-forget async operation
it('should send notification', async (t) => {
  sendNotification(user); // Not awaited - may reject after test ends
  t.assert.ok(true);
});

// GOOD - Await all async operations
it('should send notification', async (t) => {
  await sendNotification(user);
  t.assert.ok(true);
});
```

### 7. Resource Cleanup Failures

**Symptom**: Tests fail with "too many open files" or connections exhausted.

```typescript
// BAD - Resources not cleaned up
it('should read file', async (t) => {
  const handle = await fs.open('test.txt');
  const content = await handle.read();
  t.assert.ok(content);
  // handle never closed!
});

// GOOD - Always clean up resources
it('should read file', async (t) => {
  const handle = await fs.open('test.txt');
  t.after(() => handle.close()); // Cleanup registered

  const content = await handle.read();
  t.assert.ok(content);
});
```

## Debugging Strategies

### 1. Run Tests in Isolation

```bash
# Run single test file
node --test src/user.test.ts

# Run single test by name
node --test --test-name-pattern="should create user" src/user.test.ts
```

### 2. Increase Concurrency to Expose Race Conditions

```bash
# Run with high concurrency to surface race conditions
node --test --test-concurrency=10

# Or run the same test multiple times
for i in {1..50}; do node --test src/flaky.test.ts || echo "Failed on run $i"; done
```

### 3. Use Test Retry to Identify Flaky Tests

```typescript
// Temporarily add retry to identify flaky test
it('potentially flaky test', { retry: 3 }, async (t) => {
  // If this needs retries to pass, it's flaky
});
```

### 4. Add Diagnostic Logging

```typescript
it('flaky test', async (t) => {
  console.log('Test started at:', Date.now());
  console.log('Environment:', process.env.NODE_ENV);

  const result = await operation();
  console.log('Result:', JSON.stringify(result));

  t.assert.ok(result);
});
```

### 5. Check for Async Leaks

```typescript
import { describe, it, after } from 'node:test';

describe('async leak detection', () => {
  const activeHandles = new Set();

  after(() => {
    if (activeHandles.size > 0) {
      console.error('Leaked handles:', [...activeHandles]);
    }
  });

  it('should not leak', async (t) => {
    const timer = setTimeout(() => {}, 10000);
    activeHandles.add(timer);

    // Do test work...

    clearTimeout(timer);
    activeHandles.delete(timer);
  });
});
```

## Prevention Best Practices

### 1. Use Deterministic IDs

```typescript
// BAD - Random IDs make debugging hard
const id = crypto.randomUUID();

// GOOD - Predictable IDs in tests
const id = `test-user-${t.name}`;
```

### 2. Mock External Services

```typescript
it('should fetch user', async (t) => {
  // Mock fetch to avoid network flakiness
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    json: async () => ({ id: '1', name: 'John' }),
  }));

  const user = await fetchUser('1');
  t.assert.equal(user.name, 'John');
});
```

### 3. Use Explicit Waits Instead of Timeouts

```typescript
// BAD - Arbitrary timeout
await new Promise((r) => setTimeout(r, 1000));

// GOOD - Wait for specific condition
await waitFor(() => element.isVisible());

// Helper function
async function waitFor(condition, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await condition()) return;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error('Condition not met within timeout');
}
```

### 4. Ensure Test Isolation with Transactions

```typescript
describe('database tests', () => {
  beforeEach(async () => {
    await db.query('BEGIN');
  });

  afterEach(async () => {
    await db.query('ROLLBACK');
  });

  it('should insert record', async (t) => {
    await db.insert({ name: 'test' });
    const records = await db.findAll();
    t.assert.equal(records.length, 1);
  });
});
```

## CI-Specific Flakiness

### 1. Resource Constraints

CI environments often have less CPU/memory. Add appropriate timeouts:

```typescript
it('heavy computation', { timeout: 30000 }, async (t) => {
  // Longer timeout for CI
  const result = await heavyOperation();
  t.assert.ok(result);
});
```

### 2. Parallel Test Execution

Ensure tests don't conflict when run in parallel:

```bash
# In CI, run with controlled concurrency
node --test --test-concurrency=2
```

### 3. Network Reliability

Mock external APIs in tests to avoid network-related flakiness:

```typescript
// Always mock external HTTP calls in unit tests
t.mock.method(globalThis, 'fetch', async (url) => {
  if (url.includes('api.external.com')) {
    return { ok: true, json: async () => mockData };
  }
  throw new Error(`Unmocked URL: ${url}`);
});
```
