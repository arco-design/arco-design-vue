```yaml
title:
  zh-CN: 动态增减标签页
  en-US: Editable
```

## zh-CN

通过设置 `:editable="true"` 可以开启动态增减标签页。

---

## en-US

By setting `:editable="true"`, you can turn on the dynamic increase and decrease tabs.

---

```vue
<template>
  <a-tabs type="card-gutter" :editable="true" @add="handleAdd" @delete="handleDelete" show-add-button>
    <a-tab-pane v-for="(item, index) of data" :key="item.key" :title="item.title" :closable="index!==2">
      {{ item?.content }}
    </a-tab-pane>
  </a-tabs>
</template>

<script>
let count = 5;

export default {
  data(){
    return {
      data: [
        {
          key: '1',
          title: 'Tab 1',
          content: 'Content of Tab Panel 1'
        },
        {
          key: '2',
          title: 'Tab 2',
          content: 'Content of Tab Panel 2'
        },
        {
          key: '3',
          title: 'Tab 3',
          content: 'Content of Tab Panel 3'
        },
        {
          key: '4',
          title: 'Tab 4',
          content: 'Content of Tab Panel 4'
        }
      ]
    }
  },
  methods: {
    handleAdd() {
      const number = count++;
      this.data.push({
        key: `${number}`,
        title: `New Tab ${number}`,
        content: `Content of New Tab Panel ${number}`
      })
    },
    handleDelete(key) {
      this.data = this.data.filter(item => item.key !== key)
    }
  }
}
</script>
```
