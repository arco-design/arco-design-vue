---
name: infer-keyword
description: Using infer to extract types within conditional types
metadata:
  tags: infer, conditional-types, type-extraction, pattern-matching
---

# The `infer` Keyword

## Overview

The `infer` keyword allows you to extract and capture type information within conditional types. It's like pattern matching for types - you define a pattern and capture parts of it.

## Basic Syntax

```typescript
type ExtractType<T> = T extends SomePattern<infer U> ? U : never;
//                                          ^^^^^^^^
//                                     Captures this part into U
```

## Simple Examples

### Extract Array Element Type

```typescript
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Test1 = ArrayElement<string[]>; // string
type Test2 = ArrayElement<number[]>; // number
type Test3 = ArrayElement<(string | number)[]>; // string | number
type Test4 = ArrayElement<string>; // never (not an array)
```

### Extract Promise Value

```typescript
type PromiseValue<T> = T extends Promise<infer U> ? U : never;

type Test1 = PromiseValue<Promise<string>>; // string
type Test2 = PromiseValue<Promise<number>>; // number
type Test3 = PromiseValue<string>; // never
```

### Extract Object Property Type

```typescript
type GetData<T> = T extends { data: infer TData } ? TData : never;

type Test1 = GetData<{ data: string }>; // string
type Test2 = GetData<{ data: number[] }>; // number[]
type Test3 = GetData<{ other: string }>; // never
```

## Template Literal Type Extraction

`infer` works powerfully with template literal types:

```typescript
// Remove "maps:" prefix from string
type RemoveMaps<T> = T extends `maps:${infer Rest}` ? Rest : T;

type Test1 = RemoveMaps<'maps:longitude'>; // "longitude"
type Test2 = RemoveMaps<'maps:latitude'>; // "latitude"
type Test3 = RemoveMaps<'other'>; // "other" (no match, returns T)
```

### Multiple Captures in Template Literals

```typescript
// Parse route parameters
type ParseRoute<T> = T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? { start: Start; param: Param; rest: ParseRoute<Rest> }
  : T extends `${infer Start}:${infer Param}`
    ? { start: Start; param: Param }
    : T;

type Route = ParseRoute<'/users/:id/posts/:postId'>;
// Nested structure with extracted params
```

### Extract Before/After Patterns

```typescript
// Get everything before ":"
type Before<T> = T extends `${infer Prefix}:${string}` ? Prefix : T;

// Get everything after ":"
type After<T> = T extends `${string}:${infer Suffix}` ? Suffix : T;

type Test1 = Before<'prefix:suffix'>; // "prefix"
type Test2 = After<'prefix:suffix'>; // "suffix"
```

## Function Type Extraction

### Extract Return Type

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Test = MyReturnType<() => string>; // string
```

### Extract Parameter Types

```typescript
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

type Test = MyParameters<(a: string, b: number) => void>;
// [a: string, b: number]
```

### Extract First Parameter

```typescript
type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

type Test = FirstArg<(name: string, age: number) => void>; // string
```

### Extract Constructor Parameters

```typescript
type ConstructorParams<T> = T extends new (...args: infer P) => any ? P : never;

class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}

type UserParams = ConstructorParams<typeof User>; // [string, number]
```

## Multiple `infer` in One Condition

You can use multiple `infer` captures:

```typescript
// Extract key-value from "key=value" string
type ParseKeyValue<T> = T extends `${infer Key}=${infer Value}`
  ? { key: Key; value: Value }
  : never;

type Test = ParseKeyValue<'name=John'>;
// { key: "name"; value: "John" }
```

## Infer with Constraints

You can add constraints to inferred types:

```typescript
// Only infer if it's a string
type ExtractString<T> = T extends { value: infer V extends string } ? V : never;

type Test1 = ExtractString<{ value: 'hello' }>; // "hello"
type Test2 = ExtractString<{ value: 123 }>; // never
```

## Recursive Type Extraction

```typescript
// Deeply unwrap nested promises
type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;

type Test = DeepAwaited<Promise<Promise<Promise<string>>>>; // string
```

## Practical Examples

### Type-Safe Event Emitter

```typescript
type EventHandler<T> = T extends (event: infer E) => void ? E : never;

interface Events {
  click: (event: MouseEvent) => void;
  keydown: (event: KeyboardEvent) => void;
}

type ClickEvent = EventHandler<Events['click']>; // MouseEvent
```

### Extract Route Parameters

```typescript
type ExtractParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<`/${Rest}`>
  : T extends `${string}:${infer Param}`
    ? Param
    : never;

type Params = ExtractParams<'/users/:userId/posts/:postId'>;
// "userId" | "postId"
```

### Object Key Transformation

```typescript
// Remove "maps:" prefix from all object keys
type RemoveMaps<T> = T extends `maps:${infer Rest}` ? Rest : T;

type RemoveMapsPrefixFromObj<T> = {
  [K in keyof T as RemoveMaps<K>]: T[K];
};

interface ApiData {
  'maps:longitude': string;
  'maps:latitude': string;
  'city': string;
}

type Cleaned = RemoveMapsPrefixFromObj<ApiData>;
// { longitude: string; latitude: string; city: string }
```

### Extract Generic Parameters

```typescript
type ExtractGeneric<T> =
  T extends Array<infer U>
    ? U
    : T extends Map<infer K, infer V>
      ? { key: K; value: V }
      : T extends Set<infer U>
        ? U
        : never;

type Test1 = ExtractGeneric<Array<string>>; // string
type Test2 = ExtractGeneric<Map<string, number>>; // { key: string; value: number }
type Test3 = ExtractGeneric<Set<boolean>>; // boolean
```

## Common Pitfalls

### Infer Position Matters

```typescript
// Captures the FIRST matching position
type First<T> = T extends [infer F, ...any[]] ? F : never;
type Last<T> = T extends [...any[], infer L] ? L : never;

type TestFirst = First<[1, 2, 3]>; // 1
type TestLast = Last<[1, 2, 3]>; // 3
```

### Greedy Template Literal Matching

```typescript
// Greedy: captures as much as possible
type GetPath<T> = T extends `${infer Path}.json` ? Path : never;

type Test = GetPath<'folder/file.name.json'>;
// "folder/file.name" (not "folder/file")
```

### Union Distribution with Infer

```typescript
type ExtractArray<T> = T extends (infer U)[] ? U : never;

// Distributes over union
type Test = ExtractArray<string[] | number[]>;
// string | number (not (string | number)[])
```

## When to Use `infer`

- **Type extraction**: Pull types out of complex structures
- **String parsing**: Extract parts from template literal types
- **Function analysis**: Get parameter/return types
- **Pattern matching**: Match and capture type patterns
- **Recursive types**: Extract types in recursive structures

## Best Practices

1. **Provide fallback types**: Always handle the `false` branch
2. **Be specific with patterns**: More specific patterns = better inference
3. **Consider distribution**: Remember that union types distribute
4. **Name captures meaningfully**: Use descriptive names like `TData`, `TKey`, `TValue`
