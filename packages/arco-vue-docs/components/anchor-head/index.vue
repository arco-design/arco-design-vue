<template>
  <component :is="`h${level}`" :id="href" class="anchor-head">
    <a class="anchor-link" :href="`#${href}`" @click.prevent="handleClickCopy">
      <icon-link />
    </a>
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Message } from '@web-vue/components/index';
import copy from '../../utils/clipboard';

export default defineComponent({
  name: 'AnchorHead',
  props: {
    level: [Number, String],
    href: String,
  },
  setup() {
    const handleClickCopy = (e: MouseEvent) => {
      const copyLink = (e.currentTarget as HTMLAnchorElement).href;
      if (copyLink) {
        copy(copyLink)
          .then(() => {
            Message.success('Copy Success!');
          })
          .catch(() => {
            Message.error('Copy Failed! Please try again.');
          });
      }
    };

    return {
      handleClickCopy,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
