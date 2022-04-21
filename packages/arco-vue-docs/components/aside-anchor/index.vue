<template>
  <aside :class="cls">
    <div class="aside-top">
      <a-button
        :class="buttonCls"
        shape="circle"
        size="large"
        @click="$emit('buttonClick')"
      >
        <icon-right v-if="show" />
        <icon-left v-else />
      </a-button>
    </div>
    <a-anchor line-less>
      <a-anchor-link
        v-for="(item, index) in anchors"
        :key="index"
        :href="item.href"
      >
        {{ item.title }}
      </a-anchor-link>
      <a-anchor-link v-if="hasAPIAnchor" key="article-api" href="#API">
        API
      </a-anchor-link>
    </a-anchor>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import anchor from '@web-vue/components/anchor/anchor.vue';

export default defineComponent({
  name: 'AsideAnchor',
  props: {
    anchors: {
      type: Array,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['buttonClick'],
  setup(props) {
    const { locale } = useI18n();
    const hasAPIAnchor = ref(false);

    const getMessage = (zh: string, en: string) => {
      return locale.value === 'zh-CN' ? zh : en;
    };

    const cls = computed(() => [
      'arco-vue-aside',
      {
        'arco-vue-aside-collapse': !props.show,
      },
    ]);

    const buttonCls = computed(() => [
      'aside-collapse-btn',
      {
        'aside-collapse-btn-collapse': !props.show,
      },
    ]);

    onMounted(() => {
      hasAPIAnchor.value = !!document.querySelector('.article-content #API');
    });

    return {
      cls,
      buttonCls,
      hasAPIAnchor,
      getMessage,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
