import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import IconHover from '../_components/icon-hover.vue';
import IconLeft from '../icon/icon-left';
import IconRight from '../icon/icon-right';
import IconUp from '../icon/icon-up';
import IconDown from '../icon/icon-down';
import type { Direction } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { configProviderInjectionKey } from '../config-provider/context';

type ButtonTypes = 'previous' | 'next';

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
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(type: ButtonTypes, ev: Event) => void>,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('tabs-nav-button');

    const handleClick = (ev: Event) => {
      if (!props.disabled) {
        emit('click', props.type, ev);
      }
    };

    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => {
      return configCtx?.rtl ?? false;
    });

    const renderIcon = () => {
      if (props.direction === 'horizontal') {
        if (props.type === 'next') {
          return rtl.value ? <IconLeft /> : <IconRight />;
        }
        return rtl.value ? <IconRight /> : <IconLeft />;
      }
      return props.type === 'next' ? <IconDown /> : <IconUp />;
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-disabled`]: props.disabled,
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
      <div class={cls.value} onClick={handleClick}>
        <IconHover disabled={props.disabled}>{renderIcon()}</IconHover>
      </div>
    );
  },
});
