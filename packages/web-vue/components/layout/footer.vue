<template>
  <footer :class="classNames">
    <slot />
  </footer>
</template>

<script>
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'LayoutFooter',
  /**
   * @zh 内容
   * @en Content
   * @slot default
   */
  setup() {
    const prefixCls = getPrefixCls('layout-footer');
    const classNames = [prefixCls];

    return {
      classNames,
    };
  },
});
</script>
