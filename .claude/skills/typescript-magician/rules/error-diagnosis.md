---
name: error-diagnosis
description: Strategies for diagnosing and understanding TypeScript type errors
metadata:
  tags: errors, debugging, diagnosis, troubleshooting
---

# Diagnosing TypeScript Errors

## Overview

TypeScript errors can be cryptic, especially with complex generic types. This guide provides strategies for understanding and resolving type errors effectively.

## General Strategies

### 1. Read Errors Bottom-Up

TypeScript writes errors top-down, but the actual cause is usually at the bottom:

```
Type '{ name: string; }' is not assignable to type 'User'.
  Types of property 'email' are incompatible.
    Type 'undefined' is not assignable to type 'string'.
                                                ^^^^^^
                                              The actual issue!
```

### 2. Hover for Type Information

Use IDE hover tooltips extensively:

```typescript
const result = someFunction(arg);
//    ^ Hover here to see the inferred type
```

### 3. Use Go-to-Definition

Navigate to type definitions to understand what's expected:

```typescript
document.querySelector('body');
//       ^ Go-to-definition to see overloads
```

### 4. Create Test Types

Extract parts of complex types to understand them:

```typescript
// Complex expression
type Result = SomeComplexType<Input>[keyof Input][number];

// Break it down
type Step1 = SomeComplexType<Input>;
type Step2 = Step1[keyof Input];
type Step3 = Step2[number];
```

## Common Error Patterns

### "Type 'X' is not assignable to type 'Y'"

The most common error. Check:

1. Are you missing properties?
2. Are property types incompatible?
3. Is there a literal vs widened type mismatch?

```typescript
// Example: Literal type mismatch
const status = 'active'; // Type: string (widened)
function setStatus(s: 'active' | 'inactive') {}
setStatus(status); // Error!

// Fix: Use as const
const status = 'active' as const; // Type: "active"
setStatus(status); // OK
```

### "Property 'X' does not exist on type 'Y'"

The type doesn't have the expected property:

```typescript
// Check 1: Is the type correct?
function process(data: unknown) {
  data.name; // Error: 'name' doesn't exist on 'unknown'
}

// Fix: Add type guard
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'name' in data) {
    data.name; // OK
  }
}
```

### "Type 'X' cannot be used to index type 'Y'"

You're trying to access a property that might not exist:

```typescript
function getValue<T>(obj: T, key: string) {
  return obj[key]; // Error: string can't index T
}

// Fix: Constrain the key
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // OK
}
```

### "Argument of type 'X' is not assignable to parameter of type 'Y'"

Function argument type mismatch:

```typescript
// Often happens with narrower function signatures
const items = ['a', 'b', 'c'] as const;
items.includes(someString);
// Error: 'string' not assignable to '"a" | "b" | "c"'

// Fix: Cast appropriately
(items as readonly string[]).includes(someString);
```

### "Type 'X' is not generic"

Trying to pass type arguments to a non-generic type:

```typescript
type NotGeneric = string;
type Attempt = NotGeneric<number>; // Error!

// Check if you need to add a generic parameter
type IsGeneric<T> = T;
type Works = IsGeneric<number>; // OK
```

### Generic Constraint Errors

```typescript
function process<T>(items: Parameters<T>) {}
// Error: 'T' does not satisfy constraint '(...args: any) => any'

// Fix: Add the constraint
function process<T extends (...args: any) => any>(items: Parameters<T>) {}
```

## Debugging Techniques

### 1. Simplify the Code

Remove complexity until the error is clear:

```typescript
// Complex chain causing error
const result = complexFunction().map(transform).filter(predicate).reduce(accumulator);

// Simplify to isolate
const step1 = complexFunction();
// Check: Is step1 what you expect?

const step2 = step1.map(transform);
// Check: Is step2 what you expect?
// Continue until you find the issue
```

### 2. Add Explicit Type Annotations

Force TypeScript to tell you what's wrong:

```typescript
// Before: Error somewhere in here
const result = getData().process();

// After: Explicit annotations reveal issues
const data: ExpectedDataType = getData(); // Error if getData returns wrong type
const result: ExpectedResultType = data.process(); // Error if process returns wrong type
```

### 3. Use `// @ts-expect-error` to Confirm Understanding

```typescript
// If you think this should error:
// @ts-expect-error - string is not assignable to number
const x: number = 'hello';

// If the @ts-expect-error is unused, TypeScript will tell you
// meaning the code is actually valid
```

### 4. Check Source Definitions

For library types, check the actual definitions:

```typescript
// In lib.dom.d.ts
interface Document {
  querySelector<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): HTMLElementTagNameMap[K] | null;
  querySelector(selectors: string): Element | null;
}
```

## Massive Error Messages

### Strategy: Find the Core Issue

Long errors often have one core problem:

```
Type '{ fullName: string; id: string; firstName: string; lastName: string; age: number; }'
is not assignable to type
'{ fullName: string; id: string; firstName: string; lastName: string; age: number; agePlus10: number }'.

Property 'agePlus10' is missing in type
'{ fullName: string; id: string; firstName: string; lastName: string; age: number; }'
but required in type '{ fullName: string; agePlus10: number; }'.
                                         ^^^^^^^^^
                                        The actual issue!
```

### Strategy: Use Type Aliases

Create type aliases to understand the comparison:

```typescript
type Actual = typeof problematicValue;
type Expected = ExpectedType;

// Now hover these to compare
```

## Investigating Library Types

### Finding Type Definitions

1. Go-to-definition on imports
2. Check `node_modules/@types/[library]`
3. Check `node_modules/[library]/dist/*.d.ts`

### Understanding Overloads

Look for `(+N overload)` in tooltips:

```typescript
document.addEventListener('click', handler);
//       ^ Shows (+1 overload)

// Go-to-definition to see all overloads
// The first matching overload is used
```

## When Types Don't Match Reality

Sometimes library types are wrong or incomplete:

### Solution 1: Type Assertion

```typescript
// When you know better than TypeScript
const element = document.getElementById('root') as HTMLDivElement;
```

### Solution 2: Declaration Merging

```typescript
// Extend existing types
declare module 'some-library' {
  interface SomeType {
    missingProperty: string;
  }
}
```

### Solution 3: Report the Issue

- Check if it's a known issue on GitHub
- File a bug report with reproduction
- Contribute a fix if possible

## Prevention Strategies

### 1. Enable Strict Mode

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. Avoid `any`

Every `any` is a potential type hole:

```typescript
// Instead of
const data: any = fetchData();

// Use
const data: unknown = fetchData();
// Then narrow with type guards
```

### 3. Use Proper Generics

```typescript
// Instead of any in generics
function wrap<T = any>(value: T) {}

// Constrain appropriately
function wrap<T extends object>(value: T) {}
```

### 4. Test Edge Cases

```typescript
// Think about what could be passed
function process(input: string | string[]) {
  // What if input is empty string?
  // What if input is empty array?
  // What if input has special characters?
}
```

## IDE Tips

1. **Use TypeScript Version Selector**: Match your project's version
2. **Enable Inlay Hints**: See inferred types inline
3. **Use Quick Fix**: Often suggests the correct solution
4. **Check Problems Panel**: See all errors at once
5. **Use Rename Symbol**: Safely rename types across files
