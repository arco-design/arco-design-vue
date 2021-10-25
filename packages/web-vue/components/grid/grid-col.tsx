import { defineComponent, inject, PropType } from 'vue';
import { isNumber, isObject } from '../_utils/is';
import { getPrefixCls } from '../_utils/global-config';
import { RowContextState } from './interface';

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
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('col');
    const rowContext = inject<RowContextState>('rowContext');

    const adaptationGrid = (
      prefixCls: string,
      mergeClassName: { [key: string]: any }
    ) => {
      const { xs, sm, md, lg, xl, xxl } = props;
      const screenList: {
        [key: string]: number | { [key: string]: any } | undefined;
      } = { xs, sm, md, lg, xl, xxl };

      Object.keys(screenList).forEach((screen) => {
        const screenValue = screenList[screen];
        if (screenValue && isNumber(screenValue)) {
          mergeClassName[`${prefixCls}-${screen}-${screenValue}`] = true;
        } else if (screenValue && isObject(screenValue)) {
          mergeClassName[`${prefixCls}-${screen}-${screenValue.span}`] =
            screenValue.span;
          mergeClassName[
            `${prefixCls}-${screen}-offset-${screenValue.offset}`
          ] = screenValue.offset;
          mergeClassName[`${prefixCls}-${screen}-order-${screenValue.order}`] =
            screenValue.order;
        }
      });

      return mergeClassName;
    };

    return () => {
      const { span, offset, order, xs, sm, md, lg, xl, xxl } = props;
      const div = rowContext && rowContext.div;
      const gutter = rowContext && rowContext.gutter;

      const mergeClassName = {
        [`${prefixCls}`]: !div,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-${span}`]:
          !div && !xs && !sm && !md && !lg && !xl && !xxl,
        [`${prefixCls}-offset-${offset}`]: offset && offset > 0,
      };
      const classNames = adaptationGrid(prefixCls, mergeClassName);

      const styles: {
        paddingLeft?: string;
        paddingRight?: string;
        paddingTop?: string;
        paddingBottom?: string;
      } = {};
      if (Array.isArray(gutter) && !div) {
        const paddingHorizontal = (gutter[0] && gutter[0] / 2) || 0;
        const paddingVertical = (gutter[1] && gutter[1] / 2) || 0;
        if (paddingHorizontal) {
          styles.paddingLeft = `${paddingHorizontal}px`;
          styles.paddingRight = `${paddingHorizontal}px`;
        }
        if (paddingVertical) {
          styles.paddingTop = `${paddingVertical}px`;
          styles.paddingBottom = `${paddingVertical}px`;
        }
      }

      return (
        <div class={classNames} style={styles}>
          {slots.default?.()}
        </div>
      );
    };
  },
});
