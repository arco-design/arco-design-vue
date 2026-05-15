<template>
  <sd-form :model="form" class="sd:w-150">
    <sd-form-item field="name" label="Username" validate-trigger="input" required>
      <sd-input v-model="form.name" placeholder="please enter your username..." />
      <template #extra>
        <div>Used to login</div>
      </template>
    </sd-form-item>
    <sd-form-item field="post" label="Post" validate-trigger="input" required>
      <sd-input v-model="form.post" placeholder="please enter your post..." />
      <template #extra>
        <div>Used to login</div>
      </template>
      <template #help>
        <div>Custom valitae message</div>
      </template>
    </sd-form-item>
    <sd-form-item field="isRead">
      <sd-checkbox v-model="form.isRead"> I have read the manual </sd-checkbox>
    </sd-form-item>
  </sd-form>
  {{ form }}
</template>

<script setup lang="ts">
  import type {
    FieldRule,
    FormInstance,
    Size,
    ValidateStatus,
    ValidatedError,
  } from '@sdata/web-vue';

  import { reactive } from 'vue';

  const form = reactive({
    name: '',
    post: '',
    isRead: false,
  });
</script>
