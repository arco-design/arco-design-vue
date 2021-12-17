import {
  defineComponent,
  PropType,
  mergeProps,
  createVNode,
  CSSProperties,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { SHAPES, ShapeType } from './constants';
import Avatar from './avatar.vue';
import Popover from '../popover';
import { TriggerProps } from '../trigger';

export default defineComponent({
  name: 'AvatarGroup',
  components: {
    Avatar,
    Popover,
  },
  props: {
    /**
     * @zh 头像的形状，有圆形(circle)和正方形(square)两种
     * @en The shape of the avatar in the group, there are two kinds of circle (circle) and square (square)
     * @values 'circle', 'square'
     */
    shape: {
      type: String as PropType<ShapeType>,
      default: 'circle',
      validator: (value: ShapeType) => {
        return SHAPES.includes(value);
      },
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
    const prefixCls = getPrefixCls('avatar-group');

    return () => {
      const children = slots.default?.() ?? [];

      const count = children.length;
      let avatarsToRender = children;

      if (props.maxCount != null && count > props.maxCount) {
        const avatarsInPopover = children.slice(props.maxCount);
        avatarsToRender = children.slice(0, props.maxCount);
        avatarsToRender.push(
          createVNode(
            Popover,
            { ...props.maxPopoverTriggerProps },
            {
              content: () => <div>{avatarsInPopover}</div>,
              default: () =>
                createVNode(
                  Avatar,
                  {
                    key: '_arco_avatar_group_popup',
                    class: `${prefixCls}-max-count-avatar`,
                    style: props.maxStyle,
                    size: props.size,
                  },
                  () => <div>+{avatarsInPopover.length}</div>
                ),
            }
          )
        );
      }

      return (
        <div class={prefixCls}>
          {avatarsToRender.map((item, index) => {
            const stackedStyle = {
              zIndex: props.zIndexAscend ? index + 1 : count - index,
              marginLeft: props.size
                ? index !== 0
                  ? `-${props.size / 4}px`
                  : '0px'
                : '',
            };
            item.props = mergeProps(
              {
                size: props.size,
                shape: props.shape,
                autoFixFontSize: props.autoFixFontSize,
                style: stackedStyle,
              },
              item.props || {}
            );
            return item;
          })}
        </div>
      );
    };
  },
});
