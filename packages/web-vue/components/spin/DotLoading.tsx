import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

const DOT_NUMBER = 5;

export default defineComponent({
  name: 'ArcoDotLoading',
  props: {
    size: {
      type: Number,
      default: 8,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('dot-loading');

    const style = {
      width: `${props.size}px`,
      height: `${props.size}px`,
    };

    return () => (
      <div
        class={prefixCls}
        style={{
          width: `${props.size * 7}px`,
          height: `${props.size}px`,
        }}
      >
        {Array(DOT_NUMBER)
          .fill(1)
          .map((_, index) => (
            <div class={`${prefixCls}-item`} key={index} style={style} />
          ))}
      </div>
    );
  },
});
