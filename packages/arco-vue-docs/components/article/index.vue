<template>
  <aside-anchor
    v-if="anchors && anchors.length > 0"
    :show="collapseCtx.showAnchor"
    :anchors="anchors"
    @button-click="collapseCtx.toggleAnchor"
  />
  <main :class="cls">
    <article class="arco-vue-article">
      <div class="article-header">
        <div v-if="meta" class="article-meta">
          <span class="article-type">{{ meta.type }}</span>
          <template v-if="meta.category">
            <span class="separator">/</span>
            <span class="article-category">{{ meta.category }}</span>
          </template>
        </div>
        <h1 class="article-title">{{ title }}</h1>
        <div v-if="description" class="article-description">
          {{ description }}
        </div>
      </div>
      <div class="article-content">
        <slot />
      </div>
    </article>
    <arco-footer />
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';
import AsideAnchor from '../aside-anchor/index.vue';
import ArcoFooter from '../footer/index.vue';
import { CollapseContext, collapseInjectionKey } from '../../context';
import { articleInjectionKey } from './context';
import { AnchorData } from '../aside-anchor/interface';

export default defineComponent({
  name: 'ArcoArticle',
  components: {
    AsideAnchor,
    ArcoFooter,
  },
  props: {
    title: String,
    description: String,
    meta: Object as PropType<{ category: string; type: string }>,
  },
  setup() {
    const { locale } = useI18n();
    const collapseCtx = inject<CollapseContext>(collapseInjectionKey);

    const getMessage = (zh: string, en: string) => {
      return locale.value === 'zh-CN' ? zh : en;
    };

    const anchors = reactive<AnchorData[]>([]);
    const hrefs = computed(() => anchors.map((item) => item.href));

    provide(
      articleInjectionKey,
      reactive({
        anchors,
        addAnchor: (data: AnchorData) => {
          anchors.push(data);
        },
        removeAnchor: (href: string) => {
          const index = hrefs.value.indexOf(href);
          if (index > -1) {
            anchors.splice(index, 1);
          }
        },
      })
    );

    const cls = computed(() => [
      'arco-vue-main',
      {
        'aside-nav-show': collapseCtx?.showNav,
        'aside-anchor-show': anchors.length > 0 && collapseCtx?.showAnchor,
      },
    ]);

    return {
      cls,
      locale,
      collapseCtx,
      getMessage,
      anchors,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
