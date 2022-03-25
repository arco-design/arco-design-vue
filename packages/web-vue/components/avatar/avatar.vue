<template>
  <div
    ref="itemRef"
    :style="outerStyle"
    :class="[
      cls,
      {
        [`${prefixCls}-with-trigger-icon`]: Boolean($slots['trigger-icon']),
      },
    ]"
    @click="onClick"
  >
    <resize-observer @resize="handleResize">
      <span ref="wrapperRef" :class="wrapperCls">
        <slot />
      </span>
    </resize-observer>
    <div
      v-if="$slots['trigger-icon']"
      :class="`${prefixCls}-trigger-icon-${triggerType}`"
      :style="computedTriggerIconStyle"
    >
      <slot name="trigger-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  toRefs,
  watch,
  ref,
  onMounted,
  nextTick,
  CSSProperties,
  PropType,
  inject,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { AvatarShape, AvatarTriggerType } from './interface';
import { useIndex } from '../_hooks/use-index';
import ResizeObserver from '../_components/resize-observer-v2.vue';
import { avatarGroupInjectionKey } from './context';
import { isNumber } from '../_utils/is';

export default defineComponent({
  name: 'Avatar',
  components: {
    ResizeObserver,
  },
  props: {
    /**
     * @zh 头像的形状，有圆形(circle)和正方形(square)两种
     * @en The shape of the avatar, there are two kinds of circle (circle) and square (square)
     * @values 'circle', 'square'
     */
    shape: {
      type: String as PropType<AvatarShape>,
      default: 'circle',
    },
    /**
     * @zh 头像的尺寸大小，单位是 `px`。未填写时使用样式中的大小 `40px`
     * @en The size of the avatar, the unit is `px`. Use size `40px` in styles when not filled
     */
    size: Number,
    /**
     * @zh 是否自动根据头像尺寸调整字体大小
     * @en Whether to automatically adjust the font size according to the size of the avatar.
     */
    autoFixFontSize: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 可点击的头像交互类型
     * @en Clickable avatar interaction type
     * @values 'mask', 'button'
     */
    triggerType: {
      type: String as PropType<AvatarTriggerType>,
      default: 'button',
    },
    /**
     * @zh 交互图标的样式
     * @en Interactive icon style
     */
    triggerIconStyle: {
      type: Object as PropType<CSSProperties>,
    },
  },
  emits: [
    /**
     * @zh 点击回调
     * @en Callback when clicked
     * @param {Event} event event
     */
    'click',
  ],
  /**
   * @zh 可点击的头像交互图标
   * @en Clickable avatar interaction icon
   * @slot trigger-icon
   */
  setup(props, { slots, emit, attrs }) {
    const { shape, size, autoFixFontSize, triggerType, triggerIconStyle } =
      toRefs(props);
    const prefixCls = getPrefixCls('avatar');
    const groupCtx = inject(avatarGroupInjectionKey, undefined);

    const itemRef = ref<HTMLDivElement>();
    const wrapperRef = ref<HTMLElement>();

    const mergedShape = computed(() => groupCtx?.shape ?? shape.value);
    const mergedSize = computed(() => groupCtx?.size ?? size.value);
    const mergedAutoFixFontSize = computed(
      () => groupCtx?.autoFixFontSize ?? autoFixFontSize.value
    );
    const isImage = ref(false);

    const index = groupCtx
      ? useIndex({
          itemRef,
          selector: `.${prefixCls}`,
        }).computedIndex
      : ref(-1);

    const outerStyle = computed(() => {
      const style: CSSProperties = isNumber(mergedSize.value)
        ? {
            width: `${mergedSize.value}px`,
            height: `${mergedSize.value}px`,
            fontSize: `${mergedSize.value / 2}px`,
          }
        : {};
      if (groupCtx) {
        style.zIndex = groupCtx.zIndexAscend
          ? index.value + 1
          : groupCtx.total - index.value;
        style.marginLeft =
          index.value !== 0 ? `-${(mergedSize.value ?? 40) / 4}px` : '0';
      }

      return style;
    });

    const computedTriggerIconStyle = useTriggerIconStyle({
      triggerIconStyle: triggerIconStyle?.value,
      inlineStyle: attrs.style as CSSProperties,
      triggerType: triggerType.value,
    });

    const autoFixFontSizeHandler = () => {
      if (!isImage.value) {
        nextTick(() => {
          if (!wrapperRef.value || !itemRef.value) {
            return;
          }
          const textWidth = wrapperRef.value.clientWidth;
          const avatarWidth = mergedSize.value ?? itemRef.value.offsetWidth;

          const scale = avatarWidth / (textWidth + 8);
          if (avatarWidth && scale < 1) {
            wrapperRef.value.style.transform = `scale(${scale}) translateX(-50%)`;
          }
        });
      }
    };

    onMounted(() => {
      if (
        wrapperRef.value?.firstElementChild &&
        ['IMG', 'PICTURE'].includes(wrapperRef.value.firstElementChild.tagName)
      ) {
        isImage.value = true;
      }
      if (mergedAutoFixFontSize.value) {
        autoFixFontSizeHandler();
      }
    });

    watch(size, () => {
      if (mergedAutoFixFontSize.value) {
        autoFixFontSizeHandler();
      }
    });

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${mergedShape.value}`,
    ]);
    const wrapperCls = computed(() =>
      isImage.value ? `${prefixCls}-image` : `${prefixCls}-text`
    );

    const onClick = (e: Event) => {
      emit('click', e);
    };

    const handleResize = () => {
      if (mergedAutoFixFontSize.value) {
        autoFixFontSizeHandler();
      }
    };

    return {
      prefixCls,
      itemRef,
      cls,
      outerStyle,
      wrapperRef,
      wrapperCls,
      computedTriggerIconStyle,
      isImage,
      onClick,
      handleResize,
    };
  },
});

const useTriggerIconStyle = ({
  triggerType,
  inlineStyle = {},
  triggerIconStyle = {},
}: {
  triggerType: AvatarTriggerType;
  inlineStyle?: CSSProperties;
  triggerIconStyle?: CSSProperties;
}): CSSProperties => {
  let addon: CSSProperties = {};
  if (
    triggerType === 'button' &&
    (!triggerIconStyle || (triggerIconStyle && !triggerIconStyle.color)) &&
    inlineStyle &&
    inlineStyle.backgroundColor
  ) {
    addon = { color: inlineStyle.backgroundColor };
  }
  return {
    ...triggerIconStyle,
    ...addon,
  };
};
</script>
