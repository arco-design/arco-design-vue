<template>
  <sd-space>
    <sd-button @click="formRef && formRef.validate()">Submit</sd-button>
    <sd-button @click="formRef && formRef.resetFields()">Reset</sd-button>
    <sd-button @click="formRef && formRef.scrollToField('name19')"
      >Scroll to the last field</sd-button
    >
  </sd-space>
  <sd-form
    ref="formRef"
    class="sd:mt-5 sd:h-[300px] sd:w-[500px] sd:overflow-auto sd:pr-4"
    :model="form"
    :scrollToFirstError="true"
  >
    <template v-for="(fieldName, index) in fieldNames" :key="index">
      <sd-form-item
        :field="fieldName"
        :label="'user' + index"
        :rules="[{ required: true, message: 'Name is required' }]"
      >
        <sd-input v-model="form[fieldName]" />
      </sd-form-item>
    </template>
  </sd-form>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const formRef = ref(null);
  const fieldCount = 20;
  const fieldNames = Array.from({ length: fieldCount }, (_, index) => `name${index}`);
  const form = reactive(
    Object.fromEntries(
      fieldNames.map((fieldName, index) => [fieldName, index === 7 ? '' : index.toString()]),
    ),
  );
</script>
