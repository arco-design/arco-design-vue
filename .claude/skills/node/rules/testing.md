---
name: testing
description: Testing strategies for Node.js applications
metadata:
  tags: testing, unit-tests, integration-tests, mocking, node-test
---

# Testing in Node.js

## Node.js Built-in Test Runner

Use the built-in test runner (Node.js 22+):

```typescript
import { describe, it, before, after } from 'node:test';

describe('UserService', () => {
  let service: UserService;

  before(() => {
    service = new UserService();
  });

  it('should create a user', async (t) => {
    const user = await service.create({ name: 'John' });
    t.assert.equal(user.name, 'John');
    t.assert.ok(user.id);
  });

  it('should throw on invalid input', async (t) => {
    await t.assert.rejects(() => service.create({ name: '' }), { message: 'Name is required' });
  });
});
```

## Mocking with Test Context

Use the test context `t.mock` for mocking:

```typescript
import { describe, it } from 'node:test';

describe('EmailService', () => {
  it('should send email via provider', async (t) => {
    const sendMock = t.mock.fn(async () => ({ success: true }));
    const provider = { send: sendMock };
    const service = new EmailService(provider);

    await service.sendWelcome('user@example.com');

    t.assert.equal(sendMock.mock.calls.length, 1);
    t.assert.deepEqual(sendMock.mock.calls[0].arguments, ['user@example.com', 'Welcome!']);
  });
});
```

### Mocking Methods

```typescript
import { describe, it } from 'node:test';

describe('UserController', () => {
  it('should fetch user from API', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      json: async () => ({ id: '1', name: 'John' }),
    }));

    const user = await fetchUser('1');
    t.assert.equal(user.name, 'John');
  });
});
```

## Test Organization

Structure tests alongside source files:

```
src/
  user/
    user.service.ts
    user.service.test.ts
    user.repository.ts
    user.repository.test.ts
```

## Snapshot Testing

Use snapshots for complex outputs:

```typescript
import { describe, it } from 'node:test';

describe('ReportGenerator', () => {
  it('should generate expected report', async (t) => {
    const report = await generateReport(sampleData);
    t.assert.snapshot(report);
  });
});
```

## Test Hooks for Setup/Teardown

Use lifecycle hooks properly:

```typescript
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';

describe('Database tests', () => {
  let db: Database;

  before(async () => {
    db = await Database.connect(testConfig);
  });

  after(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    await db.beginTransaction();
  });

  afterEach(async () => {
    await db.rollback();
  });

  it('should insert record', async (t) => {
    await db.insert({ name: 'test' });
    const records = await db.findAll();
    t.assert.equal(records.length, 1);
  });
});
```

## Isolation and Independence

Tests must be independent and not share state:

```typescript
// BAD - shared mutable state
let counter = 0;

it('test 1', (t) => {
  counter++;
  t.assert.equal(counter, 1);
});

it('test 2', (t) => {
  counter++;
  t.assert.equal(counter, 2); // Depends on test 1
});

// GOOD - isolated state
it('test 1', (t) => {
  let counter = 0;
  counter++;
  t.assert.equal(counter, 1);
});

it('test 2', (t) => {
  let counter = 0;
  counter++;
  t.assert.equal(counter, 1);
});
```

## EventEmitter Timing in Tests

When testing `EventEmitter` behavior, always register listeners before triggering the action that emits events.

If you call `emit()` before `on()`, `once()`, or `events.once(...)` is attached, the event is lost and the test may hang or fail intermittently.

```typescript
import { EventEmitter, once } from 'node:events';

it('waits for ready event', async (t) => {
  const emitter = new EventEmitter();

  // GOOD: subscribe first
  const readyPromise = once(emitter, 'ready');

  startWorkThatEmitsReady(emitter);

  const [payload] = await readyPromise;
  t.assert.equal(payload.status, 'ok');
});
```

This ordering is critical for reliable tests and avoiding flaky race conditions.

## Running Tests

Run tests with the built-in runner:

```bash
# Run all tests
node --test

# Run specific file
node --test src/user/user.service.test.ts

# With TypeScript (Node.js 22.6+)
node --test src/**/*.test.ts

# With coverage
node --test --experimental-test-coverage

# Watch mode
node --test --watch
```
