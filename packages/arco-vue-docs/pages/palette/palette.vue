<template>
  <arco-article v-bind="data.article">
    <h2>{{ data.intro.h2 }}</h2>
    <p>{{ data.intro.p1 }}</p>
    <p>{{ data.intro.p2 }}</p>
    <a-space size="large" :style="{ marginTop: '10px' }">
      <a-radio-group
        :model-value="theme"
        type="button"
        @change="handleThemeChange"
      >
        <a-radio value="light">
          <icon-sun-fill />
          {{ data.light }}
        </a-radio>
        <a-radio value="dark">
          <icon-moon-fill />
          {{ data.dark }}
        </a-radio>
      </a-radio-group>
      <a-radio-group
        :model-value="format.toUpperCase()"
        type="button"
        :options="['HEX', 'RGB', 'HSL']"
        @change="handleFormatChange"
      />
    </a-space>
    <a-layout-content
      :style="{
        marginTop: '20px',
        padding: '0 10px',
        borderRadius: '6px',
        background: theme === 'light' ? '#fff' : '#2a2a2b',
      }"
    >
      <a-row :gutter="20">
        <template v-for="item in colors" :key="item.key">
          <a-col
            :sm="{ span: 24 }"
            :md="{ span: 12 }"
            :lg="{ span: 12 }"
            :xl="{ span: 8 }"
            :xxl="{ span: 6 }"
          >
            <PaletteCard
              :theme="theme"
              :format="format"
              :colors="
                generate(item.value, { list: true, dark: theme === 'dark' })
              "
              :name="item.key"
              :title="data[item.titleKey]"
            />
          </a-col>
        </template>
        <a-col
          :sm="{ span: 24 }"
          :md="{ span: 12 }"
          :lg="{ span: 12 }"
          :xl="{ span: 8 }"
          :xxl="{ span: 6 }"
        >
          <PaletteCard
            :theme="theme"
            :format="format"
            :colors="grayColorList"
            name="gray"
            :title="data['gray']"
          />
        </a-col>
      </a-row>
    </a-layout-content>
  </arco-article>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IconSunFill, IconMoonFill } from '@web-vue/components/icon';
import { generate, getPresetColors } from '@arco-design/color';
import { useTheme } from '../../hooks/useTheme';
import PaletteCard from '../../components/palette-card/index.vue';

const localeData: Record<string, any> = {
  'zh-CN': {
    'article': {
      title: '设计变量',
      description:
        '组件库的全局 Token，可以在此查看组件库内置的设计变量以及默认值',
      meta: {
        type: '开发指南',
      },
    },
    'intro': {
      h2: '简介',
      p1: '组件库内置了一套基于动态梯度的色彩算法，并且在亮色的色彩算法基础上，经过反转和微调，得到了一套暗黑模式下的色彩算法。',
      p2: '色板中包含了 13 个常见的颜色，每个颜色分为 10 个梯度。通常，我们把 6 号色作为色板中的主色。',
    },
    'light': '亮色模式',
    'dark': '暗黑模式',
    'red': 'Red / 浪漫红',
    'orange-red': 'Orange Red / 晚秋红',
    'orange': 'Orange / 活力橙',
    'gold': 'Gold / 黄昏',
    'yellow': 'Yellow / 柠檬黄',
    'lime': 'Lime / 新生绿',
    'green': 'Green / 仙野绿',
    'cyan': 'Cyan / 碧涛青',
    'blue': 'Blue / 海蔚蓝',
    'arco-blue': 'Arco Blue / 极致蓝',
    'purple': 'Purple / 暗夜紫',
    'pink-purple': 'Pink Purple / 青春紫',
    'magenta': 'Magenta / 品红',
    'gray': 'Gray / 中性灰',
  },
  'en-US': {
    'article': {
      title: 'Palette',
      description:
        'A set of color algorithms conforming to human vision is built in the component library.',
      meta: {
        type: 'Guide',
      },
    },
    'intro': {
      h2: 'Introduction',
      p1: 'The component library has a built-in color algorithm based on dynamic gradient, and based on the bright color algorithm, after inversion and fine-tuning, a set of color algorithm in dark mode is obtained.',
      p2: 'The color palette contains 13 common colors, and each color is divided into 10 gradients. Usually, we take color-6 as the main color in the color palette.',
    },
    'light': 'Light',
    'dark': 'Dark',
    'red': 'Red',
    'orange-red': 'Orange Red',
    'orange': 'Orange',
    'gold': 'Gold',
    'yellow': 'Yellow',
    'lime': 'Lime',
    'green': 'Green',
    'cyan': 'Cyan',
    'blue': 'Blue',
    'arco-blue': 'Arco Blue',
    'purple': 'Purple',
    'pink-purple': 'Pink Purple',
    'magenta': 'Magenta',
    'gray': 'Gray',
  },
};

const COLORS: Record<string, string> = {
  'red': '#f53f3f',
  'orange-red': '#F77234',
  'orange': '#ff7d00',
  'gold': '#F7BA1E',
  'yellow': '#FADC19',
  'lime': '#9FDB1D',
  'green': '#00b42a',
  'cyan': '#14C9C9',
  'blue': '#3491FA',
  'arco-blue': '#165dff',
  'purple': '#722ed1',
  'pink-purple': '#D91AD9',
  'magenta': '#F5319D',
};

const presetColors = getPresetColors();

export default defineComponent({
  name: 'Token',
  components: { PaletteCard, IconSunFill, IconMoonFill },
  setup() {
    const { theme, handleThemeChange } = useTheme();
    const format = ref('hex');

    const { locale } = useI18n();

    const data = computed(() => localeData[locale.value]);
    const colors = computed(() =>
      Object.keys(COLORS).map((item) => ({
        key: item.replace('-', ''),
        value: COLORS[item],
        titleKey: item,
      }))
    );
    const grayColorList = computed(() =>
      theme.value === 'light' ? presetColors.gray.light : presetColors.gray.dark
    );

    const handleFormatChange = (value: string) => {
      format.value = value.toLowerCase();
    };

    return {
      data,
      locale,
      theme,
      format,
      colors,
      generate,
      handleThemeChange,
      handleFormatChange,
      grayColorList,
    };
  },
});
</script>
