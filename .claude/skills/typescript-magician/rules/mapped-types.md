---
name: mapped-types
description: Creating new types by transforming existing type properties
metadata:
  tags: mapped-types, key-remapping, property-modifiers, index-signatures
---

# Mapped Types

## Overview

Mapped types allow you to create new types by transforming each property of an existing type. They iterate over keys and apply transformations to create new type structures.

## Basic Syntax

```typescript
type MappedType<T> = {
  [K in keyof T]: TransformedType;
};
```

## Simple Examples

### Make All Properties Optional

```typescript
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: string;
  name: string;
  email: string;
}

type PartialUser = MyPartial<User>;
// { id?: string; name?: string; email?: string }
```

### Make All Properties Required

```typescript
type MyRequired<T> = {
  [K in keyof T]-?: T[K]; // -? removes optional modifier
};
```

### Make All Properties Readonly

```typescript
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Make All Properties Mutable

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // -readonly removes readonly modifier
};
```

## Preserving Original Keys

When you just iterate over `keyof T`, you preserve the original keys:

```typescript
type Preserve<T> = {
  [K in keyof T]: T[K]; // Same type, just recreated
};
```

## Key Remapping with `as`

Transform keys while mapping using the `as` clause:

```typescript
type RemapKeys<T> = {
  [K in keyof T as NewKeyType]: T[K];
};
```

### Add Prefix to Keys

```typescript
type Prefixed<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : K]: T[K];
};

interface User {
  name: string;
  age: number;
}

type PrefixedUser = Prefixed<User, 'user_'>;
// { user_name: string; user_age: number }
```

### Remove Keys by Remapping to `never`

```typescript
type RemoveFields<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type UserWithoutEmail = RemoveFields<User, 'email'>;
// { id: string; name: string }
```

### Transform Keys

```typescript
type RemoveMapsPrefixFromObj<T> = {
  [K in keyof T as RemoveMaps<K>]: T[K];
};

type RemoveMaps<T> = T extends `maps:${infer Rest}` ? Rest : T;

interface ApiData {
  'maps:longitude': string;
  'maps:latitude': string;
}

type CleanData = RemoveMapsPrefixFromObj<ApiData>;
// { longitude: string; latitude: string }
```

## Filtering Keys

Use conditional types in the `as` clause to filter:

```typescript
// Only keep string properties
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Mixed {
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringProps = OnlyStrings<Mixed>;
// { name: string; email: string }
```

### Keep Only Required Properties

```typescript
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

type OnlyRequired<T> = Pick<T, RequiredKeys<T>>;
```

### Keep Only Optional Properties

```typescript
type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

type OnlyOptional<T> = Pick<T, OptionalKeys<T>>;
```

## Transforming Property Types

### Wrap All Properties in Promise

```typescript
type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

interface SyncApi {
  getUser(): User;
  getPost(): Post;
}

type AsyncApi = Promisify<SyncApi>;
// { getUser: Promise<() => User>; getPost: Promise<() => Post> }
```

### Make All Properties Arrays

```typescript
type Arrayify<T> = {
  [K in keyof T]: T[K][];
};

interface Single {
  name: string;
  count: number;
}

type Multiple = Arrayify<Single>;
// { name: string[]; count: number[] }
```

### Nullable Properties

```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

## Deep Mapped Types

Apply transformations recursively:

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Nested {
  user: {
    profile: {
      name: string;
    };
  };
}

type ReadonlyNested = DeepReadonly<Nested>;
// All levels are readonly
```

### Deep Partial

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

## Practical Examples

### Getters and Setters

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }

type PersonSetters = Setters<Person>;
// { setName: (value: string) => void; setAge: (value: number) => void }
```

### Event Handlers

```typescript
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (newValue: T[K], oldValue: T[K]) => void;
};

interface State {
  count: number;
  name: string;
}

type StateHandlers = EventHandlers<State>;
// {
//   onCountChange: (newValue: number, oldValue: number) => void;
//   onNameChange: (newValue: string, oldValue: string) => void;
// }
```

### Form Validation Errors

```typescript
type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

type RegistrationErrors = ValidationErrors<RegistrationForm>;
// { email?: string[]; password?: string[]; confirmPassword?: string[] }
```

## Combining Mapped Types

### Pick with Transformation

```typescript
type PickAndTransform<T, K extends keyof T> = {
  [P in K]: T[P] extends Function ? T[P] : Readonly<T[P]>;
};
```

### Merge Two Types

```typescript
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};
```

## Index Signatures in Mapped Types

```typescript
// Create index signature from union
type FromUnion<K extends string, V> = {
  [P in K]: V;
};

type Dict = FromUnion<'a' | 'b' | 'c', number>;
// { a: number; b: number; c: number }
```

## Common Pitfalls

### Forgetting String Key Check

Template literals require string keys:

```typescript
// Error: Type 'K' is not assignable to type 'string'
type Wrong<T> = {
  [K in keyof T as `prefix_${K}`]: T[K];
};

// Correct: Check K extends string
type Correct<T> = {
  [K in keyof T as K extends string ? `prefix_${K}` : never]: T[K];
};
```

### Losing Modifiers

Remapping can lose optional/readonly modifiers:

```typescript
// Original optional modifier lost
type Transform<T> = {
  [K in keyof T as `new_${string & K}`]: T[K];
};

// Preserve optional with conditional
type TransformPreserve<T> = {
  [K in keyof T as `new_${string & K}`]+?: T[K];
};
```

### Infinite Recursion

Deep mapped types can cause issues:

```typescript
// Potential infinite recursion with circular types
type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

// Add base case for primitives
type DeepReadonlySafe<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonlySafe<T[K]> }
  : T;
```

## When to Use Mapped Types

- **Type transformations**: Change modifiers (optional, readonly)
- **Key renaming**: Add prefixes, suffixes, or transform key names
- **Property filtering**: Remove or keep certain properties
- **Bulk operations**: Apply same transformation to all properties
- **Type utilities**: Build reusable type transformers
