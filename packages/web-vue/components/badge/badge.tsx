import {
  defineComponent,
  computed,
  toRefs,
  CSSProperties,
  PropType,
  Slot,
  inject,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { configProviderInjectionKey } from '../config-provider/context';

export const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
] as const;

export type ColorType = (typeof COLORS)[number];

export const BADGE_STATUSES = [
  'normal',
  'processing',
  'success',
  'warning',
  'danger',
] as const;
export type BadgeStatus = (typeof BADGE_STATUSES)[number];

export default defineComponent({
  name: 'Badge',
  props: {
    /**
     * @zh 自定义提示内容
     * @en Set the display text of the status dot
     */
    text: {
      type: String,
    },
    /**
     * @zh 显示为小红点
     * @en Whether to display a red dot instead of `count`
     */
    dot: {
      type: Boolean,
    },
    /**
     * @zh 徽标的样式
     * @en Customize badge dot style
     */
    dotStyle: {
      type: Object,
    },
    /**
     * @zh 徽标最大显示数值，如果count超过这个数值会显示为maxCount
     * @en Max count to show. If count is larger than this value, it will be displayed as `${maxCount}+`
     */
    maxCount: {
      type: Number,
      default: 99,
    },
    /**
     * @zh 设置徽标位置的偏移
     * @en Set offset of the badge dot
     */
    offset: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    /**
     * @zh 内置的一些颜色
     * @en Customize dot color
     */
    color: {
      type: String as PropType<ColorType | string>,
    },
    /**
     * @zh 徽标的状态类型
     * @en Badge status
     * @values 'normal', 'processing', 'success', 'warning', 'danger'
     */
    status: {
      type: String as PropType<BadgeStatus>,
      validator: (value: any) => {
        return BADGE_STATUSES.includes(value);
      },
    },
    /**
     * @zh 徽标显示的数字
     * @en Number to show in badge
     */
    count: {
      type: Number,
    },
  },
  setup(props, { slots }) {
    const { status, color, dotStyle, offset, text, dot, maxCount, count } =
      toRefs(props);
    const prefixCls = getPrefixCls('badge');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => {
      return configCtx?.rtl ?? false;
    });
    const wrapperClassName = useWrapperClass(
      prefixCls,
      status?.value,
      slots?.default,
      rtl
    );

    const computedStyleRef = computed(() => {
      const computedDotStyle = { ...(dotStyle?.value || {}) };
      const [leftOffset, topOffset] = offset?.value || [];
      if (leftOffset) {
        computedDotStyle.marginRight = `${-leftOffset}px`;
      }
      if (topOffset) {
        computedDotStyle.marginTop = `${topOffset}px`;
      }
      const computedColorStyle =
        !color?.value ||
        COLORS.includes(color?.value as (typeof COLORS)[number])
          ? {}
          : { backgroundColor: color.value };
      const mergedStyle = {
        ...computedColorStyle,
        ...computedDotStyle,
      } as CSSProperties;

      return {
        mergedStyle,
        computedDotStyle,
        computedColorStyle,
      };
    });

    const getDot = () => {
      const textValue = text?.value;
      const colorValue = color?.value;
      const statusValue = status?.value;
      const dotValue = dot?.value;
      const countValue = Number(count?.value);
      const hasCount = count?.value != null;
      const { computedDotStyle, mergedStyle } = computedStyleRef.value;
      if (slots.content) {
        return (
          <span class={`${prefixCls}-custom-dot`} style={computedDotStyle}>
            {slots.content()}
          </span>
        );
      }
      if (textValue && !colorValue && !statusValue) {
        return (
          <span class={`${prefixCls}-text`} style={computedDotStyle}>
            {textValue}
          </span>
        );
      }
      if (statusValue || (colorValue && !hasCount)) {
        return (
          <span class={`${prefixCls}-status-wrapper`}>
            <span
              class={[
                `${prefixCls}-status-dot`,
                {
                  [`${prefixCls}-status-${statusValue}`]: statusValue,
                  [`${prefixCls}-color-${colorValue}`]: colorValue,
                },
              ]}
              style={mergedStyle}
            />
            {textValue && (
              <span class={`${prefixCls}-status-text`}>{textValue}</span>
            )}
          </span>
        );
      }
      if ((dotValue || colorValue) && countValue > 0) {
        return (
          <span
            class={[
              `${prefixCls}-dot`,
              {
                [`${prefixCls}-color-${colorValue}`]: colorValue,
              },
            ]}
            style={mergedStyle}
          />
        );
      }
      if (countValue === 0) {
        return null;
      }

      return (
        <span class={`${prefixCls}-number`} style={mergedStyle}>
          <span>
            {maxCount.value && countValue > maxCount.value
              ? `${maxCount.value}+`
              : countValue}
          </span>
        </span>
      );
    };

    return () => {
      return (
        <span class={wrapperClassName.value}>
          {slots.default && slots.default()}
          {getDot()}
        </span>
      );
    };
  },
});

const useWrapperClass = (
  prefixCls: string,
  status?: BadgeStatus,
  children?: Slot,
  rtl?: ReturnType<typeof computed>
) => {
  return computed(() => [
    prefixCls,
    {
      [`${prefixCls}-status`]: status,
      [`${prefixCls}-no-children`]: !children,
    },
    rtl?.value ? `${prefixCls}-rtl` : '',
  ]);
};
