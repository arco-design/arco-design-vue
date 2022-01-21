import { defineComponent, inject, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconSearch from '../icon/icon-search';
import IconLoading from '../icon/icon-loading';
import Button from '../button';
import Input from './input';
import { EmitType } from '../_utils/types';
import { Size } from '../_utils/constant';
import { configProviderInjectionKey } from '../config-provider/context';

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
      default: () =>
        inject(configProviderInjectionKey, undefined)?.size ?? 'medium',
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
      type: Object,
    },
    // for JSX
    onSearch: {
      type: [Function, Array] as PropType<
        EmitType<(value: string, ev: MouseEvent) => void>
      >,
    },
  },
  emits: [
    /**
     * @zh 单击搜索按钮时触发
     * @en Triggered when the search button is clicked
     * @property {string} value
     */
    'search',
  ],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('input-search');

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
            <IconHover onClick={handleClick}>
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
          size={props.size}
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
        size={props.size}
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
