<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, PropType, inject, toRefs } from 'vue';
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
  },
  setup(props, { slots }) {
    const { prefixCls, locale, size } = toRefs(props);

    const configProvider = inject(configProviderInjectionKey);

    // 修正全局注入
    Object.assign(configProvider, { slots, prefixCls, locale, size });
  },
});
</script>
