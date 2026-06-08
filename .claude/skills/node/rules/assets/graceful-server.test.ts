import assert from 'node:assert/strict';
import { createServer, IncomingMessage, ServerResponse, Server } from 'node:http';
import { describe, it, before, after } from 'node:test';

describe('graceful server shutdown', () => {
  let server: Server;
  let isShuttingDown = false;

  function createHandler() {
    return (req: IncomingMessage, res: ServerResponse) => {
      if (isShuttingDown) {
        res.setHeader('Connection', 'close');
      }

      if (req.url === '/health') {
        if (isShuttingDown) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'shutting_down' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Hello, World!' }));
    };
  }

  before(() => {
    server = createServer(createHandler());
    server.listen(0); // Random available port
  });

  after(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  function getPort(): number {
    const address = server.address();
    if (typeof address === 'object' && address !== null) {
      return address.port;
    }
    throw new Error('Server not listening');
  }

  it('should return healthy status when not shutting down', async () => {
    const port = getPort();
    const response = await fetch(`http://localhost:${port}/health`);

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body, { status: 'healthy' });
  });

  it('should return 503 and shutting_down status during shutdown', async () => {
    isShuttingDown = true;
    const port = getPort();

    const response = await fetch(`http://localhost:${port}/health`);

    assert.equal(response.status, 503);
    const body = await response.json();
    assert.deepEqual(body, { status: 'shutting_down' });

    isShuttingDown = false; // Reset for other tests
  });

  it('should set Connection: close header during shutdown', async () => {
    isShuttingDown = true;
    const port = getPort();

    const response = await fetch(`http://localhost:${port}/`);

    assert.equal(response.headers.get('connection'), 'close');

    isShuttingDown = false;
  });

  it('should not set Connection: close header when not shutting down', async () => {
    const port = getPort();

    const response = await fetch(`http://localhost:${port}/`);

    assert.notEqual(response.headers.get('connection'), 'close');
  });
});
