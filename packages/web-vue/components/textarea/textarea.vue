<template>
  <div :class="wrapperCls" @mousedown="handleMousedown">
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
        v-bind="$attrs"
        :disabled="disabled"
        :class="cls"
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
    <div v-if="maxLength && showWordLimit" :class="`${prefixCls}-word-limit`">
      {{ getTextLength(computedValue) }}/{{ maxLength }}
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
  watch,
} from 'vue';
import ResizeObserver from '../_components/resize-observer';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { getPrefixCls } from '../_utils/global-config';
import { getSizeStyles } from './utils';
import { isFunction } from '../_utils/is';

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
     * @zh 输入值的最大长度
     * @en Maximum length of input value
     */
    maxLength: Number,
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
      type: Boolean,
      default: false,
    },
    /**
     * @zh 字符长度的计算方法
     * @en Calculation method of word length
     */
    wordLength: {
      type: Function as PropType<(value: string) => number>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 用户输入时触发
     * @en Emitted when the user enters
     */
    'input',
    /**
     * @zh 仅在文本框失焦时触发
     * @en Only emitted when the textarea is out of focus
     */
    'change',
    /**
     * @zh 点击清除按钮时触发
     * @en Emitted when the clear button is clicked
     */
    'clear',
    /**
     * @zh 文本框获取焦点时触发
     * @en Emitted when the textarea gets focus
     */
    'focus',
    /**
     * @zh 文本框失去焦点时触发
     * @en Emitted when the textarea loses focus
     */
    'blur',
  ],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('textarea');

    const textareaRef = ref<HTMLInputElement>();
    const textareaStyle = ref<CSSProperties>();
    const mirrorRef = ref<HTMLInputElement>();
    const mirrorStyle = ref<CSSProperties>();

    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    const getTextLength = (text: string) => {
      if (isFunction(props.wordLength)) {
        return props.wordLength(text);
      }

      return text.replace(/\n|\r/g, '').length;
    };

    const sliceText = (text: string, length: number) => {
      const chars = text.split('');
      let count = 0;
      let result = '';

      for (const char of chars) {
        result += char;
        if (!/\n|\r/.test(char)) {
          count += 1;
        }
        if (count === length) {
          return result;
        }
      }
      return result;
    };

    const isScroll = ref(false);

    // 状态相关
    const focused = ref(false);
    const showClearBtn = computed(
      () => props.allowClear && !props.disabled && computedValue.value
    );

    // 输入法相关
    const isComposition = ref(false);
    const compositionValue = ref('');

    const updateValue = (value: string, inner = true) => {
      if (props.maxLength && getTextLength(value) > props.maxLength) {
        value = sliceText(value, props.maxLength);
      }

      _value.value = value;
      if (inner) {
        emit('update:modelValue', value);
      }

      nextTick(() => {
        if (
          textareaRef.value &&
          computedValue.value !== textareaRef.value.value
        ) {
          textareaRef.value.value = computedValue.value;
        }
      });
    };

    const handleFocus = (e: Event) => {
      focused.value = true;
      emit('focus', e);
    };

    const handleBlur = (e: Event) => {
      focused.value = false;
      emit('change', computedValue.value);
      emit('blur', e);
    };

    const handleComposition = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (e.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';
        emit('input', value, e);
        updateValue(value);
      } else {
        isComposition.value = true;
      }
    };

    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (!isComposition.value) {
        emit('input', value, e);
        updateValue(value);
      } else {
        compositionValue.value = value;
      }
    };

    const handleClear = () => {
      updateValue('');
      emit('clear');
    };

    // modelValue发生改变时，更新内部值
    watch(
      () => props.modelValue,
      (value: string | undefined) => {
        if (value !== computedValue.value) {
          updateValue(value ?? '', false);
        }
      }
    );

    const wrapperCls = computed(() => [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-scroll`]: isScroll.value,
      },
    ]);

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-focus`]: focused.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-error`]: props.error,
      },
    ]);

    let styleDeclaration: CSSStyleDeclaration;

    const getMirrorStyle = () => {
      mirrorStyle.value = getSizeStyles(styleDeclaration);
      nextTick(() => {
        const mirrorHeight = mirrorRef.value?.offsetHeight;

        textareaStyle.value = {
          height: `${mirrorHeight}px`,
          resize: 'none',
          overflow: 'hidden',
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
      cls,
      textareaRef,
      textareaStyle,
      mirrorRef,
      mirrorStyle,
      computedValue,
      showClearBtn,
      getTextLength,
      handleInput,
      handleFocus,
      handleBlur,
      handleComposition,
      handleClear,
      handleResize,
      handleMousedown,
    };
  },
});
</script>
