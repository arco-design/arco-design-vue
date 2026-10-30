<template>
  <span :class="prefixCls">
    <arco-select
      :model-value="pageSize"
      :options="options"
      :size="size"
      :disabled="disabled"
      v-bind="selectProps"
      @change="handleChange"
    />
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from '../locale';
import { getPrefixCls } from '../_utils/global-config';
import type { Size } from '../_utils/constant';
import ArcoSelect from '../select';

// Select 的 change 事件参数类型
type SelectChangeValue =
  | string
  | number
  | boolean
  | Record<string, any>
  | (string | number | boolean | Record<string, any>)[];

export default defineComponent({
  name: 'PageOptions',
  components: {
    ArcoSelect,
  },
  props: {
    sizeOptions: {
      type: Array as PropType<number[]>,
      required: true,
    },
    pageSize: Number,
    disabled: Boolean,
    size: {
      type: String as PropType<Size>,
    },
    onChange: {
      type: Function as PropType<(value: number) => void>,
    },
    selectProps: {
      type: Object,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('pagination-options');
    const { t } = useI18n();
    const options = computed(() =>
      props.sizeOptions.map((value) => ({
        value,
        label: `${value} ${t('pagination.countPerPage')}`,
      }))
    );

    const handleChange = (value: SelectChangeValue) => {
      emit('change', value);
    };

    return {
      prefixCls,
      options,
      handleChange,
    };
  },
});
</script>
