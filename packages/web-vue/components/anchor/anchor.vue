<template>
  <div ref="anchorRef" :class="cls">
    <div
      v-if="!lineLess"
      ref="lineSliderRef"
      :class="`${prefixCls}-line-slider`"
    />
    <ul :class="`${prefixCls}-list`">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
  watch,
} from 'vue';
import computeScrollIntoView from 'compute-scroll-into-view';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isWindow } from '../_utils/is';
import { getElement, off, on } from '../_utils/dom';
import { slide } from './utils';
import { anchorInjectionKey } from './context';
import { throttleByRaf } from '../_utils/throttle-by-raf';

const BOUNDARY_POSITIONS = ['start', 'end', 'center', 'nearest'] as const;
type BoundaryPosition = typeof BOUNDARY_POSITIONS[number];

export default defineComponent({
  name: 'Anchor',
  props: {
    /**
     * @zh 滚动边界值，设置该值为数字后，将会在距离滚动容器 `boundary` 距离时停止滚动。
     * @en Scrolling boundary value. After setting the value to a number, it will stop scrolling when the distance is `boundary` from the scrolling container.
     * @values 'start', 'end', 'center', 'nearest', number
     */
    boundary: {
      type: [Number, String] as PropType<BoundaryPosition | number>,
      default: 'start',
      validator: (value: any) => {
        return isNumber(value) || BOUNDARY_POSITIONS.includes(value);
      },
    },
    /**
     * @zh 是否显示左侧轴线
     * @en Whether to show the left axis
     */
    lineLess: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 滚动容器
     * @en Scroll container
     */
    scrollContainer: {
      type: [String, Object] as PropType<string | HTMLElement | Window>,
    },
    /**
     * @zh 是否改变hash。设置为 `false` 时点击锚点不会改变页面的 hash
     * @en Whether to change the hash. When set to `false`, clicking on the anchor will not change the hash of the page
     */
    changeHash: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否使用平滑滚动
     * @en Whether to use smooth scrolling
     */
    smooth: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    /**
     * @zh 用户点击链接时触发
     * @en Triggered when the user clicks on the link
     * @property { string | undefined } hash
     * @property {string} preHash
     */
    select: (hash: string | undefined, preHash: string) => true,
    /**
     * @zh 链接发生改变时触发
     * @en Triggered when the link changes
     * @property {string} hash
     */
    change: (hash: string) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('anchor');
    const anchorRef = ref<HTMLElement>();
    const lineSliderRef = ref<HTMLElement>();
    const links = reactive<Record<string, HTMLElement>>({});
    const currentLink = ref('');
    const isScrolling = ref(false);

    const scrollContainerEle = ref<HTMLElement | Window>();
    const containerEle = ref<HTMLElement>();

    const addLink = (hash: string, node: HTMLElement) => {
      if (!hash) return;
      links[hash] = node;
    };

    const removeLink = (hash: string) => {
      delete links[hash];
    };

    const handleClick = (e: MouseEvent, hash?: string) => {
      if (!props.changeHash) {
        e.preventDefault();
      }
      if (hash) {
        scrollIntoView(hash);
        handleAnchorChange(hash);
      }
      emit('select', hash, currentLink.value);
    };

    const scrollIntoView = (hash: string) => {
      try {
        const element = getElement(hash);
        if (!element) return;
        let block: BoundaryPosition;
        let diff = 0;
        if (isNumber(props.boundary)) {
          block = 'start';
          diff = props.boundary;
        } else {
          block = props.boundary;
        }

        const actions = computeScrollIntoView(element, { block });
        if (!actions.length) return;
        const { el, top } = actions[0];
        const targetTop = top - diff;
        // if (!this.props.animation) {
        //   return;
        // }
        slide(el as HTMLElement, targetTop, () => {
          isScrolling.value = false;
        });
        isScrolling.value = true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    const handleScroll = throttleByRaf(() => {
      if (isScrolling.value) return;
      const element = getFirstInViewportEle();
      if (element && element.id) {
        const hash = `#${element.id}`;
        handleAnchorChange(hash);
      }
    });

    const handleAnchorChange = (hash: string) => {
      if (!links[hash] && anchorRef.value) {
        const element = getElement(`a[data-href='${hash}']`, anchorRef.value);
        if (!element) return;

        links[hash] = element;
      }
      if (hash !== currentLink.value) {
        currentLink.value = hash;
        nextTick(() => {
          emit('change', hash);
        });
      }
    };

    const getFirstInViewportEle = (): HTMLElement | undefined => {
      if (!scrollContainerEle.value || !containerEle.value) {
        return undefined;
      }

      const boundary = isNumber(props.boundary) ? props.boundary : 0;
      const containerRect = containerEle.value.getBoundingClientRect();

      for (const hash of Object.keys(links)) {
        const element = getElement(hash);
        if (element) {
          const { top } = element.getBoundingClientRect();
          const offsetTop = isWindow(scrollContainerEle.value)
            ? top - boundary
            : top - containerRect.top - boundary;
          if (offsetTop >= 0 && offsetTop <= containerRect.height / 2) {
            return element;
          }
        }
      }
      return undefined;
    };

    watch(currentLink, () => {
      const link = links[currentLink.value];
      if (!props.lineLess && link && lineSliderRef.value) {
        lineSliderRef.value.style.top = `${link.offsetTop}px`;
      }
    });

    const bindScrollEvent = () => {
      if (scrollContainerEle.value) {
        on(scrollContainerEle.value, 'scroll', handleScroll);
      }
    };

    const unbindScrollEvent = () => {
      if (scrollContainerEle.value) {
        off(scrollContainerEle.value, 'scroll', handleScroll);
      }
    };

    const getContainer = () => {
      if (props.scrollContainer) {
        scrollContainerEle.value = isWindow(props.scrollContainer)
          ? window
          : getElement(props.scrollContainer);
        containerEle.value = isWindow(props.scrollContainer)
          ? document.documentElement
          : getElement(props.scrollContainer);
      } else {
        scrollContainerEle.value = window;
        containerEle.value = document.documentElement;
      }
    };

    onMounted(() => {
      getContainer();

      const hash = decodeURIComponent(window.location.hash);
      if (hash) {
        scrollIntoView(hash);
        handleAnchorChange(hash);
      } else {
        handleScroll();
      }

      bindScrollEvent();
    });

    onBeforeUnmount(() => {
      unbindScrollEvent();
    });

    provide(
      anchorInjectionKey,
      reactive({
        currentLink,
        addLink,
        removeLink,
        handleClick,
      })
    );

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-line-less`]: props.lineLess,
      },
    ]);

    return {
      prefixCls,
      cls,
      anchorRef,
      lineSliderRef,
    };
  },
});
</script>
