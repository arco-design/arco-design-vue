<template>
  <section :class="classNames">
    <slot />
  </section>
</template>

<script setup lang="tsx">
  import { computed, provide, ref } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import { LayoutSiderInjectionKey } from './context';

  defineOptions({ name: 'Layout' });

  const props = defineProps({
    /**
     * @zh 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动
     * @en Indicates that there is a Sider in the sub-element, which generally does not need to be specified. Used to avoid style flicker when rendering on the server side.
     */
    hasSider: {
      type: Boolean,
    },
  });

  const siderIds = ref<string[]>([]);
  const prefixCls = getPrefixCls('layout');
  const classNames = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: props.hasSider || siderIds.value.length,
    },
  ]);

  provide(LayoutSiderInjectionKey, {
    onSiderMount: (id) => siderIds.value.push(id),
    onSiderUnMount: (id) => {
      siderIds.value = siderIds.value.filter((_id) => _id !== id);
    },
  });
</script>
