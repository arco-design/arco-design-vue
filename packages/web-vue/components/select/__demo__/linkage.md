```yaml
title:
  zh-CN: 联动选择框
  en-US: Linkage Select
```

## zh-CN

展示联动选择框的实现方法。

---

## en-US

Show how to realize the linkage selection box.

---

```vue

<template>
  <a-space>
    <a-select :style="{width:'200px'}" v-model="province">
      <a-option v-for="value of Object.keys(data)">{{value}}</a-option>
    </a-select>
    <a-select :style="{width:'200px'}" :options="data[province] || []" v-model="city" />
  </a-space>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const province = ref('Sichuan');
    const city = ref('Chengdu');
    const data = {
      Beijing: ['Haidian', 'Chaoyang', 'Changping'],
      Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
      Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
    };

    watch(province, () => {
      city.value = ''
    })

    return {
      province,
      city,
      data
    }
  },
}
</script>
```
