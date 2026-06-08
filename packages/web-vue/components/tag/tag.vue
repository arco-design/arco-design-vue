<template>
  <span v-if="computedVisible" :class="cls" :style="style" @click="handleClick">
    <span v-if="$slots.icon" :class="`${prefixCls}-icon`">
      <slot name="icon" />
    </span>
    <component
      :is="ellipsisComponent"
      v-if="shouldRenderEllipsis"
      :class="`${prefixCls}-text`"
      :line-clamp="ellipsisLineClamp"
      :expand-trigger="ellipsisExpandTrigger"
      :tooltip="ellipsisTooltip"
    >
      <slot />
      <template v-if="$slots.tooltip" #tooltip>
        <slot name="tooltip" />
      </template>
    </component>
    <span v-else-if="$slots.default" :class="`${prefixCls}-text`">
      <slot />
    </span>
    <icon-hover
      v-if="closable"
      tabindex="0"
      role="button"
      aria-label="Close"
      :prefix="prefixCls"
      :class="`${prefixCls}-close-btn`"
      @click.stop="handleClose"
      @keydown.stop.prevent="handleCloseKeydown"
    >
      <slot name="close-icon">
        <icon-close />
      </slot>
    </icon-hover>
    <span v-if="loading" :class="`${prefixCls}-loading-icon`">
      <icon-loading />
    </span>
  </span>
</template>

