import { defineComponent, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconSearch from '../icon/icon-search';
import IconLoading from '../icon/icon-loading';
import Button from '../button';
import Input from './input';
import InputGroup from './input-group.vue';
import { EmitType } from '../_utils/types';
import { Size, SIZES } from '../_utils/constant';

export default defineComponent({
  name: 'InputSearch',
  inheritAttrs: false,
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
     * @zh 输入框大小
     * @en Input size
     * @values 'mini', 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
      validator: (value: any) => {
        return SIZES.includes(value);
      },
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
  setup(props, { emit, slots, attrs }) {
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

    const renderInput = () => {
      const inputSlots = {
        prepend: slots.prepend,
        prefix: slots.prefix,
        suffix: props.searchButton ? slots.suffix : renderSuffix,
        append: slots.append,
      };

      return (
        <Input
          ref={inputRef}
          v-slots={inputSlots}
          size={props.size}
          {...attrs}
        />
      );
    };

    const render = () => {
      if (props.searchButton) {
        return (
          <InputGroup>
            {renderInput()}
            <Button
              v-slots={{
                icon: () => (props.loading ? <IconLoading /> : <IconSearch />),
              }}
              type="primary"
              size={props.size}
              class={`${prefixCls}-btn`}
              loading={props.loading}
              onClick={handleClick}
            />
          </InputGroup>
        );
      }
      return renderInput();
    };

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
