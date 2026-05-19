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

<script lang="ts">
  import type { CSSProperties, PropType } from 'vue';
  import { computed, defineComponent, ref, toRefs, inject } from 'vue';

  import type { EllipsisTooltipProps } from '../ellipsis';

  import IconHover from '../_components/icon-hover.vue';
  import { useSize } from '../_hooks/use-size';
  import { getPrefixCls } from '../_utils/global-config';
  import { configProviderInjectionKey } from '../config-provider/context';
  import Ellipsis, { PerformantEllipsis } from '../ellipsis';
  import IconClose from '../icon/icon-close';
  import IconLoading from '../icon/icon-loading';
  import { TAG_COLORS, TagColor } from './interface';

  export default defineComponent({
    name: 'Tag',
    components: {
      Ellipsis,
      IconHover,
      IconClose,
      IconLoading,
      PerformantEllipsis,
    },
    props: {
      /**
       * @zh 标签的颜色
       * @en Label color
       * @values 'red','orangered','orange','gold','lime','green','cyan','blue','sdblue','purple','pinkpurple','magenta','gray'
       */
      color: {
        type: String as PropType<TagColor | string>,
      },
      /**
       * @zh 标签的大小
       * @en Label size
       * @values 'small','medium','large'
       * @defaultValue 'medium'
       */
      size: {
        type: String as PropType<'small' | 'medium' | 'large'>,
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
        type: [Number, String] as PropType<number | string>,
        default: undefined,
      },
      /**
       * @zh 省略内容的展开触发方式
       * @en Trigger mode for ellipsis expansion
       * @values 'click'
       */
      ellipsisExpandTrigger: {
        type: String as PropType<'click'>,
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
    },
    emits: {
      'update:visible': (_visible: boolean) => true,
      'update:checked': (_checked: boolean) => true,
      /**
       * @zh 点击关闭按钮时触发
       * @en Emitted when the close button is clicked
       * @param {MouseEvent | KeyboardEvent} ev
       */
      'close': (_ev: MouseEvent | KeyboardEvent) => true,
      /**
       * @zh 用户选中时触发（仅在可选中模式下触发）
       * @en Emitted when the user check (emit only in the checkable mode)
       * @param {boolean} checked
       * @param {MouseEvent} ev
       */
      'check': (_checked: boolean, _ev: MouseEvent) => true,
    },
    /**
     * @zh 图标
     * @en Icon
     * @slot icon
     */
    /**
     * @zh 关闭按钮的图标
     * @en Close button icon
     * @slot close-icon
     */
    setup(props, { emit, slots }) {
      const { size } = toRefs(props);
      const prefixCls = getPrefixCls('tag');
      const isBuiltInColor = computed(() => props.color && TAG_COLORS.includes(props.color as any));
      const isCustomColor = computed(() => props.color && !TAG_COLORS.includes(props.color as any));
      const _visible = ref(props.defaultVisible);
      const _checked = ref(props.defaultChecked);
      const computedVisible = computed(() => props.visible ?? _visible.value);
      const computedChecked = computed(() =>
        props.checkable ? (props.checked ?? _checked.value) : true,
      );
      const { mergedSize: _mergedSize } = useSize(size);
      const mergedSize = computed(() => {
        if (_mergedSize.value === 'mini') {
          return 'small';
        }
        return _mergedSize.value;
      });
      const hasDefaultSlot = computed(() => Boolean(slots.default));
      const resolvedEllipsis = computed(() => props.ellipsis ?? props.nowrap ?? true);
      const shouldRenderEllipsis = computed(() => resolvedEllipsis.value && hasDefaultSlot.value);
      const hasLineClampEllipsis = computed(
        () => shouldRenderEllipsis.value && props.ellipsisLineClamp !== undefined,
      );
      const ellipsisComponent = computed(() =>
        props.ellipsisPerformant ? PerformantEllipsis : Ellipsis,
      );

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

      const configCtx = inject(configProviderInjectionKey, undefined);
      const rtl = computed(() => configCtx?.rtl ?? false);
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

      const style = computed(() => {
        if (isCustomColor.value) {
          return {
            backgroundColor: props.color,
          } as CSSProperties;
        }
        return undefined;
      });

      return {
        prefixCls,
        cls,
        style,
        computedVisible,
        computedChecked,
        ellipsisComponent,
        handleClick,
        handleClose,
        handleCloseKeydown,
        shouldRenderEllipsis,
      };
    },
  });
</script>
