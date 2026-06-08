---
name: profiling
description: Profiling and benchmarking tools
metadata:
  tags: profiling, benchmarking, performance, flame-graphs
---

# Profiling in Node.js

## Flame Graphs with @platformatic/flame

Use [@platformatic/flame](https://github.com/platformatic/flame) for CPU profiling with flame graph visualization:

```bash
npx @platformatic/flame app.ts
```

This starts your application with profiling enabled and generates an interactive flame graph.

### Markdown Output for AI Analysis

flame can output markdown reports suitable for AI-assisted performance analysis:

```bash
npx @platformatic/flame --output markdown app.ts
```

This enables a fully agentic workflow where you can:

1. Profile your application
2. Get markdown output describing hotspots
3. Feed the report to an AI assistant for optimization suggestions

### Programmatic Usage

```typescript
import { profile } from '@platformatic/flame';

const stop = await profile({
  outputFile: 'profile.html',
});

// Run your workload
await runBenchmark();

await stop();
```

## Load Testing Tools

### autocannon

Use [autocannon](https://github.com/mcollina/autocannon) for HTTP benchmarking:

```bash
# Basic benchmark
npx autocannon http://localhost:3000

# With options
npx autocannon -c 100 -d 30 -p 10 http://localhost:3000

# POST request with body
npx autocannon -m POST -H "Content-Type: application/json" -b '{"name":"test"}' http://localhost:3000/users
```

Options:

- `-c` - Number of concurrent connections (default: 10)
- `-d` - Duration in seconds (default: 10)
- `-p` - Number of pipelined requests (default: 1)
- `-m` - HTTP method
- `-b` - Request body

### Programmatic autocannon

```typescript
import autocannon from 'autocannon';

const result = await autocannon({
  url: 'http://localhost:3000',
  connections: 100,
  duration: 30,
  pipelining: 10,
});

console.log(autocannon.printResult(result));
```

### wrk

[wrk](https://github.com/wg/wrk) is a high-performance HTTP benchmarking tool:

```bash
# Basic benchmark
wrk -t12 -c400 -d30s http://localhost:3000

# With Lua script for custom requests
wrk -t12 -c400 -d30s -s post.lua http://localhost:3000
```

Options:

- `-t` - Number of threads
- `-c` - Number of connections
- `-d` - Duration
- `-s` - Lua script for custom logic

### k6

[k6](https://k6.io/) is ideal for complex load testing scenarios:

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:3000');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
```

```bash
k6 run load-test.js
```

## Built-in Node.js Profiling

### CPU Profiling

```bash
# Generate V8 profiling log
node --prof app.js

# Process the log
node --prof-process isolate-*.log > profile.txt
```

### Heap Snapshots

```bash
# Start with inspector
node --inspect app.js

# Then use Chrome DevTools (chrome://inspect) to:
# - Take heap snapshots
# - Record allocation timelines
# - Find memory leaks
```

### Diagnostic Reports

```bash
# Generate report on signal
node --report-on-signal app.js
kill -SIGUSR2 <pid>

# Generate report on uncaught exception
node --report-on-fatalerror app.js
```

## Profiling Workflow

1. **Establish baseline** - Run autocannon to get initial metrics
2. **Profile** - Use @platformatic/flame to identify hotspots
3. **Optimize** - Fix the identified bottlenecks
4. **Verify** - Run autocannon again to measure improvement
5. **Repeat** - Continue until performance goals are met

## Tool Comparison

| Tool                | Best For                                             |
| ------------------- | ---------------------------------------------------- |
| @platformatic/flame | CPU profiling, flame graphs, AI-assisted analysis    |
| autocannon          | Quick HTTP benchmarks, Node.js native                |
| wrk                 | Maximum throughput testing                           |
| k6                  | Complex scenarios, CI/CD integration, scripted tests |
