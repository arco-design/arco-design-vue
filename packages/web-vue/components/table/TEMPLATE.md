## zh-CN
```yaml
meta:
  type: 组件
  category: 数据展示
title: 表格 Table
description: 用于数据收集展示、分析整理、操作处理。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Data Display
title: Table
description: It is used for data collection, display, analysis and processing, and operation and processing.
```
---

@import ./__demo__/basic.md

@import ./__demo__/row-selection.md

@import ./__demo__/radio.md

@import ./__demo__/expand.md

@import ./__demo__/ellipsis.md

@import ./__demo__/subtree.md

@import ./__demo__/lazy-load.md

@import ./__demo__/props.md

@import ./__demo__/sort.md

@import ./__demo__/filter.md

@import ./__demo__/scroll.md

@import ./__demo__/fixed.md

@import ./__demo__/span.md

@import ./__demo__/sticky.md

@import ./__demo__/summary.md

@import ./__demo__/resize.md

@import ./__demo__/drag-row.md

@import ./__demo__/drag-handle.md

@import ./__demo__/group.md

@import ./__demo__/fixed-group.md

@import ./__demo__/editable.md

@import ./__demo__/custom.md

@import ./__demo__/custom-dom.md

@import ./__demo__/virtual-list.md

## API

%%API(table.tsx)%%

%%API(table-column.tsx)%%

## Type

```ts
type Filters = Record<string, string[]>;

type Sorter = { filed: string; direction: 'ascend' | 'descend' } | Record<string, never>;
```

%%INTERFACE(interface.ts)%%

%%INTERFACE(../_components/virtual-list-v2/interface.ts)%%

## FAQ

## zh-CN
### 1. 关于元素插槽的使用

table 组件提供了内部元素的自定义插槽，这些插槽不同于普通插槽，对用户传入的内容有一定限制。
因为 vue 的插槽没有提供传出 children 并在 slot 中渲染的方式，我们针对 table 中的元素插槽，做了一些特殊处理，会在用户传入的内容中，附加上原有的 children，保证子元素的正常渲染。
此时需要用户注意，在元素插槽中自定义渲染时，需要传入单一空元素使用，不能在传入的元素中添加内容（参考例 1）。
如果用户需要传入复合元素，可以自定义组件，并指定 default 插槽，然后传入 table 的元素插槽中（参考例 2）。

例 1：
```vue
<!-- Only one element -->
<template>
  <a-table>
    <template #td>
      <td @click="onClick"></td>
    </template>
  </a-table>
</template>
```
例 2：
```vue
<!-- Only one component -->
<template>
  <a-table>
    <template #td>
      <MyTd></MyTd>
    </template>
  </a-table>
</template>
```
```vue
<!-- MyTd.vue -->
<template>
  <td>
    <div>my td content</div>
    <div>
      <slot/>
    </div>
  </td>
</template>
```

### 2. 关于数据中的 `row-key` 设置

表格默认会通过数据中设置的 `key` 字段来唯一定位行数据，在提供数据时请确保行数据中都设置了 `key` 字段。这个字段在开启选择器等功能时为必要字段，如果想要更换默认的字段名，可以修改 `row-key` 进行设置。

---


## en-US
The table component provides custom slots for internal elements, which are different from normal slots and have certain restrictions on what the user can pass in.
Because the slot of vue does not provide a way to send out children and render them in the slot, we have done some special processing for the element slot in the table, and will append the original children to the content passed in by the user to ensure that children Normal rendering of the element.
At this point, the user needs to pay attention that when custom rendering in the element slot, a single empty element needs to be passed in, and content cannot be added to the passed in element (refer to Example 1).
If the user needs to pass in a composite element, he can customize the component, specify the default slot, and then pass it into the element slot of the table (refer to Example 2).

example 1:
```vue
<!-- Only one element -->
<template>
  <a-table>
    <template #td>
      <td @click="onClick"></td>
    </template>
  </a-table>
</template>
```
example 2：
```vue
<!-- Only one component -->
<template>
  <a-table>
    <template #td>
      <MyTd></MyTd>
    </template>
  </a-table>
</template>
```
```vue
<!-- MyTd.vue -->
<template>
  <td>
    <div>my td content</div>
    <div>
      <slot/>
    </div>
  </td>
</template>
```

### 2. About the `row-key` setting in the data

By default, the table will uniquely locate the row data through the `key` field set in the data. When providing data, please ensure that the `key` field is set in the row data. This field is a necessary field when enabling functions such as selectors. If you want to change the default field name, you can modify `row-key` to set it.

---
