import { computed, defineComponent, createVNode } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

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
        slots.tr?.()[0] ?? 'tr',
        { class: cls.value },
        slots.default?.()
      );
    };
  },
});
