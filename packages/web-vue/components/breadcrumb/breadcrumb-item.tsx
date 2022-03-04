import { computed, defineComponent, inject } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconMore from '../icon/icon-more';
import IconObliqueLine from '../icon/icon-oblique-line';
import { breadcrumbInjectKey } from './context';

export default defineComponent({
  name: 'BreadcrumbItem',
  inheritAttrs: false,
  props: {
    // private
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = getPrefixCls('breadcrumb-item');
    const breadcrumbCtx = inject(breadcrumbInjectKey, undefined);

    const show = computed(() => {
      if (breadcrumbCtx && breadcrumbCtx.needHide) {
        if (
          props.index > 1 &&
          props.index <= breadcrumbCtx.total - breadcrumbCtx.maxCount
        ) {
          return false;
        }
      }
      return true;
    });

    const displayMore = computed(() => {
      if (breadcrumbCtx && breadcrumbCtx.needHide) {
        return props.index === 1;
      }
      return false;
    });

    const showSeparator = computed(() =>
      breadcrumbCtx ? props.index < breadcrumbCtx.total - 1 : true
    );

    return () => {
      if (show.value) {
        return (
          <>
            <div class={prefixCls} {...attrs}>
              {displayMore.value ? <IconMore /> : slots.default?.()}
            </div>
            {showSeparator.value && (
              <div class={`${prefixCls}-separator`}>
                {breadcrumbCtx?.slots.separator?.() ?? <IconObliqueLine />}
              </div>
            )}
          </>
        );
      }
      return null;
    };
  },
});
