```yaml
title:
  zh-CN: UTC 时间
  en-US: UTC
```

## zh-CN

通过 `utc-offset` 设置时区偏移。

**注意：使用 UTC 或时区时间时，建议传入 timestamp 或 Date 对象。字符串无法唯一表示时间，容易产生歧义。**

---

## en-US

Set timezone offset with `utc-offset`.

**Note: When using UTC or timezone time, prefer timestamp or Date object values. Strings cannot represent a unique time and may cause ambiguity.**

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-select
        v-model="utcOffset"
        :options="utcOptions"
        style="width: 180px"
      />
      <a-date-picker
        show-time
        style="width: 260px"
        :utc-offset="utcOffset"
        v-model="value"
      />
      <a-range-picker
        show-time
        style="width: 360px"
        :utc-offset="utcOffset"
        v-model="rangeValue"
      />
    </a-space>
    <pre>{{ output }}</pre>
  </a-space>
</template>

<script>
import { computed, ref } from 'vue';

const utcOptions = Array.from({ length: 25 }, (_, i) => {
  const offset = i - 12;
  return {
    label: `UTC ${offset > 0 ? `+${offset}` : offset}`,
    value: offset,
  };
});

export default {
  setup() {
    const utcOffset = ref(0);
    const value = ref(new Date('2022-02-22 08:00:00'));
    const rangeValue = ref([
      new Date('2022-02-22 08:00:00'),
      new Date('2022-02-22 10:00:00'),
    ]);

    const output = computed(() =>
      JSON.stringify(
        {
          utcOffset: utcOffset.value,
          value: value.value,
          rangeValue: rangeValue.value,
        },
        null,
        2
      )
    );

    return {
      utcOptions,
      utcOffset,
      value,
      rangeValue,
      output,
    };
  },
};
</script>
```
