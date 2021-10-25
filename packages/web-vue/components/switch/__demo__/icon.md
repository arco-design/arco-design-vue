```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```

## zh-CN

自定义开关按钮上显示的图标。

---

## en-US

Customize the icon displayed on the switch button.

---

```vue
<template>
  <a-space size="large">
    <a-switch>
      <template #checked-icon>
        <icon-check/>
      </template>
      <template #unchecked-icon>
        <icon-close/>
      </template>
    </a-switch>
    <a-switch type="round">
      <template #checked-icon>
        <icon-check/>
      </template>
      <template #unchecked-icon>
        <icon-close/>
      </template>
    </a-switch>
    <a-switch type="line">
      <template #checked-icon>
        <icon-check/>
      </template>
      <template #unchecked-icon>
        <icon-close/>
      </template>
    </a-switch>
  </a-space>
</template>
```
