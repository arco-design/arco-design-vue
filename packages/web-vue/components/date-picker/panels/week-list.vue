<template>
  <div :class="`${prefixCls}-week-list`">
    <div v-for="key in weekList" :key="key" :class="`${prefixCls}-week-list-item`">
      {{ labelList[key] || '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';

  import useInjectDatePickerTransform from '../hooks/use-inject-datepicker-transform';

  defineOptions({ name: 'PanelWeekList' });

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true,
    },
    weekList: {
      type: Array as PropType<number[]>,
      required: true,
    },
  });

  const datePickerT = useInjectDatePickerTransform();

  const labelList = computed<string[]>(() => {
    return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((i) =>
      datePickerT(`datePicker.week.short.${i}`),
    );
  });
</script>
