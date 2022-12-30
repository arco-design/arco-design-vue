```yaml
title:
  zh-CN: 提示类型
  en-US: Alert Type
```

## zh-CN

警告提示有 `info`、`success`、`warning`、`error` 四种类型。2.41.0 版本新增 `normal` 类型，此类型下默认不展示图标。

---

## en-US

There are four types of warnings: `info`, `success`, `warning`, and `error`. Version 2.41.0 adds the `normal` type, which has no icon by default.

---

```vue
<template>
  <a-row :gutter="[40, 20]">
    <a-col :span="12">
      <a-alert>This is an info alert.</a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert type="success">This is an success alert.</a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert type="warning">This is an warning alert.</a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert type="error">This is an error alert.</a-alert>
    </a-col>
    <a-col :span="12">
      <a-alert type="normal">
        <template #icon>
          <icon-exclamation-circle-fill />
        </template>
        This is an normal alert.
      </a-alert>
    </a-col>
  </a-row>
</template>

<script>
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconExclamationCircleFill }
};
</script>
```
