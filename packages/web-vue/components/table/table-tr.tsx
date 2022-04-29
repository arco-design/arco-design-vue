import { computed, defineComponent, createVNode, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TableDataWithRaw } from './interface';

export default defineComponent({
  name: 'Tr',
  props: {
    isExpandRow: {
      type: Boolean,
    },
    isEmptyRow: {
      type: Boolean,
    },
    checked: {
      type: Boolean,
    },
    rowIndex: Number,
    record: {
      type: Object as PropType<TableDataWithRaw>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('table');

    const cls = computed(() => [
      `${prefixCls}-tr`,
      {
        [`${prefixCls}-tr-expand`]: props.isExpandRow,
        [`${prefixCls}-tr-empty`]: props.isEmptyRow,
        [`${prefixCls}-tr-checked`]: props.checked,
      },
    ]);

    return () => {
      return createVNode(
        slots.tr?.({
          rowIndex: props.rowIndex,
          record: props.record?.raw,
        })[0] ?? 'tr',
        { class: cls.value },
        slots.default?.()
      );
    };
  },
});
