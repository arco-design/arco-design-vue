---
name: deep-inference
description: Achieving deep type inference with F.Narrow and as const
metadata:
  tags: inference, narrow, deep-inference, ts-toolbelt
---

# Deep Type Inference

## Overview

By default, TypeScript widens types when inferring objects and arrays. For advanced type-safe APIs, you often need to preserve literal types deeply within nested structures. This document covers techniques for achieving deep inference.

## The Problem: Type Widening

```typescript
const makeRouter = <TConfig>(config: TConfig) => {
  return { config };
};

const router = makeRouter({
  '/': {},
  '/search': {
    search: ['query', 'page'],
  },
});

// TConfig is inferred as:
// {
//   "/": {};
//   "/search": {
//     search: string[]; // NOT ["query", "page"]!
//   };
// }
```

The literal tuple `["query", "page"]` is widened to `string[]`, losing type information.

## Solution 1: User-Provided `as const`

Require users to add `as const`:

```typescript
const router = makeRouter({
  '/': {},
  '/search': {
    search: ['query', 'page'],
  },
} as const);

// Now TConfig preserves literals:
// {
//   readonly "/": {};
//   readonly "/search": {
//     readonly search: readonly ["query", "page"];
//   };
// }
```

### Drawbacks

- Users must remember to add `as const`
- Types become readonly (may require type adjustments)
- Easy to forget, leading to subtle bugs

## Solution 2: F.Narrow from ts-toolbelt

The `ts-toolbelt` library provides `F.Narrow` for automatic deep narrowing:

```typescript
import { F } from 'ts-toolbelt';

const makeRouter = <TConfig extends BaseRouterConfig>(config: F.Narrow<TConfig>) => {
  return { config };
};

const router = makeRouter({
  '/': {},
  '/search': {
    search: ['query', 'page'],
  },
});

// TConfig is now:
// {
//   "/": {};
//   "/search": {
//     search: ["query", "page"]; // Literal tuple preserved!
//   };
// }
```

### How F.Narrow Works

`F.Narrow` recursively narrows types to their literal forms:

- Strings become literal string types
- Numbers become literal number types
- Arrays become tuples
- Objects have their properties narrowed

## Solution 3: Custom Narrow Type

If you can't use ts-toolbelt, implement a simpler version:

```typescript
type Narrow<T> = T extends Function
  ? T
  : T extends []
    ? []
    : T extends readonly [infer First, ...infer Rest]
      ? [Narrow<First>, ...Narrow<Rest>]
      : T extends object
        ? { [K in keyof T]: Narrow<T[K]> }
        : T;

// Note: This is simplified and may not cover all edge cases
```

## Practical Example: Type-Safe Router

```typescript
import { F } from 'ts-toolbelt';

type BaseRouterConfig = Record<string, { search?: string[] }>;

type TupleToSearchParams<T extends string[]> = {
  [K in T[number]]?: string;
};

const makeRouter = <TConfig extends BaseRouterConfig>(config: F.Narrow<TConfig>) => {
  return {
    config,
    goTo: <TRoute extends keyof TConfig>(
      route: TRoute,
      search?: TConfig[TRoute]['search'] extends string[]
        ? TupleToSearchParams<TConfig[TRoute]['search']>
        : never,
    ) => {
      // Implementation
    },
  };
};

const router = makeRouter({
  '/': {},
  '/dashboard': {
    search: ['page', 'perPage', 'sort'],
  },
});

// Fully type-safe!
router.goTo('/dashboard', {
  page: '1',
  perPage: '10',
  sort: 'name', // Must be one of the defined search params
});

// Error: "invalid" is not a valid search param
router.goTo('/dashboard', { invalid: 'value' });
```

## Solution 4: Const Type Parameter (TypeScript 5.0+)

TypeScript 5.0 introduced `const` type parameters:

```typescript
const makeRouter = <const TConfig extends BaseRouterConfig>(config: TConfig) => {
  return { config };
};

// TConfig is automatically narrowed like as const
const router = makeRouter({
  '/': {},
  '/search': {
    search: ['query', 'page'],
  },
});
```

### Benefits of `const` Type Parameters

- No external library needed
- Built into TypeScript
- Clean syntax
- Works with constraints

## When Deep Inference Matters

### Configuration Objects

```typescript
const createTheme = <const TTheme extends Record<string, string>>(theme: TTheme): TTheme => theme;

const theme = createTheme({
  primary: '#0066cc',
  secondary: '#666666',
});

// theme.primary is "#0066cc", not string
```

### Route Definitions

```typescript
const routes = defineRoutes({
  home: { path: '/' },
  user: { path: '/users/:id' },
  post: { path: '/posts/:postId' },
});

// Route names and paths are literal types
```

### Event Systems

```typescript
const events = createEventMap({
  click: (x: number, y: number) => {},
  keydown: (key: string) => {},
});

// Event names are literal unions, handlers are properly typed
```

## Comparison of Techniques

| Technique          | Pros                          | Cons                         |
| ------------------ | ----------------------------- | ---------------------------- |
| `as const`         | No dependencies               | Manual, readonly types       |
| `F.Narrow`         | Automatic, flexible           | External dependency          |
| Custom Narrow      | No dependencies, customizable | Complex, may miss edge cases |
| `const` type param | Built-in, clean               | TypeScript 5.0+ only         |

## Combining with Conditional Types

Deep inference enables powerful conditional type logic:

```typescript
import { F } from 'ts-toolbelt';

const makeApi = <const TConfig extends Record<string, { returns: string }>>(config: TConfig) => {
  return {
    call: <TMethod extends keyof TConfig>(method: TMethod): TConfig[TMethod]['returns'] => {
      // Implementation
      return '' as any;
    },
  };
};

const api = makeApi({
  getUser: { returns: 'User' },
  getPost: { returns: 'Post' },
});

const user = api.call('getUser'); // Type: "User"
const post = api.call('getPost'); // Type: "Post"
```

## Common Pitfalls

### Forgetting Constraints

```typescript
// Without constraint, F.Narrow has no base to work with
const bad = <TConfig>(config: F.Narrow<TConfig>) => config;

// With constraint, inference works properly
const good = <TConfig extends Record<string, unknown>>(config: F.Narrow<TConfig>) => config;
```

### Readonly Arrays

With `as const`, arrays become `readonly`:

```typescript
const config = {
  values: [1, 2, 3],
} as const;

// config.values is readonly [1, 2, 3]
config.values.push(4); // Error: Property 'push' does not exist on type 'readonly [1, 2, 3]'
```

### Deep Nesting Performance

Very deeply nested types can slow down the compiler:

```typescript
// May cause performance issues with extremely deep nesting
type DeepConfig = {
  level1: {
    level2: {
      level3: {
        // ... many more levels
      };
    };
  };
};
```

## Best Practices

1. **Use `const` type parameters** when possible (TS 5.0+)
2. **Fall back to F.Narrow** for complex inference needs
3. **Consider as const** for simple, user-provided configs
4. **Add proper constraints** to guide inference
5. **Test with complex examples** to ensure inference works
6. **Document the inference behavior** for API consumers
