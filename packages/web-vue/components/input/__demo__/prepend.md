```yaml
title:
  zh-CN: 前置、后置标签
  en-US: Prepend & Append
```

## zh-CN

通过指定 `prepend` 和 `append` 插槽在输入框前后添加元素。

---

## en-US

Add elements before and after the input box by specifying the `prepend` and `append` slots.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear>
      <template #prepend>
        +86
      </template>
    </a-input>
    <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear>
      <template #append>
        RMB
      </template>
    </a-input>

    <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear prepend="+86">
    </a-input>
    <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear append="RMB">
    </a-input>
  </a-space>
</template>
```
