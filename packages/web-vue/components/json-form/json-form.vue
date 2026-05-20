<template>
  <component
    :is="customComponent"
    ref="formRef"
    :class="rootClass"
    auto-label-width
    :model="workingModel"
    v-bind="$attrs"
  >
    <slot v-if="hasDefaultSlot" />
    <template v-else>
      <JsonFormItem
        v-for="schema in normalizedSchemas"
        :key="schema.field"
        v-model="workingModel"
        :schema="schema"
        :adapter="resolvedAdapter"
        :components="resolvedComponents"
        :prefix-cls="prefixCls"
        :hide-label="hideLabel"
        :hide-asterisk="hideAsterisk"
        :show-colon="showColon"
      >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </JsonFormItem>
    </template>
  </component>
</template>

<script lang="ts" setup>
  import type { Component } from 'vue';
  import { Comment, computed, inject, shallowRef, useSlots, watch } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import { configProviderInjectionKey } from '../config-provider/context';
  import DefaultForm from '../form/form.vue';
  import JsonFormItem from './json-form-item.vue';
  import {
    JSON_FORM_ADAPTERS,
    type JsonFormModel,
    type JsonFormProps,
    type JsonFormSchema,
  } from './types';
  import { resolveJsonFormComponents, translateA2UI_0_8ToJsonFormSchemas } from './utils';

  defineOptions({
    name: 'JsonForm',
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<JsonFormProps>(), {
    adapter: undefined,
    model: undefined,
    hideLabel: false,
    hideAsterisk: false,
    showColon: false,
    component: undefined,
  });

  const modelValue = defineModel<JsonFormModel | undefined>();
  const formRef = shallowRef<InstanceType<typeof DefaultForm> | null>(null);
  const internalModel = shallowRef<JsonFormModel>(props.model ?? {});
  const configProvider = inject(configProviderInjectionKey, undefined);
  const slots = useSlots();
  const prefixCls = getPrefixCls('json-form');

  watch(
    () => props.model,
    (value) => {
      if (value && modelValue.value === undefined) {
        internalModel.value = value;
      }
    },
    {
      immediate: true,
    },
  );

  const workingModel = computed(() => {
    return modelValue.value ?? internalModel.value;
  });

  const resolvedAdapter = computed(() => {
    return props.adapter ?? configProvider?.jsonForm?.adapter ?? JSON_FORM_ADAPTERS.default;
  });

  const resolvedComponents = computed(() => {
    return resolveJsonFormComponents(configProvider?.jsonForm?.components);
  });

  const normalizedSchemas = computed(() => {
    if (resolvedAdapter.value === JSON_FORM_ADAPTERS.a2ui_0_8) {
      return translateA2UI_0_8ToJsonFormSchemas(props.schemas as never[]);
    }

    return props.schemas as JsonFormSchema<string>[];
  });

  const customComponent = computed<Component | string>(() => {
    return props.component ?? DefaultForm;
  });

  const hasDefaultSlot = computed(() => {
    return (slots.default?.() ?? []).some((node) => node.type !== Comment);
  });

  const rootClass = computed(() => [prefixCls, `${prefixCls}--${resolvedAdapter.value}`]);

  defineExpose({
    validate: (...args: unknown[]) => formRef.value?.validate(...args),
    validateField: (...args: unknown[]) => formRef.value?.validateField(...args),
    resetFields: (...args: unknown[]) => formRef.value?.resetFields(...args),
    clearValidate: (...args: unknown[]) => formRef.value?.clearValidate(...args),
    setFields: (...args: unknown[]) => formRef.value?.setFields(...args),
    scrollToField: (...args: unknown[]) => formRef.value?.scrollToField(...args),
  });
</script>
