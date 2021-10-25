<template>
  <li ref="linkRef" :class="cls">
    <a :class="linkCls" :href="href" @click="handleClick">
      <slot>{{ title }}</slot>
    </a>
    <ul v-if="$slots.sublist" :class="`${prefixCls}-sublist`">
      <slot name="sublist" />
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { anchorInjectionKey } from './context';

export default defineComponent({
  name: 'AnchorLink',
  props: {
    /**
     * @zh 锚点链接的文本内容
     * @en The text content of the anchor link
     */
    title: String,
    /**
     * @zh 锚点链接的地址
     * @en The address of the anchor link
     */
    href: String,
  },
  setup(props) {
    const prefixCls = getPrefixCls('anchor');
    const linkCls = `${prefixCls}-link`;
    const linkRef = ref<HTMLElement>();

    const context = inject(anchorInjectionKey, undefined);

    onMounted(() => {
      if (props.href && linkRef.value) {
        context?.addLink(props.href, linkRef.value);
      }
    });

    const cls = computed(() => [
      `${linkCls}-item`,
      {
        [`${linkCls}-active`]: context?.currentLink === props.href,
      },
    ]);

    const handleClick = (e: MouseEvent) => context?.handleClick(e, props.href);

    return {
      prefixCls,
      linkCls,
      cls,
      linkRef,
      handleClick,
    };
  },
});
</script>
