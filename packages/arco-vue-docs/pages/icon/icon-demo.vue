<template>
  <arco-article v-bind="data">
    <div class="arco-vue-icon-header">
      <a-form layout="inline" :model="form">
        <a-form-item field="strokeWidth" :label="t('icon.strokeWidth')">
          <a-slider
            v-model="form.strokeWidth"
            :min="1"
            :max="5"
            :style="{ width: '100px' }"
          />
        </a-form-item>
        <a-form-item field="size" :label="t('icon.fontSize')">
          <a-input-number v-model="form.size" />
        </a-form-item>
        <a-form-item field="strokeLinejoin" :label="t('icon.strokeLinejoin')">
          <a-select
            v-model="form.strokeLinejoin"
            :options="strokeLinejoin"
            :style="{ width: '120px' }"
          />
        </a-form-item>
        <a-form-item field="strokeLinecap" :label="t('icon.strokeLinecap')">
          <a-select
            v-model="form.strokeLinecap"
            :options="strokeLinecap"
            :style="{ width: '120px' }"
          />
        </a-form-item>
      </a-form>
    </div>
    <section
      v-for="data of icons"
      :key="data.type"
      class="arco-vue-icon-section"
    >
      <h3 class="arco-vue-icon-section-title">{{ t(`icon.${data.type}`) }}</h3>
      <ul class="icon-list">
        <li
          v-for="item in data.list"
          :key="item.name"
          class="icon-item"
          @click="() => handleIconClick(item.name)"
        >
          <div class="icon-item-name">{{ item.name }}</div>
          <div class="icon-item-component">
            <component :is="item.componentName" v-bind="form" />
          </div>
        </li>
      </ul>
    </section>
    <basic-demo />
    <tree-shaking-demo />
    <spin-demo />
    <icon-font />
  </arco-article>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import * as components from '@web-vue/components/icon';
import icons from '@web-vue/icon/icons.json';
import { clipboard } from '@web-vue/components/_utils/clipboard';
import Message from '@web-vue/components/message';
import BasicDemo from './__demo__/basic.md';
import SpinDemo from './__demo__/spin.md';
import IconFont from './__demo__/icon-font.md';
import TreeShakingDemo from './__demo__/tree-shaking.md';

export default defineComponent({
  name: 'IconMain',
  components: {
    ...components,
    BasicDemo,
    SpinDemo,
    IconFont,
    TreeShakingDemo,
  },
  setup() {
    const { t, locale } = useI18n();

    const form = reactive({
      strokeWidth: 4,
      size: 32,
      strokeLinejoin: 'miter',
      strokeLinecap: 'butt',
    });

    const strokeLinejoin = ['arcs', 'bevel', 'miter', 'miter-clip', 'round'];
    const strokeLinecap = ['butt', 'round', 'square'];

    const typeFilter = ref('all');
    const nameFilter = ref('');

    const data = computed(() => {
      if (locale.value === 'zh-CN') {
        return {
          title: '图标 Icon',
          description: '这里有 Arco Design 内置的大量图标。',
          meta: {
            type: '组件',
            category: '通用',
          },
        };
      }
      return {
        title: 'Icon',
        description: 'There are a lot of icons built into Arco Design.',
        meta: {
          type: 'Component',
          category: 'Common',
        },
      };
    });

    const getMessage = (zh, en) => {
      return locale.value === 'zh-CN' ? zh : en;
    };

    const handleIconClick = (iconName: string) => {
      const componentName = `<${iconName} />`;

      clipboard(componentName);
      Message.success(
        `${
          locale.value === 'zh-CN' ? '复制成功：' : 'Copy Success: '
        }${componentName}`
      );
    };

    return {
      icons,
      t,
      locale,
      data,
      form,
      typeFilter,
      strokeLinejoin,
      strokeLinecap,
      getMessage,
      handleIconClick,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
