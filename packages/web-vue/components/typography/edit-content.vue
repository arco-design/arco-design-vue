<template>
  <div :class="classNames">
    <Input
      ref="inputRef"
      auto-size
      :model-value="text"
      @blur="onBlur"
      @input="onChange"
      @keydown.enter="onEnd"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Input from '../input';

export default defineComponent({
  name: 'TypographyEditContent',
  components: {
    Input,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  emits: ['change', 'end', 'update:text'],
  setup(_, { emit }) {
    const prefixCls = getPrefixCls('typography');
    const classNames = [`${prefixCls}-edit-content`];
    const inputRef = ref<typeof Input>();

    function onChange(value: string) {
      emit('update:text', value);
      emit('change', value);
    }

    function onEnd() {
      emit('end');
    }

    onMounted(() => {
      if (!inputRef.value || !inputRef.value.$el) return;

      const inputEl = inputRef.value.$el.querySelector('input');
      if (!inputEl) return;

      inputEl.focus && inputEl.focus();

      const { length } = inputEl.value;
      inputEl.setSelectionRange(length, length);
    });

    return {
      classNames,
      inputRef,
      onBlur: onEnd,
      onChange,
      onEnd,
    };
  },
});
</script>
