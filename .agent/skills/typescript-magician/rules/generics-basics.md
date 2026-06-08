---
name: generics-basics
description: Fundamentals of generic types and functions in TypeScript
metadata:
  tags: generics, type-parameters, constraints, inference
---

# Generics Fundamentals

## Overview

Generics allow you to create reusable components that work with multiple types while maintaining type safety. They're essential for building flexible, type-safe APIs.

## Basic Generic Functions

```typescript
// Without generics - loses type information
function identity(value: any): any {
  return value;
}

// With generics - preserves type
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // Type: number (inferred)
const str = identity('hello'); // Type: string (inferred)
const explicit = identity<boolean>(true); // Type: boolean (explicit)
```

## Inference Dependencies

When the type of one parameter depends on another, use generics:

```typescript
// The return type depends on what keys exist in the config
const createComponent = <TConfig extends Record<string, string>>(config: TConfig) => {
  return (variant: keyof TConfig, ...otherClasses: string[]): string => {
    return config[variant] + ' ' + otherClasses.join(' ');
  };
};

// TConfig is inferred as { primary: string; secondary: string }
const getButtonClasses = createComponent({
  primary: 'bg-blue-300',
  secondary: 'bg-green-300',
});

// variant must be "primary" | "secondary"
getButtonClasses('primary', 'px-4'); // OK
getButtonClasses('tertiary', 'px-4'); // Error: "tertiary" not in keys
```

## Generic Constraints with `extends`

Constrain generics to ensure they have required properties:

```typescript
// Unconstrained - TFunc could be anything
type WrapFunction<TFunc> = (...args: any[]) => any;

// Constrained - TFunc must be a function
type WrapFunction<TFunc extends (...args: any) => any> = (
  ...args: Parameters<TFunc>
) => ReturnType<TFunc>;
```

### Why Constraints Matter

```typescript
// Without constraint
function getLength<T>(item: T): number {
  return item.length; // Error: Property 'length' does not exist on type 'T'
}

// With constraint
function getLength<T extends { length: number }>(item: T): number {
  return item.length; // OK - we know T has length
}

getLength('hello'); // 5
getLength([1, 2, 3]); // 3
getLength({ length: 10 }); // 10
getLength(42); // Error: number doesn't have length
```

## Default Generic Parameters

Provide defaults for optional type parameters:

```typescript
type WrapFunction<
  TFunc extends (...args: any) => any,
  TAdditional = {}, // Default to empty object
> = (...args: Parameters<TFunc>) => Promise<Awaited<ReturnType<TFunc>> & TAdditional>;

// Can use without TAdditional
type BasicWrapper = WrapFunction<typeof fetchUser>;

// Or with TAdditional
type ExtendedWrapper = WrapFunction<typeof fetchUser, { meta: string }>;
```

## Generic Slot Inference

TypeScript infers generic types from usage:

```typescript
// Generic is inferred from the argument passed
const createComponent = <TConfig>(config: TConfig) => {
  return config;
};

// TConfig is inferred as { primary: string; secondary: string }
const component = createComponent({
  primary: 'bg-blue-300',
  secondary: 'bg-green-300',
});
```

### When Inference Doesn't Work

If you don't USE the generic in arguments, it defaults to unknown:

```typescript
// BAD - TConfig isn't used in arguments, defaults to unknown
const createComponent = <TConfig>(config: Record<string, string>) => {
  // TConfig is unknown here
};

// GOOD - TConfig IS the argument type
const createComponent = <TConfig extends Record<string, string>>(config: TConfig) => {
  // TConfig is inferred from what's passed
};
```

## Multiple Generic Parameters

Use multiple parameters for related but distinct types:

```typescript
function map<TInput, TOutput>(items: TInput[], transform: (item: TInput) => TOutput): TOutput[] {
  return items.map(transform);
}

// Both TInput and TOutput are inferred
const numbers = map(['1', '2', '3'], (s) => parseInt(s));
// TInput: string, TOutput: number, Result: number[]
```

## Pattern: `keyof` with Generics

Combine `keyof` with generics for type-safe property access:

```typescript
function getProperty<TObj, TKey extends keyof TObj>(obj: TObj, key: TKey): TObj[TKey] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
const name = getProperty(user, 'name'); // Type: string
const age = getProperty(user, 'age'); // Type: number
const invalid = getProperty(user, 'email'); // Error: "email" not in keyof
```

## Generics in Classes

```typescript
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  map<U>(transform: (value: T) => U): Container<U> {
    return new Container(transform(this.value));
  }
}

const numContainer = new Container(42);
const strContainer = numContainer.map((n) => n.toString());
// strContainer is Container<string>
```

## Complete Example: Component Factory

```typescript
// A factory that creates type-safe component class generators
export const createComponent = <TConfig extends Record<string, string>>(config: TConfig) => {
  // Return a function that requires valid variant keys
  return (variant: keyof TConfig, ...otherClasses: string[]): string => {
    return config[variant] + ' ' + otherClasses.join(' ');
  };
};

// Usage
const getButtonClasses = createComponent({
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-200 text-gray-800',
  danger: 'bg-red-500 text-white',
});

// Type-safe: variant must be "primary" | "secondary" | "danger"
const classes = getButtonClasses('primary', 'px-4', 'py-2');
// Result: "bg-blue-500 text-white px-4 py-2"

// Type error on invalid variant
getButtonClasses('invalid'); // Error!
```

## When to Use Generics

- **Type preservation**: When you need to preserve type information through a function
- **Inference dependencies**: When one type depends on another
- **Reusable components**: When building APIs that work with multiple types
- **Constraints**: When you need to ensure types have certain properties
- **Factory functions**: When creating functions that return typed results

## Common Pitfalls

### Unnecessary Generics

```typescript
// BAD - generic provides no value
function greet<T extends string>(name: T): string {
  return `Hello, ${name}`;
}

// GOOD - just use string
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

### Over-constraining

```typescript
// BAD - overly specific constraint
function process<T extends { id: string; name: string; email: string }>(obj: T): void {}

// GOOD - only require what you actually use
function process<T extends { id: string }>(obj: T): void {}
```

### Forgetting to Constrain

```typescript
// BAD - accessing property that might not exist
function getName<T>(obj: T): string {
  return obj.name; // Error: Property 'name' does not exist
}

// GOOD - constrain to types that have name
function getName<T extends { name: string }>(obj: T): string {
  return obj.name;
}
```
