<template>
  <div class="arco-vue-site">
    <div
      :class="[
        'arco-vue-body',
        { 'arco-vue-body-has-notice': showGlobalNotice },
      ]"
    >
      <a-alert
        v-if="showGlobalNotice"
        class="site-global-notice"
        :show-icon="false"
        closable
        banner
        @close="handleCloseGlobalNotice"
      >
        <a
          href="https://bytedance.feishu.cn/docx/doxcnHMY3EFM4N7GK8H2no1mZve"
          rel="Arco Global Notice"
          target="_blank"
        >
          <span class="content">
            Arco Toolbox Figma 插件工具全新发布，有奖公测中~
          </span>
          <b>
            查看更多
            <icon-right />
          </b>
        </a>
      </a-alert>
      <aside-nav :show="showNav" @button-click="toggleNav" />
      <router-view />
    </div>
    <ThemeBox />
    <a-back-top :style="{ right: '70px', bottom: '80px' }">
      <a-button class="site-backtop-btn" shape="circle" size="large">
        <icon-up />
      </a-button>
    </a-back-top>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  reactive,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useRoute } from 'vue-router';
import { PageDurationTracker, teaLog } from '@arco-materials/site-utils';
import { collapseInjectionKey } from './context';
import AsideNav from './components/aside-nav/index.vue';
import { getLocalStorage, setLocalStorage } from './utils/local-storage';
import ThemeBox from './components/theme-box/index.vue';
// import Locale from '@arco-design/web-vue/es/locale';
// import { getLocalStorage, setLocalStorage } from './utils/local-storage';

export default defineComponent({
  name: 'App',
  components: {
    AsideNav,
    ThemeBox,
  },
  props: {
    theme: String,
    language: String,
  },
  emits: ['themeChange', 'languageChange'],
  setup() {
    const showNav = ref(true);
    const showAnchor = ref(true);
    const showGlobalNotice = ref(
      getLocalStorage('arco-global-notice') !== '23-hide'
    );

    const handleCloseGlobalNotice = () => {
      showGlobalNotice.value = false;
      setLocalStorage('arco-global-notice', '23-hide');
    };

    const toggleNav = () => {
      showNav.value = !showNav.value;
    };

    const toggleAnchor = () => {
      showAnchor.value = !showAnchor.value;
    };

    provide(
      collapseInjectionKey,
      reactive({
        showNav,
        showAnchor,
        toggleNav,
        toggleAnchor,
      })
    );

    // provide('toggleTheme', toggleTheme);
    // provide('lang', lang);
    // locale.value = lang.value;
    // provide('changeLanguage', changeLanguage);

    const route = useRoute();
    let tracker: PageDurationTracker;
    let originPath = route.path;

    onMounted(() => {
      tracker = new PageDurationTracker((params) => {
        teaLog('page_view', { ...params, url_path: originPath });
      });
    });

    onBeforeUnmount(() => {
      tracker = null;
    });

    watch(
      () => route.path,
      (path, prePath) => {
        originPath = prePath;
        tracker.handleReport();
      }
    );

    return {
      showNav,
      toggleNav,
      showGlobalNotice,
      handleCloseGlobalNotice,
    };
  },
});
</script>

<style lang="less" src="./style/index.less" />
