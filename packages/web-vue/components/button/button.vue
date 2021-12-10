<template>
  <template v-if="href">
    <a
      :class="cls"
      :href="disabled || loading ? undefined : href"
      @click="handleClick"
    >
      <span v-if="loading || $slots.icon" :class="`${prefixCls}-icon`">
        <icon-loading v-if="loading" spin="true" />
        <slot v-else name="icon" />
      </span>
      <slot />
    </a>
  </template>
  <template v-else>
    <button
      :class="cls"
      :type="htmlType"
      :disabled="disabled"
      @click="handleClick"
    >
      <span v-if="loading || $slots.icon" :class="`${prefixCls}-icon`">
        <icon-loading v-if="loading" :spin="true" />
        <slot v-else name="icon" />
      </span>
      <slot />
    </button>
  </template>
</template>

<script lang="ts">
/**
 * @todo 添加loadingFixedWidth
 * @todo 添加twoChineseChars
 */
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import {
  SIZES,
  BORDER_SHAPES,
  STATUSES,
  BorderShape,
  Status,
  Size,
} from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { isString } from '../_utils/is';
import IconLoading from '../icon/icon-loading';
import { EmitType } from '../_utils/types';

const BUTTON_TYPES = [
  'primary',
  'secondary',
  'outline',
  'dashed',
  'text',
] as const;
type ButtonTypes = typeof BUTTON_TYPES[number];

export default defineComponent({
  name: 'Button',
  components: {
    IconLoading,
  },
  props: {
    /**
     * @zh 按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。
     * @en Button types are divided into five types: secondary, primary, dashed, outline and text.
     * @values 'secondary','primary','dashed','outline','text'
     */
    type: {
      type: String as PropType<ButtonTypes>,
      default: 'secondary',
      validator: (value: any) => {
        return BUTTON_TYPES.includes(value);
      },
    },
    /**
     * @zh 按钮的形状
     * @en Button shape
     * @values 'square','round','circle'
     */
    shape: {
      type: String as PropType<BorderShape>,
      default: 'square',
      validator: (value: any) => {
        return BORDER_SHAPES.includes(value);
      },
    },
    /**
     * @zh 按钮的状态
     * @en Button state
     * @values 'normal','warning','success','danger'
     */
    status: {
      type: String as PropType<Status>,
      default: 'normal',
      // validator: (value: any) => {
      //   return STATUSES.includes(value);
      // },
    },
    /**
     * @zh 按钮的尺寸
     * @en Button size
     * @values 'mini','small','medium','large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
      validator: (value: any) => {
        return SIZES.includes(value);
      },
    },
    /**
     * @zh 按钮的宽度是否随容器自适应。
     * @en Whether the width of the button adapts to the container.
     */
    long: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 按钮是否为加载中状态
     * @en Whether the button is in the loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 按钮是否禁用
     * @en Whether the button is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 设置 `button` 的原生 `type` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     * @en Set the native `type` attribute of `button`, optional values refer to [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     */
    htmlType: {
      type: String,
      default: 'button',
    },
    /**
     * @zh 设置跳转链接。设置此属性时，按钮渲染为a标签。
     * @en Set up a jump link. When this property is set, the button is rendered as `<a>`
     */
    href: String,
    // for JSX
    onClick: {
      type: [Function, Array] as PropType<EmitType<(ev: MouseEvent) => void>>,
    },
  },
  emits: [
    /**
     * @zh 点击按钮时触发
     * @en Emitted when the button is clicked
     * @property {Event} event
     */
    'click',
  ],
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('btn');

    const onlyIcon = computed(() => !slots.default && Boolean(slots.icon));

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.type}`,
      `${prefixCls}-shape-${props.shape}`,
      `${prefixCls}-size-${props.size}`,
      `${prefixCls}-status-${props.status}`,
      {
        [`${prefixCls}-only-icon`]: onlyIcon.value,
        [`${prefixCls}-long`]: props.long,
        [`${prefixCls}-loading`]: props.loading,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-link`]: isString(props.href),
      },
    ]);

    const handleClick = (e: Event) => {
      if (props.disabled || props.loading) {
        return;
      }
      emit('click', e);
    };

    return {
      prefixCls,
      cls,
      handleClick,
    };
  },
});
</script>
