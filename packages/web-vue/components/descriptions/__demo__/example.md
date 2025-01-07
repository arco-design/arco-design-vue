```yaml
title:
  zh-CN: 布局示例
  en-US: Layout Example
```

## zh-CN
`span` 所占列数大于 `column` 可放置的数据个数时，`span` 会被设置为 `column` 的值，当行剩余列数不够放置下一列时将自动换行，每行末尾列会自动填充剩余量。

---

## en-US
When the number of columns occupied by `span` is greater than the number of data that can be placed in `column`, `span` will be set to the value of `column`. When the remaining columns in the row are not enough to place the next column, it will automatically wrap, and the last column of each row will automatically fill the remaining amount.

---

```vue
<template>
  <a-form :model="form" auto-label-width>
    <a-form-item label="size">
      <a-radio-group v-model="form.size" type="button" :options="sizeOptions" />
    </a-form-item>

    <a-form-item label="layout">
      <a-radio-group
        v-model="form.layout"
        type="button"
        :options="layoutOptions"
      />
    </a-form-item>

    <a-form-item label="table-layout">
      <a-radio-group
        v-model="form.tableLayout"
        type="button"
        :options="['auto', 'fixed']"
      />
    </a-form-item>

    <a-form-item label="column">
      <a-radio-group
        v-model="form.column"
        type="button"
        :options="columnOptions"
      />
    </a-form-item>

    <a-form-item label="firstSpan">
      <a-radio-group
        v-model="form.firstSpan"
        type="button"
        :options="firstSpanOptions"
      />
    </a-form-item>
  </a-form>
  <div style="margin-top: 20px">
    <a-descriptions
      title="Layout Example"
      :size="form.size"
      :column="form.column"
      :layout="form.layout"
      :table-layout="form.tableLayout"
      bordered
    >
      <a-descriptions-item label="Item1" :span="form.firstSpan">
        <div>Span：{{form.firstSpan}}
          <span v-if="form.firstSpan > form.column" style="color: red;">
            Exceeds Column, set to Column size
          </span>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="Item2" :span="2">Span：2</a-descriptions-item>
      <a-descriptions-item label="Item3" :span="3">Span：3</a-descriptions-item>
      <a-descriptions-item label="Item4" :span="2">Span：2</a-descriptions-item>
      <a-descriptions-item label="Item5" :span="1">Span：1</a-descriptions-item>
      <a-descriptions-item label="Item6" :span="1">Span：1</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  size: 'medium',
  layout: 'horizontal',
  column: 4,
  tableLayout: 'auto',
  firstSpan: 2
});

const layoutOptions = [
  'horizontal',
  'inline-horizontal',
  'vertical',
  'inline-vertical',
];
const columnOptions = [1, 2, 3, 4, 5];
const firstSpanOptions = [1, 2, 3, 4, 5];
const sizeOptions = ['mini', 'small', 'medium', 'large'];
</script>
```
