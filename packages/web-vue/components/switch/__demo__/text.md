```yaml
title:
  zh-CN: 自定义文案
  en-US: Custom Text
```

## zh-CN

自定义开关的打开/关闭状态的文字。

---

## en-US

Customize the text of the on/off state of the switch.

---

```vue
<template>
  <a-space size="large">
    <a-switch>
      <template #checked>
        ON
      </template>
      <template #unchecked>
        OFF
      </template>
    </a-switch>
    <a-switch type="round">
      <template #checked>
        ON
      </template>
      <template #unchecked>
        OFF
      </template>
    </a-switch>
  </a-space>
</template>
```
