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
        @change="(value) => $emit('startChange', value)"
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
      @change="(value) => $emit('endChange', value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InputNumber from '../input-number';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'SliderInput',
  components: {
    InputNumber,
  },
  props: {
    modelValue: {
      type: Array,
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
  },
  emits: ['startChange', 'endChange'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('slider');

    return {
      prefixCls,
    };
  },
});
</script>
