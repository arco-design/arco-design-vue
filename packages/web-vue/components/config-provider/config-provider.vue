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
  },
  setup(props, { slots }) {
    const { prefixCls, locale, size, updateAtScroll } = toRefs(props);

    const config = reactive({
      slots,
      prefixCls,
      locale,
      size,
      updateAtScroll,
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
