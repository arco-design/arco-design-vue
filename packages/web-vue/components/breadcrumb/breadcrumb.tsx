import {
  computed,
  defineComponent,
  mergeProps,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { breadcrumbInjectKey } from './context';
import { getAllElements } from '../_utils/vue-utils';
import { BreadcrumbRoute } from './interface';
import BreadcrumbItem from './breadcrumb-item';

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
    /**
     * @zh 设置路径
     * @en Set routes
     * @version 2.36.0
     */
    routes: {
      type: Array as PropType<BreadcrumbRoute[]>,
    },
    /**
     * @zh 分隔符文字
     * @en Delimiter text
     * @version 2.36.0
     */
    separator: {
      type: [String, Number],
    },
    /**
     * @zh 自定义链接地址
     * @en Custom link address
     * @version 2.36.0
     */
    customUrl: {
      type: Function as PropType<(paths: string[]) => string>,
    },
  },
  /**
   * @zh 自定义分隔符
   * @en Custom separator
   * @slot separator
   */
  /**
   * @zh routes 设置时生效，自定义渲染面包屑
   * @en Effective when setting routes, custom render breadcrumbs
   * @binding {BreadcrumbRoute} route
   * @binding {BreadcrumbRoute[]} routes
   * @binding {string[]} paths
   * @slot item-render
   * @version 2.36.0
   */
  /**
   * @zh 自定义更多图标
   * @en Custom more icon
   * @slot more-icon
   * @version 2.36.0
   */
  setup(props, { slots }) {
    const { maxCount, separator, routes } = toRefs(props);
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
        separator,
        needHide,
        slots,
      })
    );

    const defaultItemRender = (
      route: BreadcrumbRoute,
      routes: BreadcrumbRoute[],
      paths: string[]
    ) => {
      if (routes.indexOf(route) === routes.length - 1) {
        return <span>{route.label}</span>;
      }
      const href =
        props.customUrl?.(paths) ?? `#/${paths.join('/').replace(/^\//, '')}`;

      return <a href={href}>{route.label}</a>;
    };

    const renderByRoutes = () => {
      if (!routes.value?.length) return null;

      if (total.value !== routes.value.length) {
        total.value = routes.value.length;
      }

      const paths: Array<string> = [];

      return routes.value.map((route, idx, origin) => {
        paths.push((route.path || '').replace(/^\//, ''));
        // array copy
        const currentPaths = [...paths];
        return (
          <BreadcrumbItem
            key={route.path || route.label}
            index={idx}
            droplist={route.children}
          >
            {slots['item-render']?.({
              route,
              routes: origin,
              paths: currentPaths,
            }) ?? defaultItemRender(route, origin, currentPaths)}
          </BreadcrumbItem>
        );
      });
    };

    const renderByChildren = () => {
      const children = getAllElements(slots.default?.() ?? []);

      if (total.value !== children.length) {
        total.value = children.length;
      }

      return children.map((child, index) => {
        child.props = mergeProps(child.props ?? {}, { index });
        return child;
      });
    };

    return () => {
      return (
        <div role="list" class={prefixCls}>
          {slots.default ? renderByChildren() : renderByRoutes()}
        </div>
      );
    };
  },
});
