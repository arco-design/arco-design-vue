<template>
  <transition name="fade-in">
    <div v-if="visible" :class="prefixCls" @click="scrollToTop">
      <slot>
        <button :class="`${prefixCls}-btn`">
          <icon-to-top />
        </button>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
// @ts-ignore
import BTween from 'b-tween';
import { getPrefixCls } from '../_utils/global-config';
import { on, off } from '../_utils/dom';
import { throttleByRaf } from '../_utils/throttle-by-raf';
import IconToTop from '../icon/icon-to-top';
import { isString } from '../_utils/is';

export default defineComponent({
  name: 'BackTop',
  components: {
    IconToTop,
  },
  props: {
    /**
     * @zh 显示回到顶部按钮的触发滚动高度
     * @en Display the trigger scroll height of the back to top button
     */
    visibleHeight: {
      type: Number as PropType<number>,
      default: 200,
    },
    /**
     * @zh 滚动事件的监听容器
     * @en Scroll event listener container
     */
    targetContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    /**
     * @zh 滚动动画的缓动方式，可选值参考 [BTween](https://github.com/PengJiyuan/b-tween)
     * @en Easing mode of scrolling animation, refer to [BTween](https://github.com/PengJiyuan/b-tween) for optional values
     */
    easing: {
      type: String,
      default: 'quartOut',
    },
    /**
     * @zh 滚动动画的持续时间
     * @en Duration of scroll animation
     */
    duration: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('back-top');
    const visible = ref(false);
    const target = ref<HTMLElement>();
    const isWindow = !props.targetContainer;

    const scrollHandler = throttleByRaf(() => {
      if (target.value) {
        const { visibleHeight } = props;
        const { scrollTop } = target.value;
        visible.value = scrollTop >= visibleHeight;
      }
    });

    const getContainer = (container: string | HTMLElement) => {
      if (isString(container)) {
        return document.querySelector(container) as HTMLElement;
      }
      return container;
    };

    onMounted(() => {
      target.value = isWindow
        ? document?.documentElement
        : getContainer(props.targetContainer);
      if (target.value) {
        on(isWindow ? window : target.value, 'scroll', scrollHandler);
        scrollHandler();
      }
    });

    onUnmounted(() => {
      scrollHandler.cancel();
      if (target.value) {
        off(isWindow ? window : target.value, 'scroll', scrollHandler);
      }
    });

    const scrollToTop = () => {
      if (target.value) {
        const { scrollTop } = target.value;
        const tween = new BTween({
          from: { scrollTop },
          to: { scrollTop: 0 },
          easing: props.easing,
          duration: props.duration,
          onUpdate: (keys: any) => {
            if (target.value) {
              target.value.scrollTop = keys.scrollTop;
            }
          },
        });
        tween.start();
        // props.onClick && props.onClick();
      }
    };

    return {
      prefixCls,
      visible,
      scrollToTop,
    };
  },
});
</script>
