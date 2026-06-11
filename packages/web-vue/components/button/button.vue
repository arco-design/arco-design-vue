<template>
  <template v-if="href">
    <a
      :class="[cls, { [`${prefixCls}-only-icon`]: $slots.icon && !$slots.default }]"
      :href="mergedDisabled || loading ? undefined : href"
      @click="handleClick"
    >
      <span v-if="loading || $slots.icon" :class="`${prefixCls}-icon`">
        <icon-loading v-if="loading" spin />
        <slot v-else name="icon" />
      </span>
      <slot />
    </a>
  </template>
  <template v-else>
    <button
      :class="[cls, { [`${prefixCls}-only-icon`]: $slots.icon && !$slots.default }]"
      :type="htmlType"
      :disabled="mergedDisabled"
      :autofocus="autofocus"
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

<script setup lang="ts">
  /**
   * @todo 添加loadingFixedWidth
   * @todo 添加twoChineseChars
   */
  import type { PropType } from 'vue';
  import { computed, toRefs, inject } from 'vue';

  import { useFormItem } from '../_hooks/use-form-item';
  import { useSize } from '../_hooks/use-size';
  import { Status, Size, BorderShape } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import { isString } from '../_utils/is';
  import IconLoading from '../icon/icon-loading';
  import { ButtonTypes } from './constants';
  import { buttonGroupInjectionKey } from './context';

  defineOptions({ name: 'Button' });

  const props = defineProps({
    /**
     * @zh 按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。
     * @en Button types are divided into five types: secondary, primary, dashed, outline and text.
     * @defaultValue 'secondary'
     */
    type: {
      type: String as PropType<ButtonTypes>,
    },
    /**
     * @zh 按钮的形状
     * @en Button shape
     */
    shape: {
      type: String as PropType<BorderShape>,
    },
    /**
     * @zh 按钮的状态
     * @en Button state
     * @values 'normal','warning','success','danger'
     * @defaultValue 'normal'
     */
    status: {
      type: String as PropType<Status>,
    },
    /**
     * @zh 按钮的尺寸
     * @en Button size
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
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
     * @defaultValue false
     */
    disabled: {
      type: Boolean,
    },
    /**
     * @zh 设置 `button` 的原生 `type` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     * @en Set the native `type` attribute of `button`, optional values refer to [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     */
    htmlType: {
      type: String as PropType<HTMLButtonElement['type']>,
      default: 'button',
    },
    /**
     * @zh 设置 `button` 的原生 `autofocus` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     * @en Set the native `autofocus` attribute of `button`, optional values refer to [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")
     */
    autofocus: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 设置跳转链接。设置此属性时，按钮渲染为a标签。
     * @en Set up a jump link. When this property is set, the button is rendered as `<a>`
     */
    href: String,
  });

  const emit = defineEmits<{
    /**
     * @zh 点击按钮时触发
     * @en Emitted when the button is clicked
     * @property {MouseEvent} ev
     */
    click: [_ev: MouseEvent];
  }>();

  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  const { size, disabled } = toRefs(props);
  const prefixCls = getPrefixCls('btn');
  const groupContext = inject(buttonGroupInjectionKey, undefined);
  const _size = computed(() => size!.value ?? groupContext?.size);
  const _disabled = computed(() => Boolean(disabled.value || groupContext?.disabled));
  const { mergedSize: _mergedSize, mergedDisabled } = useFormItem({
    size: _size,
    disabled: _disabled,
  });
  const { mergedSize } = useSize(_mergedSize);

  const cls = computed(() => [
    prefixCls,
    `${prefixCls}-${props.type ?? groupContext?.type ?? 'secondary'}`,
    `${prefixCls}-shape-${props.shape ?? groupContext?.shape ?? 'square'}`,
    `${prefixCls}-size-${mergedSize.value}`,
    `${prefixCls}-status-${props.status ?? groupContext?.status ?? 'normal'}`,
    {
      [`${prefixCls}-long`]: props.long,
      [`${prefixCls}-loading`]: props.loading,
      [`${prefixCls}-disabled`]: mergedDisabled.value,
      [`${prefixCls}-link`]: isString(props.href),
    },
  ]);

  const handleClick = (ev: MouseEvent) => {
    if (props.disabled || props.loading) {
      ev.preventDefault();
      return;
    }
    emit('click', ev);
  };
</script>
