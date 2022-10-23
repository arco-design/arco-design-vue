import {
  cloneVNode,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  VNode,
  VNodeNormalizedChildren,
} from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { getStyle } from '../_utils/style';
import useMenuContext from './hooks/use-menu-context';
import { SubMenuProps } from './interface';
import SubMenu from './sub-menu';
import { unFragment } from '../_utils/vue-utils';

const OVERFLOW_THRESHOLD = 10;

function getNodeWidth(el: HTMLElement) {
  return el && +el.getBoundingClientRect().width.toFixed(2);
}

function translatePxToNumber(str: string): number {
  const result = Number(str.replace('px', ''));
  return Number.isNaN(result) ? 0 : result;
}

export default defineComponent({
  name: 'MenuOverflowWrap',
  setup(_, { slots }) {
    const menuContext = useMenuContext();
    const overflowPrefixCls = `${menuContext.prefixCls}-overflow`;
    const overflowSubMenuClass = `${overflowPrefixCls}-sub-menu`;
    const overflowMenuItemClass = `${overflowPrefixCls}-hidden-menu-item`;
    const overflowSubMenuMirrorClass = `${overflowPrefixCls}-sub-menu-mirror`;

    const refWrapper = ref<HTMLDivElement>();
    const lastVisibleIndex = ref<number | null>(null);
    const refResizeObserver = ref<ResizeObserver>();

    function computeLastVisibleIndex() {
      const wrapperElement = refWrapper.value as HTMLDivElement;
      const wrapperWidth = getNodeWidth(wrapperElement);
      const childNodeList = [].slice.call(
        wrapperElement.children
      ) as HTMLElement[];

      let menuItemIndex = 0;
      let currentRightWidth = 0;
      let overflowSubMenuWidth = 0;

      // 注意 childrenNodeList.length !== children.length 所以需要用 menuItemIndex 来标记真实的 MenuItem 下标
      for (let i = 0; i < childNodeList.length; i++) {
        const node = childNodeList[i];
        const classNames = node.className.split(' ');
        const isOverflowSubMenu = classNames.indexOf(overflowSubMenuClass) > -1;
        const isOverflowSubMenuMirror =
          classNames.indexOf(overflowSubMenuMirrorClass) > -1;

        // 忽略 overflowSubMenu 的宽度，其宽度测量交由 overflowSubMenuMirror
        if (isOverflowSubMenu) {
          continue;
        }

        const nodeWidth =
          getNodeWidth(node) +
          translatePxToNumber(getStyle(node, 'marginLeft') as string) +
          translatePxToNumber(getStyle(node, 'marginRight') as string);

        if (isOverflowSubMenuMirror) {
          overflowSubMenuWidth = nodeWidth;
          continue;
        }

        currentRightWidth += nodeWidth;

        if (
          currentRightWidth + overflowSubMenuWidth + OVERFLOW_THRESHOLD >
          wrapperWidth
        ) {
          lastVisibleIndex.value = menuItemIndex - 1;
          return;
        }

        menuItemIndex++;
      }

      // 全部可见
      lastVisibleIndex.value = null;
    }

    onMounted(() => {
      computeLastVisibleIndex();

      refResizeObserver.value = new ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          entries.forEach(computeLastVisibleIndex);
        }
      );

      if (refWrapper.value) {
        refResizeObserver.value.observe(refWrapper.value);
      }
    });

    onUnmounted(() => {
      refResizeObserver.value && refResizeObserver.value.disconnect();
    });

    return () => {
      const renderSubMenu = (
        children: VNodeNormalizedChildren,
        options?: {
          isMirror?: boolean;
          props?: Partial<SubMenuProps>;
        }
      ): JSX.Element => {
        const { isMirror = false, props = {} } = options || {};
        return (
          <SubMenu
            key={`__arco-menu-overflow-sub-menu${isMirror ? '-mirror' : ''}`}
            class={isMirror ? overflowSubMenuMirrorClass : overflowSubMenuClass}
            {...props}
            v-slots={{
              title: () => <span>...</span>,
              default: () => children,
            }}
          />
        );
      };

      const renderChildren = () => {
        const originChildren = slots.default?.() || [];
        const children = unFragment(originChildren) as VNode[];

        let overflowSubMenu = null;
        const overflowSubMenuMirror = renderSubMenu(null, { isMirror: true });

        const menuItems = children.map((child, index) => {
          const item = cloneVNode(
            child,
            lastVisibleIndex.value !== null && index > lastVisibleIndex.value
              ? { class: overflowMenuItemClass }
              : { class: '' }
          );

          if (
            lastVisibleIndex.value !== null &&
            index === lastVisibleIndex.value + 1
          ) {
            const overflowMenuItems = children
              .slice(index)
              .map((child) => cloneVNode(child));

            overflowSubMenu = renderSubMenu(overflowMenuItems);
          }

          return item;
        });

        return [overflowSubMenuMirror, ...menuItems, overflowSubMenu];
      };

      return (
        <div class={`${overflowPrefixCls}-wrap`} ref={refWrapper}>
          {renderChildren()}
        </div>
      );
    };
  },
});
