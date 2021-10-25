<template>
  <div :class="wrapperClassNames" :style="wrapperStyles">
    <img
      ref="refImg"
      :class="`${prefixCls}-img`"
      v-bind="imgProps"
      :title="title"
      @load="onImgLoaded"
      @error="onImgLoadError"
      @click="onImgClick"
    />
    <div v-if="!isLoaded" :class="`${prefixCls}-overlay`">
      <slot v-if="isError" name="error">
        <div :class="`${prefixCls}-error`">
          <div :class="`${prefixCls}-error-icon`">
            <IconImageClose />
          </div>
          <div :class="`${prefixCls}-error-alt`">{{ alt || description }}</div>
        </div>
      </slot>
      <slot v-if="isLoading && (showLoader || $slots.loader)" name="loader">
        <div :class="[`${prefixCls}-loader`]">
          <div :class="`${prefixCls}-loader-spin`">
            <IconLoading />
            <div :class="`${prefixCls}-loader-spin-text`">
              {{ t('image.loading') }}
            </div>
          </div>
        </div>
      </slot>
    </div>
    <ImageFooter
      v-if="isLoaded && showFooter"
      :prefix-cls="prefixCls"
      :title="title"
      :description="description"
    >
      <template v-if="$slots.extra" #extra>
        <slot name="extra" />
      </template>
    </ImageFooter>
    <ImagePreview
      v-if="isLoaded && mergePreview"
      :src="src"
      v-bind="previewProps"
      :visible="mergedPreviewVisible"
      :render-to-body="renderToBody"
      @close="onPreviewClose"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  toRefs,
  computed,
  watchEffect,
  ref,
  reactive,
  inject,
} from 'vue';
import type { ImageProps, ImagePreviewProps } from './interface';
import IconImageClose from '../icon/icon-image-close';
import IconLoading from '../icon/icon-loading';
import ImageFooter from './image-footer.vue';
import ImagePreview from './preview.vue';
import { getPrefixCls } from '../_utils/global-config';
import useImageLoadState from './hooks/use-image-load-status';
import { isServerRendering } from '../_utils/dom';
import { normalizeImageSizeProp } from './utils';
import { omit } from '../_utils/omit';
import useMergeState from '../_hooks/use-merge-state';
import { PreviewGroupInjectionKey } from './context';
import { useI18n } from '../locale';

let uuid = 0;

export default defineComponent({
  name: 'Image',
  components: {
    IconImageClose,
    IconLoading,
    ImageFooter,
    ImagePreview,
  },
  inheritAttrs: false,
  props: {
    renderToBody: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 图片获取地址
     * @en Image src
     */
    src: {
      type: String,
    },
    /**
     * @zh 图片显示宽度
     * @en Image width
     */
    width: {
      type: [String, Number] as PropType<string | number>,
    },
    /**
     * @zh 图片显示高度
     * @en Image height
     */
    height: {
      type: [String, Number] as PropType<string | number>,
    },
    /**
     * @zh 标题
     * @en Title
     */
    title: {
      type: String,
    },
    /**
     * @zh 描述，将显示在底部，如果 alt 没有值，则会将其设置给 alt
     * @en Description, will be displayed at the bottom. if alt has no value, it will be set to alt
     */
    description: {
      type: String,
    },
    /**
     * @zh 图片的文字描述
     * @en Text description of the image
     */
    alt: {
      type: String,
    },
    /**
     * @zh 是否隐藏 footer
     * @en Whether to hide footer
     */
    hideFooter: {
      type: Boolean,
    },
    /**
     * @zh 底部显示的位置
     * @en The position shown at the bottom
     */
    footerPosition: {
      type: String as PropType<'inner' | 'outer'>,
      default: 'inner',
    },
    /**
     * @zh 是否显示加载中效果
     * @en Whether to show the loading effect
     */
    showLoader: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启预览
     * @en Whether to enable preview
     */
    preview: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 控制预览的打开状态，可与 previewVisibleChange 配合使用
     * @en Control the open state of the preview, can be used in conjunction with previewVisibleChange
     * @vModel
     */
    previewVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 预览的默认打开状态
     * @en The default open state of the preview
     */
    defaultPreviewVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 预览的配置项（所有选项都是可选的） [ImagePreviewProps](#imagepreview)
     * @en Preview configuration items (all options are optional) [ImagePreviewProps](#imagepreview)
     */
    previewProps: {
      type: Object as PropType<ImagePreviewProps>,
    },
  },
  emits: [
    /**
     * @zh 预览的打开和关闭事件
     * @en Preview opening and closing events
     * @param {boolean} visible
     */
    'preview-visible-change',
    'update:previewVisible',
  ],
  setup(props: ImageProps, { attrs, slots, emit }) {
    const { t } = useI18n();
    const {
      height,
      width,
      hideFooter,
      title,
      description,
      src,
      footerPosition,
      defaultPreviewVisible,
      previewVisible,
      preview,
    } = toRefs(props);

    const groupContext = inject(PreviewGroupInjectionKey, undefined);

    const prefixCls = getPrefixCls('image');

    const refImg = ref();

    const { isLoaded, isError, isLoading, setLoadStatus } = useImageLoadState();

    const sizeStyle = computed(() => ({
      height: normalizeImageSizeProp(height?.value),
      width: normalizeImageSizeProp(width?.value),
    }));

    const wrapperClassNames = computed(() => [
      `${prefixCls}`,
      {
        [`${prefixCls}-loading`]: isLoading.value,
        [`${prefixCls}-with-footer-inner`]:
          isLoaded && showFooter && footerPosition.value === 'inner',
        [`${prefixCls}-with-footer-outer`]:
          isLoaded && showFooter && footerPosition.value === 'outer',
      },
      attrs.class,
    ]);

    const wrapperStyles = computed(() => [sizeStyle.value, attrs.style]);

    const showFooter = computed(
      () =>
        !hideFooter.value &&
        !!(title?.value || description?.value || slots.extra)
    );

    const imgProps = computed(() => omit(attrs, ['class', 'style']));

    const [mergedPreviewVisible, setPreviewVisible] = useMergeState(
      defaultPreviewVisible.value,
      reactive({
        value: previewVisible,
      })
    );

    const mergePreview = computed(
      () => !groupContext?.preview && preview.value
    );

    watchEffect(() => {
      if (isServerRendering || !refImg.value) return;
      refImg.value.src = src?.value;
      setLoadStatus('loading');
    });

    const imageId = uuid++;
    watchEffect((onInvalidate) => {
      const unRegister = groupContext?.registerImageUrl?.(
        imageId,
        src?.value || '',
        preview.value
      );
      onInvalidate(() => {
        unRegister?.();
      });
    });

    function onImgLoaded() {
      setLoadStatus('loaded');
    }

    function onImgLoadError() {
      setLoadStatus('error');
    }

    function onImgClick() {
      if (!preview.value) return;
      if (groupContext?.preview) {
        groupContext.preview(imageId);
      } else {
        emit('preview-visible-change', true);
        setPreviewVisible(true);
      }
    }

    function onPreviewClose() {
      emit('preview-visible-change', false);
      setPreviewVisible(false);
    }

    return {
      t,
      refImg,
      prefixCls,
      wrapperClassNames,
      wrapperStyles,
      showFooter,
      imgProps,
      isLoaded,
      isError,
      isLoading,
      mergedPreviewVisible,
      mergePreview,
      onImgLoaded,
      onImgLoadError,
      onImgClick,
      onPreviewClose,
    };
  },
});
</script>
