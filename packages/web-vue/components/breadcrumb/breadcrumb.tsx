import {
  computed,
  defineComponent,
  mergeProps,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { breadcrumbInjectKey } from './context';
import { getAllElements } from '../_utils/vue-utils';

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
    const { maxCount } = toRefs(props);
    const prefixCls = getPrefixCls('breadcrumb');

    const total = ref(0);

    const needHide = computed(
      () => maxCount.value > 0 && total.value > maxCount.value + 1
    );

    provide(
      breadcrumbInjectKey,
      reactive({
        total,
        maxCount,
        needHide,
        slots,
      })
    );

    return () => {
      const children = getAllElements(slots.default?.() ?? []);

      if (total.value !== children.length) {
        total.value = children.length;
      }

      return (
        <div class={prefixCls}>
          {children.map((child, index) => {
            child.props = mergeProps(child.props ?? {}, { index });
            return child;
          })}
        </div>
      );
    };
  },
});
