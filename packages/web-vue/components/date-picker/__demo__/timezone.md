```yaml
title:
  zh-CN: 设置时区
  en-US: Timezone
```

## zh-CN

通过 `timezone` 设置时区；若同时设置 `utc-offset`，以 `utc-offset` 为准。

**注意：使用 UTC 或时区时间时，建议传入 timestamp 或 Date 对象。字符串无法唯一表示时间，容易产生歧义。**

---

## en-US

Set timezone with `timezone`. If `utc-offset` is also set, `utc-offset` takes precedence.

**Note: When using UTC or timezone time, prefer timestamp or Date object values. Strings cannot represent a unique time and may cause ambiguity.**

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-select
        v-model="timezone"
        :options="zoneOptions"
        style="width: 220px"
      />
      <a-date-picker
        show-time
        style="width: 260px"
        :timezone="timezone"
        v-model="value"
      />
      <a-range-picker
        show-time
        style="width: 360px"
        :timezone="timezone"
        v-model="rangeValue"
      />
    </a-space>
    <pre>{{ output }}</pre>
  </a-space>
</template>

<script>
import { computed, ref } from 'vue';

const zoneOptions = [
  'America/Los_Angeles',
  'Europe/London',
  'Africa/Cairo',
  'Asia/Shanghai',
].map((zone) => ({ label: zone, value: zone }));

export default {
  setup() {
    const timezone = ref('Asia/Shanghai');
    const value = ref(new Date('2022-02-22 08:00:00'));
    const rangeValue = ref([
      new Date('2022-02-22 08:00:00'),
      new Date('2022-02-22 10:00:00'),
    ]);

    const output = computed(() =>
      JSON.stringify(
        {
          timezone: timezone.value,
          value: value.value,
          rangeValue: rangeValue.value,
        },
        null,
        2
      )
    );

    return {
      zoneOptions,
      timezone,
      value,
      rangeValue,
      output,
    };
  },
};
</script>
```
