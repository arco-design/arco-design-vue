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
import { IsSameTime } from '../../interface';
import DatePanel from '../date/index.vue';
import { useI18n } from '../../../locale';

export default defineComponent({
  name: 'WeekPanel',
  components: {
    DatePanel,
  },
  props: {
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      default: 0,
    },
  },
  emits: ['select', 'cell-mouse-enter'],
  setup(props, { emit }) {
    const { locale } = useI18n();
    const isSameTime: IsSameTime = (current, target) => {
      return methods.isSameWeek(
        current,
        target,
        props.dayStartOfWeek,
        locale.value
      );
    };
    return {
      isSameTime,
      onSelect: (value: Dayjs) => {
        const startDateOfWeek = methods.startOf(value, 'week');
        emit('select', startDateOfWeek);
      },
      onCellMouseEnter: (value: Dayjs) => {
        const startDateOfWeek = methods.startOf(value, 'week');
        emit('cell-mouse-enter', startDateOfWeek);
      },
    };
  },
});
</script>
