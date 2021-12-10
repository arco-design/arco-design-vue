<template>
  <div :class="classNames" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  PropType,
  provide,
  reactive,
  toRefs,
} from 'vue';
import ResponsiveObserve, {
  responsiveArray,
  ScreenMap,
} from '../_utils/responsive-observe';
import { getPrefixCls } from '../_utils/global-config';
import { GridRowGutter } from './interface';
import { RowContextInjectionKey } from './context';

const getGutter = (gutter: GridRowGutter, screens: ScreenMap) => {
  let result = 0;

  if (typeof gutter === 'object') {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i];
      if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
        result = gutter[breakpoint];
        break;
      }
    }
  } else {
    result = gutter;
  }

  return result;
};

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
  setup(props) {
    const { gutter, align, justify, div } = toRefs(props);
    const prefixCls = getPrefixCls('row');
    const classNames = computed(() => {
      return {
        [`${prefixCls}`]: !div.value,
        [`${prefixCls}-align-${align.value}`]: align.value,
        [`${prefixCls}-justify-${justify.value}`]: justify.value,
      };
    });
    const state = reactive<{ screens: ScreenMap }>({
      screens: {
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
      },
    });
    const subscribeToken = ResponsiveObserve.subscribe((screens) => {
      // 是否是响应式的 Gutter
      if (
        (!Array.isArray(gutter.value) && typeof gutter.value === 'object') ||
        (Array.isArray(gutter.value) &&
          (typeof gutter.value[0] === 'object' ||
            typeof gutter.value[1] === 'object'))
      ) {
        state.screens = screens;
      }
    });
    const gutterHorizontal = computed(() =>
      getGutter(
        Array.isArray(gutter.value) ? gutter.value[0] : gutter.value,
        state.screens
      )
    );
    const gutterVertical = computed(() =>
      getGutter(
        Array.isArray(gutter.value) ? gutter.value[1] : 0,
        state.screens
      )
    );
    const styles = computed(() => {
      const result: {
        marginTop?: string;
        marginBottom?: string;
        marginLeft?: string;
        marginRight?: string;
      } = {};
      if ((gutterHorizontal.value || gutterVertical.value) && !div.value) {
        const marginHorizontal = -gutterHorizontal.value / 2;
        const marginVertical = -gutterVertical.value / 2;
        if (marginHorizontal) {
          result.marginLeft = `${marginHorizontal}px`;
          result.marginRight = `${marginHorizontal}px`;
        }
        if (marginVertical) {
          result.marginTop = `${marginVertical}px`;
          result.marginBottom = `${marginVertical}px`;
        }
      }

      return result;
    });

    onUnmounted(() => {
      ResponsiveObserve.unsubscribe(subscribeToken);
    });

    const resultGutter = computed<[number, number]>(() => [
      gutterHorizontal.value,
      gutterVertical.value,
    ]);
    provide(
      RowContextInjectionKey,
      reactive({
        gutter: resultGutter,
        div,
      })
    );

    return {
      classNames,
      styles,
    };
  },
});
</script>
