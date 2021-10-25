<template>
  <div :class="prefixCls">
    <TimeColumn
      v-if="columns.includes('H') || columns.includes('h')"
      :value="selectedHour"
      :list="hours"
      :prefix-cls="prefixCls"
      :visible="visible"
      @select="
        (value) => {
          onSelect(value, 'hour');
        }
      "
    />
    <TimeColumn
      v-if="columns.includes('m')"
      :value="selectedMinute"
      :list="minutes"
      :prefix-cls="prefixCls"
      :visible="visible"
      @select="
        (value) => {
          onSelect(value, 'minute');
        }
      "
    />
    <TimeColumn
      v-if="columns.includes('s')"
      :value="selectedSecond"
      :list="seconds"
      :prefix-cls="prefixCls"
      :visible="visible"
      @select="
        (value) => {
          onSelect(value, 'second');
        }
      "
    />
    <TimeColumn
      v-if="computedUse12Hours"
      :value="selectedAmpm"
      :list="ampmList"
      :prefix-cls="prefixCls"
      :visible="visible"
      @select="
        (value) => {
          onSelect(value, 'ampm');
        }
      "
    />
  </div>
  <div
    v-if="$slots['extra-footer']"
    :class="`${prefixCls}-footer-extra-wrapper`"
  >
    <slot name="extra-footer"></slot>
  </div>
  <div v-if="!hideFooter" :class="`${prefixCls}-footer-btn-wrapper`">
    <Button v-if="!isRange" size="mini" @click="onSelectNow">
      {{ t('datePicker.now') }}
    </Button>
    <Button
      type="primary"
      size="mini"
      :disabled="confirmBtnDisabled || !selectedValue"
      @click="onConfirm"
    >
      {{ t('datePicker.ok') }}
    </Button>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { Dayjs } from 'dayjs';
import TimeColumn from './time-column.vue';
import Button from '../button';
import type { PanelProps } from './interface';
import { isDayjs, isUndefined } from '../_utils/is';
import { dayjs } from '../_utils/date';
import { getPrefixCls } from '../_utils/global-config';
import useTimeList from './hooks/use-time-list';
import useTimeFormat from './hooks/use-time-format';
import useIsDisabledTime from './hooks/use-is-disabled-time';
import { useI18n } from '../locale';

export default defineComponent({
  name: 'TimePickerPanel',
  components: {
    TimeColumn,
    Button,
  },
  props: {
    value: {
      type: Object as PropType<PanelProps['value']>,
    },
    visible: {
      type: Boolean,
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    use12Hours: {
      type: Boolean,
    },
    step: {
      type: Object as PropType<PanelProps['step']>,
    },
    disabledHours: {
      type: Function as unknown as PropType<PanelProps['disabledHours']>,
    },
    disabledMinutes: {
      type: Function as unknown as PropType<PanelProps['disabledMinutes']>,
    },
    disabledSeconds: {
      type: Function as unknown as PropType<PanelProps['disabledSeconds']>,
    },
    hideDisabledOptions: {
      type: Boolean,
    },
    hideFooter: {
      type: Boolean,
    },
    isRange: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  emits: {
    // 每点击一个时间就会触发该事件（还没点击确定，时间只能展示但未生效）
    select: (value: Dayjs) => isDayjs(value),
    // 确认选择之后触发该事件
    confirm: (value: Dayjs) => isDayjs(value),
  },
  setup(props: PanelProps, { emit }) {
    const {
      value,
      visible,
      format,
      step,
      use12Hours,
      hideDisabledOptions,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      disabled,
    } = toRefs(props);

    const prefixCls = getPrefixCls('timepicker');
    const { t } = useI18n();

    const {
      columns,
      use12Hours: computedUse12Hours,
      format: computedFormat,
    } = useTimeFormat(
      reactive({
        format,
        use12Hours,
      })
    );

    const selectedValue = ref<Dayjs | undefined>(value?.value);
    const setSelectedValue = (value: Dayjs | undefined) => {
      selectedValue.value = value;
    };
    // Synchronize selectedValue every time you open or change the value
    watch([visible, value], () => {
      if (!visible.value) return;
      setSelectedValue(value?.value);
    });

    const selectedHour = computed(() => {
      const _hour = selectedValue.value?.hour();
      if (isUndefined(_hour) || !computedUse12Hours.value) return _hour;
      // Use 12-hour clock
      if (_hour > 12) return _hour - 12;
      if (_hour === 0) return 12;
      return _hour;
    });
    const selectedMinute = computed(() => selectedValue.value?.minute());
    const selectedSecond = computed(() => selectedValue.value?.second());
    const selectedAmpm = computed(() => {
      const _hour = selectedValue.value?.hour();
      return !isUndefined(_hour) && _hour >= 12 ? 'pm' : 'am';
    });

    const { hours, minutes, seconds, ampmList } = useTimeList(
      reactive({
        format: computedFormat,
        step,
        use12Hours: computedUse12Hours,
        hideDisabledOptions,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        selectedHour,
        selectedMinute,
        selectedSecond,
        selectedAmpm,
        disabled,
      })
    );

    const isDisabledTime = useIsDisabledTime(
      reactive({
        disabledHours,
        disabledMinutes,
        disabledSeconds,
      })
    );
    const confirmBtnDisabled = computed(() =>
      isDisabledTime(selectedValue.value)
    );

    function emitConfirm(value: Dayjs | undefined) {
      if (isUndefined(value)) return;
      emit('confirm', value);
    }

    function emitSelect(value: Dayjs) {
      setSelectedValue(value);
      emit('select', value);
    }

    // 选中谁就更新谁
    function onSelect(
      value: number | string,
      type: 'hour' | 'minute' | 'second' | 'ampm' = 'hour'
    ) {
      let newValue;
      const hour = selectedHour.value || '00';
      const minute = selectedMinute.value || '00';
      const second = selectedSecond.value || '00';
      const ampm = selectedAmpm.value || 'am';

      switch (type) {
        case 'hour':
          newValue = `${value}:${minute}:${second}`;
          break;
        case 'minute':
          newValue = `${hour}:${value}:${second}`;
          break;
        case 'second':
          newValue = `${hour}:${minute}:${value}`;
          break;
        case 'ampm':
          newValue = `${hour}:${minute}:${second} ${value}`;
          break;
        default:
          newValue = '00:00:00';
      }

      let valueFormat = 'HH:mm:ss';
      if (computedUse12Hours.value) {
        valueFormat = 'HH:mm:ss a';
        if (type !== 'ampm') {
          newValue = `${newValue} ${ampm}`;
        }
      }

      newValue = dayjs(newValue, valueFormat);
      emitSelect(newValue);
    }

    return {
      prefixCls,
      t,
      hours,
      minutes,
      seconds,
      ampmList,
      selectedValue,
      selectedHour,
      selectedMinute,
      selectedSecond,
      selectedAmpm,
      computedUse12Hours,
      confirmBtnDisabled,
      columns,
      onSelect,
      onSelectNow() {
        const newValue = dayjs(new Date());
        emitSelect(newValue);
      },
      onConfirm() {
        emitConfirm(selectedValue.value);
      },
    };
  },
});
</script>
