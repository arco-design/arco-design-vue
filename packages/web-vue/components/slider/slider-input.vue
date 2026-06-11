<template>
  <div :class="`${prefixCls}-input`">
    <template v-if="range">
      <input-number
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :model-value="modelValue[0]"
        hide-button
        @change="handleStartChange"
      />
      <div :class="`${prefixCls}-input-hyphens`" />
    </template>
    <input-number
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :model-value="modelValue[1]"
      hide-button
      @change="handleEndChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  import type { InputNumberValue } from '../input-number';

  import { getPrefixCls } from '../_utils/global-config';
  import InputNumber from '../input-number';

  defineOptions({ name: 'SliderInput' });

  const props = defineProps({
    modelValue: {
      type: Array as unknown as PropType<[number, number]>,
      required: true,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
    range: {
      type: Boolean,
    },
  });

  const emit = defineEmits<{ startChange: [_value?: number]; endChange: [_value?: number] }>();

  const handleStartChange = (value: InputNumberValue) => {
    emit('startChange', value == null ? undefined : Number(value));
  };
  const handleEndChange = (value: InputNumberValue) => {
    emit('endChange', value == null ? undefined : Number(value));
  };

  const prefixCls = getPrefixCls('slider');
</script>
