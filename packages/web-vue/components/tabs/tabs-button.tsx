import { computed, defineComponent, PropType } from 'vue';
import IconHover from '../_components/icon-hover.vue';
import IconLeft from '../icon/icon-left';
import IconRight from '../icon/icon-right';
import IconUp from '../icon/icon-up';
import IconDown from '../icon/icon-down';
import { Direction } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';

const BUTTON_TYPES = ['previous', 'next'];
type ButtonTypes = typeof BUTTON_TYPES[number];

export default defineComponent({
  name: 'TabsButton',
  props: {
    type: {
      type: String as PropType<ButtonTypes>,
      default: 'next',
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('tabs-nav-button');
    const disabledPrev = computed(() => {
      return false;
    });

    const disabledNext = computed(() => {
      return false;
    });

    const renderIcon = () => {
      if (props.direction === 'horizontal') {
        if (props.type === 'next') {
          return <IconRight />;
        }
        return <IconLeft />;
      }
      if (props.type === 'next') {
        return <IconDown />;
      }
      return <IconUp />;
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-left`]:
          props.direction === 'horizontal' && props.type === 'previous',
        [`${prefixCls}-right`]:
          props.direction === 'horizontal' && props.type === 'next',
        [`${prefixCls}-up`]:
          props.direction === 'vertical' && props.type === 'previous',
        [`${prefixCls}-down`]:
          props.direction === 'vertical' && props.type === 'next',
      },
    ]);

    return () => (
      <div class={cls.value} onClick={() => props.onClick(props.type)}>
        <IconHover>{renderIcon()}</IconHover>
      </div>
    );
  },
});
