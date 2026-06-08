---
name: utility-types
description: Built-in TypeScript utility types for type manipulation
metadata:
  tags: utility-types, parameters, returntype, awaited, omit, partial, record
---

# TypeScript Utility Types

## Overview

TypeScript provides built-in utility types that transform types in common ways. Mastering these utilities is essential for advanced TypeScript programming.

## Parameters<T>

Extracts the parameter types of a function type as a tuple:

```typescript
function fetchUser(id: string, opts?: { timeout?: number }): Promise<User> {
  // ...
}

type FetchUserParams = Parameters<typeof fetchUser>;
// Type: [id: string, opts?: { timeout?: number } | undefined]

// Use in wrapper functions
const fetchUserWithLogging = async (...args: Parameters<typeof fetchUser>): Promise<User> => {
  console.log('Fetching user:', args[0]);
  return fetchUser(...args);
};
```

## ReturnType<T>

Extracts the return type of a function type:

```typescript
function createUser(name: string, email: string) {
  return {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date(),
  };
}

type User = ReturnType<typeof createUser>;
// Type: { id: string; name: string; email: string; createdAt: Date }
```

## Awaited<T>

Unwraps the type inside a Promise (including nested Promises):

```typescript
type PromiseString = Promise<string>;
type NestedPromise = Promise<Promise<number>>;

type Unwrapped1 = Awaited<PromiseString>; // string
type Unwrapped2 = Awaited<NestedPromise>; // number

// Combine with ReturnType for async functions
async function fetchUser(id: string): Promise<User> {
  // ...
}

type FetchUserResult = Awaited<ReturnType<typeof fetchUser>>;
// Type: User (not Promise<User>)
```

## Pattern: Wrapping External Library Functions

When extending functions from external libraries that don't export their types:

```typescript
import { fetchUser } from 'external-lib';

// Extract and extend the return type
type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>;

export const fetchUserWithFullName = async (
  ...args: Parameters<typeof fetchUser>
): Promise<FetchUserReturn & { fullName: string }> => {
  const user = await fetchUser(...args);
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};
```

## Record<Keys, Type>

Creates an object type with specified keys and value type:

```typescript
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const rolePermissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

// Dynamic keys with constraint
function createLookup<K extends string, V>(keys: K[], getValue: (key: K) => V): Record<K, V> {
  const result = {} as Record<K, V>;
  for (const key of keys) {
    result[key] = getValue(key);
  }
  return result;
}
```

## Partial<T>

Makes all properties optional:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type UpdateUserInput = Partial<User>;
// Type: { id?: string; name?: string; email?: string }

function updateUser(id: string, updates: Partial<User>): User {
  // ...
}

updateUser('123', { name: 'New Name' }); // OK - only updating name
```

## Required<T>

Makes all properties required (opposite of Partial):

```typescript
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
// Type: { host: string; port: number; debug: boolean }
```

## Omit<T, Keys>

Creates a type by omitting specified properties:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
// Type: { id: string; name: string; email: string }

type CreateUserInput = Omit<User, 'id'>;
// Type: { name: string; email: string; password: string }
```

## Pick<T, Keys>

Creates a type by picking specified properties (opposite of Omit):

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type UserCredentials = Pick<User, 'email' | 'password'>;
// Type: { email: string; password: string }
```

## Exclude<T, U> and Extract<T, U>

Work with union types:

```typescript
type AllColors = 'red' | 'green' | 'blue' | 'yellow';

type PrimaryColors = Extract<AllColors, 'red' | 'blue'>;
// Type: "red" | "blue"

type NonPrimaryColors = Exclude<AllColors, 'red' | 'blue'>;
// Type: "green" | "yellow"
```

## NonNullable<T>

Removes null and undefined from a type:

```typescript
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// Type: string
```

## Creating a Reusable Wrapper Type

Combine utilities to create reusable type helpers:

```typescript
// A type that wraps any async function, extending its return type
type WrapFunction<TFunc extends (...args: any) => any, TAdditional = {}> = (
  ...args: Parameters<TFunc>
) => Promise<Awaited<ReturnType<TFunc>> & TAdditional>;

// Usage
import { fetchUser, fetchPost } from 'external-lib';

const fetchUserWithMeta: WrapFunction<typeof fetchUser, { meta: { fetchedAt: Date } }> = async (
  ...args
) => {
  const user = await fetchUser(...args);
  return {
    ...user,
    meta: { fetchedAt: new Date() },
  };
};
```

## When to Use Each Utility

| Utility          | Use Case                                             |
| ---------------- | ---------------------------------------------------- |
| `Parameters<T>`  | Wrapping functions, creating function variants       |
| `ReturnType<T>`  | Extracting return types when not explicitly exported |
| `Awaited<T>`     | Unwrapping Promise types                             |
| `Record<K, V>`   | Creating object types with dynamic keys              |
| `Partial<T>`     | Update/patch operations                              |
| `Required<T>`    | Ensuring all config options are provided             |
| `Omit<T, K>`     | Removing sensitive or internal fields                |
| `Pick<T, K>`     | Creating focused subsets of types                    |
| `Exclude<T, U>`  | Filtering union types                                |
| `Extract<T, U>`  | Selecting from union types                           |
| `NonNullable<T>` | Removing null/undefined after validation             |

## Common Pitfalls

### Using ReturnType on Async Functions

```typescript
async function getData(): Promise<string[]> {
  return ['data'];
}

// This gives Promise<string[]>, not string[]
type Wrong = ReturnType<typeof getData>; // Promise<string[]>

// Use Awaited to unwrap
type Right = Awaited<ReturnType<typeof getData>>; // string[]
```

### Forgetting typeof for Runtime Functions

```typescript
function myFunc(x: number): string {
  return String(x);
}

// Wrong - myFunc is a value, not a type
type Params = Parameters<myFunc>; // Error

// Correct - use typeof
type Params = Parameters<typeof myFunc>; // [x: number]
```
