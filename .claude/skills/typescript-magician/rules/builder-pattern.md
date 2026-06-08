---
name: builder-pattern
description: Type-safe builder pattern with chainable methods
metadata:
  tags: builder-pattern, fluent-api, chaining, generics-in-classes
---

# Type-Safe Builder Pattern

## Overview

The builder pattern uses a chain of method calls to incrementally build up a data structure or configuration. With TypeScript, we can make this pattern fully type-safe, tracking accumulated state at the type level.

## Basic Concept

Each method returns a new or modified builder with updated type information:

```typescript
new DbSeeder().addUser('matt', { name: 'Matt' }).addPost('post1', { title: 'Hello' }).transact();
// Each step updates the type to include what was added
```

## Implementation Pattern

### Step 1: Define the Base Types

```typescript
interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  authorId: string;
}

// Shape that constrains our generic
interface DbShape {
  users: Record<string, User>;
  posts: Record<string, Post>;
}
```

### Step 2: Create the Generic Builder

```typescript
export class DbSeeder<TDatabase extends DbShape> {
  public users: DbShape['users'] = {};
  public posts: DbShape['posts'] = {};

  // Each method returns DbSeeder with EXTENDED type information
  addUser = <Id extends string>(
    id: Id,
    user: Omit<User, 'id'>,
  ): DbSeeder<TDatabase & { users: TDatabase['users'] & Record<Id, User> }> => {
    this.users[id] = { ...user, id };
    return this;
  };

  addPost = <Id extends string>(
    id: Id,
    post: Omit<Post, 'id'>,
  ): DbSeeder<TDatabase & { posts: TDatabase['posts'] & Record<Id, Post> }> => {
    this.posts[id] = { ...post, id };
    return this;
  };

  // Final method returns the built result with correct types
  transact = async () => {
    // Actual database operations would go here
    return {
      users: this.users as TDatabase['users'],
      posts: this.posts as TDatabase['posts'],
    };
  };
}
```

### Step 3: Usage with Type Inference

```typescript
const usage = async () => {
  const result = await new DbSeeder()
    .addUser('matt', { name: 'Matt' })
    .addPost('post1', { authorId: 'matt', title: 'Hello' })
    .addPost('post2', { authorId: 'matt', title: 'World' })
    .transact();

  // result.users.matt is typed as User
  // result.posts.post1 is typed as Post
  // result.posts.post2 is typed as Post

  console.log(result.users.matt.name); // Type-safe!
  console.log(result.posts.post1.title); // Type-safe!
};
```

## How the Types Build Up

Each method call extends the type:

```typescript
new DbSeeder()
// Type: DbSeeder<{ users: {}; posts: {} }>

.addUser("matt", { name: "Matt" })
// Type: DbSeeder<{ users: Record<"matt", User>; posts: {} }>

.addPost("post1", { ... })
// Type: DbSeeder<{ users: Record<"matt", User>; posts: Record<"post1", Post> }>

.addPost("post2", { ... })
// Type: DbSeeder<{ users: Record<"matt", User>; posts: Record<"post1" | "post2", Post> }>
```

## Key Techniques

### 1. Generic ID Capture

Capture literal types by using a generic with string constraint:

```typescript
addUser = <Id extends string>(
  id: Id, // Id is inferred as literal type "matt", not string
  user: Omit<User, "id">,
): DbSeeder<TDatabase & { users: TDatabase["users"] & Record<Id, User> }>
```

### 2. Intersection for Type Accumulation

Use `&` to add new type information while preserving existing:

```typescript
TDatabase & { users: TDatabase['users'] & Record<Id, User> };
```

### 3. Cast in Terminal Methods

The runtime types don't match compile-time types, so cast in the final method:

```typescript
transact = async () => {
  return {
    users: this.users as TDatabase['users'],
    posts: this.posts as TDatabase['posts'],
  };
};
```

## Pattern: Query Builder

