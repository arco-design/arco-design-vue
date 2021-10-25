<template>
  <nav class="arco-nav">
    <div class="arco-nav-logo">
      <logo-arco v-if="theme === 'light'" />
      <logo-arco-dark v-if="theme === 'dark'" />
    </div>
    <div class="arco-nav-right">
      <a-button class="arco-nav-button" type="text" @click="toggleTheme">
        <template #icon>
          <icon-moon-fill v-if="theme === 'light'" />
          <icon-sun-fill v-if="theme === 'dark'" />
        </template>
      </a-button>
      <a-button class="arco-nav-button" type="text" @click="handleClickLang">
        <template #icon>
          <div v-if="lang === 'en-US'">中</div>
          <div v-if="lang === 'zh-CN'">En</div>
        </template>
      </a-button>
    </div>
  </nav>
</template>

<script>
import { defineComponent, inject } from 'vue';
import LogoArco from '../../assets/logo-arco-design.svg';
import LogoArcoDark from '../../assets/logo-arco-design-dark.svg';

export default defineComponent({
  name: 'Navbar',
  components: {
    LogoArco,
    LogoArcoDark,
  },
  setup() {
    const theme = inject('theme');
    const toggleTheme = inject('toggleTheme');
    const lang = inject('lang');
    const changeLanguage = inject('changeLanguage');

    const handleClickLang = () => {
      if (lang.value === 'zh-CN') {
        changeLanguage('en-US');
      } else {
        changeLanguage('zh-CN');
      }
    };

    return { theme, toggleTheme, lang, handleClickLang };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
