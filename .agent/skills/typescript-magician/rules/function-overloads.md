---
name: function-overloads
description: Using function overloads for complex function signatures
metadata:
  tags: overloads, function-signatures, polymorphism, type-narrowing
---

# Function Overloads

## Overview

Function overloads allow you to define multiple function signatures for a single function implementation. TypeScript selects the appropriate signature based on the arguments provided.

## Basic Syntax

```typescript
// Overload signatures (what callers see)
function greet(name: string): string;
function greet(firstName: string, lastName: string): string;

// Implementation signature (must be compatible with all overloads)
function greet(nameOrFirst: string, lastName?: string): string {
  if (lastName) {
    return `Hello, ${nameOrFirst} ${lastName}!`;
  }
  return `Hello, ${nameOrFirst}!`;
}

// Usage - TypeScript picks the right overload
greet('Alice'); // Uses first overload
greet('Alice', 'Smith'); // Uses second overload
```

## Overload Resolution: Top to Bottom

TypeScript tries overloads in order from top to bottom, using the first that matches:

```typescript
// Order matters! More specific overloads should come first
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: string | number): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}

const str = processValue('hello'); // Type: string
const num = processValue(42); // Type: number
```

## Real-World Example: DOM querySelector

The DOM's `querySelector` uses overloads for element type inference:

```typescript
// Simplified version of what lib.dom.d.ts defines
interface Document {
  // Specific overload for known HTML elements
  querySelector<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): HTMLElementTagNameMap[K] | null;

  // Fallback for custom selectors
  querySelector(selectors: string): Element | null;
}

const body = document.querySelector('body'); // Type: HTMLBodyElement | null
const custom = document.querySelector('.my-class'); // Type: Element | null
```

## Pattern: Wrapping Functions with Overloads

When wrapping a function, mirror its overloads to preserve type inference:

```typescript
// Problem: Simple wrapper loses overload behavior
export function nonNullQuerySelector(tag: string) {
  const element = document.querySelector(tag);
  if (!element) {
    throw new Error(`Element not found: ${tag}`);
  }
  return element;
}

const body = nonNullQuerySelector('body'); // Type: Element (lost HTMLBodyElement!)

// Solution: Add overload that mirrors querySelector
export function nonNullQuerySelector<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): HTMLElementTagNameMap[K];
export function nonNullQuerySelector(tag: string): Element;
export function nonNullQuerySelector(tag: string): Element {
  const element = document.querySelector(tag);
  if (!element) {
    throw new Error(`Element not found: ${tag}`);
  }
  return element;
}

const body = nonNullQuerySelector('body'); // Type: HTMLBodyElement
const custom = nonNullQuerySelector('.custom'); // Type: Element
```

## Method Overloads in Classes

```typescript
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    }
    return String(a) + String(b);
  }
}

const calc = new Calculator();
const sum = calc.add(1, 2); // Type: number
const concat = calc.add('hello', 'world'); // Type: string
```

## Overloads in Object Types

```typescript
interface StringOrNumberFunc {
  (value: string): string;
  (value: number): number;
}

const process: StringOrNumberFunc = (value: string | number) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
};
```

## Event Handler Pattern

A common pattern for event systems:

```typescript
interface EventMap {
  click: MouseEvent;
  keydown: KeyboardEvent;
  submit: SubmitEvent;
}

interface EventEmitter {
  // Specific overload for known events
  on<K extends keyof EventMap>(event: K, handler: (e: EventMap[K]) => void): void;

  // Fallback for custom events
  on(event: string, handler: (e: Event) => void): void;
}

const emitter: EventEmitter = {
  on(event: string, handler: (e: any) => void) {
    // Implementation
  },
};

// Handler type is correctly inferred
emitter.on('click', (e) => {
  console.log(e.clientX); // e is MouseEvent
});

emitter.on('keydown', (e) => {
  console.log(e.key); // e is KeyboardEvent
});

emitter.on('custom', (e) => {
  // e is Event (fallback)
});
```

## Overloads vs Union Types

Sometimes a union type is simpler than overloads:

```typescript
// Overloads - when return type depends on input type
function parse(input: string): object;
function parse(input: object): string;
function parse(input: string | object): string | object {
  if (typeof input === 'string') {
    return JSON.parse(input);
  }
  return JSON.stringify(input);
}

// Union - when return type is always the same
function process(input: string | number): string {
  return String(input);
}
```

## Overloads with Optional Parameters

```typescript
function createElement(tag: 'input'): HTMLInputElement;
function createElement(tag: 'button', text?: string): HTMLButtonElement;
function createElement(tag: string, text?: string): HTMLElement;
function createElement(tag: string, text?: string): HTMLElement {
  const element = document.createElement(tag);
  if (text) {
    element.textContent = text;
  }
  return element;
}
```

## Common Pitfalls

### Implementation Signature Visibility

The implementation signature is NOT visible to callers:

```typescript
function example(a: string): string;
function example(a: number): number;
function example(a: string | number): string | number {
  return typeof a === 'string' ? a.toUpperCase() : a * 2;
}

// Error: No overload matches this call
example(true); // Even though implementation accepts any
```

### Wrong Overload Order

Put specific overloads before general ones:

```typescript
// BAD - general overload catches everything
function bad(x: any): any;
function bad(x: string): string; // Never reached!
function bad(x: any): any {
  return x;
}

// GOOD - specific overloads first
function good(x: string): string;
function good(x: any): any;
function good(x: any): any {
  return x;
}
```

### Implementation Must Be Compatible

The implementation signature must handle all overload cases:

```typescript
function process(x: string): string;
function process(x: number): number;

// Error: Implementation signature must be compatible
function process(x: string): string {
  return x.toUpperCase();
}

// Correct
function process(x: string | number): string | number {
  if (typeof x === 'string') {
    return x.toUpperCase();
  }
  return x * 2;
}
```

## When to Use Overloads

- **Return type depends on input type**: Different inputs produce different output types
- **Wrapping external APIs**: Mirror the overloads of the wrapped function
- **Event systems**: Map event names to their event types
- **Factory functions**: Different configurations produce different types
- **API compatibility**: Provide multiple call signatures for the same operation

## When NOT to Use Overloads

- **Simple unions**: If return type doesn't depend on input type, use unions
- **Optional parameters**: Often simpler than multiple overloads
- **Generics**: Sometimes a single generic signature is clearer