```typescript
interface QueryState {
  table: string | null;
  columns: string[];
  whereClause: string | null;
}

class QueryBuilder<TState extends QueryState> {
  private state: TState;

  private constructor(state: TState) {
    this.state = state;
  }

  static create() {
    return new QueryBuilder({
      table: null,
      columns: [],
      whereClause: null,
    });
  }

  from<T extends string>(table: T): QueryBuilder<TState & { table: T }> {
    return new QueryBuilder({ ...this.state, table });
  }

  select<C extends string[]>(...columns: C): QueryBuilder<TState & { columns: C }> {
    return new QueryBuilder({ ...this.state, columns });
  }

  where<W extends string>(clause: W): QueryBuilder<TState & { whereClause: W }> {
    return new QueryBuilder({ ...this.state, whereClause: clause });
  }

  // Only allow build if table is set
  build(this: QueryBuilder<TState & { table: string }>): string {
    const cols = this.state.columns.length ? this.state.columns.join(', ') : '*';
    let sql = `SELECT ${cols} FROM ${this.state.table}`;
    if (this.state.whereClause) {
      sql += ` WHERE ${this.state.whereClause}`;
    }
    return sql;
  }
}

// Usage
const query = QueryBuilder.create()
  .from('users')
  .select('id', 'name')
  .where('active = true')
  .build();

// Error: Can't build without from()
QueryBuilder.create().select('id').build(); // Type error!
```

## Pattern: Configuration Builder with Required Fields

```typescript
interface ServerConfig {
  host: string;
  port: number;
  ssl?: boolean;
  timeout?: number;
}

type RequiredFields = 'host' | 'port';
type ConfiguredFields<T> = { [K in keyof T]-?: K };

class ConfigBuilder<TConfigured extends Partial<Record<keyof ServerConfig, true>>> {
  private config: Partial<ServerConfig> = {};

  host(value: string): ConfigBuilder<TConfigured & { host: true }> {
    this.config.host = value;
    return this as any;
  }

  port(value: number): ConfigBuilder<TConfigured & { port: true }> {
    this.config.port = value;
    return this as any;
  }

  ssl(value: boolean): ConfigBuilder<TConfigured & { ssl: true }> {
    this.config.ssl = value;
    return this as any;
  }

  // Only allow build when required fields are set
  build(this: ConfigBuilder<{ host: true; port: true }>): ServerConfig {
    return this.config as ServerConfig;
  }
}

// Usage
const config = new ConfigBuilder().host('localhost').port(3000).ssl(true).build();

// Error: Missing required fields
new ConfigBuilder().host('localhost').build(); // Type error!
```

## Advanced: Default Values

```typescript
export class DbSeeder<
  TDatabase extends DbShape = {
    users: { defaultUser: User };
    posts: {};
  },
> {
  public users: DbShape['users'] = {
    defaultUser: { id: 'default', name: 'Default User' },
  };
  // ...
}

// Now every DbSeeder starts with defaultUser
const seeder = new DbSeeder();
// seeder has users.defaultUser by default
```

## When to Use Builder Pattern

- **Complex object construction**: Many optional/required fields
- **Fluent APIs**: DSLs for queries, configurations, test data
- **Validation at type level**: Ensure required steps are completed
- **Incremental building**: Add pieces over time before finalizing

## Common Pitfalls

### Forgetting to Constrain the Generic

```typescript
// BAD - TDatabase could be anything
class DbSeeder<TDatabase> {
  // Error: Cannot access TDatabase["users"]
}

// GOOD - constrained to DbShape
class DbSeeder<TDatabase extends DbShape> {
  // Can safely access TDatabase["users"] and TDatabase["posts"]
}
```

### Not Casting in Terminal Methods

```typescript
// BAD - type mismatch
transact = async () => {
  return {
    users: this.users, // Type: Record<string, User>, not TDatabase["users"]
    posts: this.posts,
  };
};

// GOOD - cast to match accumulated type
transact = async () => {
  return {
    users: this.users as TDatabase['users'],
    posts: this.posts as TDatabase['posts'],
  };
};
```

### Returning `this` Instead of New Type

```typescript
// BAD - returns same type, loses type information
addUser(id: string, user: Omit<User, "id">): this {
  return this;
}

// GOOD - returns new generic instantiation
addUser<Id extends string>(
  id: Id,
  user: Omit<User, "id">,
): DbSeeder<TDatabase & { users: TDatabase["users"] & Record<Id, User> }> {
  return this;
}
```
