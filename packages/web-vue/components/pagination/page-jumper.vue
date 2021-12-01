<template>
  <span :class="cls">
    <span v-if="!simple" :class="`${prefixCls}-text-goto`">{{
      t('pagination.goto')
    }}</span>
    <input-number
      v-model="inputValue"
      :class="`${prefixCls}-input`"
      :min="1"
      :max="pages"
      :size="size"
      :disabled="disabled"
      hide-button
      @focus="handleFocus"
      @blur="handleBlur"
      @press-enter="handlePressEnter"
    />
    <template v-if="simple">
      <span :class="`${prefixCls}-separator`">/</span>
      <span :class="`${prefixCls}-total-page`">{{ pages }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { useI18n } from '../locale';
import { getPrefixCls } from '../_utils/global-config';
import InputNumber from '../input-number';

export default defineComponent({
  name: 'PageJumper',
  components: {
    InputNumber,
  },
  props: {
    current: {
      type: Number,
      required: true,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pages: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
    },
    onChange: {
      type: Function as PropType<(value: number) => void>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('pagination-jumper');
    const { t } = useI18n();
    const inputValue = ref(props.simple ? props.current : undefined);
    const focused = ref(false);

    const handleFocus = () => {
      focused.value = true;
    };

    watch(
      () => props.current,
      (value) => {
        if (props.simple && value !== inputValue.value) {
          inputValue.value = value;
        }
      }
    );

    const handleBlur = () => {
      emit('change', inputValue.value);
      if (!props.simple) {
        inputValue.value = undefined;
      }
    };

    const handlePressEnter = () => {
      emit('change', inputValue.value);
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-simple`]: props.simple,
      },
    ]);

    return {
      prefixCls,
      cls,
      t,
      inputValue,
      handleFocus,
      handleBlur,
      handlePressEnter,
    };
  },
});
</script>
