```yaml
title:
  zh-CN: 格栅列表
  en-US: Grid
```

## zh-CN

通过 `grid` 属性来配置格栅列表。

---

## en-US

Configure the grid list through the `grid` property.

---

```vue
<template>
  <a-list :gridProps="{ gutter: 0, span: 6 }" :bordered="false">
    <a-list-item>
      <a-list>
        <template #header>Platform</template>
        <a-list-item>iOS</a-list-item>
        <a-list-item>Android</a-list-item>
        <a-list-item>Web</a-list-item>
      </a-list>
    </a-list-item>
    <a-list-item>
      <a-list>
        <template #header>Framework</template>
        <a-list-item>Angular</a-list-item>
        <a-list-item>Vue</a-list-item>
        <a-list-item>React</a-list-item>
      </a-list>
    </a-list-item>
    <a-list-item>
      <a-list>
        <template #header>Language</template>
        <a-list-item>C++</a-list-item>
        <a-list-item>JavaScript</a-list-item>
        <a-list-item>Python</a-list-item>
      </a-list>
    </a-list-item>
    <a-list-item>
      <a-list>
        <template #header>Component</template>
        <a-list-item>Button</a-list-item>
        <a-list-item>Breadcrumb</a-list-item>
        <a-list-item>Transfer</a-list-item>
      </a-list>
    </a-list-item>
  </a-list>
</template>
```
