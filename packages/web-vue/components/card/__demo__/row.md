```yaml
title:
  zh-CN: 栅格卡片
  en-US: With Row
```

## zh-CN

在系统概览页面常常和栅格进行配合。

---

## en-US

The system overview page often cooperates with the grid.

---

```vue
<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-row :gutter="20" :style="{ marginBottom: '20px' }">
      <a-col :span="8">
        <a-card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <a-link>More</a-link>
          </template>
          Card content
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <a-link>More</a-link>
          </template>
          Card content
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <a-link>More</a-link>
          </template>
          Card content
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="16">
        <a-card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <a-link>More</a-link>
          </template>
          Card content
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Arco Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <a-link>More</a-link>
          </template>
          Card content
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
```
