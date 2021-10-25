<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, PropType, provide, reactive, toRefs } from 'vue';
import { configProviderInjectionKey } from './context';
import { ArcoLang } from '../locale/interface';
import usePickSlots from '../_hooks/use-pick-slots';

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
  },
  setup(props, { slots }) {
    const { prefixCls, locale } = toRefs(props);

    const emptySlot = usePickSlots(slots, 'empty');

    provide(
      configProviderInjectionKey,
      reactive({
        prefixCls,
        locale,
        emptySlot,
      })
    );
  },
});
</script>
