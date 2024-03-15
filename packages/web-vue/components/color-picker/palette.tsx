import { defineComponent, computed, PropType, toRefs, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { hsvToRgb } from '../_utils/color';
import { Color } from './interface';
import { useControlBlock } from './hooks/use-control-block';

export default defineComponent({
  name: 'Palette',
  props: {
    color: {
      type: Object as PropType<Color>,
      required: true,
    },
    onChange: Function as PropType<(s: number, v: number) => void>,
  },
  setup(props) {
    const prefixCls = getPrefixCls('color-picker');
    const hsv = computed(() => props.color.hsv);

    const { blockRef, handlerRef, onMouseDown } = useControlBlock({
      value: [hsv.value.s, 1 - hsv.value.v],
      onChange: (value) => props.onChange?.(value[0], 1 - value[1]),
    });

    const hueColor = computed(() => {
      const rgb = hsvToRgb(hsv.value.h, 1, 1);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    });

    return () => (
      <div
        ref={blockRef}
        class={`${prefixCls}-palette`}
        style={{ backgroundColor: hueColor.value }}
        onMousedown={onMouseDown}
      >
        <div
          ref={handlerRef}
          class={`${prefixCls}-handler`}
          style={{
            top: `${(1 - hsv.value.v) * 100}%`,
            left: `${hsv.value.s * 100}%`,
          }}
        />
      </div>
    );
  },
});
