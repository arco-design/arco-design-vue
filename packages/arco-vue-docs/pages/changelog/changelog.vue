<template>
  <arco-article v-bind="data">
    <a-timeline class="arco-changelog">
      <a-timeline-item v-for="item of changelog" :key="item.version">
        <div class="changelog-item">
          <div class="changelog-info">
            <h2 class="changelog-info-version">{{ item.version }}</h2>
            <div class="changelog-info-date">{{ item.date }}</div>
          </div>
          <div class="changelog-content">
            <ul v-if="item.extra && item.extra.length">
              <li
                v-for="(text, index) of item.extra"
                :key="index"
                v-html="text"
              />
            </ul>
            <section v-for="content of item.list" :key="content.type">
              <h3 class="changelog-content-type">{{ content.typeText }}</h3>
              <ul class="changelog-content-list">
                <li
                  v-for="(text, index) of content.list"
                  :key="index"
                  v-html="text"
                />
              </ul>
            </section>
          </div>
        </div>
      </a-timeline-item>
    </a-timeline>
  </arco-article>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import changelogCN from '@web-vue/CHANGELOG.zh-CN.md';
import changelogEN from '@web-vue/CHANGELOG.md';

export default defineComponent({
  name: 'Changelog',
  setup() {
    const { locale } = useI18n();

    const data = computed(() => {
      if (locale.value === 'zh-CN') {
        return {
          title: '更新日志',
          description: '这里会有详细的发版记录，版本号严格遵循 Semver 规范。',
          meta: {
            type: '开发指南',
          },
        };
      }
      return {
        title: 'Changelog',
        description: 'Changelogs',
        meta: {
          type: 'Guide',
        },
      };
    });

    const changelog = computed(() =>
      locale.value === 'zh-CN' ? changelogCN : changelogEN
    );

    return {
      data,
      changelog,
    };
  },
});
</script>

<style scoped lang="less">
.arco-changelog {
  margin-top: 20px;
}

.changelog {
  &-item {
    display: flex;
    margin-bottom: 40px;
  }

  &-info {
    flex-grow: 0;
    flex-shrink: 0;
    width: 200px;

    &-version {
      margin: 0;
    }

    &-date {
      font-size: 12px;
      color: var(--color-text-3);
    }
  }

  &-content {
    &-type {
      margin: 0 !important;
    }

    &-list {
      list-style: circle;
    }
  }
}
</style>
