## ADDED Requirements

### Requirement: Script block uses `<script setup lang="ts">` syntax

Every migrated component SHALL use `<script setup lang="ts">` as its script block tag instead of `<script lang="ts">` with `defineComponent()` or `<script>` without `lang`.

#### Scenario: Component previously using defineComponent with setup function

- **WHEN** a component uses `<script lang="ts">` with `export default defineComponent({ setup() { ... } })`
- **THEN** it SHALL be converted to `<script setup lang="ts">` with `defineProps`, `defineEmits`, and top-level bindings (no `export default`, no `defineComponent`, no `return` statement)

#### Scenario: Component previously using plain JavaScript script

- **WHEN** a component uses `<script>` without `lang` attribute
- **THEN** it SHALL be converted to `<script setup lang="ts">` with proper TypeScript types added to all props, emits, and internal logic

### Requirement: Props defined with `defineProps()` runtime declaration

Every migrated component SHALL define its props using `defineProps({ ... })` with runtime declaration style (including `type`, `default`, and JSDoc comments per prop).

#### Scenario: Component with typed props and defaults

- **WHEN** a component defines props like `props: { size: { type: String as PropType<Size>, default: 'medium' } }`
- **THEN** it SHALL be converted to `defineProps({ size: { type: String as PropType<Size>, default: 'medium' } })` preserving all JSDoc comments, types, and defaults

#### Scenario: Component with simple prop shorthand

- **WHEN** a component uses prop shorthand like `title: String`
- **THEN** it SHALL be converted to `title: { type: String }` inside `defineProps()` to maintain consistency

### Requirement: Emits defined with `defineEmits()` type-based declaration

Every migrated component SHALL define its emits using `defineEmits<{ ... }>()` with type-based call signatures.

#### Scenario: Component with runtime emits validation

- **WHEN** a component uses `emits: { click: (ev: MouseEvent) => true }`
- **THEN** it SHALL be converted to `defineEmits<{ 'click': [_ev: MouseEvent] }>()` preserving JSDoc documentation above the call

### Requirement: Component name set via `defineOptions()`

Every migrated component that declares a `name` property SHALL use `defineOptions({ name: 'ComponentName' })`.

#### Scenario: Component with name property

- **WHEN** a component uses `defineComponent({ name: 'Alert', ... })`
- **THEN** it SHALL use `defineOptions({ name: 'Alert' })` inside `<script setup>`

### Requirement: Imported components auto-registered

Every migrated component SHALL remove the `components: { ... }` registration option. Components used in the template SHALL be imported directly in `<script setup>` and auto-resolved by Vue.

#### Scenario: Component registering child components

- **WHEN** a component uses `components: { IconHover, IconClose }`
- **THEN** it SHALL import `IconHover` and `IconClose` directly and remove the `components` option entirely

### Requirement: Setup context replaced with composable functions

Every migrated component SHALL replace setup context destructuring (`{ slots, emit, attrs }`) with the appropriate Composition API utilities.

#### Scenario: Component using slots from setup context

- **WHEN** a component accesses `slots` from `setup(props, { slots })`
- **THEN** it SHALL use `const slots = useSlots()` instead

#### Scenario: Component using attrs from setup context

- **WHEN** a component accesses `attrs` from `setup(props, { attrs })`
- **THEN** it SHALL use `const attrs = useAttrs()` instead

#### Scenario: Component using emit from setup context

- **WHEN** a component accesses `emit` from `setup(props, { emit })`
- **THEN** it SHALL use `const emit = defineEmits<{ ... }>()` and call `emit(...)` directly

### Requirement: No explicit return statement

Every migrated component SHALL NOT contain an explicit `return { ... }` statement. All top-level bindings in `<script setup>` are automatically exposed to the template.

#### Scenario: Setup function returning multiple bindings

- **WHEN** a component's `setup()` function returns `{ prefixCls, cls, visible, handleClose }`
- **THEN** these SHALL be top-level `const` declarations in `<script setup>` with no return statement

### Requirement: Behavior preserved after migration

Every migrated component SHALL preserve identical runtime behavior: same props interface, same emitted events, same slots, same template rendering, and same public API.

#### Scenario: Prop defaults unchanged

- **WHEN** a component has `size: { type: String, default: 'medium' }` before migration
- **THEN** the same default value SHALL be preserved after migration

#### Scenario: Emitted events unchanged

- **WHEN** a component emits `close` with a `MouseEvent` before migration
- **THEN** it SHALL emit the same event with the same argument type after migration

#### Scenario: Template rendering unchanged

- **WHEN** a component renders specific DOM structure before migration
- **THEN** the rendered output SHALL be identical after migration
