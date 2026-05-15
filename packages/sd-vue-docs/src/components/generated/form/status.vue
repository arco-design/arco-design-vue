<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group v-model="status" type="button">
      <sd-radio value="validating">validating</sd-radio>
      <sd-radio value="success">success</sd-radio>
      <sd-radio value="error">error</sd-radio>
      <sd-radio value="warning">warning</sd-radio>
    </sd-radio-group>
    <sd-radio-group v-model="size" type="button">
      <sd-radio value="mini">mini</sd-radio>
      <sd-radio value="small">small</sd-radio>
      <sd-radio value="medium">medium</sd-radio>
      <sd-radio value="large">large</sd-radio>
    </sd-radio-group>
  </sd-space>
  <sd-form :model="form" class="sd:w-150 sd:mt-5" :size="size">
    <sd-form-item
      field="name"
      label="Username"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <sd-input v-model="form.name" placeholder="please enter your username..." />
    </sd-form-item>
    <sd-form-item
      field="post"
      label="Post"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <sd-input-number v-model="form.post" placeholder="please enter your post..." />
    </sd-form-item>
    <sd-form-item
      field="tags"
      label="Tags"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <sd-input-tag v-model="form.tags" placeholder="please enter your post..." />
    </sd-form-item>
    <sd-form-item
      field="section"
      label="Section"
      :rules="[{ match: /section one/, message: 'must select one' }]"
      :validate-status="status"
      feedback
    >
      <sd-select v-model="form.section" placeholder="Please select ...">
        <sd-option value="section one">Section One</sd-option>
        <sd-option value="section two">Section Two</sd-option>
        <sd-option value="section three">Section Three</sd-option>
      </sd-select>
    </sd-form-item>
    <sd-form-item label="DateRange" :validate-status="status" feedback>
      <sd-range-picker></sd-range-picker>
    </sd-form-item>

    <sd-form-item field="date" label="Date" :validate-status="status" feedback>
      <sd-date-picker></sd-date-picker>
    </sd-form-item>

    <sd-form-item field="time" label="Time" :validate-status="status" feedback>
      <sd-time-picker></sd-time-picker>
    </sd-form-item>
  </sd-form>
</template>

<script setup lang="ts">
  import type { Size, ValidateStatus } from '@sdata/web-vue';

  import { reactive, ref } from 'vue';

  const status = ref<ValidateStatus>('success');
  const size = ref<Size>('medium');
  const form = reactive({
    name: '',
    post: undefined,
    tags: ['tag1'],
    section: '',
  });
</script>
