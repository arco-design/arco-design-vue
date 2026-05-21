<template>
  <sd-form :model="form" class="sd:w-150">
    <sd-form-item field="name" label="Username">
      <sd-input v-model="form.name" placeholder="please enter your username..." />
    </sd-form-item>
    <sd-form-item
      v-for="(post, index) of form.posts"
      :field="`posts[${index}].value`"
      :label="`Post-${index}`"
      :key="index"
    >
      <sd-input v-model="post.value" placeholder="please enter your post..." />
      <sd-button @click="handleDelete(index)" class="sd:ml-2.5">Delete</sd-button>
    </sd-form-item>
  </sd-form>
  <div>
    <sd-button @click="handleAdd">Add Post</sd-button>
  </div>
  {{ form }}
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const form = reactive({
    name: '',
    posts: [{ value: '' }],
  });
  const handleAdd = () => {
    form.posts.push({
      value: '',
    });
  };
  const handleDelete = (index: number) => {
    form.posts.splice(index, 1);
  };
</script>
