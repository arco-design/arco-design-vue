<template>
  <span :class="cls">
    <span
      v-if="!simple"
      :class="[`${prefixCls}-prepend`, `${prefixCls}-text-goto`]"
    >
      <slot name="jumper-prepend">{{ t('pagination.goto') }}</slot>
    </span>
    <input-number
      v-model="inputValue"
      :class="`${prefixCls}-input`"
      :min="1"
      :max="pages"
      :size="size"
      :disabled="disabled"
      hide-button
      :formatter="handleFormatter"
      @change="handleChange"
    />
    <span v-if="$slots['jumper-append']" :class="`${prefixCls}-append`"
      ><slot name="jumper-append"
    /></span>
    <template v-if="simple">
      <span :class="`${prefixCls}-separator`">/</span>
      <span :class="`${prefixCls}-total-page`">{{ pages }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, watch } from 'vue';
import { useI18n } from '../locale';
import { getPrefixCls } from '../_utils/global-config';
import type { Size } from '../_utils/constant';
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
      // 透传给 InputNumber
      type: String as PropType<Size>,
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

    // InputNumber 的 formatter 允许收到 undefined（清空时）
    const handleFormatter = (value?: number) => {
      if (value === undefined) {
        return undefined;
      }
      const parseIntVal = parseInt(value.toString(), 10);
      return Number.isNaN(parseIntVal) ? undefined : String(parseIntVal);
    };

    // InputNumber 的 change 事件参数允许是 undefined（清空时）
    const handleChange = (value?: number) => {
      emit('change', inputValue.value);
      nextTick(() => {
        if (!props.simple) {
          inputValue.value = undefined;
        }
      });
    };

    watch(
      () => props.current,
      (value) => {
        if (props.simple && value !== inputValue.value) {
          inputValue.value = value;
        }
      }
    );

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
      handleChange,
      handleFormatter,
    };
  },
});
</script>
