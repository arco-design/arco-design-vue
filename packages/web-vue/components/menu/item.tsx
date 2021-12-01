import {
  computed,
  defineComponent,
  ref,
  watchEffect,
  onMounted,
  onUnmounted,
} from 'vue';
import scrollIntoView from 'scroll-into-view-if-needed';
import Tooltip from '../tooltip';
import useIsMounted from '../_hooks/use-is-mounted';
import { MenuItemProps } from './interface';
import useMenu from './hooks/use-menu';
import useLevel from './hooks/use-level';
import { omit } from '../_utils/omit';
import MenuIndent from './indent.vue';
import useMenuContext from './hooks/use-menu-context';
import { useMenuDataCollectorContext } from './hooks/use-menu-data-collector';

export default defineComponent({
  name: 'MenuItem',
  inheritAttrs: false,
  props: {
    /**
     * @zh 唯一标志
     * @en Unique key
     */
    key: {
      type: String,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props: MenuItemProps, { emit }) {
    const { key } = useMenu();
    const { level } = useLevel();
    const isMounted = useIsMounted();
    const menuContext = useMenuContext();
    const refItemElement = ref<HTMLDivElement>();
    const isSelected = computed(
      () => (menuContext.selectedKeys || []).indexOf(key.value) > -1
    );

    const timer = ref<NodeJS.Timeout | null>();
    const clearTimer = () => {
      timer.value && clearTimeout(timer.value);
    };

    const { collectMenuItem, removeMenuItem } = useMenuDataCollectorContext();

    onMounted(() => {
      collectMenuItem && collectMenuItem(key.value);
    });

    onUnmounted(() => {
      removeMenuItem && removeMenuItem(key.value);
    });

    watchEffect((onInvalidate) => {
      if (
        refItemElement.value &&
        isSelected.value &&
        menuContext.autoScrollIntoView
      ) {
        clearTimer();
        timer.value = setTimeout(
          () => {
            scrollIntoView(refItemElement.value as HTMLDivElement, {
              behavior: 'smooth',
              block: 'start',
              scrollMode: 'if-needed',
              boundary: document.body,
              ...(menuContext.scrollConfig || {}),
            });
            timer.value = null;
          },
          // 首次渲染需要等待展开动画结束之后滚动
          isMounted.value ? 500 : 0
        );
      }
      onInvalidate(() => {
        clearTimer();
      });
    });

    return {
      menuContext,
      level,
      isSelected,
      refItemElement,
      onClick(e: MouseEvent) {
        if (props.disabled) return;
        menuContext.onMenuItemClick && menuContext.onMenuItemClick(key.value);
        emit('click', e);
      },
    };
  },
  render() {
    const { level, menuContext, disabled, isSelected, onClick } = this;
    const { prefixCls, collapsed, inTrigger, mode, tooltipProps } = menuContext;

    const needTooltip = collapsed && !inTrigger && level === 1;
    const needTextIndent = mode === 'vertical' && level > 1;
    const children = this.$slots.default?.() || [];
    const showIndent = needTextIndent && !inTrigger && !collapsed;

    const itemElement = (
      <div
        ref="refItemElement"
        class={[
          `${prefixCls}-item`,
          {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-selected`]: isSelected,
          },
        ]}
        {...this.$attrs}
        onClick={onClick}
      >
        {/* 内容 */}
        {showIndent ? (
          <>
            <MenuIndent level={level} />
            <span class={`${prefixCls}-item-inner`}>{children}</span>
          </>
        ) : (
          children
        )}
        {/* 选中的下横线 */}
        {isSelected && mode === 'horizontal' && (
          <div class={`${prefixCls}-selected-label`} />
        )}
      </div>
    );

    if (needTooltip) {
      const tooltipClassNames = [
        `${prefixCls}-item-tooltip`,
        tooltipProps?.class,
      ];
      return (
        <Tooltip
          trigger="hover"
          position="right"
          class={tooltipClassNames}
          {...omit(tooltipProps || {}, ['class'])}
          v-slots={{
            default: () => itemElement,
            content: () => children,
          }}
        />
      );
    }

    return itemElement;
  },
});
