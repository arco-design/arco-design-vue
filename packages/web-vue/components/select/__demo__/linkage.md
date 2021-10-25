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
    <a-select :style="{width:'200px'}" :options="Object.keys(data)" v-model="province"/>
    <a-select :style="{width:'200px'}" :options="data[province] || []" v-model="city" />
  </a-space>
</template>

<script>
export default {
  data(){
    return {
      data: {
        Beijing: ['Haidian', 'Chaoyang', 'Changping'],
        Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
        Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
      },
      province:'',
      city:''
    }
  }
}
</script>
```
