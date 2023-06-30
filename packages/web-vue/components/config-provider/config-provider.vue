<template>
  <slot />
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
  getCurrentInstance,
} from 'vue';
import { configProviderInjectionKey } from './context';
import { ArcoLang } from '../locale/interface';
import { Size } from '../_utils/constant';

export default defineComponent({
  name: 'ConfigProvider',
  props: {
    /**
     * @zh 组件类名前缀
     * @en Component classname prefix
     */
    prefixCls: {
      type: String,
      default: 'arco',
    },
    /**
     * @zh 配置语言包
     * @en Configure language pack
     */
    locale: {
      type: Object as PropType<ArcoLang>,
    },
    /**
     * @zh 大小
     * @en Size
     * @version 2.14.0
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 是否全局生效
     * @en Is global effect
     * @version 2.25.0
     */
    global: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在容器滚动时更新弹出框的位置
     * @us Whether to update the position of the popup when the container is scrolled
     * @version 2.25.0
     */
    updateAtScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在滚动时关闭弹出框
     * @en Whether to close the popover when scrolling
     * @version 2.46.0
     */
    scrollToClose: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否交换时间
     * @en Whether to exchange time
     * @version 2.48.0
     */
    exchangeTime: {
      type: Boolean,
      default: true,
    },
  },
  /**
   * @zh 自定义空状态元素
   * @en Custom empty element
   * @slot empty
   * @binding {string} component
   * @version 2.28.0
   */
  /**
   * @zh 自定义加载中元素
   * @en Custom loading element
   * @slot loading
   * @version 2.28.0
   */
  setup(props, { slots }) {
    const {
      prefixCls,
      locale,
      size,
      updateAtScroll,
      scrollToClose,
      exchangeTime,
    } = toRefs(props);

    const config = reactive({
      slots,
      prefixCls,
      locale,
      size,
      updateAtScroll,
      scrollToClose,
      exchangeTime,
    });

    if (props.global) {
      const instance = getCurrentInstance();
      if (instance) {
        instance.appContext.app.provide(configProviderInjectionKey, config);
      }
    } else {
      provide(configProviderInjectionKey, config);
    }
  },
});
</script>
