<template>
  <arco-article v-bind="data">
    <div class="arco-vue-icon-header">
      <div class="icon-list-bar">
        <a-radio-group v-model="form.style" type="button" size="large">
          <a-radio value="all">{{ t('icon.styleAll') }}</a-radio>
          <a-radio value="outline">{{ t('icon.styleOutline') }}</a-radio>
          <a-radio value="fill">{{ t('icon.styleFill') }}</a-radio>
          <a-radio value="color">{{ t('icon.styleColor') }}</a-radio>
        </a-radio-group>
        <a-input-search
          v-model="form.filter"
          size="large"
          allow-clear
          :placeholder="t('icon.searchPlaceholder')"
        />
      </div>
      <a-affix :offset-top="60">
        <div class="icon-list-operations">
          <a-form layout="inline" :model="form">
            <a-form-item
              field="strokeWidth"
              :label="t('icon.strokeWidth')"
              show-colon
            >
              <a-slider
                v-model="form.strokeWidth"
                show-ticks
                :min="1"
                :max="5"
                :style="{ width: '90px' }"
              />
            </a-form-item>
            <a-form-item field="size" :label="t('icon.fontSize')" show-colon>
              <a-input-number v-model="form.size" :style="{ width: '80px' }" />
            </a-form-item>
            <a-form-item
              field="strokeLinejoin"
              :label="t('icon.strokeLinejoin')"
              show-colon
            >
              <a-select
                v-model="form.strokeLinejoin"
                :options="strokeLinejoin"
                :style="{ width: '116px' }"
              />
            </a-form-item>
            <a-form-item
              field="strokeLinecap"
              :label="t('icon.strokeLinecap')"
              show-colon
            >
              <a-select
                v-model="form.strokeLinecap"
                :options="strokeLinecap"
                :style="{ width: '100px' }"
              />
            </a-form-item>
          </a-form>
          <a-button type="primary" @click="handleOpenConfig">
            {{ t('icon.showConfig') }}
          </a-button>
        </div>
      </a-affix>
    </div>
    <section
      v-for="data of filteredData"
      :key="data.type"
      class="arco-vue-icon-section"
    >
      <template v-if="data.list.length">
        <h3 class="arco-vue-icon-section-title">
          {{ t(`icon.${data.type}`) }}
        </h3>
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
      </template>
    </section>
    <basic-demo />
    <tree-shaking-demo />
    <spin-demo />
    <icon-font />
  </arco-article>
  <a-modal v-model:visible="configVisible" simple hide-cancel>
    <template #title> {{ t('icon.configTitle') }}</template>
    <div>
      <a-typography-paragraph>
        {{ t('icon.configDesc1') }}
      </a-typography-paragraph>
      <a-typography-paragraph code>
        {{ getConfigCode() }}
      </a-typography-paragraph>
      <a-typography-paragraph v-html="t('icon.configDesc2')" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as components from '@web-vue/components/icon';
import { clipboard } from '@web-vue/components/_utils/clipboard';
import Message from '@web-vue/components/message';
import icons from './icons.json';
import { strEndsWith, strIncludes } from '../../utils/strings';
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
      style: 'all',
      filter: '',
      strokeWidth: 4,
      size: 32,
      strokeLinejoin: 'miter',
      strokeLinecap: 'butt',
    });
    const configVisible = ref(false);

    const strokeLinejoin = ['arcs', 'bevel', 'miter', 'miter-clip', 'round'];
    const strokeLinecap = ['butt', 'round', 'square'];

    const getConfigCode = () => {
      return `.arco-icon {
  font-size: ${form.size};
  ${
    form.strokeLinecap !== 'butt'
      ? `stroke-linecap: ${form.strokeLinecap};`
      : ''
  }
  ${
    form.strokeLinejoin !== 'miter'
      ? `stroke-linejoin: ${form.strokeLinejoin};`
      : ''
  }
  ${form.strokeWidth !== 4 ? `stroke-width: ${form.strokeWidth};` : ''}
}`;
    };

    const iconStyleCheck = (name: string) => {
      if (form.style === 'all') return true;
      return form.style === 'outline'
        ? !strEndsWith(name, 'fill') && !strEndsWith(name, 'color')
        : strEndsWith(name, form.style);
    };

    const filteredData = computed(() => {
      return icons.map((section) => ({
        ...section,
        list: section.list.filter((svgData) => {
          return (
            iconStyleCheck(svgData.name) &&
            strIncludes(
              svgData.componentName.toLowerCase(),
              form.filter.toLowerCase()
            )
          );
        }),
      }));
    });

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

    const getMessage = (zh: string, en: string) => {
      return locale.value === 'zh-CN' ? zh : en;
    };

    const handleOpenConfig = () => {
      configVisible.value = true;
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
      t,
      locale,
      data,
      form,
      filteredData,
      strokeLinejoin,
      strokeLinecap,
      configVisible,
      handleOpenConfig,
      getConfigCode,
      getMessage,
      handleIconClick,
    };
  },
});
</script>

<style scoped lang="less" src="./style.less" />
