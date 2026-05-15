<template>
  <sd-form :model="form" class="sd:w-150">
    <sd-form-item
      label="Username"
      :content-flex="false"
      :merge-props="false"
      extra="Show error message together"
    >
      <sd-row :gutter="8">
        <sd-col :span="12">
          <sd-form-item
            field="together.firstname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'firstname is required' }]"
            no-style
          >
            <sd-input
              v-model="form.together.firstname"
              placeholder="please enter your firstname..."
            />
          </sd-form-item>
        </sd-col>
        <sd-col :span="12">
          <sd-form-item
            field="together.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'lastname is required' }]"
            no-style
          >
            <sd-input
              v-model="form.together.lastname"
              placeholder="please enter your lastname..."
            />
          </sd-form-item>
        </sd-col>
      </sd-row>
    </sd-form-item>
    <sd-form-item label="Username" :content-flex="false" :merge-props="false">
      <sd-row :gutter="8">
        <sd-col :span="12">
          <sd-form-item
            field="separate.firstname"
            validate-trigger="input"
            extra="Show error message separate"
            :rules="[{ required: true, message: 'firstname is required' }]"
            hide-label
          >
            <sd-input
              v-model="form.separate.firstname"
              placeholder="please enter your firstname..."
            />
          </sd-form-item>
        </sd-col>
        <sd-col :span="12">
          <sd-form-item
            field="separate.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'lastname is required' }]"
            hide-label
          >
            <sd-input
              v-model="form.separate.lastname"
              placeholder="please enter your lastname..."
            />
          </sd-form-item>
        </sd-col>
      </sd-row>
    </sd-form-item>
    <sd-form-item label="Posts" :content-flex="false" :merge-props="false">
      <sd-space direction="vertical" fill>
        <sd-form-item field="posts.post1" label="Post1">
          <sd-input v-model="form.posts.post1" placeholder="please enter your post..." />
        </sd-form-item>
        <sd-form-item field="posts.post2" label="Post2">
          <sd-input v-model="form.posts.post2" placeholder="please enter your post..." />
        </sd-form-item>
      </sd-space>
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
      post2: '',
    },
    isRead: false,
  });
</script>
