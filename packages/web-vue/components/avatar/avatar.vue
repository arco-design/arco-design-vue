<template>
  <div
    ref="avatarElementRef"
    :style="wrapperStyle"
    :class="cls"
    @click="onClick"
  >
    <span v-if="isImage" :class="`${prefixCls}-image`">
      <slot />
    </span>
    <span v-else ref="textElementRef" :class="`${prefixCls}-text`">
      <slot />
    </span>
    <div
      v-if="hasTriggerIcon"
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
  Slots,
  onMounted,
  nextTick,
  CSSProperties,
  PropType,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { SHAPES, ShapeType, TRIGGER_TYPES, TriggerType } from './constants';

export default defineComponent({
  name: 'Avatar',
  props: {
    /**
     * @zh 头像的形状，有圆形(circle)和正方形(square)两种
     * @en The shape of the avatar, there are two kinds of circle (circle) and square (square)
     * @values 'circle', 'square'
     */
    shape: {
      type: String as PropType<ShapeType>,
      default: 'circle',
      validator: (value: ShapeType) => {
        return SHAPES.includes(value);
      },
    },
    /**
     * @zh 头像的尺寸大小，单位是 `px`
     * @en The size of the avatar, the unit is `px`
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
     * @zh 交互图标的样式
     * @en Interactive icon style
     */
    triggerIconStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 可点击的头像交互类型
     * @en Clickable avatar interaction type
     * @values 'mask', 'button'
     */
    triggerType: {
      type: String as PropType<TriggerType>,
      default: 'button',
      validator: (value: TriggerType) => {
        return TRIGGER_TYPES.includes(value);
      },
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
    const prefixCls = getPrefixCls('avatar');
    const { shape, size, autoFixFontSize, triggerType, triggerIconStyle } =
      toRefs(props);
    const textElementRef = ref<HTMLSpanElement>();
    const avatarElementRef = ref<HTMLDivElement>();
    const hasTriggerIcon = computed(() => Boolean(slots['trigger-icon']));
    const isImage = useIsImage(slots);
    const wrapperStyle = useWrapperStyle(size.value);
    const computedTriggerIconStyle = useTriggerIconStyle({
      triggerIconStyle: triggerIconStyle?.value,
      inlineStyle: attrs.style as CSSProperties,
      triggerType: triggerType.value,
    });
    const autoFixFontSizeHandler = () => {
      const { value: element } = textElementRef;
      if (!element || !autoFixFontSize.value) {
        return;
      }
      nextTick(() => {
        const textWidth = element.clientWidth;
        const avatarWidth = size.value || avatarElementRef.value.offsetWidth;

        const scale = avatarWidth / (textWidth + 8);
        if (avatarWidth && scale < 1) {
          element.style.transform = `scale(${scale}) translateX(-50%)`;
        }
      });
    };

    watch([size, slots.default], autoFixFontSizeHandler);
    onMounted(autoFixFontSizeHandler);

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${shape.value}`,
      {
        [`${prefixCls}-with-trigger-icon`]: hasTriggerIcon,
      },
    ]);

    const onClick = (e: Event) => {
      emit('click', e);
    };

    return {
      cls,
      onClick,
      wrapperStyle,
      prefixCls,
      textElementRef,
      avatarElementRef,
      isImage,
      hasTriggerIcon,
      computedTriggerIconStyle,
    };
  },
});

const useTriggerIconStyle = ({
  triggerType,
  inlineStyle = {},
  triggerIconStyle = {},
}: {
  triggerType: TriggerType;
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

const useWrapperStyle = (size: number) => {
  return computed(() =>
    size
      ? {
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size / 2}px`,
        }
      : {}
  );
};

const useIsImage = (slots: Slots) => {
  return computed(() => {
    const child = slots.default && slots.default()[0];
    return child && ['img', 'picture'].includes(child.type as string);
  });
};
</script>
