## Why

The component library (`@packages/web-vue/`) contains 424 Vue components that still use the `defineComponent()` + `setup()` function pattern instead of the modern `<script setup lang="ts">` syntax. This creates unnecessary boilerplate, hurts readability, and goes against the Vue 3 community standard. Five components still use plain JavaScript without TypeScript. Migrating to `<script setup lang="ts">` will reduce code volume, improve type inference, and align the codebase with Vue 3 best practices.

## What Changes

- **Convert 395 components** from `<script lang="ts">` + `defineComponent({ setup() {} })` to `<script setup lang="ts">` + `defineProps`/`defineEmits`/`defineExpose`
- **Convert 5 components** from plain `<script>` (no TypeScript) to `<script setup lang="ts">`, adding proper TypeScript types
- **Convert 9 components with `methods:` option** to use `defineExpose()` instead, preserving their public API surface
- **Remove `defineComponent()` wrapper** from all migrated components — no longer needed with `<script setup>`
- **Replace `components:` option** with direct imports (auto-resolved in `<script setup>`)
- **Replace `name:` option** with `defineOptions({ name: '...' })` where needed
- **Convert `props` object** to `defineProps()` with runtime declaration or type-based declaration
- **Convert `emits` object** to `defineEmits()` with type-based declaration
- **Remove explicit `return` from setup** — `<script setup>` auto-exposes all top-level bindings

## Capabilities

### New Capabilities

- `script-setup-migration`: Rules and patterns for converting `defineComponent` + `setup()` to `<script setup lang="ts">`, including handling of `defineProps`, `defineEmits`, `defineExpose`, `defineOptions`, and `useSlots`/`useAttrs`
- `methods-to-define-expose`: Pattern for migrating `methods:` option to `defineExpose()`, covering ref-based public API exposure and the inner-function delegation pattern currently used

### Modified Capabilities

## Impact

- **424 `.vue` component files** in `packages/web-vue/components/` will be modified
- **No breaking changes** to component APIs — all props, emits, slots, and exposed methods remain identical
- **No template changes** — only `<script>` blocks are affected
- **Build tooling** (Vite + vue-tsc) already supports `<script setup>` — no configuration changes needed
- **Tests** should pass unchanged since component behavior is preserved; only implementation style changes
- **IDE experience** improves — Volar provides better type inference and autocomplete with `<script setup>`
