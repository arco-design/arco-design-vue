<template>
  <div class="arco-vue-site">
    <div class="arco-vue-body">
      <aside-nav :show="showNav" @button-click="toggleNav" />
      <router-view />
    </div>
    <a-back-top :style="{ right: '70px', bottom: '80px' }">
      <a-button class="site-backtop-btn" shape="circle" size="large">
        <icon-up />
      </a-button>
    </a-back-top>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref } from 'vue';
import { collapseInjectionKey } from './context';
import AsideNav from './components/aside-nav/index.vue';
// import Locale from '@arco-design/web-vue/es/locale';
// import { getLocalStorage, setLocalStorage } from './utils/local-storage';

export default defineComponent({
  name: 'App',
  components: {
    AsideNav,
  },
  props: {
    theme: String,
    language: String,
  },
  emits: ['themeChange', 'languageChange'],
  setup() {
    const showNav = ref(true);
    const showAnchor = ref(true);
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

    // provide('theme', theme);
    // provide('toggleTheme', toggleTheme);
    // provide('lang', lang);
    // locale.value = lang.value;
    // provide('changeLanguage', changeLanguage);

    return {
      showNav,
      toggleNav,
    };
  },
});
</script>

<style lang="less" src="./style/index.less" />
