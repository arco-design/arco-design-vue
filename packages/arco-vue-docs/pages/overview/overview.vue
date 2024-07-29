<template>
  <arco-article v-bind="data">
    <div class="overview-wrapper">
      <template v-for="group in meta" :key="group.name">
        <a-typography-title :heading="5">
          {{ t(`group.${group.name}`) }}
        </a-typography-title>
        <a-row :gutter="36">
          <a-col v-for="item in group.list" :key="item" :md="12" :lg="6">
            <OverviewCard
              tabindex="0"
              :logo="getImageUrl(item)"
              :name="t(`component.${item}`)"
              @click="handleVisit(item)"
              @keyup.enter="handleVisit(item)"
            />
          </a-col>
        </a-row>
      </template>
    </div>
  </arco-article>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toPascalCase, underscored } from '../../utils/case';
import { useTheme } from '../../hooks/useTheme';
import OverviewCard from '../../components/overview-card/index.vue';
import meta from './meta';

export default defineComponent({
  name: 'Overview',
  components: {
    OverviewCard,
  },
  setup() {
    const router = useRouter();
    const { t, locale } = useI18n();
    const { theme } = useTheme();

    const data = computed(() => {
      if (locale.value === 'zh-CN') {
        return {
          title: '组件索引',
          description:
            'ArcoDesign 提供了丰富的组件，在这里你可以非常直观的找到它们。',
          meta: {
            type: '组件',
            category: '通用',
          },
        };
      }
      return {
        title: 'Overview',
        description:
          'ArcoDesign provides a wealth of components, where you can find them very intuitively.',
        meta: {
          type: 'Component',
          category: 'Common',
        },
      };
    });

    const getImageUrl = (name: string) => {
      return new URL(
        `../../assets/overview/${toPascalCase(name)}${
          theme.value === 'dark' ? '-dark' : ''
        }.svg`,
        import.meta.url
      ).href;
    };

    const handleVisit = (name: string) => {
      router.push(
        `/vue/${
          locale.value === 'en-US' ? 'en-US/' : ''
        }component/${underscored(name)}`
      );
    };

    return {
      data,
      meta,
      t,
      getImageUrl,
      handleVisit,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
