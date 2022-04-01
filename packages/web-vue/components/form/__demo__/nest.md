```yaml
title:
  zh-CN: 嵌套数据
  en-US: Nest Data
```

## zh-CN

展示了多种表单项嵌套的方式。
表单项组件默认会将表单项状态和事件绑定到第一子组件，如果想要使用表单项进行布局设置，请设置 `:merge-props="false"` 以关闭绑定，或者使用函数指定需要绑定的数据。
如果使用 grid 组件进行布局，请设置 `:content-flex="false"` 关闭表单项内容的 flex 布局。

---

## en-US

Shows a variety of ways to nest form items.
The form item component binds the form item state and events to the first sub-component by default. If you want to use the form item for layout settings, please set `:merge-props="false"` to close the binding, or use a function to specify The data that needs to be bound.
If you use the grid component for layout, please set `:content-flex="false"` to turn off the flex layout of the form item content.

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}">
    <a-form-item label="Username" :content-flex="false" :merge-props="false" extra="Show error message together">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-form-item field="together.firstname" validate-trigger="input"
                       :rules="[{required:true,message:'firstname is required'}]" no-style>
            <a-input v-model="form.together.firstname" placeholder="please enter your firstname..." />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="together.lastname" validate-trigger="input"
                       :rules="[{required:true,message:'lastname is required'}]" no-style>
            <a-input v-model="form.together.lastname" placeholder="please enter your lastname..." />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item label="Username" :content-flex="false" :merge-props="false">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-form-item field="separate.firstname" validate-trigger="input"
                       extra="Show error message separate"
                       :rules="[{required:true,message:'firstname is required'}]" hide-label>
            <a-input v-model="form.separate.firstname" placeholder="please enter your firstname..." />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="separate.lastname" validate-trigger="input"
                       :rules="[{required:true,message:'lastname is required'}]" hide-label>
            <a-input v-model="form.separate.lastname" placeholder="please enter your lastname..." />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item label="Posts" :content-flex="false" :merge-props="false">
      <a-space direction="vertical" fill>
        <a-form-item field="posts.post1" label="Post1">
          <a-input v-model="form.posts.post1" placeholder="please enter your post..." />
        </a-form-item>
        <a-form-item field="posts.post2" label="Post2">
          <a-input v-model="form.posts.post2" placeholder="please enter your post..." />
        </a-form-item>
      </a-space>
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead">
        I have read the manual
      </a-checkbox>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      together: {
        firstname: '',
        lastname: '',
      },
      separate: {
        firstname: '',
        lastname: '',
      },
      posts: {
        post1: '',
        post2: ''
      },
      isRead: false,
    })

    return {
      form,
    }
  },
}
</script>
```
