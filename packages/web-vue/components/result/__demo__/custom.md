```yaml
title:
  zh-CN: 自定义状态
  en-US: Custom Status
```

## zh-CN

自定义状态。需要传入指定的图标

---

## en-US

Custom Status. You need to set the Icon property

---

```vue
<template>
  <a-result :status="null" title="This is title content" subtitle="This is subtitle content">
    <template #icon>
      <IconFaceSmileFill />
    </template>
    <template #extra>
      <a-space>
        <a-button type="secondary">Again</a-button>
        <a-button type="primary">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>
<script>
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconFaceSmileFill
  },
}
</script>
```
