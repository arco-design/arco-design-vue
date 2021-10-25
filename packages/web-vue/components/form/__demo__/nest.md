```yaml
title:
  zh-CN: 嵌套数据
  en-US: Nest Data
```

## zh-CN

可以嵌套设置表单。

---

## en-US

Forms can be nested.

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}">
    <a-form-item label="Username">
      <a-form-item field="firstname" :rules="[{required:true,message:'firstname is required'}]" no-style>
        <a-input v-model="form.firstname" placeholder="please enter your firstname..." />
      </a-form-item>
      <a-form-item field="lastname" :rules="[{required:true,message:'lastname is required'}]" no-style>
        <a-input :style="{marginLeft:'10px'}" v-model="form.lastname" placeholder="please enter your lastname..." />
      </a-form-item>
    </a-form-item>
    <a-form-item label="Posts">
      <a-row :style="{flex:1}">
        <a-form-item field="posts.post1" label="Post1">
          <a-input v-model="form.posts.post1" placeholder="please enter your post..." />
        </a-form-item>
        <a-form-item field="posts.post2" label="Post2">
          <a-input v-model="form.posts.post2" placeholder="please enter your post..." />
        </a-form-item>
      </a-row>
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead">
        I have read the manual
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button>Submit</a-button>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        posts: {
          post1: '',
          post2: ''
        },
        isRead: false,
      }
    }
  },
}
</script>
```
