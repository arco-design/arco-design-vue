---
name: array-index-access
description: Accessing array element types using number indexing
metadata:
  tags: arrays, tuples, indexed-access, number-index
---

# Array Index Access with `[number]`

## Overview

In TypeScript, you can access array element types using indexed access types. The `[number]` syntax is particularly powerful for extracting a union of all possible element types from an array or tuple.

## Basic Concept

Just like you can access object properties with string keys, you can access array elements with numeric indices:

```typescript
const roles = ['user', 'admin', 'anonymous'] as const;

// Access specific index
type FirstRole = (typeof roles)[0]; // "user"
type SecondRole = (typeof roles)[1]; // "admin"

// Access all elements with [number]
type AnyRole = (typeof roles)[number]; // "user" | "admin" | "anonymous"
```

## Why `[number]` Works

The `number` type, when used as an index, represents a union of ALL possible numeric indices. TypeScript uses this as a shortcut to access all elements:

```typescript
// This is conceptually equivalent to:
type AnyRole = (typeof roles)[0 | 1 | 2];
// But [number] handles any array length automatically
```

## Pattern: Extract Array Element Types

```typescript
const userAccessModel = {
  user: ['update-self', 'view'],
  admin: ['create', 'update-self', 'update-any', 'delete', 'view'],
  anonymous: ['view'],
} as const;

type Role = keyof typeof userAccessModel;
// Type: "user" | "admin" | "anonymous"

// Get all values (arrays) as a union
type UserAccessModelValues = (typeof userAccessModel)[Role];
// Type: readonly ["update-self", "view"] | readonly ["create", ...] | readonly ["view"]

// Get all actions from all roles
type Action = (typeof userAccessModel)[Role][number];
// Type: "update-self" | "view" | "create" | "update-any" | "delete"
```

## Difference Between Tuple and Array Access

```typescript
// Tuple - fixed length, specific types at each position
const tuple = ['hello', 42, true] as const;
type TupleElements = (typeof tuple)[number]; // "hello" | 42 | true

// Array - variable length, single element type
const array: string[] = ['a', 'b', 'c'];
type ArrayElement = (typeof array)[number]; // string
```

## Pattern: Extract Function Parameter Types

Combined with `Parameters<>`, you can get a union of all parameter types:

```typescript
const funcWithManyParameters = (a: string, b: string, c: number, d: boolean) => {
  return [a, b, c, d].join(' ');
};

// Get tuple of all parameter types
type ParamsTuple = Parameters<typeof funcWithManyParameters>;
// Type: [string, string, number, boolean]

// Get union of all parameter types
type ParamsUnion = Parameters<typeof funcWithManyParameters>[number];
// Type: string | number | boolean
```

## When to Use This Pattern

- **Role-based access control**: Extract all possible actions/permissions
- **Configuration validation**: Get all possible config values
- **Event systems**: Extract all possible event types from an array
- **Form fields**: Get all field names from a fields array

## Practical Example: Type-Safe Access Control

```typescript
const userAccessModel = {
  user: ['update-self', 'view'],
  admin: ['create', 'update-self', 'update-any', 'delete', 'view'],
  anonymous: ['view'],
} as const;

type Role = keyof typeof userAccessModel;
type Action = (typeof userAccessModel)[Role][number];

const canUserAccess = (role: Role, action: Action): boolean => {
  // Need to cast because TypeScript can't narrow the array type
  return (userAccessModel[role] as ReadonlyArray<Action>).includes(action);
};

// Type-safe usage
canUserAccess('admin', 'delete'); // OK
canUserAccess('user', 'delete'); // OK at compile time, false at runtime
canUserAccess('admin', 'invalid'); // Error: "invalid" is not assignable to Action
```

## Common Pitfalls

### Forgetting `as const` on Arrays

```typescript
// BAD - elements widened to string
const actions = ['view', 'edit', 'delete'];
type Action = (typeof actions)[number]; // string

// GOOD - literal types preserved
const actions = ['view', 'edit', 'delete'] as const;
type Action = (typeof actions)[number]; // "view" | "edit" | "delete"
```

### ReadonlyArray Type Mismatch

When using `.includes()` on readonly arrays, you may need to cast:

```typescript
const items = ['a', 'b', 'c'] as const;
type Item = (typeof items)[number];

// Error: Argument of type 'string' is not assignable to parameter of type '"a" | "b" | "c"'
const hasItem = items.includes(someString);

// Solution: Cast the array
const hasItem = (items as ReadonlyArray<Item>).includes(value as Item);
```

## Advanced: Conditional Access

You can combine `[number]` with conditional types:

```typescript
type ExtractArrayElements<T> = T extends readonly (infer U)[] ? U : never;

const permissions = ['read', 'write', 'admin'] as const;
type Permission = ExtractArrayElements<typeof permissions>;
// Type: "read" | "write" | "admin"
```
