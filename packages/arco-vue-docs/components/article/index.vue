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
        <ChangelogBox v-if="changelog" :changelog="changelog" />
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
import ChangelogBox from '../changelog-box/index.vue';

export default defineComponent({
  name: 'ArcoArticle',
  components: {
    ChangelogBox,
    AsideAnchor,
    ArcoFooter,
  },
  props: {
    title: String,
    description: String,
    changelog: Array,
    meta: Object as PropType<{ category: string; type: string }>,
  },
  setup(props) {
    const { locale } = useI18n();
    const collapseCtx = inject<CollapseContext>(collapseInjectionKey);

    const getMessage = (zh: string, en: string) => {
      return locale.value === 'zh-CN' ? zh : en;
    };

    const anchors = reactive<AnchorData[]>([]);

    provide(
      articleInjectionKey,
      reactive({
        anchors,
        addAnchor: (data: AnchorData) => {
          anchors.push(data);
        },
        removeAnchor: (href: string) => {},
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
