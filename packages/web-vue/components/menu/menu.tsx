import { computed, defineComponent, inject, InjectionKey, PropType, provide, toRefs } from 'vue';

import { EllipsisTooltipProps } from '../ellipsis';
import { SiderInjectionKey } from '../layout/context';
import BaseMenu from './base-menu.vue';
import { LevelContext, LevelInjectionKey, MenuContext, MenuInjectionKey } from './context';
import OverflowWrap from './overflow-wrap';

export default defineComponent({
  name: 'Menu',
  components: {
    BaseMenu,
  },
  inheritAttrs: false,
  props: {
    /** 菜单风格 */
    theme: {
      type: String as PropType<'light' | 'dark'>,
    },
    mode: {
      type: String as PropType<'vertical' | 'horizontal' | 'pop' | 'popButton'>,
      default: 'vertical',
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    ellipsisProps: {
      type: Object as PropType<{
        lineClamp?: number | string;
        expandTrigger?: 'click';
        tooltip?: boolean | EllipsisTooltipProps;
      }>,
      default: undefined,
    },
  },
  setup(props, { attrs, slots }) {
    const { theme: propTheme, mode } = toRefs(props);

    const siderContext = inject(SiderInjectionKey, undefined);
    const siderCollapsed = computed(() => siderContext?.collapsed || false);
    const theme = computed(
      () => (propTheme?.value || siderContext?.theme || 'light') as 'light' | 'dark',
    );

    // 截断上下文
    provide(MenuInjectionKey as InjectionKey<MenuContext | undefined>, undefined);
    provide(LevelInjectionKey as InjectionKey<LevelContext | undefined>, undefined);

    return () => (
      <BaseMenu
        {...props}
        {...attrs}
        v-slots={{
          ...slots,
          default:
            mode.value === 'horizontal' && slots.default
              ? () => <OverflowWrap>{slots.default?.()}</OverflowWrap>
              : slots.default,
        }}
        theme={theme.value}
        inTrigger={false}
        siderCollapsed={siderCollapsed.value}
        isRoot
      />
    );
  },
});
