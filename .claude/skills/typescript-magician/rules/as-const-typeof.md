---
name: as-const-typeof
description: Deriving types from runtime values using as const and typeof
metadata:
  tags: as-const, typeof, literal-types, inference, const-assertion
---

# Deriving Types from Runtime with `as const` and `typeof`

## Overview

The combination of `as const` and `typeof` is one of the most powerful patterns in TypeScript for deriving types from runtime values. This pattern allows you to create a single source of truth that works at both runtime and compile time.

## The `as const` Assertion

`as const` is a const assertion that makes an object deeply readonly and infers literal types instead of widened types.

```typescript
// Without as const - types are widened
const config = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
};
// Type: { GROUP: string; ANNOUNCEMENT: string }

// With as const - literal types are preserved
const config = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
} as const;
// Type: { readonly GROUP: "group"; readonly ANNOUNCEMENT: "announcement" }
```

## Key Benefits of `as const`

1. **Immutability**: Properties become readonly recursively
2. **Literal inference**: Values are inferred as their literal types, not widened types
3. **Array tuple inference**: Arrays become readonly tuples with literal types

```typescript
const routes = ['home', 'about', 'contact'] as const;
// Type: readonly ["home", "about", "contact"]
// Without as const: string[]
```

## Pulling Runtime to Type World with `typeof`

Use `typeof` to extract the type from a runtime value:

```typescript
const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
  SELF_DIRECTED: 'selfDirected',
} as const;

// Extract the type of the object
type ProgramMap = typeof programModeEnumMap;

// Extract keys as a union type
type BackendProgram = keyof typeof programModeEnumMap;
// Type: "GROUP" | "ANNOUNCEMENT" | "ONE_ON_ONE" | "SELF_DIRECTED"

// Extract values as a union type using indexed access
type FrontendProgram = (typeof programModeEnumMap)[keyof typeof programModeEnumMap];
// Type: "group" | "announcement" | "1on1" | "selfDirected"
```

## Pattern: `Obj[keyof Obj]` for Object Values

This pattern is like `Object.values()` for the type world:

```typescript
const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
} as const;

type StatusCode = (typeof statusCodes)[keyof typeof statusCodes];
// Type: 200 | 201 | 400 | 404
```

## Pattern: Subset Selection with Union Index

You can select a subset of values by using a union of specific keys:

```typescript
const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
  SELF_DIRECTED: 'selfDirected',
} as const;

type ProgramMap = typeof programModeEnumMap;

// Select only individual program types
type IndividualProgram = ProgramMap['ONE_ON_ONE' | 'SELF_DIRECTED'];
// Type: "1on1" | "selfDirected"
```

## When to Use This Pattern

- **Configuration objects**: Define config once, use it at runtime and compile time
- **Enum alternatives**: Create type-safe enums with string/number values
- **Route definitions**: Define routes with their metadata
- **API mappings**: Map between different representations (e.g., backend vs frontend)
- **Event types**: Define event names and their payloads

## Common Pitfalls

### Forgetting `as const`

Without `as const`, you lose literal type inference:

```typescript
// BAD - values are widened to string
const colors = {
  RED: '#ff0000',
  GREEN: '#00ff00',
};
type Color = (typeof colors)[keyof typeof colors]; // string

// GOOD - literal types preserved
const colors = {
  RED: '#ff0000',
  GREEN: '#00ff00',
} as const;
type Color = (typeof colors)[keyof typeof colors]; // "#ff0000" | "#00ff00"
```

### Attempting to Mutate

`as const` makes objects readonly - attempting to mutate will cause a compile error:

```typescript
const config = {
  timeout: 5000,
} as const;

config.timeout = 10000; // Error: Cannot assign to 'timeout' because it is a read-only property
```

## Complete Example

```typescript
// Single source of truth for HTTP methods
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
// Type: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

type SafeMethod = (typeof HTTP_METHODS)['GET'];
// Type: "GET"

type MutatingMethod = (typeof HTTP_METHODS)['POST' | 'PUT' | 'DELETE' | 'PATCH'];
// Type: "POST" | "PUT" | "DELETE" | "PATCH"

function makeRequest(method: HttpMethod, url: string): void {
  // method is type-safe
}

makeRequest(HTTP_METHODS.GET, '/api/users'); // OK
makeRequest('INVALID', '/api/users'); // Error
```
