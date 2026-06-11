## ADDED Requirements

### Requirement: Public methods exposed via `defineExpose()`

Every migrated component that currently uses the `methods:` option to expose public methods SHALL convert those methods to `defineExpose()`.

#### Scenario: Component with methods delegating to setup inner functions

- **WHEN** a component uses `methods: { validate() { return this.innerValidate() } }` where `innerValidate` is defined in `setup()`
- **THEN** it SHALL use `defineExpose({ validate: innerValidate })` directly, eliminating the delegation indirection

#### Scenario: Component with methods accessing component instance

- **WHEN** a component uses `methods: { focus() { this.inputRef.focus() } }` accessing `this`
- **THEN** it SHALL convert the method to a standalone function using the ref directly: `const focus = () => inputRef.value?.focus()` and expose via `defineExpose({ focus })`

### Requirement: Exposed method signatures preserved

Every method exposed via `defineExpose()` SHALL preserve the same function signature and return type as the original `methods:` entry.

#### Scenario: Method with parameters

- **WHEN** a component has `methods: { scrollTo(options?: ScrollToOptions) { ... } }`
- **THEN** the exposed function SHALL accept the same parameters: `const scrollTo = (options?: ScrollToOptions) => { ... }` and `defineExpose({ scrollTo })`

#### Scenario: Method returning a value

- **WHEN** a component has `methods: { validate(): Promise<ValidationResult> { ... } }`
- **THEN** the exposed function SHALL return the same type: `const validate = (): Promise<ValidationResult> => { ... }` and `defineExpose({ validate })`

### Requirement: Parent ref access pattern unchanged

Parent components that access child component methods via template refs SHALL continue to work without modification.

#### Scenario: Parent calling exposed method

- **WHEN** a parent component calls `formRef.value.validate()` before migration
- **THEN** the same call SHALL work identically after migration, because `defineExpose()` controls what is accessible via template refs

### Requirement: No methods option remains

After migration, no component SHALL contain a `methods:` option. All public APIs SHALL be exposed exclusively through `defineExpose()`.

#### Scenario: Component fully migrated from methods to defineExpose

- **WHEN** a component previously had both `setup()` and `methods:`
- **THEN** after migration, the component SHALL use `<script setup>` with `defineExpose()` and have no `methods:` property anywhere
