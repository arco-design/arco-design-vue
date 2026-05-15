<template>
  <sd-form :model="form">
    <sd-row :gutter="16">
      <sd-col :span="8">
        <sd-form-item field="value1" label="Value 1" label-col-flex="100px">
          <sd-input v-model="form.value1" placeholder="please enter..." />
        </sd-form-item>
      </sd-col>
      <sd-col :span="8">
        <sd-form-item field="value2" label="Value 2" label-col-flex="80px">
          <sd-input v-model="form.value2" placeholder="please enter..." />
        </sd-form-item>
      </sd-col>
      <sd-col :span="8">
        <sd-form-item field="value3" label="Value 3" label-col-flex="80px">
          <sd-input v-model="form.value3" placeholder="please enter..." />
        </sd-form-item>
      </sd-col>
    </sd-row>
    <sd-row :gutter="16">
      <sd-col :span="16">
        <sd-form-item field="value4" label="Value 4" label-col-flex="100px">
          <sd-input v-model="form.value4" placeholder="please enter..." />
        </sd-form-item>
      </sd-col>
      <sd-col :span="8">
        <sd-form-item field="value5" label="Value 5" label-col-flex="80px">
          <sd-input v-model="form.value5" placeholder="please enter..." />
        </sd-form-item>
      </sd-col>
    </sd-row>
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
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });
</script>
