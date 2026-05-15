<template>
  <sd-button @click="handleClick">Open Form Modal</sd-button>
  <sd-modal
    v-model:visible="visible"
    title="Modal Form"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <sd-form :model="form">
      <sd-form-item field="name" label="Name">
        <sd-input v-model="form.name" />
      </sd-form-item>
      <sd-form-item field="post" label="Post">
        <sd-select v-model="form.post">
          <sd-option value="post1">Post1</sd-option>
          <sd-option value="post2">Post2</sd-option>
          <sd-option value="post3">Post3</sd-option>
          <sd-option value="post4">Post4</sd-option>
        </sd-select>
      </sd-form-item>
    </sd-form>
  </sd-modal>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const visible = ref(false);
  const form = reactive({
    name: '',
    post: '',
  });

  const handleClick = () => {
    visible.value = true;
  };
  const handleBeforeOk = (done: (closed: boolean) => void) => {
    console.log(form);
    window.setTimeout(() => {
      done(true);
      // prevent close
      // done(false)
    }, 3000);
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>
