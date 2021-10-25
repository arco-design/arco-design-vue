import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  provide,
  reactive,
} from 'vue';
import ResponsiveObserve, {
  Breakpoint,
  responsiveArray,
} from '../_utils/responsive-observe';
import { getPrefixCls } from '../_utils/global-config';
import { GridRowGutter, RowContextState, RowState } from './interface';

export default defineComponent({
  name: 'Row',
  props: {
    /**
     * @zh 栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。
     * @en Grid interval in `px`. Pass in the responsive object like {xs: 4, sm: 6, md: 12}. Pass in the array [horizontal spacing, vertical spacing] to set two directions.
     */
    gutter: {
      type: [Number, Object, Array] as PropType<
        | number
        | Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', number>>
        | GridRowGutter[]
      >,
      default: 0,
    },
    /**
     * @zh 水平对齐方式 (`justify-content`)
     * @en Horizontal alignment (`justify-content`)
     * @values 'start', 'center', 'end', 'space-around', 'space-between'
     */
    justify: {
      type: String,
      validator: (value: string) => {
        return [
          'start',
          'center',
          'end',
          'space-around',
          'space-between',
        ].includes(value);
      },
      default: 'start',
    },
    /**
     * @zh 竖直对齐方式 ( `align-items` )
     * @en Vertical alignment (`align-items`)
     * @values 'start', 'center', 'end', 'stretch'
     */
    align: {
      type: String,
      validator: (value: string) => {
        return ['start', 'center', 'end', 'stretch'].includes(value);
      },
      default: 'start',
    },
    /**
     * @zh 开启这个选项`Row`和`Col`都会被当作div而不会附带任何Grid相关的类和样式
     * @en Enabling this option `Row` and `Col` will be treated as divs without any Grid-related classes and styles
     */
    div: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('row');
    const rowContext = reactive<RowContextState>({
      gutter: undefined,
      div: undefined,
    });
    provide('rowContext', rowContext);

    const state: RowState = reactive({
      screens: {
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
      },
    });
    let token: string;

    onMounted(() => {
      token = ResponsiveObserve.subscribe((screens) => {
        const { gutter } = props;

        // 是否是响应式的 Gutter
        if (
          (!Array.isArray(gutter) && typeof gutter === 'object') ||
          (Array.isArray(gutter) &&
            (typeof gutter[0] === 'object' || typeof gutter[1] === 'object'))
        ) {
          state.screens = screens;
        }
      });
    });

    onUnmounted(() => {
      ResponsiveObserve.unsubscribe(token);
    });

    const getGutter = (gutter: GridRowGutter): number => {
      const { screens } = state;
      let result = 0;

      if (typeof gutter === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
            result = gutter[breakpoint] as number;
            break;
          }
        }
      } else {
        result = gutter;
      }

      return result;
    };

    return () => {
      const { gutter, align, justify, div } = props;
      const classNames = {
        [`${prefixCls}`]: !div,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-justify-${justify}`]: justify,
      };
      const styles: {
        marginTop?: string;
        marginBottom?: string;
        marginLeft?: string;
        marginRight?: string;
      } = {};
      const gutterHorizontal = getGutter(
        Array.isArray(gutter) ? gutter[0] : gutter
      );
      const gutterVertical = getGutter(Array.isArray(gutter) ? gutter[1] : 0);

      if ((gutterHorizontal || gutterVertical) && !div) {
        const marginHorizontal = -gutterHorizontal / 2;
        const marginVertical = -gutterVertical / 2;
        if (marginHorizontal) {
          styles.marginLeft = `${marginHorizontal}px`;
          styles.marginRight = `${marginHorizontal}px`;
        }
        if (marginVertical) {
          styles.marginTop = `${marginVertical}px`;
          styles.marginBottom = `${marginVertical}px`;
        }
      }

      rowContext.gutter = [gutterHorizontal, gutterVertical];
      rowContext.div = div;

      return (
        <div class={classNames} style={styles}>
          {slots.default?.()}
        </div>
      );
    };
  },
});
