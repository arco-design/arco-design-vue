import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { getComponentNumber, mergePropsWithIndex } from '../_utils/vue-utils';

/**
 * TODO: 下拉菜单功能
 */
export default defineComponent({
  name: 'Breadcrumb',
  props: {
    /**
     * @zh 最多展示的面包屑数量（0表示不限制）
     * @en Maximum number of breadcrumbs displayed (0 means no limit)
     */
    maxCount: {
      type: Number,
      default: 0,
    },
  },
  /**
   * @zh 自定义分隔符
   * @en Custom separator
   * @slot separator
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('breadcrumb');

    return () => {
      const children = slots.default?.() ?? [];
      const total = getComponentNumber(children, 'BreadcrumbItem');
      mergePropsWithIndex(children, 'BreadcrumbItem', (index) => ({
        index,
        total,
        maxCount: props.maxCount,
        separator: slots.separator,
      }));

      return <div class={prefixCls}>{children}</div>;
    };
  },
});
