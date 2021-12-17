import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  toRefs,
} from 'vue';
import { SiderInjectionKey } from '../layout/context';
import { LevelInjectionKey, MenuInjectionKey } from './context';
import BaseMenu from './base-menu.vue';
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
  },
  setup(props, { attrs, slots }) {
    const { theme: propTheme, mode } = toRefs(props);

    const siderContext = inject(SiderInjectionKey, undefined);
    const siderCollapsed = computed(() => siderContext?.collapsed || false);
    const theme = computed(
      () => propTheme?.value || siderContext?.theme || 'light'
    );

    // 截断上下文
    provide(MenuInjectionKey, undefined as any);
    provide(LevelInjectionKey, undefined as any);

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
        theme={theme.value as any}
        inTrigger={false}
        siderCollapsed={siderCollapsed.value}
        isRoot
      />
    );
  },
});
