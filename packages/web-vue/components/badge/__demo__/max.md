```yaml
title:
  zh-CN: 最大值
  en-US: Max Count
```

## zh-CN

设置 `max-count`，可以限制最大显示的徽标数值，超过将会加 `+` 后缀。`max-count` 默认为 `99`。

---

## en-US

If the count is larger than `max-count`, the `${max-count}+` will be displayed. The default value of `max-count` is `99`.

---

```vue
<template>
  <a-space :size="40">
    <a-badge :max-count="10" :count="0">
      <a-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </a-avatar>
    </a-badge>
    <a-badge :max-count="10" :count="100">
      <a-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </a-avatar>
    </a-badge>
    <a-badge :count="100">
      <a-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </a-avatar>
    </a-badge>
    <a-badge :max-count="999" :count="1000">
      <a-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </a-avatar>
    </a-badge>
  </a-space>
</template>

<script>
import { IconUser } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconUser },
};
</script>
```
