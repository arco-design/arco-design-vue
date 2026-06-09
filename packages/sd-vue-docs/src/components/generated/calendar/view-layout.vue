<template>
  <!-- ========== 布局尺寸 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">布局尺寸</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      日历支持多种布局尺寸：<code>normal</code>（默认）、<code>sm</code>（紧凑）、<code>xs</code>（超小）、<code>date-picker</code>（日期选择器模式，等同于
      xs + month/year/years 视图 + clickToNavigate）。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-2 sd:mb-3">
      <sd-radio-group type="button" v-model="currentSize">
        <sd-radio v-for="size in sizes" :key="size.value" :value="size.value">{{
          size.label
        }}</sd-radio>
      </sd-radio-group>
    </div>

    <sd-calendar v-bind="sizeProps" :view-date="new Date()" style="height: 420px" />
  </section>

  <!-- ========== 多视图切换 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">多视图切换</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>views</code> 属性控制可用的视图集合，<code>view</code> 设置当前默认视图。支持
      <code>day</code
      >、<code>days</code>、<code>week</code>、<code>month</code>、<code>year</code>、<code>years</code>。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-2 sd:mb-3">
      <span class="sd:text-sm sd:text-gray-500 sd:self-center">选择视图:</span>
      <sd-checkbox v-for="v in allViews" :key="v" :value="v" v-model="enabledViews">
        {{ viewLabels[v] }}
      </sd-checkbox>
    </div>

    <sd-calendar
      view="month"
      :views="enabledViews"
      :view-date="new Date()"
      :events="demoEvents"
      :time-from="8 * 60"
      :time-to="18 * 60"
      style="height: 420px"
    />
  </section>

  <!-- ========== 显隐元素 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">显示/隐藏界面元素</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      日历提供了丰富的界面元素控制开关，可按需隐藏或显示。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3">
      <sd-checkbox v-model="showTodayButton">今天按钮</sd-checkbox>
      <sd-checkbox v-model="showViewsBar">视图栏</sd-checkbox>
      <sd-checkbox v-model="showTitleBar">标题栏</sd-checkbox>
      <sd-checkbox v-model="showTime">时间轴</sd-checkbox>
      <sd-checkbox v-model="hideWeekends">隐藏周末</sd-checkbox>
      <sd-checkbox v-model="showWeekNumbers">显示周数</sd-checkbox>
    </div>

    <sd-calendar
      :today-button="showTodayButton"
      :views-bar="showViewsBar"
      :title-bar="showTitleBar"
      :time="showTime"
      :hide-weekends="hideWeekends"
      :week-numbers="showWeekNumbers"
      :events="demoEvents"
      :time-from="8 * 60"
      :time-to="18 * 60"
      style="height: 420px"
    />
  </section>

  <!-- ========== 水平布局 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">水平时间轴布局</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>horizontal</code> 属性将时间轴改为水平流向，适合甘特图式布局，支持
      <code>day</code>、<code>days</code>、<code>week</code> 视图。
    </p>

    <div class="sd:mb-3">
      <sd-checkbox v-model="isHorizontal">启用水平布局</sd-checkbox>
    </div>

    <sd-calendar
      :horizontal="isHorizontal"
      :events="horizontalEvents"
      :view-date="new Date()"
      style="height: 420px"
    />
  </section>

  <!-- ========== 国际化 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">国际化 (i18n)</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>locale</code> 属性切换语言，支持
      <code>zh-cn</code>、<code>en</code>、<code>ja</code>、<code>ko</code>、<code>fr</code>
      等多种语言。
    </p>

    <div class="sd:flex sd:items-center sd:gap-2 sd:mb-3">
      <span class="sd:text-sm sd:text-gray-500">选择语言:</span>
      <sd-select v-model="currentLocale" size="small" class="sd:w-40" :options="locales" />
    </div>

    <sd-calendar
      :locale="currentLocale"
      :events="demoEvents"
      :time-from="8 * 60"
      :time-to="18 * 60"
      :view-date="new Date()"
      style="height: 420px"
    />
  </section>

  <!-- ========== 暗色模式 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">暗色模式</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>ThemeProvider</code> 的 <code>theme-mode</code> 属性切换到暗色主题。
    </p>

    <div class="sd:flex sd:items-center sd:gap-2 sd:mb-3">
      <span class="sd:text-sm sd:text-gray-500">主题模式:</span>
      <sd-radio-group type="button" v-model="themeMode" :options="themeModeOptions" />
    </div>

    <sd-theme-provider :theme-mode="themeMode">
      <div :class="{ 'sd:bg-gray-900': themeMode === 'dark' }">
        <sd-calendar
          :events="demoEvents"
          :time-from="8 * 60"
          :time-to="18 * 60"
          :view-date="new Date()"
          style="height: 420px"
        />
      </div>
    </sd-theme-provider>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  // ---------- 布局尺寸 ----------
  const currentSize = ref('normal');
  const sizes = [
    { label: 'Normal (默认)', value: 'normal' },
    { label: 'sm (紧凑)', value: 'sm' },
    { label: 'xs (超小)', value: 'xs' },
    { label: 'date-picker', value: 'datePicker' },
  ];

  const sizeProps = computed(() => {
    if (currentSize.value === 'normal') return {};
    return { [currentSize.value]: true };
  });

  // ---------- 多视图 ----------
  const allViews = ['day', 'days', 'week', 'month', 'year', 'years'];
  const viewLabels: Record<string, string> = {
    day: '日',
    days: '多日',
    week: '周',
    month: '月',
    year: '年',
    years: '多年',
  };
  const enabledViews = ref(['day', 'week', 'month', 'year']);

  // ---------- 显隐元素 ----------
  const showTodayButton = ref(true);
  const showViewsBar = ref(true);
  const showTitleBar = ref(true);
  const showTime = ref(true);
  const hideWeekends = ref(false);
  const showWeekNumbers = ref(false);

  // ---------- 水平布局 ----------
  const isHorizontal = ref(false);

  // ---------- 国际化 ----------
  const currentLocale = ref('zh-cn');
  const locales = [
    { label: '中文 (zh-cn)', value: 'zh-cn' },
    { label: 'English (en)', value: 'en' },
    { label: '日本語 (ja)', value: 'ja' },
    { label: '한국어 (ko)', value: 'ko' },
    { label: 'Français (fr)', value: 'fr' },
  ];

  // ---------- 暗色模式 ----------
  const themeMode = ref<'light' | 'dark'>('dark');
  const themeModeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  // ---------- 共享数据 ----------
  const today = new Date();
  const demoEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 11, 0),
      title: '产品需求评审',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
      title: '技术方案讨论',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      title: '跨团队对齐会',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
  ];

  const horizontalEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
      title: '团队例会',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
      title: '项目回顾',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
      title: '客户电话',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
  ];
</script>
