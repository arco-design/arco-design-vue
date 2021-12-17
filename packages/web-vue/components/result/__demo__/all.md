```yaml
title:
  zh-CN: 完整功能
  en-US: All features
```

## zh-CN

完整功能

---

## en-US

All features

---

```vue
<template>
  <a-result status="error" title="No internet ">
    <template #icon>
      <IconFaceFrownFill />
    </template>
    <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

    <template #extra>
      <a-button type="primary">Refresh</a-button>
    </template>
    <a-typography style="background: var(--color-fill-2); padding: 24px;">
      <a-typography-paragraph>Try:</a-typography-paragraph>
      <ul>
        <li> Checking the network cables, modem, and router </li>
        <li> Reconnecting to Wi-Fi </li>
      </ul>
    </a-typography>
  </a-result>
</template>

<script>
import { IconFaceFrownFill } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconFaceFrownFill
  },
}
</script>
```
