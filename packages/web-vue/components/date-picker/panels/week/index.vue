<template>
  <DatePanel
    v-bind="$attrs"
    mode="week"
    is-week
    :header-value="headerValue"
    :header-operations="headerOperations"
    :header-icons="headerIcons"
    :day-start-of-week="dayStartOfWeek"
    :is-same-time="isSameTime"
    @select="onSelect"
    @cellMouseEnter="onCellMouseEnter"
  />
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  import { Dayjs } from 'dayjs';

  import { methods } from '../../../_utils/date';
  import { useI18n } from '../../../locale';
  import { HeaderIcons, HeaderOperations, IsSameTime, WeekStart } from '../../interface';
  import DatePanel from '../date/index.vue';

  defineOptions({ name: 'WeekPanel' });

  const props = defineProps({
    dayStartOfWeek: {
      type: Number as PropType<WeekStart>,
      default: 0,
    },
    headerValue: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    headerOperations: {
      type: Object as PropType<HeaderOperations>,
      default: () => ({}),
    },
    headerIcons: {
      type: Object as PropType<HeaderIcons>,
      default: () => ({}),
    },
  });

  const emit = defineEmits<{
    'select': [_value: Dayjs];
    'cell-mouse-enter': [_value: Dayjs];
  }>();

  const { locale } = useI18n();
  const isSameTime: IsSameTime = (current, target) => {
    return methods.isSameWeek(current, target, props.dayStartOfWeek);
  };
  const onSelect = (value: Dayjs) => {
    const startDateOfWeek = methods.startOfWeek(value, props.dayStartOfWeek);
    emit('select', startDateOfWeek);
  };
  const onCellMouseEnter = (value: Dayjs) => {
    const startDateOfWeek = methods.startOfWeek(value, props.dayStartOfWeek);
    emit('cell-mouse-enter', startDateOfWeek);
  };
</script>
