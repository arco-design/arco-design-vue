<template>
  <div v-if="visible" :class="classNames" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue';
import { isNumber, isObject, isString } from '../_utils/is';
import { getPrefixCls } from '../_utils/global-config';
import { FlexType } from './interface';
import { RowContextInjectionKey } from './context';
import { useResponsiveState } from './hook/use-responsive-state';
import { useResponsiveValue } from './hook/use-responsive-value';
import pick from '../_utils/pick';
import { responsiveArray } from '../_utils/responsive-observe';

function getAllowableFlexValue(flexValue: FlexType | undefined) {
  if (
    (isString(flexValue) &&
      (['initial', 'auto', 'none'].includes(flexValue) ||
        /^\d+$/.test(flexValue))) ||
    isNumber(flexValue)
  ) {
    return flexValue;
  }
  if (isString(flexValue) && /^\d+(px|em|rem|%)$/.test(flexValue)) {
    return `0 0 ${flexValue}`;
  }
  return undefined;
}

export default defineComponent({
  name: 'Col',
  props: {
    /**
     * @zh 栅格占位格数
     * @en Number of grid space
     */
    span: {
      type: Number,
      default: 24,
    },
    /**
     * @zh 栅格左侧的间隔格数，间隔内不可以有栅格
     * @en The number of grids on the left side of the grid. There can be no grids in the grid.
     */
    offset: {
      type: Number,
    },
    /**
     * @zh 对元素进行排序
     * @en Sort elements
     */
    order: {
      type: Number,
    },
    /**
     * @zh < 576px 响应式栅格
     * @en <576px responsive grid
     */
    xs: {
      type: [Number, Object] as PropType<number | { [key: string]: any }>,
    },
    /**
     * @zh >= 576px 响应式栅格
     * @en >= 576px responsive grid
     */
    sm: {
      type: [Number, Object] as PropType<number | { [key: string]: any }>,
    },
    /**
     * @zh >= 768px 响应式栅格
     * @en >= 768px responsive grid
     */
    md: {
      type: [Number, Object] as PropType<number | { [key: string]: any }>,
    },
    /**
     * @zh >= 992px 响应式栅格
     * @en >= 992px responsive grid
     */
    lg: {
      type: [Number, Object] as PropType<number | { [key: string]: any }>,
    },
    /**
     * @zh >= 1200px 响应式栅格
     * @en >= 1200px responsive grid
     */
    xl: {
      type: [Number, Object] as PropType<number | { [key: string]: any }>,
    },
    /**
     * @zh >= 1600px 响应式栅格
     * @en >= 1600px responsive grid
     */
    xxl: {
      type: [Number, Object] as PropType<number | { [key: string]: any }>,
    },
    /**
     * @zh 设置 flex 布局属性
     * @en Set flex layout properties
     * @version 2.10.0
     */
    flex: {
      type: [Number, String] as PropType<
        number | string | 'initial' | 'auto' | 'none'
      >,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('col');
    const rowContext = inject(RowContextInjectionKey, {});
    const flexValue = computed(() => getAllowableFlexValue(props.flex));
    const mergeClassName = computed(() => {
      const { div } = rowContext;
      const { span, offset, order, xs, sm, md, lg, xl, xxl } = props;
      const result = {
        [`${prefixCls}`]: !div,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-${span}`]:
          !div && !xs && !sm && !md && !lg && !xl && !xxl,
        [`${prefixCls}-offset-${offset}`]: offset && offset > 0,
      };

      const screenList: {
        [key: string]: number | { [key: string]: any } | undefined;
      } = { xs, sm, md, lg, xl, xxl };

      Object.keys(screenList).forEach((screen) => {
        const screenValue = screenList[screen];
        if (screenValue && isNumber(screenValue)) {
          result[`${prefixCls}-${screen}-${screenValue}`] = true;
        } else if (screenValue && isObject(screenValue)) {
          result[`${prefixCls}-${screen}-${screenValue.span}`] =
            screenValue.span;
          result[`${prefixCls}-${screen}-offset-${screenValue.offset}`] =
            screenValue.offset;
          result[`${prefixCls}-${screen}-order-${screenValue.order}`] =
            screenValue.order;
        }
      });

      return result;
    });
    const classNames = computed(() => {
      return flexValue.value ? prefixCls : mergeClassName.value;
    });
    const paddingStyles = computed(() => {
      const { gutter, div } = rowContext;
      const result: {
        paddingLeft?: string;
        paddingRight?: string;
        paddingTop?: string;
        paddingBottom?: string;
      } = {};
      if (Array.isArray(gutter) && !div) {
        const paddingHorizontal = (gutter[0] && gutter[0] / 2) || 0;
        const paddingVertical = (gutter[1] && gutter[1] / 2) || 0;
        if (paddingHorizontal) {
          result.paddingLeft = `${paddingHorizontal}px`;
          result.paddingRight = `${paddingHorizontal}px`;
        }
        if (paddingVertical) {
          result.paddingTop = `${paddingVertical}px`;
          result.paddingBottom = `${paddingVertical}px`;
        }
      }

      return result;
    });
    const flexStyles = computed<{ flex?: FlexType }>(() =>
      flexValue.value ? { flex: flexValue.value } : {}
    );

    const responsiveConfig = computed(() => pick(props, responsiveArray));
    const propSpan = useResponsiveValue(
      computed(() => ({
        val: props.span,
        key: 'span',
        ...responsiveConfig.value,
      }))
    );
    const span = useResponsiveState(propSpan, 24, true);

    return {
      visible: computed(() => !!span.value),
      classNames,
      styles: computed(() => ({ ...paddingStyles.value, ...flexStyles.value })),
    };
  },
});
</script>
