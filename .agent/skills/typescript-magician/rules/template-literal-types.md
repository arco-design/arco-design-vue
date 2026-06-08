---
name: template-literal-types
description: String manipulation at the type level with template literals
metadata:
  tags: template-literals, string-types, type-manipulation
---

# Template Literal Types

## Overview

Template literal types allow you to manipulate string types using the same syntax as JavaScript template literals. Combined with `infer`, they enable powerful string parsing and transformation at the type level.

## Basic Syntax

```typescript
type Greeting = `Hello, ${string}`;

const valid: Greeting = 'Hello, World'; // OK
const invalid: Greeting = 'Hi, World'; // Error: doesn't match pattern
```

## String Literal Unions

Template literals distribute over unions:

```typescript
type Size = 'small' | 'medium' | 'large';
type Color = 'red' | 'blue' | 'green';

type SizedColor = `${Size}-${Color}`;
// "small-red" | "small-blue" | "small-green" |
// "medium-red" | "medium-blue" | "medium-green" |
// "large-red" | "large-blue" | "large-green"
```

## Pattern Matching with `infer`

Extract parts of string types:

```typescript
// Remove "maps:" prefix
type RemoveMaps<T> = T extends `maps:${infer Rest}` ? Rest : T;

type Test1 = RemoveMaps<'maps:longitude'>; // "longitude"
type Test2 = RemoveMaps<'maps:latitude'>; // "latitude"
type Test3 = RemoveMaps<'other'>; // "other"
```

### Remove Suffix

```typescript
type RemovePostSuffix<T> = T extends `${infer Prefix}:post` ? Prefix : T;

type Test = RemovePostSuffix<'attribute:post'>; // "attribute"
```

### Split on Delimiter

```typescript
type Split<S extends string, D extends string> = S extends `${infer Head}${D}${infer Tail}`
  ? [Head, ...Split<Tail, D>]
  : S extends ''
    ? []
    : [S];

type Parts = Split<'a-b-c', '-'>; // ["a", "b", "c"]
```

## Built-in String Manipulation Types

TypeScript provides utility types for case conversion:

```typescript
type Upper = Uppercase<'hello'>; // "HELLO"
type Lower = Lowercase<'HELLO'>; // "hello"
type Cap = Capitalize<'hello'>; // "Hello"
type Uncap = Uncapitalize<'Hello'>; // "hello"
```

## Practical Examples

### CSS Property to Camel Case

```typescript
type CamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

type Test = CamelCase<'background-color'>; // "backgroundColor"
type Test2 = CamelCase<'border-top-width'>; // "borderTopWidth"
```

### Event Name Generation

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type MouseHandlers = EventName<MouseEvents>;
// "onClick" | "onMousedown" | "onMouseup"
```

### Getter/Setter Names

```typescript
type Getter<T extends string> = `get${Capitalize<T>}`;
type Setter<T extends string> = `set${Capitalize<T>}`;

type PropName = 'name' | 'age';
type Getters = Getter<PropName>; // "getName" | "getAge"
type Setters = Setter<PropName>; // "setName" | "setAge"
```

## Object Key Transformation

### Add Prefix to Keys

```typescript
type AddPrefix<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : K]: T[K];
};

interface User {
  name: string;
  age: number;
}

type PrefixedUser = AddPrefix<User, 'user_'>;
// { user_name: string; user_age: number }
```

### Add Suffix to Keys

```typescript
type AddSuffix<T, S extends string> = {
  [K in keyof T as K extends string ? `${K}${S}` : never]: T[K];
};

interface Data {
  a: number;
  b: number;
}

type NewData = AddSuffix<Data, '_new'>;
// { a_new: number; b_new: number }
```

### Transform Keys from snake_case to camelCase

```typescript
type SnakeToCamel<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeToCamel<P3>}`
  : S;

type CamelizeKeys<T> = {
  [K in keyof T as K extends string ? SnakeToCamel<K> : K]: T[K];
};

interface ApiResponse {
  user_id: string;
  first_name: string;
  last_name: string;
}

type CamelResponse = CamelizeKeys<ApiResponse>;
// { userId: string; firstName: string; lastName: string }
```

## Route Parameter Extraction

```typescript
type ExtractRouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractRouteParams<`/${Rest}`>
  : T extends `${string}:${infer Param}`
    ? Param
    : never;

type Params = ExtractRouteParams<'/users/:userId/posts/:postId'>;
// "userId" | "postId"

// Create typed params object
type RouteParams<T extends string> = {
  [K in ExtractRouteParams<T>]: string;
};

type UserPostParams = RouteParams<'/users/:userId/posts/:postId'>;
// { userId: string; postId: string }
```

## Validation Patterns

### Email Pattern (Simplified)

```typescript
type ValidEmail = `${string}@${string}.${string}`;

function validateEmail<T extends string>(email: T extends ValidEmail ? T : never): T {
  return email;
}

validateEmail('user@example.com'); // OK
validateEmail('invalid'); // Error
```

### URL Pattern

```typescript
type Protocol = 'http' | 'https';
type ValidUrl = `${Protocol}://${string}`;

function fetchUrl(url: ValidUrl): Promise<Response> {
  return fetch(url);
}

fetchUrl('https://api.example.com'); // OK
fetchUrl('ftp://files.example.com'); // Error
```

## Complex Parsing

### Parse Query String Type

```typescript
type ParseQueryString<T extends string> = T extends `${infer Key}=${infer Value}&${infer Rest}`
  ? { [K in Key]: Value } & ParseQueryString<Rest>
  : T extends `${infer Key}=${infer Value}`
    ? { [K in Key]: Value }
    : {};

type QueryParams = ParseQueryString<'name=John&age=30&city=NYC'>;
// { name: "John" } & { age: "30" } & { city: "NYC" }
```

### Parse Dot Notation Path

```typescript
type ParsePath<T extends string> = T extends `${infer Key}.${infer Rest}`
  ? [Key, ...ParsePath<Rest>]
  : [T];

type Path = ParsePath<'user.address.city'>; // ["user", "address", "city"]
```

## When to Use Template Literal Types

- **String validation**: Ensure strings match expected patterns
- **Key transformation**: Rename object keys systematically
- **Route typing**: Type-safe route parameters
- **Event systems**: Generate event handler names
- **Code generation**: Create type-safe string patterns
- **API contracts**: Ensure URL/path patterns are correct

## Common Pitfalls

### Complexity Limits

TypeScript has recursion limits. Very deep template literal operations may fail:

```typescript
// May hit recursion limit with very long strings
type DeepSplit<S extends string> = S extends `${infer H}${infer T}` ? [H, ...DeepSplit<T>] : [];
```

### Greedy Matching

Template literals match greedily:

```typescript
// This captures everything before the LAST .json
type GetPath<T> = T extends `${infer Path}.json` ? Path : never;

type Test = GetPath<'folder/file.backup.json'>;
// "folder/file.backup" (includes the extra .backup)
```

### Symbol Keys

Template literals only work with string keys:

```typescript
type AddPrefix<T, P extends string> = {
  // Need to check K extends string to filter out symbols
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};
```

## Best Practices

1. **Keep patterns simple**: Complex recursive patterns are hard to debug
2. **Provide fallback types**: Handle non-matching cases gracefully
3. **Test edge cases**: Empty strings, single characters, no matches
4. **Consider performance**: Deep recursion can slow down type checking
5. **Use built-in utilities**: Prefer `Uppercase`, `Lowercase`, etc. over custom implementations
