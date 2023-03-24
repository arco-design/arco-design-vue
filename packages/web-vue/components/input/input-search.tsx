import { defineComponent, PropType, ref, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconSearch from '../icon/icon-search';
import IconLoading from '../icon/icon-loading';
import Button, { ButtonProps } from '../button';
import Input from './input';
import type { Size } from '../_utils/constant';
import { useSize } from '../_hooks/use-size';

export default defineComponent({
  name: 'InputSearch',
  props: {
    /**
     * @zh 是否为后置按钮模式
     * @en Whether it is the rear button mode
     */
    searchButton: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 输入框大小
     * @en Input size
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 搜索按钮的文字，使用后会替换原本的图标
     * @en The text of the search button will replace the original icon after use
     * @version 2.16.0
     */
    buttonText: {
      type: String,
    },
    /**
     * @zh 搜索按钮的属性
     * @en Button props
     */
    buttonProps: {
      type: Object as PropType<ButtonProps>,
    },
  },
  emits: {
    /**
     * @zh 单击搜索按钮时触发
     * @en Triggered when the search button is clicked
     * @param {string} value
     * @param {MouseEvent} ev
     */
    search: (value: string, ev: MouseEvent) => true,
  },
  setup(props, { emit, slots }) {
    const { size } = toRefs(props);
    const prefixCls = getPrefixCls('input-search');
    const { mergedSize } = useSize(size);

    const inputRef = ref();

    const handleClick = (e: MouseEvent) => {
      if (inputRef.value.inputRef) {
        emit('search', (inputRef.value.inputRef as HTMLInputElement).value, e);
      }
    };

    const renderSuffix = () => {
      return (
        <>
          {props.loading ? (
            <IconLoading />
          ) : (
            <IconHover
              // @ts-ignore
              onClick={handleClick}
            >
              <IconSearch />
            </IconHover>
          )}
          {slots.suffix?.()}
        </>
      );
    };

    const renderButton = () => {
      let _slots = {};
      if (props.buttonText || slots['button-default'] || slots['button-icon']) {
        _slots = {
          default:
            slots['button-default'] ??
            (props.buttonText ? () => props.buttonText : undefined),
          icon: slots['button-icon'],
        };
      } else {
        _slots = {
          icon: () => <IconSearch />,
        };
      }

      return (
        <Button
          v-slots={_slots}
          type="primary"
          class={`${prefixCls}-btn`}
          disabled={props.disabled}
          size={mergedSize.value}
          loading={props.loading}
          {...props.buttonProps}
          onClick={handleClick}
        />
      );
    };

    const render = () => (
      <Input
        ref={inputRef}
        class={prefixCls}
        v-slots={{
          prepend: slots.prepend,
          prefix: slots.prefix,
          suffix: props.searchButton ? slots.suffix : renderSuffix,
          append: props.searchButton ? renderButton : slots.append,
        }}
        size={mergedSize.value}
        disabled={props.disabled}
      />
    );

    return {
      inputRef,
      render,
    };
  },
  methods: {
    focus() {
      (this.inputRef as HTMLInputElement)?.focus();
    },
    blur() {
      (this.inputRef as HTMLInputElement)?.blur();
    },
  },
  render() {
    return this.render();
  },
});
