<template>
  <arco-article v-bind="data">
    <div class="theme-button">
      <a-radio-group
        :model-value="theme"
        type="button"
        @change="handleThemeChange"
      >
        <a-radio value="light">
          <icon-sun-fill />
          Light
        </a-radio>
        <a-radio value="dark">
          <icon-moon-fill />
          Dark
        </a-radio>
      </a-radio-group>
    </div>
    <template v-for="(group, index) of tokens" :key="index">
      <h2>{{ locale === 'en-US' ? group.nameEN : group.name }}</h2>
      <TokenTable
        :data="group.tokens"
        :type="group.type"
        :dark="theme === 'dark'"
        :local="locale"
        style="margin-bottom: 60px"
      />
    </template>
  </arco-article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IconSunFill, IconMoonFill } from '@web-vue/components/icon';
import TokenTable from '../../components/token-table/token-table.vue';
import { tokens } from './tokens';
import { useTheme } from '../../hooks/useTheme';

export default defineComponent({
  name: 'Token',
  components: { TokenTable, IconSunFill, IconMoonFill },
  setup() {
    const { theme, handleThemeChange } = useTheme();

    const { t, locale } = useI18n();

    const data = computed(() => {
      if (locale.value === 'zh-CN') {
        return {
          title: '设计变量',
          description:
            '组件库的全局 Token，可以在此查看组件库内置的设计变量以及默认值',
          meta: {
            type: '组件',
            category: '通用',
          },
        };
      }
      return {
        title: 'Design Token',
        description:
          'The global Token of the component library, you can view the built-in design variables and default values of the component library here',
        meta: {
          type: 'Component',
          category: 'Common',
        },
      };
    });

    return {
      data,
      tokens,
      locale,
      theme,
      handleThemeChange,
    };
  },
});
</script>

<style>
.theme-button {
  display: flex;
  margin: 20px 0;
  justify-content: flex-end;
}
</style>
