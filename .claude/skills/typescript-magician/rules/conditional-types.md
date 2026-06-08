---
name: conditional-types
description: Conditional types for type-level if/else logic
metadata:
  tags: conditional-types, extends, ternary, type-narrowing
---

# Conditional Types

## Overview

Conditional types provide if/else logic at the type level. They use the `extends` keyword to check type relationships and return different types based on the result.

## Basic Syntax

```typescript
type Conditional = SomeType extends OtherType ? TrueType : FalseType;
```

The condition checks if `SomeType` is assignable to `OtherType`.

## Simple Examples

```typescript
// Check if type is string
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
type Test3 = IsString<'hello'>; // true (literal extends string)

// Check type relationships
type Result1 = string extends string ? 'yes' : 'no'; // "yes"
type Result2 = string extends number ? 'yes' : 'no'; // "no"
type Result3 = 'hello' extends string ? 'yes' : 'no'; // "yes"
```

## Practical Example: Null Checking

```typescript
type IsNullable<T> = null extends T ? true : false;

type Test1 = IsNullable<string | null>; // true
type Test2 = IsNullable<string>; // false
type Test3 = IsNullable<undefined>; // false (null !== undefined)
```

## Conditional Types with Generics

```typescript
// Return different types based on input
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends boolean
      ? 'boolean'
      : T extends undefined
        ? 'undefined'
        : T extends Function
          ? 'function'
          : 'object';

type T1 = TypeName<string>; // "string"
type T2 = TypeName<number>; // "number"
type T3 = TypeName<() => void>; // "function"
type T4 = TypeName<{ a: 1 }>; // "object"
```

## Distribution Over Unions

When a conditional type acts on a union, it distributes over each member:

```typescript
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// Distributes to: ToArray<string> | ToArray<number>
// Result: string[] | number[]

// NOT: (string | number)[]
```

### Preventing Distribution

Wrap in tuple to prevent distribution:

```typescript
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;

type Result = ToArrayNonDistributive<string | number>;
// Result: (string | number)[]
```

## Practical Use: Optional Parameters

```typescript
interface BaseRouterConfig {
  search?: string[];
}

type TupleToSearchParams<T extends string[]> = {
  [K in T[number]]?: string;
};

// Only convert if search is defined and is a string array
type SearchParams<
  TConfig extends BaseRouterConfig,
  TRoute extends keyof TConfig,
> = TConfig[TRoute]['search'] extends string[]
  ? TupleToSearchParams<TConfig[TRoute]['search']>
  : undefined;
```

## Using Conditionals in Function Arguments

```typescript
const makeRouter = <TConfig extends Record<string, { search?: string[] }>>(config: TConfig) => {
  return {
    goTo: <TRoute extends keyof TConfig>(
      route: TRoute,
      // Only allow search params if route has search defined
      search?: TConfig[TRoute]['search'] extends string[]
        ? { [K in TConfig[TRoute]['search'][number]]?: string }
        : never,
    ) => {
      // Implementation
    },
  };
};

const router = makeRouter({
  '/': {},
  '/search': { search: ['query', 'page'] },
});

router.goTo('/'); // No search param allowed
router.goTo('/search', { query: 'test', page: '1' }); // Search params required
```

## Filtering with Conditionals

Use `never` to filter out types:

```typescript
type ExtractStrings<T> = T extends string ? T : never;

type Mixed = 'a' | 'b' | 1 | 2 | true;
type OnlyStrings = ExtractStrings<Mixed>; // "a" | "b"
```

This is how `Extract` and `Exclude` utilities work:

```typescript
// Built-in utility implementations
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;
```

## Nested Conditionals

```typescript
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

interface User {
  name: string;
  address: {
    city: string;
    country: string;
  };
  greet: () => void;
}

type ReadonlyUser = DeepReadonly<User>;
// All properties including nested ones are readonly
// Functions remain unchanged
```

## Checking for Empty Types

```typescript
// Check if array type is empty
type IsEmptyArray<T extends any[]> = T extends []
  ? true
  : T extends [any, ...any[]]
    ? false
    : boolean; // Unknown length arrays

type Test1 = IsEmptyArray<[]>; // true
type Test2 = IsEmptyArray<[1]>; // false
type Test3 = IsEmptyArray<string[]>; // boolean (unknown at compile time)
```

## Non-Empty Array Check

```typescript
// Ensure array has at least one element
type NonEmptyArray<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [First, ...Rest]
  : never;

type Config = {
  fields: ['name', 'email']; // Non-empty
};

// Use in conditional
type HasFields<T extends { fields?: string[] }> = T['fields'] extends [string, ...string[]]
  ? true
  : false;
```

## Common Patterns

### Unwrap Promise Type

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Test1 = UnwrapPromise<Promise<string>>; // string
type Test2 = UnwrapPromise<string>; // string (passthrough)
```

### Unwrap Array Type

```typescript
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

type Test1 = UnwrapArray<string[]>; // string
type Test2 = UnwrapArray<number>; // number (passthrough)
```

### Make All Properties Nullable

```typescript
type Nullable<T> = T extends object ? { [K in keyof T]: T[K] | null } : T | null;
```

## When to Use Conditional Types

- **Type transformations**: Different output types based on input
- **Filtering unions**: Extract or exclude certain types
- **Optional type features**: Enable features based on configuration
- **Type guards**: Return different types based on conditions
- **Recursive types**: Base cases in recursive type definitions

## Common Pitfalls

### Forgetting Distribution

```typescript
type WrongIsArray<T> = T extends any[] ? true : false;
type Test = WrongIsArray<string | number[]>; // boolean (distributes!)

// If you want to check the entire union:
type CorrectIsArray<T> = [T] extends [any[]] ? true : false;
type Test2 = CorrectIsArray<string | number[]>; // false
```

### Over-complicated Conditions

Sometimes union types or overloads are simpler:

```typescript
// Over-complicated
type ProcessResult<T> = T extends string
  ? { type: 'string'; value: string }
  : T extends number
    ? { type: 'number'; value: number }
    : never;

// Simpler with discriminated union
type Result = { type: 'string'; value: string } | { type: 'number'; value: number };
```

### Forgetting the False Branch

```typescript
// Always provide a sensible false branch
type ExtractName<T> = T extends { name: infer N } ? N : never;

// Consider: what happens when T doesn't have name?
type Test = ExtractName<{ age: number }>; // never
```
