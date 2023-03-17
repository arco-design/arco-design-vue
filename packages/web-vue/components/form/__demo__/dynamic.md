```yaml
title:
  zh-CN: 动态表单
  en-US: Dynamic Form
```

## zh-CN

通过数据动态控制表单内容。

---

## en-US

Dynamically control form content through data.

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}">
    <a-form-item field="name" label="Username">
      <a-input v-model="form.name" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item v-for="(post,index) of form.posts" :field="`posts[${index}].value`" :label="`Post-${index}`" :key="index">
      <a-input v-model="post.value" placeholder="please enter your post..." />
      <a-button @click="handleDelete(index)" :style="{marginLeft:'10px'}">Delete</a-button>
    </a-form-item>
  </a-form>
  <div>
    <a-button @click="handleAdd">Add Post</a-button>
  </div>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      posts: [{value: ''}]
    })
    const handleAdd = () => {
      form.posts.push({
        value: ''
      })
    };
    const handleDelete = (index) => {
      form.posts.splice(index, 1)
    }

    return {
      form,
      handleAdd,
      handleDelete
    }
  },
}
</script>
```
