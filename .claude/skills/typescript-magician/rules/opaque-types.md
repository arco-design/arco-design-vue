---
name: opaque-types
description: Brand types and opaque types for type-safe identifiers
metadata:
  tags: opaque-types, brand-types, nominal-typing, type-safety
---

# Opaque Types (Brand Types)

## Overview

Opaque types (also called brand types or nominal types) create distinct types from primitive types. They prevent mixing up values that have the same underlying type but different semantic meanings.

## The Problem

TypeScript uses structural typing, so these are interchangeable:

```typescript
type UserId = string;
type PostId = string;

function getUser(id: UserId): User {
  /* ... */
}
function getPost(id: PostId): Post {
  /* ... */
}

const userId: UserId = 'user-123';
const postId: PostId = 'post-456';

// BUG: Wrong ID type, but TypeScript allows it!
getUser(postId); // No error - both are just strings
```

## Creating Opaque Types

Add a phantom property to create nominal distinction:

```typescript
type Opaque<TValue, TBrand> = TValue & { __brand: TBrand };

type UserId = Opaque<string, 'UserId'>;
type PostId = Opaque<string, 'PostId'>;
type ValidEmail = Opaque<string, 'ValidEmail'>;
type ValidAge = Opaque<number, 'ValidAge'>;
```

Now these types are incompatible:

```typescript
function getUser(id: UserId): User {
  /* ... */
}
function getPost(id: PostId): Post {
  /* ... */
}

const userId = 'user-123' as UserId;
const postId = 'post-456' as PostId;

getUser(userId); // OK
getUser(postId); // Error: Type 'PostId' is not assignable to type 'UserId'
```

## Type Predicates for Validation

Use type predicates to validate and narrow types:

```typescript
type ValidEmail = Opaque<string, 'ValidEmail'>;

// Type predicate: "email is ValidEmail" narrows the type
const isValidEmail = (email: string): email is ValidEmail => {
  return email.includes('@') && email.includes('.');
};

// Usage with type narrowing
function processEmail(email: string): void {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email');
  }

  // email is now ValidEmail
  sendEmail(email); // Type-safe!
}

function sendEmail(email: ValidEmail): void {
  // We know the email has been validated
}
```

## Assertion Functions

Assertion functions throw on invalid input and narrow the type:

```typescript
type ValidEmail = Opaque<string, 'ValidEmail'>;

// Assertion function - must be declared with function, not arrow
function assertValidEmail(email: string): asserts email is ValidEmail {
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Invalid email format');
  }
}

// Usage
async function createUser(data: { email: string }): Promise<User> {
  assertValidEmail(data.email);

  // data.email is now ValidEmail
  return await saveUser({
    email: data.email, // Type-safe!
  });
}
```

## Important: Assertion Function Syntax

Assertion functions MUST be declared using the `function` keyword, not arrow functions:

```typescript
// WRONG - arrow functions don't work with asserts
const assertValidEmail = (email: string): asserts email is ValidEmail => {
  // Error: Assertions require every name in the call target to be
  // declared with an explicit type annotation.
};

// CORRECT - use function declaration
function assertValidEmail(email: string): asserts email is ValidEmail {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
}
```

## Comparison: Type Predicates vs Assertion Functions

| Aspect         | Type Predicate     | Assertion Function         |
| -------------- | ------------------ | -------------------------- |
| Return         | `boolean`          | `void` (throws on failure) |
| Usage          | In `if` statements | Standalone call            |
| Error handling | Caller handles     | Function throws            |
| Syntax         | Arrow or function  | Must be `function`         |

```typescript
// Type predicate - returns boolean, caller handles failure
if (!isValidEmail(email)) {
  return { error: 'Invalid email' };
}
sendEmail(email);

// Assertion function - throws, cleaner happy path
assertValidEmail(email);
sendEmail(email);
```

## Complete Example: User Registration

```typescript
type Opaque<TValue, TBrand> = TValue & { __brand: TBrand };

type ValidEmail = Opaque<string, 'ValidEmail'>;
type ValidPassword = Opaque<string, 'ValidPassword'>;
type UserId = Opaque<string, 'UserId'>;

// Validation functions
function assertValidEmail(email: string): asserts email is ValidEmail {
  if (!email.includes('@') || email.length < 5) {
    throw new Error('Invalid email format');
  }
}

function assertValidPassword(password: string): asserts password is ValidPassword {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
}

// Database functions require validated types
async function createUser(data: {
  email: ValidEmail;
  password: ValidPassword;
}): Promise<{ id: UserId }> {
  // We know email and password are validated
  return { id: crypto.randomUUID() as UserId };
}

// API handler
async function handleRegistration(input: { email: string; password: string }) {
  // Must validate before calling createUser
  assertValidEmail(input.email);
  assertValidPassword(input.password);

  // Now we can safely call createUser
  const user = await createUser({
    email: input.email,
    password: input.password,
  });

  return user;
}
```

## Pattern: Factory Functions for Opaque Types

For cases where you want to validate at creation time:

```typescript
type UserId = Opaque<string, 'UserId'>;

// Factory function that validates and creates
function createUserId(id: string): UserId {
  if (!id.startsWith('user_')) {
    throw new Error('Invalid user ID format');
  }
  return id as UserId;
}

// Or with a type predicate for conditional creation
function parseUserId(id: string): UserId | null {
  if (!id.startsWith('user_')) {
    return null;
  }
  return id as UserId;
}
```

## When to Use Opaque Types

- **IDs**: UserId, PostId, OrderId - prevent mixing different entity IDs
- **Validated strings**: Email, URL, Phone - ensure validation has occurred
- **Validated numbers**: Age, Price, Quantity - ensure range validation
- **Security-sensitive**: HashedPassword, APIKey - prevent accidental exposure

## Common Pitfalls

### Direct Assignment Bypasses Type Safety

```typescript
const email: ValidEmail = 'invalid'; // Error at compile time

// But casting bypasses safety
const email = 'invalid' as ValidEmail; // No error, but potentially wrong!
```

### Forgetting to Validate

```typescript
function processUser(userId: UserId): void {
  // ...
}

// BAD - casting without validation
processUser(request.body.id as UserId);

// GOOD - validate first
function assertUserId(id: string): asserts id is UserId {
  if (!id.startsWith('user_')) throw new Error('Invalid user ID');
}

assertUserId(request.body.id);
processUser(request.body.id);
```

## Alternative: Unique Symbol Brand

A more robust branding approach using unique symbols:

```typescript
declare const brand: unique symbol;

type Brand<T, TBrand> = T & { [brand]: TBrand };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

// This is slightly more type-safe as __brand could theoretically
// be a real property, but unique symbol cannot
```
