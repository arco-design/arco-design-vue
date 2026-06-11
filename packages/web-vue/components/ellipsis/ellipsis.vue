<template>
  <ResizeObserver @resize="handleResize">
    <Tooltip v-if="enableTooltip" v-bind="tooltipBindings" :disabled="tooltipDisabled">
      <component
        :is="componentTag"
        ref="triggerRef"
        v-bind="$attrs"
        :class="rootCls"
        :style="rootStyle"
        :title="nativeTitle"
        :role="buttonRole"
        :tabindex="buttonTabIndex"
        :aria-expanded="ariaExpanded"
        @click="handleClick"
        @keydown="handleKeydown"
      >
        <slot v-if="isLineClamp" />
        <span v-else ref="contentRef" :class="`${prefixCls}-content`">
          <slot />
        </span>
      </component>
      <template #content>
        <slot name="tooltip">
          <slot />
        </slot>
      </template>
    </Tooltip>

    <component
      :is="componentTag"
      v-else
      ref="triggerRef"
      v-bind="$attrs"
      :class="rootCls"
      :style="rootStyle"
      :title="nativeTitle"
      :role="buttonRole"
      :tabindex="buttonTabIndex"
      :aria-expanded="ariaExpanded"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <slot v-if="isLineClamp" />
      <span v-else ref="contentRef" :class="`${prefixCls}-content`">
        <slot />
      </span>
    </component>
  </ResizeObserver>
</template>

<script setup lang="ts">
  import type { CSSProperties, PropType } from 'vue';
  import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue';

  import type { EllipsisTooltipProps } from './interface';

  import ResizeObserver from '../_components/resize-observer-v2';
  import { getPrefixCls } from '../_utils/global-config';
  import { isObject } from '../_utils/is';
  import Tooltip from '../tooltip';

  defineOptions({ name: 'Ellipsis', inheritAttrs: false });

  const props = defineProps({
    /**
     * @zh 最大显示行数。不传时为单行省略。
     * @en Maximum number of displayed lines. Single-line ellipsis is used by default.
     */
    lineClamp: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    /**
     * @zh 展开的触发方式
     * @en Trigger mode for expansion
     * @values 'click'
     */
    expandTrigger: {
      type: String as PropType<'click'>,
      default: undefined,
    },
    /**
     * @zh 省略时是否展示提示。可传入 Tooltip 属性。
     * @en Whether to show a tooltip when ellipsis is active. Tooltip props are supported.
     */
    tooltip: {
      type: [Boolean, Object] as PropType<boolean | EllipsisTooltipProps>,
      default: true,
    },
  });

  /**
   * @zh 默认内容
   * @en Default content
   * @slot default
   */
  /**
   * @zh 自定义提示内容
   * @en Custom tooltip content
   * @slot tooltip
   */
  const prefixCls = getPrefixCls('ellipsis');
  const triggerRef = ref<HTMLElement>();
  const contentRef = ref<HTMLElement>();
  const text = ref('');
  const isEllipsis = ref(false);
  const expanded = ref(false);

  const isLineClamp = computed(() => props.lineClamp !== undefined);
  const componentTag = computed(() => (isLineClamp.value ? 'div' : 'span'));

  const tooltipConfig = computed<EllipsisTooltipProps>(() => {
    if (isObject(props.tooltip)) {
      return props.tooltip;
    }
    return {};
  });

  const tooltipBindings = computed(() => {
    const { disabled: _disabled, ...rest } = tooltipConfig.value;
    return rest;
  });

  const enableTooltip = computed(() => props.tooltip !== false);
  const tooltipDisabled = computed(
    () => !isEllipsis.value || expanded.value || Boolean(tooltipConfig.value.disabled),
  );
  const isExpandable = computed(
    () => props.expandTrigger === 'click' && (isEllipsis.value || expanded.value),
  );

  const rootCls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}--single-line`]: !isLineClamp.value && !expanded.value,
      [`${prefixCls}--line-clamp`]: isLineClamp.value,
      [`${prefixCls}--expandable`]: isExpandable.value,
      [`${prefixCls}--expanded`]: expanded.value,
    },
  ]);

  const rootStyle = computed<CSSProperties>(() => {
    if (isLineClamp.value) {
      if (expanded.value) {
        return {
          overflow: 'visible',
          textOverflow: 'clip',
          display: 'block',
          whiteSpace: 'normal',
          WebkitLineClamp: 'unset',
          WebkitBoxOrient: 'vertical',
        };
      }

      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        whiteSpace: 'normal',
        WebkitLineClamp: String(props.lineClamp),
        WebkitBoxOrient: 'vertical',
      };
    }

    if (expanded.value) {
      return {
        overflow: 'visible',
        textOverflow: 'clip',
        whiteSpace: 'normal',
      };
    }

    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  });

  const nativeTitle = computed(() => {
    if ((!enableTooltip.value || Boolean(tooltipConfig.value.disabled)) && isEllipsis.value) {
      return text.value;
    }
    return undefined;
  });

  const buttonRole = computed(() => (isExpandable.value ? 'button' : undefined));
  const buttonTabIndex = computed(() => (isExpandable.value ? 0 : undefined));
  const ariaExpanded = computed(() =>
    props.expandTrigger === 'click' ? String(expanded.value) : undefined,
  );

  const syncText = () => {
    const nextText = triggerRef.value?.textContent?.trim() ?? '';
    if (nextText !== text.value) {
      text.value = nextText;
    }
  };

  const calculateEllipsis = () => {
    syncText();

    const triggerElement = triggerRef.value;
    if (!triggerElement || expanded.value) {
      return;
    }

    let nextEllipsis = false;

    if (isLineClamp.value) {
      nextEllipsis =
        triggerElement.scrollHeight > triggerElement.offsetHeight + 1 ||
        triggerElement.scrollWidth > triggerElement.clientWidth + 1;
    } else {
      const contentWidth = Math.max(
        contentRef.value?.scrollWidth ?? 0,
        contentRef.value?.offsetWidth ?? 0,
      );
      nextEllipsis =
        contentWidth > triggerElement.clientWidth + 1 ||
        triggerElement.scrollWidth > triggerElement.clientWidth + 1;
    }

    if (nextEllipsis !== isEllipsis.value) {
      isEllipsis.value = nextEllipsis;
    }
  };

  const handleResize = () => {
    calculateEllipsis();
  };

  const handleClick = async () => {
    if (props.expandTrigger !== 'click') {
      return;
    }

    if (!expanded.value) {
      calculateEllipsis();
    }

    if (!isEllipsis.value && !expanded.value) {
      return;
    }

    expanded.value = !expanded.value;
    await nextTick();
    if (!expanded.value) {
      calculateEllipsis();
    }
  };

  const handleKeydown = async (ev: KeyboardEvent) => {
    if (!isExpandable.value) {
      return;
    }

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      await handleClick();
    }
  };

  onMounted(() => {
    nextTick(() => calculateEllipsis());
  });

  onUpdated(() => {
    nextTick(() => calculateEllipsis());
  });

  watch(
    () => props.lineClamp,
    () => {
      if (expanded.value) {
        expanded.value = false;
      }
      nextTick(() => calculateEllipsis());
    },
  );
</script>
