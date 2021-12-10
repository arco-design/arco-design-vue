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
        <template #default>Option 1</template>
      </a-doption>
      <a-doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 2</template>
      </a-doption>
      <a-doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 3</template>
      </a-doption>
    </template>
  </a-dropdown>
</template>
```
