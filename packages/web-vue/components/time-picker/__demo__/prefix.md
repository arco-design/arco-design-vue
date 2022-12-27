```yaml
title:
  zh-CN: 前缀
  en-US: Prefix
```

## zh-CN

通过 `prefix` 插槽可以设置输入框前缀

---

## en-US

The prefix of the input box can be set through the `prefix` slot

---

```vue
<template>
  <div>
    <div>
      <a-time-picker style="width: 194px;">
        <template #prefix>
          <IconInfoCircle />
        </template> </a-time-picker
    ></div>
    <div>
      <a-time-picker type="time-range" style="width: 252px; margin-top: 20px">
        <template #prefix>
          <IconInfoCircle />
        </template>
      </a-time-picker>
    </div>
  </div>
</template>

<script>
import { IconInfoCircle } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconInfoCircle },
};
</script>
```
