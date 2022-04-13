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

@import ./__demo__/subtree.md

@import ./__demo__/lazy-load.md

@import ./__demo__/props.md

@import ./__demo__/sort.md

@import ./__demo__/filter.md

@import ./__demo__/scroll.md

@import ./__demo__/fixed.md

@import ./__demo__/span.md

@import ./__demo__/summary.md

@import ./__demo__/column-resize.md

@import ./__demo__/drag-row.md

@import ./__demo__/drag-handle.md

@import ./__demo__/group.md

@import ./__demo__/editable.md

@import ./__demo__/custom.md

@import ./__demo__/custom-dom.md

@import ./__demo__/virtual-list.md

## API

%%API(table.tsx)%%

%%API(table-column.tsx)%%

%%INTERFACE(interface.ts)%%

```ts
type Filters = Record<string, string[]>;

type Sorter = { filed: string; direction: 'ascend' | 'descend' } | Record<string, never>;
```
