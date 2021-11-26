```yaml
title:
  zh-CN: 图标
  en-US: Icon
```

## zh-CN

通过 `icon` 设置带图标的链接，设置为 `true` 时候显示默认图标。

---

## en-US

Customize icon node. If true, the default icon will be displayed.


---

```vue
<template>
  <div>
    <a-space>
      <a-link href="link" icon>Link</a-link>
      <a-link href="link" disabled icon>Link</a-link>
    </a-space>
  </div>
  <div>
    <a-space>
      <a-link href="link">
        <template #icon>
          <icon-edit />
        </template>
        Link
      </a-link>
      <a-link href="link" disabled>
        <template #icon>
          <icon-edit />
        </template>
        Link
      </a-link>
    </a-space>
  </div>
</template>

<script>
  import { IconEdit } from '@arco-design/web-vue/es/icon';

  export default {
    components: { IconEdit }
  };
</script>
```
