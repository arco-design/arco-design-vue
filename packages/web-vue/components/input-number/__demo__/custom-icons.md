```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom step icon
```

## zh-CN

为步进器设置自定义图标 `iconPlus`(增加) 和 `iconMinus` (减少)

---

## en-US

Set a custom icon for the stepper `iconPlus` and `iconMinus`

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number :style="{width:'320px'}" placeholder="Please enter something">
      <template #iconPlus>
        <icon-caret-up />
      </template>
      <template #iconMinus>
        <icon-caret-down />
      </template>
    </a-input-number>
    <a-input-number :style="{width:'320px'}" mode="button" placeholder="Please enter something">
      <template #iconPlus>
        <icon-caret-right />
      </template>
      <template #iconMinus>
        <icon-caret-left />
      </template>
    </a-input-number>
  </a-space>
</template>
```
