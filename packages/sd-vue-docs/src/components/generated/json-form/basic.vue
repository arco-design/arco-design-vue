<template>
  <sd-json-form v-model="formState" :schemas="schemas" />

  <sd-alert type="info"> 当前数据：{{ JSON.stringify(formState) }} </sd-alert>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { defineJsonFormSchemas } from '@sdata/web-vue';

  const formState = ref({
    name: '',
    city: 'shanghai',
    bio: '',
    enableAdvanced: false,
    contactType: 'email',
    email: '',
    phone: '',
    wechat: '',
    reminder: '',
  });

  const createSchemas = defineJsonFormSchemas();
  const schemas = computed(() => {
    const isAdvanced = formState.value.enableAdvanced;
    const contactType = formState.value.contactType;

    return createSchemas([
      {
        field: 'name',
        label: '姓名',
        type: 'input',
        required: true,
      },
      {
        field: 'city',
        label: '城市',
        type: 'select',
        componentProps: {
          options: [
            { label: '上海', value: 'shanghai' },
            { label: '杭州', value: 'hangzhou' },
            { label: '深圳', value: 'shenzhen' },
          ],
        },
      },
      {
        field: 'bio',
        label: '简介',
        type: 'textarea',
      },
      {
        field: 'enableAdvanced',
        label: '启用高级配置',
        type: 'checkbox',
      },
      {
        field: 'contactType',
        label: '通知方式',
        type: 'select',
        hidden: !isAdvanced,
        componentProps: {
          options: [
            { label: '邮件', value: 'email' },
            { label: '短信', value: 'sms' },
            { label: '企业微信', value: 'wechat' },
          ],
        },
      },
      {
        field: 'reminder',
        label: '备注',
        type: 'textarea',
        componentProps: {
          disabled: !isAdvanced,
          placeholder: isAdvanced ? '可填写高级配置说明' : '勾选“启用高级配置”后可编辑',
        },
      },
      {
        field: 'email',
        label: '邮箱地址',
        type: 'input',
        required: true,
        hidden: !isAdvanced || contactType !== 'email',
      },
      {
        field: 'phone',
        label: '手机号码',
        type: 'input',
        required: true,
        hidden: !isAdvanced || contactType !== 'sms',
      },
      {
        field: 'wechat',
        label: '企业微信账号',
        type: 'input',
        required: true,
        hidden: !isAdvanced || contactType !== 'wechat',
      },
    ]);
  });
</script>

<style scoped>
  :deep(.sd-alert) {
    margin-top: 16px;
  }
</style>
