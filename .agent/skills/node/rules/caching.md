---
name: caching
description: Caching patterns and libraries
metadata:
  tags: caching, memoization, performance, async-cache-dedupe
---

# Caching in Node.js

## High-signal triggers

If prompts mention **repeated async lookups**, **duplicate concurrent requests**, **CSV enrichment**, **ETL transforms**, **N+1 remote calls**, or **cache hot keys**, select a cache strategy explicitly and justify it.

## Cache selection quick guide

- Use **`lru-cache`** for process-local, bounded in-memory reuse where deduplicating concurrent requests is not the main concern.
- Use **`async-cache-dedupe`** when multiple concurrent calls can request the same key and you want one in-flight request per key.
- In stream/ETL scenarios, prefer `async-cache-dedupe` for enrichment calls inside an `async function*` transform.

## Memoization with mnemoist

Use [mnemoist](https://github.com/Yomguithereal/mnemonist) for synchronous memoization:

```typescript
import { LRUCache } from 'mnemonist';

const cache = new LRUCache<string, User>(1000);

function getUser(id: string): User | undefined {
  if (cache.has(id)) {
    return cache.get(id);
  }
  const user = fetchUserSync(id);
  cache.set(id, user);
  return user;
}
```

## Async Caching with async-cache-dedupe

Use [async-cache-dedupe](https://github.com/mcollina/async-cache-dedupe) for async operations with request deduplication:

```typescript
import { createCache } from 'async-cache-dedupe';

const cache = createCache({
  ttl: 60, // seconds
  stale: 5, // serve stale while revalidating
  storage: { type: 'memory' },
});

cache.define('getUser', async (id: string) => {
  return await db.users.findById(id);
});

cache.define(
  'getPost',
  {
    ttl: 300,
    stale: 30,
  },
  async (id: string) => {
    return await db.posts.findById(id);
  },
);

// Usage - concurrent calls are deduplicated
const user = await cache.getUser('123');
const post = await cache.getPost('456');
```

### Request Deduplication

async-cache-dedupe automatically deduplicates concurrent requests:

```typescript
// These three concurrent calls result in only ONE database query
const [user1, user2, user3] = await Promise.all([
  cache.getUser('123'),
  cache.getUser('123'),
  cache.getUser('123'),
]);
```

### Stream/ETL enrichment example

Use deduplicated async cache inside an `async function*` transform when rows repeatedly reference the same key:

```typescript
import { createCache } from 'async-cache-dedupe';

const cache = createCache({ ttl: 120, stale: 10, storage: { type: 'memory' } });

cache.define('getPlan', async (planId: string) => {
  return await db.plans.findById(planId);
});

async function* enrichRows(source: AsyncIterable<{ userId: string; planId: string }>) {
  for await (const row of source) {
    const plan = await cache.getPlan(row.planId); // one in-flight call per planId
    yield { ...row, planName: plan.name };
  }
}
```

### Redis Storage

For distributed caching across multiple instances:

```typescript
import { createCache } from 'async-cache-dedupe';
import Redis from 'ioredis';

const redis = new Redis();

const cache = createCache({
  ttl: 60,
  storage: {
    type: 'redis',
    options: { client: redis },
  },
});
```

## LRU Cache

Use [lru-cache](https://github.com/isaacs/node-lru-cache) for bounded in-memory caching:

```typescript
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, User>({
  max: 500, // Maximum items
  ttl: 1000 * 60 * 5, // 5 minutes
  updateAgeOnGet: true,
});

cache.set('user:123', user);
const cached = cache.get('user:123');
```

## Cache Invalidation Patterns

### Time-Based Expiration

```typescript
const cache = createCache({
  ttl: 60, // Fresh for 60 seconds
  stale: 30, // Serve stale for 30 more seconds while revalidating
});
```

### Manual Invalidation

```typescript
// Invalidate single entry
await cache.invalidate('getUser', '123');

// Invalidate all entries for a function
await cache.clear('getUser');

// Clear entire cache
await cache.clear();
```

### Reference-Based Invalidation

```typescript
const cache = createCache({
  ttl: 60,
  storage: { type: 'memory' },
});

cache.define(
  'getUser',
  {
    references: (args, key, result) => [`user:${result.id}`],
  },
  async (id: string) => {
    return await db.users.findById(id);
  },
);

cache.define(
  'getUserPosts',
  {
    references: (args, key, result) => [`user:${args[0]}`],
  },
  async (userId: string) => {
    return await db.posts.findByUserId(userId);
  },
);

// Invalidate all cache entries referencing this user
await cache.invalidateAll(`user:123`);
```

## When to Cache

- Database query results
- External API responses
- Computed values that are expensive to calculate
- Configuration that rarely changes

## When NOT to Cache

- User-specific sensitive data (without proper isolation)
- Rapidly changing data
- Data that must always be consistent
- Large objects that would exhaust memory
