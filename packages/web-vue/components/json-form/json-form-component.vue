<template>
  <component
    :is="resolvedComponent"
    v-model="modelValue"
    v-bind="mergedComponentProps"
    v-on="schema.componentEvents ?? {}"
  >
    <template v-if="showCheckboxLabel">
      {{ checkboxLabel }}
    </template>
    <template v-for="(_, name) in forwardedSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
    <template v-for="(slotRenderer, name) in schema.componentSlots ?? {}" #[name]="slotProps">
      <component :is="slotRenderer" v-bind="slotProps" />
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  import { JSON_FORM_COMPONENT_TYPES, type JsonFormSchema } from './types';
  import { mergeJsonFormClassName, shouldStretchJsonFormControl } from './utils';

  defineOptions({
    name: 'JsonFormComponent',
  });

  const props = defineProps<{
    schema: JsonFormSchema<string>;
    components: Record<string, unknown>;
    prefixCls: string;
  }>();

  const slots = defineSlots<Record<string, (props?: Record<string, unknown>) => unknown>>();
  const modelValue = defineModel<unknown>();

  const resolvedComponent = computed(() => {
    return (
      props.components[props.schema.type ?? JSON_FORM_COMPONENT_TYPES.input] ??
      props.components.input
    );
  });

  const defaultPlaceholder = computed(() => {
    const type = props.schema.type ?? JSON_FORM_COMPONENT_TYPES.input;

    if (
      (
        [
          JSON_FORM_COMPONENT_TYPES.input,
          JSON_FORM_COMPONENT_TYPES.inputSearch,
          JSON_FORM_COMPONENT_TYPES.inputNumber,
          JSON_FORM_COMPONENT_TYPES.inputPassword,
          JSON_FORM_COMPONENT_TYPES.textarea,
          JSON_FORM_COMPONENT_TYPES.autoComplete,
          JSON_FORM_COMPONENT_TYPES.inputTag,
          JSON_FORM_COMPONENT_TYPES.mention,
        ] as string[]
      ).includes(type)
    ) {
      return props.schema.label ? `请输入${props.schema.label}` : undefined;
    }

    if (
      (
        [
          JSON_FORM_COMPONENT_TYPES.select,
          JSON_FORM_COMPONENT_TYPES.cascader,
          JSON_FORM_COMPONENT_TYPES.treeSelect,
          JSON_FORM_COMPONENT_TYPES.datePicker,
          JSON_FORM_COMPONENT_TYPES.rangePicker,
          JSON_FORM_COMPONENT_TYPES.timePicker,
        ] as string[]
      ).includes(type)
    ) {
      return props.schema.label ? `请选择${props.schema.label}` : undefined;
    }

    return undefined;
  });

  const mergedComponentProps = computed(() => {
    const componentProps = { ...props.schema.componentProps } as Record<string, unknown>;

    if (!componentProps.placeholder && defaultPlaceholder.value) {
      componentProps.placeholder = defaultPlaceholder.value;
    }

    componentProps.class = mergeJsonFormClassName(
      componentProps.class,
      shouldStretchJsonFormControl(props.schema.type)
        ? `${props.prefixCls}-control`
        : `${props.prefixCls}-control--inline`,
    );

    return componentProps;
  });

  const showCheckboxLabel = computed(() => {
    return (
      props.schema.type === JSON_FORM_COMPONENT_TYPES.checkbox &&
      Boolean(props.schema.label) &&
      !slots.default
    );
  });

  const checkboxLabel = computed(() => {
    const label = (props.schema.componentProps as { label?: string } | undefined)?.label;
    return label ?? props.schema.label ?? '';
  });

  const forwardedSlotNames = computed(() => {
    const schemaSlotNames = new Set(Object.keys(props.schema.componentSlots ?? {}));
    return Object.keys(slots).filter((name) => name !== 'default' && !schemaSlotNames.has(name));
  });
</script>
