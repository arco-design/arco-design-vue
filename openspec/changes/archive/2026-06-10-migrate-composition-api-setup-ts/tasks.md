## 1. Foundation & Validation

- [x] 1.1 Migrate 1 simple reference component (e.g., `alert/alert.vue`) to `<script setup lang="ts">` and verify with `vue-tsc --noEmit` + existing tests pass — this establishes the canonical pattern
- [x] 1.2 Migrate 1 component with `methods:` (e.g., `input/input-password.vue`) to `<script setup lang="ts">` + `defineExpose()` and verify — this establishes the `defineExpose` pattern
- [x] 1.3 Migrate 1 plain-JS component (e.g., `comment/comment.vue`) to `<script setup lang="ts">` and verify — this establishes the JS→TS pattern

## 2. Phase 1 — Simple Components (no methods, no slots/attrs from context)

- [x] 2.1 Migrate `_components/` directory: `feedback-icon.vue`, `icon-hover.vue`, `resize-trigger.vue`, `expand-transition.vue`, `virtual-list.vue`
- [x] 2.2 Migrate `affix/` directory
- [x] 2.3 Migrate `alert/` directory
- [x] 2.4 Migrate `anchor/` directory
- [x] 2.5 Migrate `avatar/` directory
- [x] 2.6 Migrate `back-top/` directory
- [x] 2.7 Migrate `badge/` directory (no `.vue` files — only `.tsx`)
- [x] 2.8 Migrate `breadcrumb/` directory (no `.vue` files — only `.tsx`)
- [x] 2.9 Migrate `button/` directory
- [x] 2.10 Migrate `card/` directory
- [x] 2.11 Migrate `carousel/` directory
- [x] 2.12 Migrate `cascader/` directory
- [x] 2.13 Migrate `checkbox/` directory (no `.vue` files — only `.tsx`)
- [x] 2.14 Migrate `collapse/` directory
- [x] 2.15 Migrate `config-provider/` directory
- [x] 2.16 Migrate `date-picker/` directory
- [x] 2.17 Migrate `descriptions/` directory
- [x] 2.18 Migrate `divider/` directory (no `.vue` files)
- [x] 2.19 Migrate `drawer/` directory
- [x] 2.20 Migrate `dropdown/` directory
- [x] 2.21 Migrate `empty/` directory (no `.vue` files)
- [x] 2.22 Migrate `form/` directory (skip `form.vue` — has methods, handled in Phase 3)
- [x] 2.23 Migrate `grid/` directory
- [x] 2.24 Migrate `icon-component/` directory
- [x] 2.25 Migrate `image/` directory
- [x] 2.26 Migrate `input/` directory (skip `input-password.vue` — done in foundation)
- [x] 2.27 Migrate `input-tag/` directory (no `.vue` files — only `.tsx`)
- [x] 2.28 Migrate `layout/` directory (includes plain-JS `content.vue`, `footer.vue`)
- [x] 2.29 Migrate `link/` directory
- [x] 2.30 Migrate `list/` directory
- [x] 2.31 Migrate `mention/` directory (no `.vue` files — only `.tsx`)
- [x] 2.32 Migrate `menu/` directory (includes plain-JS `indent.vue`)
- [x] 2.33 Migrate `message/` directory
- [x] 2.34 Migrate `modal/` directory
- [x] 2.35 Migrate `notification/` directory
- [x] 2.36 Migrate `page-header/` directory
- [x] 2.37 Migrate `pagination/` directory
- [x] 2.38 Migrate `popconfirm/` directory
- [x] 2.39 Migrate `popover/` directory
- [x] 2.40 Migrate `progress/` directory
- [x] 2.41 Migrate `radio/` directory (no `.vue` files — only `.tsx`)
- [x] 2.42 Migrate `rate/` directory (no `.vue` files — only `.tsx`)
- [x] 2.43 Migrate `resize-box/` directory
- [x] 2.44 Migrate `result/` directory
- [x] 2.45 Migrate `select/` directory
- [x] 2.46 Migrate `skeleton/` directory
- [x] 2.47 Migrate `slider/` directory
- [x] 2.48 Migrate `space/` directory (no `.vue` files — only `.tsx`)
- [x] 2.49 Migrate `spin/` directory (no `.vue` files — only `.tsx`)
- [x] 2.50 Migrate `split/` directory
- [x] 2.51 Migrate `statistic/` directory
- [x] 2.52 Migrate `steps/` directory
- [x] 2.53 Migrate `switch/` directory
- [x] 2.54 Migrate `table/` directory
- [x] 2.55 Migrate `tabs/` directory
- [x] 2.56 Migrate `tag-group/` directory
- [x] 2.57 Migrate `time-picker/` directory
- [x] 2.58 Migrate `timeline/` directory
- [x] 2.59 Migrate `tooltip/` directory
- [x] 2.60 Migrate `transfer/` directory
- [x] 2.61 Migrate `tree/` directory (skip `tree.vue` — has methods, handled in Phase 3)
- [x] 2.62 Migrate `trigger/` directory (no `.vue` files — only `.tsx`)
- [x] 2.63 Migrate `typography/` directory (includes plain-JS `operations.vue`)
- [x] 2.64 Migrate `upload/` directory (no `.vue` files — only `.tsx`)
- [x] 2.65 Migrate `watermark/` directory (no `.vue` files — only `.tsx`)
- [x] 2.66 Migrate `calendar/` directory (all files already use `<script setup>`)
- [x] 2.67 Migrate `color-picker/` directory (no `.vue` files — only `.tsx`)
- [x] 2.68 Migrate `copy/` directory (already setup, verify only)
- [x] 2.69 Migrate `cropper/` directory (already setup, verify only)
- [x] 2.70 Migrate `secret/` directory (already setup, verify only)
- [x] 2.71 Migrate `ellipsis/` directory
- [x] 2.72 Migrate `scrollbar/` directory (skip `scrollbar.vue` — has methods, handled in Phase 3)
- [x] 2.73 Run `vue-tsc --noEmit` and full test suite to validate Phase 1

