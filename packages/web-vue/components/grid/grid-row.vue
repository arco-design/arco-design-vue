<template>
  <div :class="classNames" :style="styles">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType, provide, reactive, toRefs } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import { RowContextInjectionKey } from './context';
  import { useResponsiveState } from './hook/use-responsive-state';
  import { ResponsiveValue } from './interface';

  defineOptions({ name: 'Row' });

  const props = defineProps({
    /**
     * @zh 栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。
     * @en Grid interval in `px`. Pass in the responsive object like {xs: 4, sm: 6, md: 12}. Pass in the array [horizontal spacing, vertical spacing] to set two directions.
     */
    gutter: {
      type: [Number, Object, Array] as PropType<
        number | ResponsiveValue | [number | ResponsiveValue, number | ResponsiveValue]
      >,
      default: 0,
    },
    /**
     * @zh 水平对齐方式 (`justify-content`)
     * @en Horizontal alignment (`justify-content`)
     */
    justify: {
      type: String as PropType<'start' | 'center' | 'end' | 'space-around' | 'space-between'>,
      default: 'start',
    },
    /**
     * @zh 竖直对齐方式 ( `align-items` )
     * @en Vertical alignment (`align-items`)
     */
    align: {
      type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
      default: 'start',
    },
    /**
     * @zh 开启这个选项`Row`和`Col`都会被当作div而不会附带任何Grid相关的类和样式
     * @en Enabling this option `Row` and `Col` will be treated as divs without any Grid-related classes and styles
     */
    div: {
      type: Boolean,
    },
    /**
     * @zh `Col` 是否支持换行
     * @en Whether `Col` can wrap onto multiple lines
     * @version 2.13.0
     */
    wrap: {
      type: Boolean,
      default: true,
    },
  });

  const { gutter, align, justify, div, wrap } = toRefs(props);
  const prefixCls = getPrefixCls('row');
  const classNames = computed(() => {
    return {
      [`${prefixCls}`]: !div.value,
      [`${prefixCls}-nowrap`]: !wrap.value,
      [`${prefixCls}-align-${align.value}`]: align.value,
      [`${prefixCls}-justify-${justify.value}`]: justify.value,
    };
  });
  const propGutterHorizontal = computed(() =>
    Array.isArray(gutter.value) ? gutter.value[0] : gutter.value,
  );
  const propGutterVertical = computed(() => (Array.isArray(gutter.value) ? gutter.value[1] : 0));
  const gutterHorizontal = useResponsiveState(propGutterHorizontal, 0);
  const gutterVertical = useResponsiveState(propGutterVertical, 0);
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

  const resultGutter = computed<[number, number]>(() => [
    gutterHorizontal.value,
    gutterVertical.value,
  ]);
  provide(
    RowContextInjectionKey,
    reactive({
      gutter: resultGutter,
      div,
    }),
  );
</script>
