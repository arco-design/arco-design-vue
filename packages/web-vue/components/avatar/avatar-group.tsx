import {
  defineComponent,
  PropType,
  CSSProperties,
  reactive,
  ref,
  provide,
  toRefs,
  computed,
  inject,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { AvatarShape } from './interface';
import Avatar from './avatar.vue';
import Popover from '../popover';
import { TriggerProps } from '../trigger';
import { getAllElements } from '../_utils/vue-utils';
import { avatarGroupInjectionKey } from './context';
import { configProviderInjectionKey } from '../config-provider/context';

const AvatarGroup = defineComponent({
  name: 'AvatarGroup',
  props: {
    /**
     * @zh 头像的形状，有圆形(circle)和正方形(square)两种
     * @en The shape of the avatar in the group, there are two kinds of circle (circle) and square (square)
     * @values 'circle', 'square'
     */
    shape: {
      type: String as PropType<AvatarShape>,
      default: 'circle',
    },
    /**
     * @zh 头像的尺寸大小，单位是 `px`
     * @en The size of the avatar in the group, the unit is `px`
     */
    size: Number,
    /**
     * @zh 是否自动根据头像尺寸调整字体大小
     * @en Whether to automatically adjust the font size according to the size of the avatar.
     */
    autoFixFontSize: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 头像组最多显示的头像数量，多余头像将以 `+x` 的形式展示。
     * @en The maximum number of avatars displayed in the avatar group. The excess avatars will be displayed in the form of `+x`.
     */
    maxCount: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 头像组内的头像 `z-index` 递增，默认是递减。
     * @en The avatar `z-index` in the avatar group increases, and the default is decreasing.
     */
    zIndexAscend: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 多余头像样式。
     * @en Style for +x.
     * @version 2.7.0
     */
    maxStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 多余头像气泡的 `TriggerProps`
     * @en TriggerProps for popover around +x.
     * @version 2.7.0
     */
    maxPopoverTriggerProps: {
      type: Object as PropType<TriggerProps>,
    },
  },
  setup(props, { slots }) {
    const { shape, size, autoFixFontSize, zIndexAscend } = toRefs(props);
    const prefixCls = getPrefixCls('avatar-group');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => {
      return configCtx?.rtl ?? false;
    });

    const total = ref(0);

    provide(
      avatarGroupInjectionKey,
      reactive({
        shape,
        size,
        autoFixFontSize,
        zIndexAscend,
        total,
        rtl,
      })
    );

    return () => {
      const children = getAllElements(slots.default?.() ?? []);
      const avatarsToRender =
        props.maxCount > 0 ? children.slice(0, props.maxCount) : children;
      const avatarsInPopover =
        props.maxCount > 0 ? children.slice(props.maxCount) : [];

      if (total.value !== children.length) {
        total.value = children.length;
      }

      return (
        <div class={`${prefixCls} ${rtl.value ? `${prefixCls}-rtl` : ''}`}>
          {avatarsToRender}
          {avatarsInPopover.length > 0 && (
            <Popover
              v-slots={{
                content: () => <div>{avatarsInPopover}</div>,
              }}
              {...props.maxPopoverTriggerProps}
            >
              <Avatar
                class={`${prefixCls}-max-count-avatar`}
                style={props.maxStyle}
              >
                +{avatarsInPopover.length}
              </Avatar>
            </Popover>
          )}
        </div>
      );
    };
  },
});

export default AvatarGroup;
