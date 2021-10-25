import { Dayjs } from 'dayjs';
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { isUndefined } from '../_utils/is';
import { RangePanelProps } from './interface';
import Panel from './panel.vue';
import { isValidRangeValue } from './utils';

export default defineComponent({
  name: 'TimePickerRangePanel',
  components: {
    Panel,
  },
  props: {
    value: {
      type: Array as PropType<RangePanelProps['value']>,
    },
    displayIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ['select', 'confirm', 'update:displayIndex', 'display-index-change'],
  setup(props, { emit }) {
    const { value, displayIndex } = toRefs(props);

    const localDisplayIndex = ref<number>(displayIndex.value);
    watch(displayIndex, () => {
      localDisplayIndex.value = displayIndex.value;
    });

    const displayValue = computed(() =>
      value?.value ? value.value[localDisplayIndex.value] : undefined
    );

    function onSelect(selectedValue: Dayjs) {
      const newValue =
        isUndefined(value) || isUndefined(value?.value) ? [] : [...value.value];
      newValue[localDisplayIndex.value] = selectedValue;
      emit('select', newValue);
    }

    function onConfirm() {
      if (!isValidRangeValue(value?.value)) {
        const newIndex = (localDisplayIndex.value + 1) % 2;
        localDisplayIndex.value = newIndex;
        emit('display-index-change', newIndex);
        emit('update:displayIndex', newIndex);
      } else {
        emit('confirm', value?.value);
      }
    }

    return {
      displayValue,
      onSelect,
      onConfirm,
    };
  },
  render() {
    const _props = {
      ...this.$attrs,
      isRange: true,
      value: this.displayValue,
      onSelect: this.onSelect,
      onConfirm: this.onConfirm,
    } as any;

    return <Panel {..._props} v-slots={this.$slots} />;
  },
});
