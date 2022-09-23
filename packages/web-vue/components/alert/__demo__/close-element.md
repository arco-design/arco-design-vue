```yaml
title:
  zh-CN: 自定义关闭元素
  en-US: Custom close element
```

## zh-CN

指定 `close-element` slot，自定义关闭元素。

---

## en-US

Specify `close-element` slot, custom close element.

---

```vue
<template>
  <a-row :gutter="[40, 20]">
    <a-col :span="12">
      <a-alert closable>
        <template #close-element>
          <icon-close-circle />
        </template>
        This is an info alert.
      </a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert closable>
        <template #close-element>
          Close
        </template>
        This is an info alert.
      </a-alert>
    </a-col>
  </a-row>
</template>
```
