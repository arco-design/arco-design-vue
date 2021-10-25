```yaml
title:
  zh-CN: 提示标题
  en-US: Alert Title
```

## zh-CN

通过设置 `title` 可以给警告提示添加标题。

---

## en-US

You can add a title to the warning prompt by setting `title`.

---

```vue
<template>
  <a-row :gutter="[40, 20]">
    <a-col :span="12">
      <a-alert title="Info">This is an info alert.</a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert title="Success" type="success">This is an success alert.</a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert type="warning">
        <template #title>
          Warning
        </template>
        This is an warning alert.
      </a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert type="error">
        <template #title>
          Error
        </template>
        This is an error alert.
      </a-alert>
    </a-col>
  </a-row>
</template>
```
