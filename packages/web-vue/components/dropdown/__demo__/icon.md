```yaml
title:
  zh-CN: 带图标的选项
  en-US: Icon Options
```

## zh-CN

通过 `icon` 插槽在选项前添加图标。

---

## en-US

Add an icon in front of the option via the `icon` slot.

---

```vue
<template>
  <a-dropdown>
    <a-button>Click Me</a-button>
    <template #content>
      <a-doption>
        <template #icon>
          <icon-location />
        </template>
        Option 1
      </a-doption>
      <a-doption>
        <template #icon>
          <icon-location />
        </template>
        Option 2
      </a-doption>
      <a-doption>
        <template #icon>
          <icon-location />
        </template>
        Option 3
      </a-doption>
    </template>
  </a-dropdown>
</template>
```
