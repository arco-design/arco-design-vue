```yaml
title:
  zh-CN: 自定义搜索按钮
  en-US: Custom search button
```

## zh-CN

自定义搜索按钮的内容

---

## en-US

Customize the content of the search button

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-search :style="{width:'320px'}" placeholder="Please enter something" button-text="Search" search-button/>
    <a-input-search :style="{width:'320px'}" placeholder="Please enter something" search-button>
      <template #button-icon>
        <icon-search/>
      </template>
      <template #button-default>
        Search
      </template>
    </a-input-search>
  </a-space>
</template>
```
