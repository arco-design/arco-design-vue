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

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import Input from '../input';

  defineOptions({ name: 'TypographyEditContent' });

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits<{
    'change': [_value: string];
    'end': [];
    'update:text': [_value: string];
  }>();

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

  const onBlur = onEnd;
</script>
