```yaml
title:
  zh-CN: 下拉菜单的页头
  en-US: Dropdown Header
```

## zh-CN

自定义下拉菜单的页头

---

## en-US

custom dropdown menu header

---

```vue
<template>
  <a-space>
    <a-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ..." multiple>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Wuhan</a-option>
      <template #header>
        <div style="padding: 6px 12px;" >
          <a-checkbox value="1">全选</a-checkbox>
        </div>
      </template>
    </a-select>

    <a-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ..." multiple show-header-on-empty>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Wuhan</a-option>
      <template #header>
        <div style="padding: 6px 12px;" >
          <a-checkbox value="1">全选</a-checkbox>
        </div>
      </template>
    </a-select>
  </a-space>
</template>
```
