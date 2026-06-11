<template>
  <span :class="prefixCls">
    <sd-select
      :model-value="modelValue"
      :options="options"
      :size="size"
      :disabled="disabled"
      v-bind="selectProps"
      @change="handleChange"
    />
  </span>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';

  import type { Size } from '../_utils/constant';
  import type { SelectModelValue, SelectOption } from '../select/interface';
  import type { PaginationSelectProps } from './interface';

  import { getPrefixCls } from '../_utils/global-config';
  import { useI18n } from '../locale';
  import SDSelect from '../select';

  defineOptions({ name: 'PageOptions' });

  const props = defineProps({
    sizeOptions: {
      type: Array as PropType<number[]>,
      required: true,
    },
    pageSize: Number as PropType<number | undefined>,
    disabled: Boolean,
    size: {
      type: String as PropType<Size>,
    },
    onChange: {
      type: Function as PropType<(value: number) => void>,
    },
    selectProps: {
      type: Object as PropType<PaginationSelectProps>,
    },
  });

  const emit = defineEmits<{ change: [_value: number] }>();

  const prefixCls = getPrefixCls('pagination-options');
  const { t } = useI18n();
  const modelValue = computed<number | undefined>(() => props.pageSize ?? undefined);
  const options = computed<SelectOption[]>(() =>
    props.sizeOptions.map((value) => ({
      value,
      label: `${value} ${t('pagination.countPerPage')}`,
    })),
  );

  const handleChange = (value: SelectModelValue) => {
    if (typeof value !== 'number') {
      return;
    }

    emit('change', value);
  };
</script>
