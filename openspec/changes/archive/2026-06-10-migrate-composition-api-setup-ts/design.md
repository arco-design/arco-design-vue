## Context

The SD Design Vue component library (`@packages/web-vue/`) contains 439 `.vue` files across 70+ component directories. The vast majority (395) use `<script lang="ts">` with the `defineComponent()` + `setup()` function pattern. Five use plain `<script>` without TypeScript. Only 15 already use `<script setup lang="ts">`.

The codebase already uses Vue 3's Composition API internally (via `setup()` function), so this is purely a syntax migration — not a paradigm shift. The project's build tooling (Vite + vue-tsc) fully supports `<script setup>`.

Key existing patterns:

- **26 shared composables** in `_hooks/` (e.g., `use-size`, `use-form-item`, `use-merge-state`)
- **Component-specific composables** in per-component `hooks/` directories
- **9 components** expose public methods via `methods:` option, using an "inner function delegation" pattern (create `inner*` in setup, delegate from `methods:`)
- **`defineOptions`** is already used in the 15 modern components (e.g., `tag.vue`)

## Goals / Non-Goals

**Goals:**

- Migrate all 424 non-`<script setup>` components to `<script setup lang="ts">`
- Preserve identical component behavior (props, emits, slots, exposed methods)
- Reduce boilerplate: eliminate `defineComponent()`, explicit `return`, `components:` registration
- Add TypeScript to the 5 plain-JS components
- Use `defineExpose()` for the 9 components that currently use `methods:`

**Non-Goals:**

- Refactoring component logic or reorganizing file structure
- Changing template syntax or CSS
- Migrating test files (they can remain as-is)
- Converting `defineProps` runtime declarations to pure type-based declarations (keep runtime declarations for JSDoc prop documentation support)
- Updating documentation/demo files (separate concern)

## Decisions

### Decision 1: Use `defineProps()` with runtime declaration (not pure type-based)

**Choice**: Keep runtime-style `defineProps({ ... })` with `type`, `default`, and JSDoc comments.

**Rationale**: The codebase heavily uses JSDoc comments (`@zh`, `@en`) on prop definitions for documentation generation. Pure type-based `defineProps<{}>()` doesn't support runtime defaults or JSDoc on individual props. The existing `tag.vue` (already migrated) confirms this pattern.

**Alternative considered**: Pure type-based `defineProps<{ ... }>()` with `withDefaults()` — rejected because it loses JSDoc per-prop documentation and makes default values less readable.

### Decision 2: Use `defineOptions({ name: '...' })` for component names

**Choice**: Replace `name: 'ComponentName'` in `defineComponent()` with `defineOptions({ name: 'ComponentName' })`.

**Rationale**: `<script setup>` doesn't support the `name` option natively. `defineOptions` is the standard solution and is already used in the codebase (e.g., `tag.vue`). Component names are needed for `keep-alive`, devtools, and recursive components.

**Alternative considered**: Separate `<script>` block with just `export default { name: '...' }` — rejected because `defineOptions` is cleaner and already in use.

### Decision 3: Remove `components:` registration — rely on auto-import

**Choice**: Import components directly in `<script setup>` and let Vue auto-resolve them.

**Rationale**: In `<script setup>`, imported components are automatically registered. This eliminates the `components: { ... }` boilerplate. The 15 already-migrated components confirm this works.

### Decision 4: Use `defineEmits<{ ... }>()` with type-based declaration

**Choice**: Convert `emits: { ... }` to `defineEmits<{ ... }>()` with type-based call signatures.

**Rationale**: Type-based emits provide better type safety than the runtime `emits: { ... }` validation form. The existing `tag.vue` already uses this pattern. The JSDoc comments on emits can be placed above the `defineEmits` call.

**Alternative considered**: Runtime `defineEmits({ ... })` — rejected because type-based emits are more idiomatic and already proven in the codebase.

### Decision 5: Use `defineExpose()` for public methods

**Choice**: Replace the `methods:` option with `defineExpose({ ... })`, exposing the same functions directly.

**Rationale**: The current "inner function delegation" pattern (`setup()` creates `innerValidate`, `methods:` delegates `validate() { return this.innerValidate() }`) is a workaround for Options API limitations. With `<script setup>`, `defineExpose()` provides direct access to the actual functions, eliminating the indirection.

**Alternative considered**: Keep a separate `<script>` block for `methods:` — rejected because it creates a confusing hybrid and `defineExpose` is the standard approach.

### Decision 6: Batch migration by component directory

**Choice**: Migrate components in batches organized by component directory, starting with simpler components and progressing to complex ones.

**Rationale**: Grouping by directory keeps related changes together, makes review easier, and ensures each component's test suite can be verified independently. Starting simple establishes patterns for complex cases.

### Decision 7: Use `useSlots()` and `useAttrs()` instead of setup context

**Choice**: Replace `setup(props, { slots, emit, attrs })` destructuring with `useSlots()`, `useAttrs()`, and `defineEmits()`.

**Rationale**: In `<script setup>`, the setup function context is not available. `useSlots()` and `useAttrs()` are the standard replacements. `defineEmits()` replaces `emit` from context.

## Risks / Trade-offs

- **[Risk] Behavioral drift during migration** → Mitigation: Each component is a pure syntax transformation with no logic changes. Run `vue-tsc` and existing test suite after each batch.
- **[Risk] `defineExpose` changes ref access pattern** → Mitigation: Parent components using `ref.value.validate()` already access exposed methods the same way — `defineExpose` just changes what's on the internal `setup` return, not the template-ref-based public API.
- **[Risk] Large PR surface area (424 files)** → Mitigation: Batch by component directory. Each batch is reviewable and independently verifiable.
- **[Risk] Loss of JSDoc on emits** → Mitigation: Place JSDoc comments directly above `defineEmits()` call, matching existing `tag.vue` pattern.
- **[Trade-off] Runtime `defineProps` is more verbose than type-based** → Accepted: Preserving JSDoc documentation generation is more valuable than conciseness.

## Migration Plan

1. **Phase 1 — Simple components** (no `methods:`, no `slots`/`attrs` usage): ~350 files. Mechanical transformation.
2. **Phase 2 — Components using `slots`/`attrs` from setup context**: ~65 files. Replace with `useSlots()`/`useAttrs()`.
3. **Phase 3 — Components with `methods:` option**: 9 files. Replace with `defineExpose()`.
4. **Phase 4 — Plain JS components**: 5 files. Add `lang="ts"` and TypeScript types alongside `<script setup>` conversion.
5. **Verify**: Run `vue-tsc --noEmit` and full test suite after each phase.

**Rollback**: Each batch is a single commit. Revert the commit if issues arise. No database or deployment concerns.

## Open Questions

- None — the migration is well-scoped and the patterns are established by the 15 already-migrated components.
