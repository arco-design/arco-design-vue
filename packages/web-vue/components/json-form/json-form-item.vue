<template>
  <slot
    v-if="schema.hidden"
    :name="schema.slotName || 'hidden'"
    :record="schema"
    :value="fieldModel"
  />
  <slot
    v-else-if="schema.type === JSON_FORM_COMPONENT_TYPES.noFormItem"
    :name="schema.slotName || 'default'"
    :record="schema"
    :value="fieldModel"
  />
  <FormItem
    v-else-if="schema.slotName && $slots[schema.slotName]"
    :label="schema.label"
    :field="schema.field"
    :hide-label="schema.formItemProps?.hideLabel ?? hideLabel"
    :hide-asterisk="schema.formItemProps?.hideAsterisk ?? hideAsterisk"
    :show-colon="schema.formItemProps?.showColon ?? showColon"
    :rules="resolvedRules"
    v-bind="schema.formItemProps"
    v-on="schema.formItemEvents ?? {}"
  >
    <template v-for="name in forwardedSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="{ ...slotProps, record: schema, value: fieldModel }" />
    </template>
    <slot :name="schema.slotName" :record="schema" :value="fieldModel" />
  </FormItem>
  <FormItem
    v-else-if="schema.render"
    :label="schema.label"
    :field="schema.field"
    :hide-label="schema.formItemProps?.hideLabel ?? hideLabel"
    :hide-asterisk="schema.formItemProps?.hideAsterisk ?? hideAsterisk"
    :show-colon="schema.formItemProps?.showColon ?? showColon"
    :rules="resolvedRules"
    v-bind="schema.formItemProps"
    v-on="schema.formItemEvents ?? {}"
  >
    <component :is="schema.render" />
  </FormItem>
  <Row
    v-else-if="schema.type === JSON_FORM_COMPONENT_TYPES.row"
    :class="`${prefixCls}-row`"
    v-bind="schema.componentProps"
    v-on="schema.componentEvents ?? {}"
  >
    <Col v-for="child in schema.children ?? []" :key="child.field" v-bind="resolveColProps(child)">
      <JsonFormItem
        v-model="workingModel"
        :schema="child"
        :adapter="adapter"
        :components="components"
        :prefix-cls="prefixCls"
        :hide-label="hideLabel"
        :hide-asterisk="hideAsterisk"
        :show-colon="showColon"
      >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </JsonFormItem>
    </Col>
  </Row>
  <FormItem
    v-else
    :label="schema.label"
    :field="normalizedField"
    :hide-label="schema.formItemProps?.hideLabel ?? hideLabel"
    :hide-asterisk="schema.formItemProps?.hideAsterisk ?? hideAsterisk"
    :show-colon="schema.formItemProps?.showColon ?? showColon"
    :rules="resolvedRules"
    v-bind="schema.formItemProps"
    v-on="schema.formItemEvents ?? {}"
  >
    <template v-for="name in forwardedSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="{ ...slotProps, record: schema, value: fieldModel }" />
    </template>
    <JsonFormComponent
      v-model="fieldModel"
      :schema="schema"
      :components="components"
      :prefix-cls="prefixCls"
    >
      <template v-for="name in componentForwardedSlotNames" #[name]="slotProps">
        <slot :name="name" v-bind="{ ...slotProps, record: schema, value: fieldModel }" />
      </template>
    </JsonFormComponent>
  </FormItem>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue';

  import { FormItem } from '../form';
  import { Col, Row } from '../grid';
  import JsonFormComponent from './json-form-component.vue';
  import {
    JSON_FORM_COMPONENT_TYPES,
    type JsonFormAdapter,
    type JsonFormModel,
    type JsonFormSchema,
  } from './types';
  import { getJsonFormValue, setJsonFormValue } from './utils';

  defineOptions({
    name: 'JsonFormItem',
  });

  const props = withDefaults(
    defineProps<{
      schema: JsonFormSchema<string>;
      adapter: JsonFormAdapter;
      components: Record<string, unknown>;
      prefixCls: string;
      hideLabel?: boolean;
      hideAsterisk?: boolean;
      showColon?: boolean;
    }>(),
    {
      hideLabel: false,
      hideAsterisk: false,
      showColon: false,
    },
  );

  defineSlots<Record<string, (props?: Record<string, unknown>) => unknown>>();

  const workingModel = defineModel<JsonFormModel>({ required: true });

  const normalizedField = computed(() => {
    return props.adapter === 'a2ui-0.8'
      ? props.schema.field.replaceAll('/', '.')
      : props.schema.field;
  });

  const fieldModel = computed({
    get() {
      return getJsonFormValue(workingModel.value, props.schema.field, props.adapter);
    },
    set(value) {
      setJsonFormValue(workingModel.value, props.schema.field, value, props.adapter);
    },
  });

  const resolvedRules = computed(() => {
    if (props.schema.formItemRules) {
      return props.schema.formItemRules;
    }

    if (props.schema.required) {
      return [
        {
          required: true,
          message: props.schema.label ? `${props.schema.label}不能为空` : '必填项不能为空',
        },
      ];
    }

    return undefined;
  });

  const forwardedSlotNames = computed(() => {
    return Object.keys(useSlots()).filter((name) => name !== props.schema.slotName);
  });

  const componentForwardedSlotNames = computed(() => {
    const schemaSlotNames = new Set(Object.keys(props.schema.componentSlots ?? {}));
    return Object.keys(useSlots()).filter(
      (name) => name !== props.schema.slotName && !schemaSlotNames.has(name),
    );
  });

  const resolveColProps = (schema: JsonFormSchema<string>) => {
    if (schema.colProps) {
      return schema.colProps;
    }

    if (schema.span) {
      return { span: schema.span };
    }

    return undefined;
  };
</script>
