<template>
  <sd-config-provider :json-form="jsonForm">
    <sd-json-form v-model="formState" :schemas="schemas" />
  </sd-config-provider>

  <sd-alert type="success"> 自定义组件输出：{{ formState.script || '尚未编辑' }} </sd-alert>
</template>

<script setup lang="ts">
  import { defineComponent, h, ref } from 'vue';

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
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () =>
        h('div', { class: 'demo-script-field' }, [
          h(
            'div',
            { class: 'demo-script-field__hint' },
            '这里用 sd-textarea 模拟业务里的自定义字段组件。',
          ),
          h(Textarea, {
            'autoSize': {
              minRows: 6,
              maxRows: 10,
            },
            'modelValue': props.modelValue,
            'placeholder': props.placeholder,
            'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
          }),
        ]);
    },
  });

  const formState = ref({
    script: 'const start = true;',
  });

  const customComponents = defineJsonFormComponents({
    scriptField: DemoScriptField,
  });
  const createSchemas = defineJsonFormSchemas<typeof customComponents>();

  const schemas = createSchemas([
    {
      field: 'script',
      label: '脚本',
      type: 'scriptField',
      componentProps: {
        placeholder: '例如：const start = true;',
      },
    },
  ]);

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
