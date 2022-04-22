<template>
  <teleport :to="container" :disabled="!renderToBody">
    <div :class="classNames" :style="wrapperStyles">
      <transition
        name="image-fade"
        @before-enter="
          (el) => {
            el.parentNode.style.display = 'block';
          }
        "
        @after-leave="
          (el) => {
            el.parentNode.style.display = '';
          }
        "
      >
        <div v-show="mergedVisible" :class="`${prefixCls}-mask`" />
      </transition>
      <div
        v-if="mergedVisible"
        ref="refWrapper"
        :class="`${prefixCls}-wrapper`"
        @click="onMaskClick"
      >
        <!-- img -->
        <div
          :class="`${prefixCls}-img-container`"
          :style="{ transform: `scale(${scale}, ${scale})` }"
          @click="onMaskClick"
        >
          <img
            ref="refImage"
            :key="src"
            :src="src"
            :class="[
              `${prefixCls}-img`,
              {
                [`${prefixCls}-img-moving`]: moving,
              },
            ]"
            :style="{
              transform: `translate(${translate[0]}px, ${translate[1]}px) rotate(${rotate}deg)`,
            }"
            @load="onImgLoad"
            @error="onImgError"
          />
        </div>

        <!-- loading -->
        <div v-if="isLoading" :class="`${prefixCls}-loading`">
          <IconLoading />
        </div>

        <!-- scale value -->
        <transition name="image-fade">
          <div v-if="scaleValueVisible" :class="`${prefixCls}-scale-value`">
            {{ (scale * 100).toFixed(0) }}%
          </div>
        </transition>

        <!-- toolbar -->
        <PreviewToolbar
          v-if="isLoaded"
          :actions="actions"
          :actions-layout="actionsLayout"
        >
          <slot name="actions" />
        </PreviewToolbar>

        <!-- close btn -->
        <div
          v-if="closable"
          :class="`${prefixCls}-close-btn`"
          @click="onCloseClick"
        >
          <IconClose />
        </div>

        <!-- group arrow -->
        <PreviewArrow v-if="inGroup" v-bind="groupArrowProps" />
      </div>
    </div>
  </teleport>
</template>
<script lang="tsx">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  watch,
  toRefs,
  ref,
  h,
  CSSProperties,
} from 'vue';
import useMergeState from '../_hooks/use-merge-state';
import { getPrefixCls } from '../_utils/global-config';
import { ImagePreviewProps } from './interface';
import PreviewArrow from './preview-arrow.vue';
import PreviewToolbar from './preview-toolbar.vue';
import useImageLoadStatus from './hooks/use-image-load-status';
import useImageDrag from './hooks/use-image-drag';
import IconLoading from '../icon/icon-loading';
import IconClose from '../icon/icon-close';
import IconZoomOut from '../icon/icon-zoom-out';
import IconZoomIn from '../icon/icon-zoom-in';
import IconFullscreen from '../icon/icon-fullscreen';
import IconRotateLeft from '../icon/icon-rotate-left';
import IconRotateRight from '../icon/icon-rotate-right';
import IconOriginalSize from '../icon/icon-original-size';
import usePopupOverHidden from '../_hooks/use-popup-overflow-hidden';
import usePopupContainer from '../_hooks/use-popup-container';
import getScale, { minScale, maxScale } from './utils/get-scale';
import { useI18n } from '../locale';
import usePopupManager from '../_hooks/use-popup-manager';

const ROTATE_STEP = 90;

