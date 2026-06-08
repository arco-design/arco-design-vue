---
name: graceful-shutdown
description: Graceful shutdown and signal handling
metadata:
  tags: shutdown, signals, cleanup, health-checks, close-with-grace
---

# Graceful Shutdown in Node.js

## Use close-with-grace

Always use [close-with-grace](https://github.com/fastify/close-with-grace) for handling graceful shutdowns:

```typescript
import closeWithGrace from 'close-with-grace';

closeWithGrace({ delay: 10000 }, async ({ signal, err }) => {
  if (err) {
    console.error('Error triggered shutdown:', err);
  }
  console.log(`Received ${signal}, shutting down...`);

  await server.close();
  await db.end();
});
```

## HTTP Server Shutdown

Close HTTP servers gracefully with close-with-grace:

```typescript
import { createServer } from 'node:http';
import closeWithGrace from 'close-with-grace';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

closeWithGrace({ delay: 10000 }, async ({ signal, err }) => {
  if (err) {
    console.error('Shutdown error:', err);
  }
  console.log(`${signal} received, closing server...`);

  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });

  console.log('Server closed');
});
```

## Fastify Integration

Fastify has built-in close-with-grace support:

```typescript
import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

// Fastify automatically handles graceful shutdown
// Just register your cleanup in onClose hooks

app.addHook('onClose', async () => {
  await db.end();
  await cache.quit();
});

await app.listen({ port: 3000 });
```

## Multiple Resources Cleanup

Clean up multiple resources in order:

```typescript
import closeWithGrace from 'close-with-grace';
import { createServer } from 'node:http';

const server = createServer(handler);
const db = await connectDatabase();
const redis = await connectRedis();

server.listen(3000);

closeWithGrace({ delay: 15000 }, async ({ signal, err }) => {
  if (err) {
    console.error('Error:', err);
  }
  console.log(`${signal} received`);

  // Close in reverse order of initialization
  await new Promise<void>((resolve) => server.close(() => resolve()));
  console.log('HTTP server closed');

  await redis.quit();
  console.log('Redis connection closed');

  await db.end();
  console.log('Database connection closed');
});
```

## Health Checks

Implement health checks that respect shutdown state:

```typescript
import closeWithGrace from 'close-with-grace';

let isShuttingDown = false;

function healthHandler(req: Request, res: Response) {
  if (isShuttingDown) {
    return res.status(503).json({ status: 'shutting_down' });
  }
  return res.json({ status: 'healthy' });
}

function readinessHandler(req: Request, res: Response) {
  if (isShuttingDown) {
    return res.status(503).json({ ready: false });
  }
  return res.json({ ready: true });
}

closeWithGrace({ delay: 10000 }, async ({ signal }) => {
  isShuttingDown = true;
  console.log(`${signal} received, marked as shutting down`);

  // Wait for load balancer to stop sending traffic
  await new Promise((r) => setTimeout(r, 5000));

  await cleanup();
});
```

## Custom Delay for Kubernetes

Use appropriate delays for container orchestration:

```typescript
import closeWithGrace from 'close-with-grace';

// Kubernetes sends SIGTERM, then waits terminationGracePeriodSeconds (default 30s)
// Set delay slightly lower to ensure clean exit
closeWithGrace({ delay: 25000 }, async ({ signal }) => {
  console.log(`${signal} received`);

  // Mark as not ready immediately
  isShuttingDown = true;

  // Wait for in-flight requests (k8s stops sending new traffic after SIGTERM)
  await new Promise((r) => setTimeout(r, 5000));

  // Close resources
  await server.close();
  await db.end();
});
```

## Manual Signal Handling (when close-with-grace is not available)

If you cannot use close-with-grace, handle signals manually:

```typescript
const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];
let isShuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`${signal} received, shutting down...`);

  const timeout = setTimeout(() => {
    console.error('Shutdown timeout, forcing exit');
    process.exit(1);
  }, 10000);

  try {
    await cleanup();
    clearTimeout(timeout);
    process.exit(0);
  } catch (error) {
    console.error('Shutdown error:', error);
    clearTimeout(timeout);
    process.exit(1);
  }
}

for (const signal of signals) {
  process.on(signal, () => shutdown(signal));
}
```
