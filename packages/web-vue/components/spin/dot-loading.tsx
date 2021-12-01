import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

const DOT_NUMBER = 5;

export default defineComponent({
  name: 'DotLoading',
  props: {
    size: {
      type: Number,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('dot-loading');

    return () => {
      const style = props.size
        ? {
            width: `${props.size}px`,
            height: `${props.size}px`,
          }
        : {};

      return (
        <div
          class={prefixCls}
          style={{
            width: props.size ? `${props.size * 7}px` : undefined,
            height: props.size ? `${props.size}px` : undefined,
          }}
        >
          {Array(DOT_NUMBER)
            .fill(1)
            .map((_, index) => (
              <div class={`${prefixCls}-item`} key={index} style={style} />
            ))}
        </div>
      );
    };
  },
});
