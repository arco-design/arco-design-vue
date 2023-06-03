<template>
  <slot />
  <ImagePreview
    v-bind="{ ...$attrs, groupArrowProps }"
    in-group
    :src="currentUrl"
    :visible="mergedVisible"
    :mask-closable="maskClosable"
    :closable="closable"
    :actions-layout="actionsLayout"
    :popup-container="popupContainer"
    :render-to-body="renderToBody"
    @close="onClose"
  >
    <template v-if="$slots.actions" #actions>
      <slot name="actions" :url="currentUrl" />
    </template>
  </ImagePreview>
</template>
<script lang="tsx">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  provide,
  computed,
  ref,
  watch,
} from 'vue';
import useMergeState from '../_hooks/use-merge-state';
import { ImagePreviewGroupProps } from './interface';
import ImagePreview from './preview.vue';
import { PreviewGroupContext, PreviewGroupInjectionKey } from './context';
import { isArray, isUndefined } from '../_utils/is';

export default defineComponent({
  name: 'ImagePreviewGroup',
  components: {
    ImagePreview,
  },
  inheritAttrs: false,
  props: {
    renderToBody: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 图片列表（设置了本属性之后，将不再收集 a-image 子组件的图片信息）
     * @en Picture list (after setting this property, the picture information of a-image subcomponent will no longer be collected)
     */
    srcList: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 当前展示的图片的下标
     * @en The index of the currently displayed image
     * @vModel
     */
    current: {
      type: Number,
    },
    /**
     * @zh 第一张展示的图片的下标
     * @en The index of the first image shown
     */
    defaultCurrent: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否无限循环
     * @en Whether to loop infinitely
     */
    infinite: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否可见，受控属性
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
     * @zh 控制条的布局
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
      type: [Object, String] as PropType<HTMLElement | string>,
    },
  },
  emits: [
    /**
     * @zh 切换图片
     * @en Image switch
     */
    'change',
    'update:current',
    /**
     * @zh 预览的打开和关闭
     * @en Preview visibility change
     */
    'visible-change',
    'update:visible',
  ],
  /**
   * @zh 自定义额外的操作项
   * @en Customize additional action items
   * @slot actions
   * @version 2.46.0
   */
  setup(props: ImagePreviewGroupProps, { emit }) {
    const {
      srcList,
      visible,
      defaultVisible,
      current,
      defaultCurrent,
      infinite,
    } = toRefs(props);

    const [mergedVisible, setLocalVisible] = useMergeState(
      defaultVisible.value,
      reactive({
        value: visible,
      })
    );
    const setVisible = (newVisible: boolean) => {
      if (newVisible !== mergedVisible.value) {
        emit('visible-change', newVisible);
        emit('update:visible', newVisible);
        setLocalVisible(newVisible);
      }
    };

    const propImageUrlMap = computed(
      () =>
        new Map(
          isArray(srcList?.value)
            ? srcList?.value.map((url, index) => [
                index,
                { url, canPreview: true },
              ])
            : []
        )
    );

    const imageUrlMap = ref(new Map(propImageUrlMap.value || []));

    const imageIdList = computed(() => Array.from(imageUrlMap.value.keys()));

    const imageCount = computed(() => imageIdList.value.length);

    function registerImageUrl(id: number, url: string, canPreview: boolean) {
      if (!propImageUrlMap.value.has(id))
        imageUrlMap.value.set(id, {
          url,
          canPreview,
        });

      return function unRegisterPreviewUrl() {
        if (!propImageUrlMap.value.has(id)) {
          imageUrlMap.value.delete(id);
        }
      };
    }

    watch(propImageUrlMap, () => {
      imageUrlMap.value = new Map(propImageUrlMap.value || []);
    });

    const [currentIndex, setLocalCurrentIndex] = useMergeState(
      defaultCurrent.value,
      reactive({
        value: current,
      })
    );
    const setCurrentIndex = (index: number) => {
      if (index !== currentIndex.value) {
        emit('change', index);
        emit('update:current', index);
        setLocalCurrentIndex(index);
      }
    };

    const currentId = computed(() => imageIdList.value[currentIndex.value]);
    const setCurrentId = (nextId: number) => {
      const nextIndex = imageIdList.value.indexOf(nextId);
      if (nextIndex !== currentIndex.value) {
        setCurrentIndex(nextIndex);
      }
    };

    const currentUrl = computed(
      () => imageUrlMap.value.get(currentId.value)?.url
    );

    provide<PreviewGroupContext>(
      PreviewGroupInjectionKey,
      reactive({
        registerImageUrl,
        preview: (imageId: number) => {
          setVisible(true);
          setCurrentId(imageId);
        },
      })
    );

    const nextIndex = computed(() => {
      const findNext = (start: number, end: number) => {
        for (let i = start; i <= end; i++) {
          const id = imageIdList.value[i];
          if (imageUrlMap.value.get(id)?.canPreview) {
            return i;
          }
        }
        return undefined;
      };

      const next = findNext(currentIndex.value + 1, imageCount.value - 1);
      return isUndefined(next) && infinite.value
        ? findNext(0, currentIndex.value - 1)
        : next;
    });

    const prevIndex = computed(() => {
      const findPrev = (start: number, end: number) => {
        for (let i = start; i >= end; i--) {
          const id = imageIdList.value[i];
          if (imageUrlMap.value.get(id)?.canPreview) {
            return i;
          }
        }
        return undefined;
      };

      const prev = findPrev(currentIndex.value - 1, 0);
      return isUndefined(prev) && infinite.value
        ? findPrev(imageCount.value - 1, currentIndex.value + 1)
        : prev;
    });

    const onPrev = computed(() =>
      !isUndefined(prevIndex.value)
        ? () => {
            !isUndefined(prevIndex.value) && setCurrentIndex(prevIndex.value);
          }
        : undefined
    );

    const onNext = computed(() =>
      !isUndefined(nextIndex.value)
        ? () => {
            !isUndefined(nextIndex.value) && setCurrentIndex(nextIndex.value);
          }
        : undefined
    );

    return {
      mergedVisible,
      currentUrl,
      prevIndex,
      nextIndex,
      onClose() {
        setVisible(false);
      },
      groupArrowProps: reactive({
        onPrev,
        onNext,
      }),
    };
  },
});
</script>