<script setup lang="ts">
  import type { CSSProperties, PropType } from 'vue';
  import { computed, inject, ref, useSlots } from 'vue';

  import chroma from 'chroma-js';
  import { isNil } from 'es-toolkit/compat';

  import type { EllipsisTooltipProps } from '../ellipsis';
  import type { TagColor } from './interface';

  import IconHover from '../_components/icon-hover.vue';
  import { useSize } from '../_hooks/use-size';
  import { isGradientString, extractColorsFromGradient } from '../_utils/color';
  import { Size } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import { configProviderInjectionKey } from '../config-provider/context';
  import Ellipsis, { PerformantEllipsis } from '../ellipsis';
  import IconClose from '../icon/icon-close';
  import IconLoading from '../icon/icon-loading';
  import { TAG_COLORS } from './interface';

  const props = defineProps({
    /**
     * @zh 标签的颜色
     * @en Label color
     * @values 'red','orangered','orange','gold','lime','green','cyan','blue','sdblue','purple','pinkpurple','magenta','gray'
     */
    color: {
      type: String,
    },
    /**
     * @zh 标签的大小
     * @en Label size
     * @values 'small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String,
    },
    /**
     * @zh 是否显示边框
     * @en Whether the tag is bordered
     * @version 2.33.0
     */
    bordered: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否可见
     * @en Whether the tag is visible
     * @vModel
     */
    visible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 标签默认是否可见
     * @en Whether the tag is visible by default
     */
    defaultVisible: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 标签是否为加载中状态
     * @en Whether the tag is loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否可关闭
     * @en Whether the tag can be closed
     */
    closable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否可选中
     * @en Whether the tag can be checked
     */
    checkable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否选中（标签可选中时可用）
     * @en Whether the tag is checked (available when the tag is checkable)
     * @vModel
     */
    checked: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 标签默认选中状态（标签可选中时可用）
     * @en Whether the tag is checked by default (available when the tag is checkable)
     */
    defaultChecked: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 标签内容不换行
     * @en Tag content does not wrap
     * @version 2.56.1
     */
    nowrap: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 是否开启默认内容省略
     * @en Whether to enable ellipsis for the default slot content
     * @defaultValue true
     */
    ellipsis: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认内容省略的最大显示行数
     * @en Maximum number of displayed lines for ellipsis content
     */
    ellipsisLineClamp: {
      type: [Number, String],
      default: undefined,
    },
    /**
     * @zh 省略内容的展开触发方式
     * @en Trigger mode for ellipsis expansion
     * @values 'click'
     */
    ellipsisExpandTrigger: {
      type: String as () => 'click',
      default: undefined,
    },
    /**
     * @zh 省略时是否展示提示。可传入 Tooltip 属性。
     * @en Whether to show a tooltip when ellipsis is active. Tooltip props are supported.
     * @defaultValue true
     */
    ellipsisTooltip: {
      type: [Boolean, Object] as PropType<boolean | EllipsisTooltipProps>,
      default: true,
    },
    /**
     * @zh 是否使用高性能省略实现
     * @en Whether to use the performant ellipsis implementation
     */
    ellipsisPerformant: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 自定义颜色的文字颜色，仅在自定义颜色时生效
     * @en Text color for custom color tags, only effective when using a custom color
     */
    textColor: {
      type: String,
      default: undefined,
    },
    /**
     * @zh 自定义颜色的背景透明度，仅在自定义颜色时生效，默认 0.8
     * @en Background opacity for custom color tags, only effective when using a custom color, default 0.8
     */
    backgroundAlpha: {
      type: Number,
      default: 0.8,
    },
  });

  defineOptions({ name: 'Tag' });

  const emit = defineEmits<{
    'update:visible': [_visible: boolean];
    'update:checked': [_checked: boolean];
    /**
     * @zh 点击关闭按钮时触发
     * @en Emitted when the close button is clicked
     * @param {MouseEvent | KeyboardEvent} ev
     */
    'close': [_ev: MouseEvent | KeyboardEvent];
    /**
     * @zh 用户选中时触发（仅在可选中模式下触发）
     * @en Emitted when the user check (emit only in the checkable mode)
     * @param {boolean} checked
     * @param {MouseEvent} ev
     */
    'check': [_checked: boolean, _ev: MouseEvent];
  }>();

  const slots = useSlots();

  const prefixCls = getPrefixCls('tag');
  const { mergedSize: _mergedSize } = useSize(computed(() => props.size as Size | undefined));
  const configCtx = inject(configProviderInjectionKey, undefined);

  const _visible = ref(props.defaultVisible);
  const _checked = ref(props.defaultChecked);

  // ---- 内置/自定义颜色判断 ----
  const isBuiltInColor = computed(
    () => props.color && TAG_COLORS.includes(props.color as TagColor),
  );
  const isCustomColor = computed(
    () => props.color && !TAG_COLORS.includes(props.color as TagColor),
  );

  // ---- 自定义颜色处理 ----
  // 通过 DOM 解析 CSS 颜色值为标准 rgb 格式
  const resolvedColor = computed(() => {
    if (!isCustomColor.value) return props.color;
    try {
      const dom = document.createElement('div');
      dom.style.color = props.color as string;
      document.body.appendChild(dom);
      const computedColor = window.getComputedStyle(dom).color;
      document.body.removeChild(dom);
      return computedColor;
    } catch {
      return props.color;
    }
  });

  // 是否为渐变颜色
  const isGradientColor = computed(() => isGradientString(resolvedColor.value));

  // 用于传递给 Arco/hook 等消费方的 computedColor（内置颜色返回原色，自定义返回 undefined）
  const computedColor = computed(() => {
    if (isBuiltInColor.value) {
      return resolvedColor.value;
    }
    return undefined;
  });

  // 背景颜色（自定义颜色时使用）
  const resolvedBackgroundColor = computed(() => {
    if (isBuiltInColor.value) {
      return undefined;
    }
    return resolvedColor.value;
  });

  // 自动计算文字颜色
  const autoTextColor = computed(() => {
    // 如果是内置颜色，不需要自动计算
    if (isBuiltInColor.value) {
      return undefined;
    }
    if (!resolvedColor.value) {
      return undefined;
    }

    try {
      const rawColor = resolvedColor.value as string;
      // 获取背景色 chroma 对象
      const bg = isGradientColor.value
        ? chroma.average(extractColorsFromGradient(rawColor), 'rgb')
        : chroma(rawColor);

      // 与白色的对比度
      const contrastWhite = chroma.contrast(bg, 'white');

      // WCAG AA 标准对比度至少 4.5:1，背景深时使用白色文字
      if (contrastWhite >= 4.5) {
        return '#FFFFFF';
      }

      // 获取背景的 HSL
      const [h, s] = bg.hsl();

      // 背景是灰色系（饱和度低），直接返回深黑色
      if (isNaN(h) || s < 0.02) {
        return '#1D2129';
      }

      // 色相 H：冷色调(Blue/Cyan)向顺时针偏移
      let targetH = h;
      if (h >= 130 && h <= 200) {
        targetH += 10;
      }

      // 饱和度 S：保持较高
      const targetS = Math.min(s + 0.4, 0.9);

      // 亮度 L：从 0.5 向下寻找满足对比度 2.0 的值
      let bestL = 0.15;
      for (let curL = 0.5; curL >= 0.1; curL -= 0.01) {
        const tempColor = chroma.hsl(targetH, targetS, curL);
        if (chroma.contrast(bg, tempColor) >= 2.0) {
          bestL = curL;
          break;
        }
      }

      const colorfulDark = chroma.hsl(targetH, targetS, bestL);
      const contrastDark = chroma.contrast(bg, colorfulDark);

      // 白色对比度更好时用白色
      if (contrastWhite > contrastDark) {
        return '#FFFFFF';
      }

      // 兜底：对比度仍然极低时返回深黑色
      if (contrastDark < 2.0) {
        return '#1D2129';
      }

      return colorfulDark.css();
    } catch {
      return '#FFFFFF';
    }
  });

  // 最终文字颜色：用户指定的 textColor 优先
  const finalTextColor = computed(() => props.textColor ?? autoTextColor.value);

  // 背景透明度的处理：当 bordered 未设置时为完全不透明
  const finalBackgroundAlpha = computed(() => {
    return isNil(props.bordered) ? 1 : props.backgroundAlpha;
  });

  // ---- 可见性 / 选中状态 ----
  const computedVisible = computed(() => props.visible ?? _visible.value);
  const computedChecked = computed(() =>
    props.checkable ? (props.checked ?? _checked.value) : true,
  );

  // ---- 尺寸 ----
  const mergedSize = computed(() => {
    if (_mergedSize.value === 'mini') {
      return 'small';
    }
    return _mergedSize.value;
  });

  // ---- Ellipsis ----
  const hasDefaultSlot = computed(() => Boolean(slots.default));
  const resolvedEllipsis = computed(() => props.ellipsis ?? props.nowrap ?? true);
  const shouldRenderEllipsis = computed(() => resolvedEllipsis.value && hasDefaultSlot.value);
  const hasLineClampEllipsis = computed(
    () => shouldRenderEllipsis.value && props.ellipsisLineClamp !== undefined,
  );
  const ellipsisComponent = computed(() =>
    props.ellipsisPerformant ? PerformantEllipsis : Ellipsis,
  );

  // ---- RTL ----
  const rtl = computed(() => configCtx?.rtl ?? false);

  // ---- CSS class ----
  const cls = computed(() => [
    prefixCls,
    `${prefixCls}-size-${mergedSize.value}`,
    {
      [`${prefixCls}-ellipsis`]: shouldRenderEllipsis.value,
      [`${prefixCls}-ellipsis-line-clamp`]: hasLineClampEllipsis.value,
      [`${prefixCls}-loading`]: props.loading,
      [`${prefixCls}-hide`]: !computedVisible.value,
      [`${prefixCls}-no-ellipsis`]: !shouldRenderEllipsis.value,
      [`${prefixCls}-${props.color}`]: isBuiltInColor.value,
      [`${prefixCls}-bordered`]: props.bordered,
      [`${prefixCls}-checkable`]: props.checkable,
      [`${prefixCls}-checked`]: computedChecked.value,
      [`${prefixCls}-custom-color`]: isCustomColor.value,
      [`${prefixCls}-rtl`]: rtl.value,
    },
  ]);

  // ---- Inline style（自定义颜色时通过 CSS 变量传递） ----
  const style = computed(() => {
    if (isCustomColor.value && resolvedColor.value) {
      const styleObj: CSSProperties = {};

      // 文字颜色
      if (finalTextColor.value) {
        styleObj['--sd-tag-color'] = finalTextColor.value;
      }

      // 背景颜色（带透明度）
      try {
        const bgColor = isGradientColor.value
          ? chroma.average(extractColorsFromGradient(resolvedColor.value as string), 'rgb')
          : chroma(resolvedColor.value as string);

        styleObj['--sd-tag-bg-color'] = bgColor.alpha(finalBackgroundAlpha.value).css();
      } catch {
        styleObj['--sd-tag-bg-color'] = resolvedColor.value;
      }

      // 边框颜色
      if (!isNil(props.bordered)) {
        styleObj['--sd-tag-border-color'] = resolvedBackgroundColor.value;
      }

      return styleObj;
    }
    return undefined;
  });

  // ---- 事件处理 ----
  const handleClose = (ev: MouseEvent | KeyboardEvent) => {
    _visible.value = false;
    emit('update:visible', false);
    emit('close', ev);
  };

  const handleCloseKeydown = (ev: KeyboardEvent) => {
    if (ev.key !== 'Enter' && ev.key !== ' ') {
      return;
    }
    handleClose(ev);
  };

  const handleClick = (ev: MouseEvent) => {
    if (props.checkable) {
      const newChecked = !computedChecked.value;
      _checked.value = newChecked;
      emit('update:checked', newChecked);
      emit('check', newChecked, ev);
    }
  };
</script>