export default defineComponent({
  name: 'ImagePreview',
  components: {
    PreviewArrow,
    PreviewToolbar,
    IconLoading,
    IconClose,
  },
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
     * @zh 是否可见
     * @en Whether is visible
     * @vModel
     */
    visible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认是否可见，非受控
     * @en Default visiblity
     */
    defaultVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 点击 mask 是否触发关闭
     * @en Whether to close the modal when mask is clicked
     */
    maskClosable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否显示关闭按钮
     * @en Whether to show close button
     */
    closable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 操作项的布局
     * @en Layout of action list
     */
    actionsLayout: {
      type: Array as PropType<string[]>,
      default: () => [
        'fullScreen',
        'rotateRight',
        'rotateLeft',
        'zoomIn',
        'zoomOut',
        'originalSize',
      ],
    },
    /**
     * @zh 设置弹出框的挂载点，同 `teleport` 的 `to`，缺省值是 document.body
     * @en Set the mount point of the pop-up box, the same as the `to` of `teleport`, the default value is document.body
     */
    popupContainer: {
      type: [Object, String] as PropType<HTMLElement>,
    },
    inGroup: {
      type: Boolean,
      default: false,
    },
    groupArrowProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [
    /**
     * @zh 关闭事件
     * @en Close event
     */
    'close',
    'update:visible',
  ],
  /**
   * @zh 自定义额外的操作项
   * @en Customize additional action items
   * @slot actions
   * @version 2.17.0
   */
  setup(props: ImagePreviewProps, { emit }) {
    const { t } = useI18n();
    const { src, popupContainer, visible, defaultVisible, maskClosable } =
      toRefs(props);
    const refWrapper = ref();
    const refImage = ref();
    const prefixCls = getPrefixCls('image-preview');
    const [mergedVisible, setVisible] = useMergeState(
      defaultVisible.value,
      reactive({ value: visible })
    );
    const classNames = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-hide`]: !mergedVisible.value,
      },
    ]);

    const container = usePopupContainer(
      document.body,
      reactive({ popupContainer })
    );

    const isFixed = computed(() => container.value === document.body);
    const { zIndex } = usePopupManager('dialog', { visible: mergedVisible });

    const wrapperStyles = computed<CSSProperties>(() => {
      const positionStyles: CSSProperties = isFixed.value
        ? { zIndex: zIndex.value, position: 'fixed' }
        : { zIndex: 'inherit', position: 'absolute' };

      return { ...positionStyles };
    });

    const { isLoading, isLoaded, setLoadStatus } = useImageLoadStatus();

    const rotate = ref(0);
    const scale = ref(1);

    const { translate, moving, resetTranslate } = useImageDrag(
      reactive({
        wrapperEl: refWrapper,
        imageEl: refImage,
        visible: mergedVisible,
        scale,
      })
    );

    const scaleValueVisible = ref(false);
    let hideScaleTimer: any = null;
    const showScaleValue = () => {
      !scaleValueVisible.value && (scaleValueVisible.value = true);
      hideScaleTimer && clearTimeout(hideScaleTimer);
      hideScaleTimer = setTimeout(() => {
        scaleValueVisible.value = false;
      }, 1000);
    };

    usePopupOverHidden(reactive({ container, hidden: mergedVisible }));

    function reset() {
      rotate.value = 0;
      scale.value = 1;
      resetTranslate();
    }

    watch([src, mergedVisible], () => {
      if (mergedVisible.value) {
        reset();
        setLoadStatus('loading');
      }
    });

    function close() {
      if (mergedVisible.value) {
        emit('close');
        emit('update:visible', false);
        setVisible(false);
      }
    }

    function onMaskClick(e: MouseEvent) {
      if (maskClosable.value && e.target === e.currentTarget) {
        close();
      }
    }

    function changeScale(newScale: number) {
      if (scale.value !== newScale) {
        scale.value = newScale;
        showScaleValue();
      }
    }

    return {
      prefixCls,
      classNames,
      container,
      wrapperStyles,
      scale,
      translate,
      rotate,
      moving,
      mergedVisible,
      isLoading,
      isLoaded,
      scaleValueVisible,
      refWrapper,
      refImage,
      onMaskClick,
      onCloseClick: close,
      onImgLoad() {
        setLoadStatus('loaded');
      },
      onImgError() {
        setLoadStatus('error');
      },
      actions: computed(() => [
        /** 满屏 */
        {
          key: 'fullScreen',
          name: t('imagePreview.fullScreen'),
          content: () => h(IconFullscreen),
          onClick: () => {
            const wrapperRect = refWrapper.value.getBoundingClientRect();
            const imgRect = refImage.value.getBoundingClientRect();
            const newHeightScale =
              wrapperRect.height / (imgRect.height / scale.value);
            const newWidthScale =
              wrapperRect.width / (imgRect.width / scale.value);
            const newScale = Math.max(newHeightScale, newWidthScale);
            changeScale(newScale);
          },
        },
        /** 顺时针旋转 */
        {
          key: 'rotateRight',
          name: t('imagePreview.rotateRight'),
          content: () => h(IconRotateRight),
          onClick: () => {
            rotate.value = (rotate.value + ROTATE_STEP) % 360;
          },
        },
        /** 逆时针旋转 */
        {
          key: 'rotateLeft',
          name: t('imagePreview.rotateLeft'),
          content: () => h(IconRotateLeft),
          onClick: () => {
            rotate.value =
              rotate.value === 0
                ? 360 - ROTATE_STEP
                : rotate.value - ROTATE_STEP;
          },
        },
        /** 放大 */
        {
          key: 'zoomIn',
          name: t('imagePreview.zoomIn'),
          content: () => h(IconZoomIn),
          onClick: () => {
            const newScale = getScale(scale.value, 'zoomIn');
            changeScale(newScale);
          },
          disabled: scale.value === maxScale,
        },
        /** 缩小 */
        {
          key: 'zoomOut',
          name: t('imagePreview.zoomOut'),
          content: () => h(IconZoomOut),
          onClick: () => {
            const newScale = getScale(scale.value, 'zoomOut');
            changeScale(newScale);
          },
          disabled: scale.value === minScale,
        },
        /** 缩放到100% */
        {
          key: 'originalSize',
          name: t('imagePreview.originalSize'),
          content: () => h(IconOriginalSize),
          onClick: () => {
            changeScale(1);
          },
        },
      ]),
    };
  },
});
</script>
