<template>
  <sd-space direction="vertical" size="large" class="sd:w-150">
    <sd-radio-group v-model="layout" type="button">
      <sd-radio value="horizontal">horizontal</sd-radio>
      <sd-radio value="vertical">vertical</sd-radio>
      <sd-radio value="inline">inline</sd-radio>
    </sd-radio-group>
    <sd-form :model="form" :layout="layout">
      <sd-form-item field="name" label="Username">
        <sd-input v-model="form.name" placeholder="please enter your username..." />
      </sd-form-item>
      <sd-form-item field="post" label="Post">
        <sd-input v-model="form.post" placeholder="please enter your post..." />
      </sd-form-item>
      <sd-form-item field="isRead">
        <sd-checkbox v-model="form.isRead"> I have read the manual </sd-checkbox>
      </sd-form-item>
      <sd-form-item>
        <sd-button>Submit</sd-button>
      </sd-form-item>
    </sd-form>
    <div>
      {{ form }}
    </div>
  </sd-space>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const layout = ref<'horizontal' | 'vertical' | 'inline'>('horizontal');
  const form = reactive({
    name: '',
    post: '',
    isRead: false,
  });
</script>
