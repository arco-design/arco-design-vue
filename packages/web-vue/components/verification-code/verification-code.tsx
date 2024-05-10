import { PropType, VNode, computed, defineComponent, ref, watch } from 'vue';
import { Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import ArcoInput from '../input';
import { isExist, isFunction, isString } from '../_utils/is';
import { Backspace, ArrowLeft, ArrowRight } from '../_utils/keycode';

export default defineComponent({
  name: 'VerificationCode',
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: String,
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 验证码的长度，根据长度渲染对应个数的输入框
     * @en The length of the verification code, rendering the corresponding number of input boxes according to the length.
     */
    length: {
      type: Number,
      default: 6,
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
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: Boolean,
    /**
     * @zh 是否密码模式
     * @en Password mode
     */
    masked: Boolean,
    /**
     * @zh 只读
     * @en Readonly
     */
    readonly: Boolean,
    /**
     * @zh 是否为错误状态
     * @en Whether it is an error state
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 分隔符。可在不同索引的输入框后自定义渲染分隔符
     * @en Separator. Customizable rendering separators after input boxes with different indexes
     */
    separator: {
      type: Function as PropType<(index: number, character: string) => VNode>,
    },
    /**
     * @zh 格式化函数，当用户输入值改变时触发
     * @en Formatter function, triggered when the user input value changes
     */
    formatter: {
      type: Function as PropType<
        (inputValue: string, index: number, value: string) => string | boolean
      >,
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @param { string } value
     */
    'change': (value: string) => true,
    /**
     * @zh 填充完成时触发
     * @en Triggered when the filling is complete
     * @param { string } value
     */
    'finish': (value: string) => true,
    /**
     * @zh 输入时触发
     * @en Triggered on input
     * @param { string } inputValue
     * @param { number } index
     * @param {Event} ev
     */
    'input': (inputValue: string, index: number, ev: Event) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('verification-code');
    const prefixInputCls = getPrefixCls('input');
    const inputRefList = ref([] as HTMLElement[]);

    const mergedValue = computed(() => props.modelValue ?? props.defaultValue);
    const type = computed(() => (props.masked ? 'password' : 'text'));
    const inputCls = computed(() => [
      prefixInputCls,
      {
        [`${prefixInputCls}-size-${props.size}`]: props.size,
      },
    ]);

    const filledValue = computed(() => {
      const newVal = String(mergedValue.value).split('');
      return new Array(props.length).fill('').map((_, index) => {
        return isExist(newVal[index]) ? String(newVal[index]) : '';
      }) as string[];
    });

    const innerValue = ref(filledValue.value);

    watch(mergedValue, () => {
      innerValue.value = filledValue.value;
    });

    const updateValue = () => {
      const value = innerValue.value.join('').trim();
      emit('update:modelValue', value);
      emit('change', value);
      if (value.length === props.length) {
        emit('finish', value);
      }
      focusFirstEmptyInput();
    };

    const handleFocus = (index: number) => inputRefList?.value[index].focus();
    const focusFirstEmptyInput = (index?: number) => {
      if (isExist(index) && innerValue.value[index as number]) {
        return;
      }
      for (let i = 0; i < innerValue.value.length; i++) {
        if (!innerValue.value[i]) {
          handleFocus(i);
          break;
        }
      }
    };

    const handlePaste = (e: ClipboardEvent, index: number) => {
      e.preventDefault();
      const { clipboardData } = e;
      const text = clipboardData?.getData('text');
      if (!text) return;

      text.split('').forEach((char, i) => {
        if (index + i >= props.length) return;

        if (isFunction(props.formatter)) {
          const result = props.formatter(
            char,
            index + i,
            innerValue.value.join('')
          );
          if (result === false) {
            index -= 1;
            return;
          }
          if (isString(result)) {
            char = result.charAt(0);
          }
        }

        innerValue.value[index + i] = char;
      });
      updateValue();
    };

    const handleKeydown = (index: number, e: KeyboardEvent) => {
      const keyCode = e.code || e.key;

      if (keyCode === Backspace.code && !innerValue.value[index]) {
        e.preventDefault();
        innerValue.value[Math.max(index - 1, 0)] = '';
        updateValue();
      } else if (keyCode === ArrowLeft.code && index > 0) {
        e.preventDefault();
        handleFocus(index - 1);
      } else if (
        keyCode === ArrowRight.code &&
        innerValue.value[index] &&
        index < props.length - 1
      ) {
        e.preventDefault();
        handleFocus(index + 1);
      }
    };

    const handleInput = (index: number, value: string, event: Event) => {
      let char = (value || '').trim().charAt(value.length - 1);
      emit('input', char, index, event);

      if (isFunction(props.formatter)) {
        const result = props.formatter(char, index, innerValue.value.join(''));
        if (result === false) return;
        if (isString(result)) {
          char = result.charAt(0);
        }
      }

      innerValue.value[index] = char;
      updateValue();
    };

    return () => {
      return (
        <div class={prefixCls}>
          {innerValue.value.map((c, i) => (
            <>
              <ArcoInput
                key={i}
                ref={(el: any) => (inputRefList.value[i] = el)}
                type={type.value}
                class={inputCls.value}
                modelValue={c}
                size={props.size}
                error={props.error}
                disabled={props.disabled}
                readonly={props.readonly}
                onFocus={() => focusFirstEmptyInput(i)}
                onInput={(v, e) => handleInput(i, v, e)}
                // @ts-ignore
                onKeydown={(e) => handleKeydown(i, e)}
                onPaste={(e: ClipboardEvent) => handlePaste(e, i)}
              />
              {props.separator?.(i, c)}
            </>
          ))}
        </div>
      );
    };
  },
});
