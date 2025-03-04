<template>
  <div
    ref="itemRef"
    :style="outerStyle"
    :class="[
      cls,
      {
        [`${prefixCls}-with-trigger-icon`]: Boolean($slots['trigger-icon']),
        // 添加根据 rtl 变量生成的类名
        [`${prefixCls}-rtl`]: rtl,
      },
    ]"
    @click="onClick"
  >
    <resize-observer @resize="handleResize">
      <span ref="wrapperRef" :class="wrapperCls">
        <template v-if="imageUrl">
          <slot v-if="hasError" name="error">
            <div :class="`${prefixCls}-image-icon`"><IconImageClose /></div>
          </slot>
          <slot v-if="!(hasError || !shouldLoad) && !isLoaded">
            <div :class="`${prefixCls}-image-icon`"><IconLoading /></div>
          </slot>
          <img
            v-if="!(hasError || !shouldLoad)"
            :src="imageUrl"
            :style="{
              width: size + 'px',
              height: size + 'px',
              objectFit: objectFit,
            }"
            alt="avatar"
            @load="handleImgLoad"
            @error="handleImgError"
          />
        </template>
        <slot v-else />
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
import { AvatarShape, AvatarTriggerType, ObjectFit } from './interface';
import { useIndex } from '../_hooks/use-index';
import ResizeObserver from '../_components/resize-observer-v2';
import { avatarGroupInjectionKey } from './context';
import { isNumber } from '../_utils/is';
import IconImageClose from '../icon/icon-image-close';
import IconLoading from '../icon/icon-loading';
import { configProviderInjectionKey } from '../config-provider/context';

export default defineComponent({
  name: 'Avatar',
  components: {
    ResizeObserver,
    IconImageClose,
    IconLoading,
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
     * @zh 自定义头像图片地址，如果传入该属性，会默认渲染img标签
     * @en Custom avatar image address. If this attribute is passed in, the img tag will be rendered by default
     * @version 2.40.0
     */
    imageUrl: String,
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
    /**
     * @zh 图片在容器内的的适应类型
     * @en Object-fit type of the image in the container
     * @version 2.52.0
     */
    objectFit: {
      type: String as PropType<ObjectFit>,
    },
  },
  emits: {
    /**
     * @zh 点击回调
     * @en Callback when clicked
     * @param {MouseEvent} ev
     */
    click: (ev: MouseEvent) => true,
    /**
     * @zh 图片加载错误
     * @en image load error
     */
    error: () => true,
    /**
     * @zh 图片加载成功
     * @en image load success
     */
    load: () => true,
  },
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
    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => {
      return configCtx?.rtl ?? false;
    });

    const itemRef = ref<HTMLDivElement>();
    const wrapperRef = ref<HTMLElement>();

    const mergedShape = computed(() => groupCtx?.shape ?? shape.value);
    const mergedSize = computed(() => groupCtx?.size ?? size.value);
    const mergedAutoFixFontSize = computed(
      () => groupCtx?.autoFixFontSize ?? autoFixFontSize.value
    );
    const isImage = ref(false);

    const hasError = ref(false);
    const shouldLoad = ref(true);
    const isLoaded = ref(false);

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
      if (!isImage.value && !props.imageUrl) {
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
          shouldLoad.value = true;
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
      isImage.value || props.imageUrl
        ? `${prefixCls}-image`
        : `${prefixCls}-text`
    );

    const onClick = (e: MouseEvent) => {
      emit('click', e);
    };

    const handleResize = () => {
      if (mergedAutoFixFontSize.value) {
        autoFixFontSizeHandler();
      }
    };

    const handleImgLoad = () => {
      isLoaded.value = true;
      emit('load');
    };
    const handleImgError = () => {
      hasError.value = true;
      emit('error');
    };

    return {
      prefixCls,
      rtl,
      itemRef,
      cls,
      outerStyle,
      wrapperRef,
      wrapperCls,
      computedTriggerIconStyle,
      isImage,
      shouldLoad,
      isLoaded,
      hasError,
      onClick,
      handleResize,
      handleImgLoad,
      handleImgError,
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
