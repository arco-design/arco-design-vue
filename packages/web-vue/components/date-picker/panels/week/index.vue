<template>
  <DatePanel
    v-bind="$attrs"
    mode="week"
    is-week
    :day-start-of-week="dayStartOfWeek"
    :is-same-time="isSameTime"
    @select="onSelect"
    @cellMouseEnter="onCellMouseEnter"
  />
</template>

<script lang="ts">
import { Dayjs } from 'dayjs';
import { defineComponent, PropType } from 'vue';
import { methods } from '../../../_utils/date';
import { IsSameTime, WeekStart } from '../../interface';
import DatePanel from '../date/index.vue';
import { useI18n } from '../../../locale';

export default defineComponent({
  name: 'WeekPanel',
  components: {
    DatePanel,
  },
  props: {
    dayStartOfWeek: {
      type: Number as PropType<WeekStart>,
      default: 0,
    },
  },
  emits: ['select', 'cell-mouse-enter'],
  setup(props, { emit }) {
    const { locale } = useI18n();
    const isSameTime: IsSameTime = (current, target) => {
      return methods.isSameWeek(current, target, props.dayStartOfWeek);
    };
    return {
      isSameTime,
      onSelect: (value: Dayjs) => {
        const startDateOfWeek = methods.startOfWeek(
          value,
          props.dayStartOfWeek
        );
        emit('select', startDateOfWeek);
      },
      onCellMouseEnter: (value: Dayjs) => {
        const startDateOfWeek = methods.startOfWeek(
          value,
          props.dayStartOfWeek
        );
        emit('cell-mouse-enter', startDateOfWeek);
      },
    };
  },
});
</script>
