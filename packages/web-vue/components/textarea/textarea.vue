<template>
  <div
    v-bind="getWrapperAttrs($attrs)"
    :class="wrapperCls"
    @mousedown="handleMousedown"
  >
    <div
      v-if="autoSize"
      ref="mirrorRef"
      :class="`${prefixCls}-mirror`"
      :style="mirrorStyle"
    >
      {{ `${computedValue}\n` }}
    </div>
    <resize-observer @resize="handleResize">
      <textarea
        ref="textareaRef"
        v-bind="mergeTextareaAttrs"
        :disabled="mergedDisabled"
        :class="prefixCls"
        :style="textareaStyle"
        :value="computedValue"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      />
    </resize-observer>
    <slot name="suffix" />
    <div
      v-if="computedMaxLength && showWordLimit"
      :class="`${prefixCls}-word-limit`"
    >
      {{ valueLength }}/{{ computedMaxLength }}
    </div>
    <div
      v-if="showClearBtn"
      :class="`${prefixCls}-clear-btn`"
      @click="handleClear"
    >
      <icon-hover>
        <icon-close />
      </icon-hover>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import ResizeObserver from '../_components/resize-observer';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { getPrefixCls } from '../_utils/global-config';
import { getSizeStyles } from './utils';
import { isFunction, isNull, isObject, isUndefined } from '../_utils/is';
import { omit } from '../_utils/omit';
import { INPUT_EVENTS } from '../_utils/constant';
import pick from '../_utils/pick';
import { useFormItem } from '../_hooks/use-form-item';
import { useCursor } from '../_hooks/use-cursor';

