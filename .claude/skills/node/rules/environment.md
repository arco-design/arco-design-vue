---
name: environment
description: Environment configuration and secrets management
metadata:
  tags: environment, configuration, env, secrets
---

# Environment Configuration in Node.js

## Loading Environment Files

Use Node.js built-in `--env-file` flag to load environment variables:

```bash
# Load from .env file
node --env-file=.env app.ts

# Load multiple env files (later files override earlier ones)
node --env-file=.env --env-file=.env.local app.ts
```

### Programmatic API

Load environment files programmatically with `process.loadEnvFile()`:

```typescript
import { loadEnvFile } from 'node:process';

// Load .env from current directory
loadEnvFile();

// Load specific file
loadEnvFile('.env.local');
```

## Environment Variables Validation

### Using env-schema with TypeBox

Use [env-schema](https://github.com/fastify/env-schema) with [TypeBox](https://github.com/sinclairzx81/typebox) for type-safe environment validation:

```typescript
import { envSchema } from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  DATABASE_URL: Type.String(),
  API_KEY: Type.String({ minLength: 1 }),
  LOG_LEVEL: Type.Union(
    [Type.Literal('debug'), Type.Literal('info'), Type.Literal('warn'), Type.Literal('error')],
    { default: 'info' },
  ),
});

type Env = Static<typeof schema>;

export const env = envSchema<Env>({ schema });
```

### Using Zod

Alternatively, use [Zod](https://github.com/colinhacks/zod) for validation:

```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(1),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

type Env = z.infer<typeof EnvSchema>;

function loadEnv(): Env {
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables:');
    console.error(result.error.format());
    process.exit(1);
  }

  return result.data;
}

export const env = loadEnv();
```

## Avoid NODE_ENV

`NODE_ENV` is an antipattern. It conflates multiple concerns into a single variable:

- **Environment detection** (development vs production vs staging)
- **Behavior toggling** (verbose logging, debug features)
- **Optimization flags** (minification, caching)
- **Security settings** (strict validation, HTTPS)

This leads to problems:

```typescript
// BAD - NODE_ENV conflates concerns
if (process.env.NODE_ENV === 'development') {
  enableDebugLogging(); // logging concern
  disableRateLimiting(); // security concern
  useMockDatabase(); // infrastructure concern
}
```

Instead, use explicit environment variables for each concern:

```typescript
// GOOD - explicit variables for each concern
const config = {
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    pretty: process.env.LOG_PRETTY === 'true',
  },
  security: {
    rateLimitEnabled: process.env.RATE_LIMIT_ENABLED !== 'false',
    httpsOnly: process.env.HTTPS_ONLY === 'true',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
};
```

This approach:

- Makes configuration explicit and discoverable
- Allows fine-grained control per environment
- Avoids hidden behavior changes
- Makes testing easier (toggle individual features)

## Configuration Object Pattern

Create a typed configuration object:

```typescript
interface Config {
  server: {
    port: number;
    host: string;
  };
  database: {
    url: string;
    poolSize: number;
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  features: {
    enableMetrics: boolean;
    enableTracing: boolean;
  };
}

function createConfig(): Config {
  return {
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      host: process.env.HOST || '0.0.0.0',
    },
    database: {
      url: requireEnv('DATABASE_URL'),
      poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    },
    auth: {
      jwtSecret: requireEnv('JWT_SECRET'),
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    features: {
      enableMetrics: process.env.ENABLE_METRICS === 'true',
      enableTracing: process.env.ENABLE_TRACING === 'true',
    },
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = createConfig();
```

## .env File Structure

Organize .env files properly:

```bash
# .env.example - committed to git, documents all variables
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_KEY=your-api-key-here

# .env - local development, NOT committed
PORT=3000
DATABASE_URL=postgresql://dev:dev@localhost:5432/myapp
API_KEY=sk-dev-key-123

# .env.test - test environment
DATABASE_URL=postgresql://test:test@localhost:5432/myapp_test
```

## Secrets in Production

Never commit secrets to version control. Use a secrets management service appropriate for your infrastructure:

**Cloud Provider Services:**

- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [Google Cloud Secret Manager](https://cloud.google.com/secret-manager)
- [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault)

**Infrastructure Tools:**

- [HashiCorp Vault](https://www.vaultproject.io/)
- [Doppler](https://www.doppler.com/)
- [Infisical](https://infisical.com/)

**Container Orchestration:**

- Kubernetes Secrets
- Docker Swarm Secrets

**CI/CD Platforms:**

- GitHub Actions Secrets
- GitLab CI/CD Variables
- CircleCI Contexts

These services inject secrets as environment variables at runtime, keeping them out of your codebase and version history.

## Feature Flags

Implement feature flags via environment:

```typescript
const features = {
  newDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true',
  betaApi: process.env.FEATURE_BETA_API === 'true',
  darkMode: process.env.FEATURE_DARK_MODE === 'true',
};

export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature] ?? false;
}
```
