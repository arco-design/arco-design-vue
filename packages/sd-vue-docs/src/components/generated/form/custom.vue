<template>
  <sd-space style="margin-bottom: 20px">
    <sd-switch v-model="disabled" />
    Disabled: {{ disabled }}
  </sd-space>
  <Form :model="form" :disabled="disabled" :style="{ width: '600px' }">
    <FormItem
      field="name"
      label="Username"
      :rules="[
        { required: true, message: 'name is required' },
        { minLength: 5, message: 'must be greater than 5 characters' },
      ]"
    >
      <MyInput v-model="form.name" placeholder="please enter your username..." />
    </FormItem>
  </Form>
</template>

<script lang="ts">
  import { defineComponent, h, reactive, ref, type SetupContext } from 'vue';

  import { Form, FormItem, useFormItem } from '@sdata/web-vue';

  const MyInput = defineComponent({
    emits: ['update:modelValue'],
    setup(_props, { emit }: SetupContext<['update:modelValue']>) {
      const { mergedDisabled, eventHandlers } = useFormItem();
      const handleInput = (ev: Event) => {
        const value = (ev.target as HTMLInputElement | null)?.value ?? '';
        emit('update:modelValue', value);
        (eventHandlers as { value?: { onChange?: (ev: Event) => void } }).value?.onChange?.(ev);
      };
      return () => h('input', { disabled: mergedDisabled.value, onInput: handleInput });
    },
  });

  export default {
    components: {
      Form,
      FormItem,
      MyInput,
    },
    setup() {
      const disabled = ref(false);
      const form = reactive({
        name: '',
      });

      return {
        disabled,
        form,
      };
    },
  };
</script>