export default defineComponent({
  name: 'Textarea',
  components: { ResizeObserver, IconHover, IconClose },
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
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
     * @zh 提示文字
     * @en Placeholder
     */
    placeholder: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为错误状态
     * @en Whether it is an error state
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 输入值的最大长度，errorOnly 属性在 2.12.0 版本添加
     * @en Maximum length of input value, the errorOnly attribute was added in version 2.12.0
     */
    maxLength: {
      type: [Number, Object] as PropType<
        number | { length: number; errorOnly?: boolean }
      >,
      default: 0,
    },
    /**
     * @zh 是否显示字数统计
     * @en Whether to display word count
     */
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否允许清空文本域
     * @en Whether to allow clearing the text
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否让文本框自适应内容高度
     * @en Whether to make the textarea adapt to the height of the content
     */
    autoSize: {
      type: [Boolean, Object] as PropType<
        boolean | { minRows?: number; maxRows?: number }
      >,
      default: false,
    },
    /**
     * @zh 字符长度的计算方法
     * @en Calculation method of word length
     */
    wordLength: {
      type: Function as PropType<(value: string) => number>,
    },
    /**
     * @zh 字符截取方法，同 wordLength 一起使用
     * @en Character interception method, used together with wordLength
     * @version 2.12.0
     */
    wordSlice: {
      type: Function as PropType<(value: string, maxLength: number) => string>,
    },
    /**
     * @zh 透传给 textarea 的属性
     * @en Attributes passed to textarea
     */
    textareaAttrs: {
      type: Object as PropType<Record<string, any>>,
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
    /**
     * @zh 用户输入时触发
     * @en Emitted when the user enters
     * @param {string} value
     * @param {Event} ev
     */
    'input': (value: string, ev: Event) => true,
    /**
     * @zh 仅在文本框失焦时触发
     * @en Only emitted when the textarea is out of focus
     * @param {string} value
     * @param {Event} ev
     */
    'change': (value: string, ev: Event) => true,
    /**
     * @zh 点击清除按钮时触发
     * @en Emitted when the clear button is clicked
     * @param {MouseEvent} ev
     */
    'clear': (ev: MouseEvent) => true,
    /**
     * @zh 文本框获取焦点时触发
     * @en Emitted when the textarea gets focus
     * @param {FocusEvent} ev
     */
    'focus': (ev: FocusEvent) => true,
    /**
     * @zh 文本框失去焦点时触发
     * @en Emitted when the textarea loses focus
     * @param {FocusEvent} ev
     */
    'blur': (ev: FocusEvent) => true,
  },
  setup(props, { emit, attrs }) {
    const { disabled, error, modelValue } = toRefs(props);
    const prefixCls = getPrefixCls('textarea');
    const {
      mergedDisabled,
      mergedError: _mergedError,
      eventHandlers,
    } = useFormItem({ disabled, error });

    const textareaRef = ref<HTMLInputElement>();
    const textareaStyle = ref<CSSProperties>();
    const mirrorRef = ref<HTMLInputElement>();
    const mirrorStyle = ref<CSSProperties>();

    const _value = ref(props.defaultValue);
    const computedValue = computed(() => modelValue.value ?? _value.value);
    const [recordCursor, setCursor] = useCursor(textareaRef);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });

    const maxLengthErrorOnly = computed(
      () => isObject(props.maxLength) && Boolean(props.maxLength.errorOnly)
    );

    const computedMaxLength = computed(() => {
      if (isObject(props.maxLength)) {
        return props.maxLength.length;
      }
      return props.maxLength;
    });

    const getValueLength = (value: string) => {
      if (isFunction(props.wordLength)) {
        return props.wordLength(value);
      }
      return value.length ?? 0;
    };

    const valueLength = computed(() => getValueLength(computedValue.value));

    const mergedError = computed(
      () =>
        _mergedError.value ||
        Boolean(
          computedMaxLength.value &&
            maxLengthErrorOnly.value &&
            valueLength.value > computedMaxLength.value
        )
    );

    const isScroll = ref(false);

    // 状态相关
    const focused = ref(false);
    const showClearBtn = computed(
      () => props.allowClear && !mergedDisabled.value && computedValue.value
    );

    // 输入法相关
    const isComposition = ref(false);
    const compositionValue = ref('');

    const keepControl = () => {
      recordCursor();
      nextTick(() => {
        if (
          textareaRef.value &&
          computedValue.value !== textareaRef.value.value
        ) {
          textareaRef.value.value = computedValue.value;
          setCursor();
        }
      });
    };

    const updateValue = (value: string, inner = true) => {
      if (
        computedMaxLength.value &&
        !maxLengthErrorOnly.value &&
        getValueLength(value) > computedMaxLength.value
      ) {
        value =
          props.wordSlice?.(value, computedMaxLength.value) ??
          value.slice(0, computedMaxLength.value);
      }

      _value.value = value;
      if (inner) {
        emit('update:modelValue', value);
      }

      keepControl();
    };

    let preValue = computedValue.value;
    const emitChange = (value: string, ev: Event) => {
      if (value !== preValue) {
        preValue = value;
        emit('change', value, ev);
        eventHandlers.value?.onChange?.(ev);
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      focused.value = true;
      preValue = computedValue.value;
      emit('focus', ev);
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      focused.value = false;
      emit('blur', ev);
      eventHandlers.value?.onBlur?.(ev);
      emitChange(computedValue.value, ev);
    };

    const handleComposition = (e: CompositionEvent) => {
      const { value } = e.target as HTMLInputElement;

      if (e.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';

        if (
          computedMaxLength.value &&
          !maxLengthErrorOnly.value &&
          computedValue.value.length >= computedMaxLength.value &&
          getValueLength(value) > computedMaxLength.value
        ) {
          keepControl();
          return;
        }

        emit('input', value, e);
        updateValue(value);
        eventHandlers.value?.onInput?.(e);
      } else {
        isComposition.value = true;
      }
    };

    const handleInput = (e: InputEvent) => {
      const { value } = e.target as HTMLInputElement;

      if (!isComposition.value) {
        if (
          computedMaxLength.value &&
          !maxLengthErrorOnly.value &&
          computedValue.value.length >= computedMaxLength.value &&
          getValueLength(value) > computedMaxLength.value &&
          e.inputType === 'insertText'
        ) {
          keepControl();
          return;
        }

        emit('input', value, e);
        updateValue(value);
        eventHandlers.value?.onInput?.(e);
      } else {
        compositionValue.value = value;
      }
    };

    const handleClear = (ev: MouseEvent) => {
      updateValue('');
      emitChange('', ev);
      emit('clear', ev);
    };

    // modelValue发生改变时，更新内部值
    watch(modelValue, (value: string | undefined) => {
      if (value !== computedValue.value) {
        updateValue(value ?? '', false);
      }
    });

    const getWrapperAttrs = (attr: Record<string, any>) =>
      omit(attrs, INPUT_EVENTS);
    const getTextareaAttrs = (attr: Record<string, any>) =>
      pick(attrs, INPUT_EVENTS);
    const textareaAttrs = getTextareaAttrs(attrs);
    const mergeTextareaAttrs = computed(() => {
      const attrs = {
        ...textareaAttrs,
        ...props.textareaAttrs,
      };
      if (mergedError.value) {
        attrs['aria-invalid'] = true;
      }
      return attrs;
    });

    const wrapperCls = computed(() => [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-focus`]: focused.value,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
        [`${prefixCls}-error`]: mergedError.value,
        [`${prefixCls}-scroll`]: isScroll.value,
      },
    ]);

    let styleDeclaration: CSSStyleDeclaration;

    const lineHeight = ref<number>(0);
    const outerHeight = ref<number>(0);
    const minHeight = computed(() => {
      if (!isObject(props.autoSize) || !props.autoSize.minRows) {
        return 0;
      }
      return props.autoSize.minRows * lineHeight.value + outerHeight.value;
    });
    const maxHeight = computed(() => {
      if (!isObject(props.autoSize) || !props.autoSize.maxRows) {
        return 0;
      }
      return props.autoSize.maxRows * lineHeight.value + outerHeight.value;
    });

    const getMirrorStyle = () => {
      const styles = getSizeStyles(styleDeclaration);

      lineHeight.value = Number.parseInt(styles['line-height'] || 0, 10);
      outerHeight.value =
        Number.parseInt(styles['border-width'] || 0, 10) * 2 +
        Number.parseInt(styles['padding-top'] || 0, 10) +
        Number.parseInt(styles['padding-bottom'] || 0, 10);

      mirrorStyle.value = styles;

      nextTick(() => {
        const mirrorHeight = mirrorRef.value?.offsetHeight;

        let height = mirrorHeight ?? 0;
        let overflow = 'hidden';

        if (minHeight.value && height < minHeight.value) {
          height = minHeight.value;
        }
        if (maxHeight.value && height > maxHeight.value) {
          height = maxHeight.value;
          overflow = 'auto';
        }

        textareaStyle.value = {
          height: `${height}px`,
          resize: 'none',
          overflow,
        };
      });
    };

    onMounted(() => {
      if (textareaRef.value) {
        styleDeclaration = window.getComputedStyle(textareaRef.value);
        if (props.autoSize) {
          getMirrorStyle();
        }
      }
      computeIsScroll();
    });

    const handleResize = () => {
      if (props.autoSize && mirrorRef.value) {
        getMirrorStyle();
      }
      computeIsScroll();
    };

    const handleMousedown = (e: MouseEvent) => {
      if (textareaRef.value && e.target !== textareaRef.value) {
        e.preventDefault();
        textareaRef.value.focus();
      }
    };

    const computeIsScroll = () => {
      if (textareaRef.value) {
        if (textareaRef.value.scrollHeight > textareaRef.value.offsetHeight) {
          if (!isScroll.value) isScroll.value = true;
        } else if (isScroll.value) {
          isScroll.value = false;
        }
      }
    };

    watch(computedValue, () => {
      if (props.autoSize && mirrorRef.value) {
        getMirrorStyle();
      }
      computeIsScroll();
    });

    return {
      prefixCls,
      wrapperCls,
      textareaRef,
      textareaStyle,
      mirrorRef,
      mirrorStyle,
      computedValue,
      showClearBtn,
      valueLength,
      computedMaxLength,
      mergedDisabled,
      mergeTextareaAttrs,
      getWrapperAttrs,
      getTextareaAttrs,
      handleInput,
      handleFocus,
      handleBlur,
      handleComposition,
      handleClear,
      handleResize,
      handleMousedown,
    };
  },
  methods: {
    /**
     * @zh 使输入框获取焦点
     * @en Make the input box focus
     * @public
     * @version 2.24.0
     */
    focus() {
      (this.$refs.textareaRef as HTMLInputElement)?.focus();
    },
    /**
     * @zh 使输入框失去焦点
     * @en Make the input box lose focus
     * @public
     * @version 2.24.0
     */
    blur() {
      (this.$refs.textareaRef as HTMLInputElement)?.blur();
    },
  },
});
</script>
