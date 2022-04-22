<template>
  <slot />
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  provide,
  reactive,
  toRefs,
  inject,
} from 'vue';
import { configProviderInjectionKey } from './context';
import { ArcoLang } from '../locale/interface';
import { Size } from '../_utils/constant';

export default defineComponent({
  name: 'ConfigProvider',
  props: {
    /**
     * @zh 是否全局生效
     * @en Is global effect
     */
    isGlobal: {
      type: Boolean,
      default: false,
    },
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
    const { isGlobal, prefixCls, locale, size } = toRefs(props);

    provide(
      configProviderInjectionKey,
      reactive({
        slots,
        prefixCls,
        locale,
        size,
      })
    );

    if (isGlobal.value) {
      const configProvider = inject(configProviderInjectionKey, undefined);
      // 修正全局注入
      configProvider &&
        Object.assign(configProvider, { slots, prefixCls, locale, size });
    }
  },
});
</script>
