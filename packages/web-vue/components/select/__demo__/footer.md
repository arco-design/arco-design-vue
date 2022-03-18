```yaml
title:
  zh-CN: 下拉菜单的页脚
  en-US: Dropdown Footer
```

## zh-CN

自定义下拉菜单的页脚

---

## en-US

custom dropdown menu footer

---

```vue
<template>
  <a-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ...">
    <a-option>Beijing</a-option>
    <a-option>Shanghai</a-option>
    <a-option>Guangzhou</a-option>
    <a-option disabled>Disabled</a-option>
    <a-option>Shenzhen</a-option>
    <a-option>Wuhan</a-option>
    <template #footer>
      <div style="padding: 6px 0; text-align: center;">
        <a-button>Click Me</a-button>
      </div>
    </template>
  </a-select>
</template>
```
