<template>
  <sd-config-provider :json-form="jsonForm">
    <sd-json-form v-model="formState" :schemas="schemas" />
  </sd-config-provider>

  <sd-alert type="success"> 当前数据：{{ JSON.stringify(formState) }} </sd-alert>
</template>

<script setup lang="tsx">
  /** @jsxRuntime automatic */
  /** @jsxImportSource vue */
  import { computed, defineComponent, ref } from 'vue';

  import {
    Textarea,
    defineJsonFormComponents,
    defineJsonFormSchemas,
    type JsonFormProviderConfig,
  } from '@sdata/web-vue';

  const DemoScriptField = defineComponent({
    name: 'DemoScriptField',
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '请输入业务脚本内容',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () => (
        <div class="demo-script-field">
          <div class="demo-script-field__hint">这里用 sd-textarea 模拟业务里的自定义字段组件。</div>
          <Textarea
            autoSize={{
              minRows: 6,
              maxRows: 10,
            }}
            modelValue={props.modelValue}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onUpdate:modelValue={(value: string) => emit('update:modelValue', value)}
          />
        </div>
      );
    },
  });

  const formState = ref({
    mode: 'script',
    enableAdvanced: false,
    script: 'const start = true;',
    webhook: '',
    approver: '',
    remark: '',
  });

  const customComponents = defineJsonFormComponents({
    scriptField: DemoScriptField,
  });
  const createSchemas = defineJsonFormSchemas<typeof customComponents>();

  const schemas = computed(() => {
    const isAdvanced = formState.value.enableAdvanced;
    const mode = formState.value.mode;

    return createSchemas([
      {
        field: 'mode',
        label: '触发模式',
        type: 'select',
        componentProps: {
          options: [
            { label: '脚本模式', value: 'script' },
            { label: 'Webhook 模式', value: 'webhook' },
            { label: '审批模式', value: 'approval' },
          ],
        },
      },
      {
        field: 'enableAdvanced',
        label: '启用高级配置',
        type: 'checkbox',
      },
      {
        field: 'script',
        label: '脚本',
        type: 'scriptField',
        hidden: mode !== 'script',
        componentProps: {
          disabled: !isAdvanced,
          placeholder: isAdvanced ? '例如：const start = true;' : '勾选“启用高级配置”后可编辑脚本',
        },
      },
      {
        field: 'webhook',
        label: 'Webhook 地址',
        type: 'input',
        hidden: mode !== 'webhook',
        componentProps: {
          disabled: !isAdvanced,
          placeholder: '例如：https://api.example.com/hooks/order',
        },
      },
      {
        field: 'approver',
        label: '审批人',
        type: 'input',
        hidden: mode !== 'approval',
        componentProps: {
          disabled: !isAdvanced,
          placeholder: '例如：张三',
        },
      },
      {
        field: 'remark',
        label: '高级备注',
        type: 'textarea',
        componentProps: {
          disabled: !isAdvanced,
          placeholder: isAdvanced ? '填写规则补充说明' : '未启用高级配置时不可编辑',
        },
      },
    ]);
  });

  const jsonForm: JsonFormProviderConfig<typeof customComponents> = {
    components: customComponents,
  };
</script>

<style scoped>
  .demo-script-field {
    display: grid;
    gap: 8px;
  }

  .demo-script-field__hint {
    padding: 8px 12px;
    color: var(--color-text-2);
    font-size: 12px;
    background: var(--color-fill-2);
    border: 1px dashed var(--color-border-2);
    border-radius: 10px;
  }

  :deep(.sd-alert) {
    margin-top: 16px;
  }
</style>