## 3. Phase 2 — Components Using slots/attrs from Setup Context

- [x] 3.1 Identify all components that access `slots` or `attrs` from `setup(props, { slots, attrs, emit })` and list them
- [x] 3.2 Migrate each identified component, replacing `slots`/`attrs` with `useSlots()`/`useAttrs()` (e.g., collapse, config-provider, layout/sider, menu/base-menu, dropdown-panel, transfer, tree/components, image, page-header, tab-pane, tabs-nav-ink)
- [x] 3.3 Migrate `typography/operations.vue` (plain JS + emit from context)
- [x] 3.4 Run `vue-tsc --noEmit` and full test suite to validate Phase 2

## 4. Phase 3 — Components with `methods:` Option

- [x] 4.1 Migrate `_components/picker/input-range.vue` — replace `methods: { focus, blur }` with `defineExpose({ focus, blur })`
- [x] 4.2 Migrate `_components/picker/input.vue` — replace `methods: { focus, blur }` with `defineExpose({ focus, blur })`
- [x] 4.3 Migrate `affix/affix.vue` — replace `methods: { updatePosition }` with `defineExpose({ updatePosition })`
- [x] 4.4 Migrate `form/form.vue` — replace `methods: { validate, validateField, resetFields, clearValidate, setFields, scrollToField }` with `defineExpose()`
- [x] 4.5 Migrate `input/input-password.vue` — replace `methods: { focus, blur }` with `defineExpose({ focus, blur })`
- [x] 4.6 Migrate `scrollbar/scrollbar.vue` — replace all public OS instance methods with `defineExpose()`
- [x] 4.7 Migrate `textarea/textarea.vue` — replace `methods: { focus, blur }` with `defineExpose({ focus, blur })`
- [x] 4.8 Migrate `tree/tree.vue` — replace all public tree API methods with `defineExpose()`
- [x] 4.9 Run `vue-tsc --noEmit` and full test suite to validate Phase 3

## 5. Phase 4 — Final Validation

- [x] 5.1 Run full `vue-tsc --noEmit` across entire package — zero errors
- [x] 5.2 Run full test suite — all tests pass
- [x] 5.3 Grep for remaining `defineComponent` in `.vue` files — verified: only intentional exceptions (qr-code inner component, node-switcher TSX, test demo)
- [x] 5.4 Grep for remaining `methods:` in `.vue` files — verified: zero hits (excluding `form/__test__/demo.vue`)
- [x] 5.5 Verify no `<script>` (without `lang="ts"`) blocks remain in component files — verified: zero remaining
