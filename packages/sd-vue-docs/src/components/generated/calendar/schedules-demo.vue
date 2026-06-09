<template>
  <!-- ========== 常用插槽 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">常用插槽概览</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      日历提供了丰富的插槽系统，可深入定制各个部分的渲染。以下展示了最常用的插槽效果：
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-2 sd:mb-3">
      <sd-checkbox v-model="useCustomTitle">自定义标题</sd-checkbox>
      <sd-checkbox v-model="useCustomButtons">自定义按钮</sd-checkbox>
      <sd-checkbox v-model="useCustomWeekdayHeadings">自定义星期标题</sd-checkbox>
      <sd-checkbox v-model="useCustomTodayBtn">自定义今天按钮</sd-checkbox>
      <sd-checkbox v-model="useCustomHeader">自定义完整头部</sd-checkbox>
    </div>

    <sd-calendar
      v-model:view="currentView"
      :time-from="9 * 60"
      :time-to="15 * 60"
      :events="demoEvents"
      style="height: 400px"
    >
      <!-- 自定义标题 -->
      <template v-if="useCustomTitle" #title="{ title }">
        <code style="color: #f59e0b">{{ title }}</code>
      </template>
      <!-- 自定义导航按钮 -->
      <template v-if="useCustomButtons" #previous-button>
        <span style="color: #3b82f6; font-size: 18px; cursor: pointer; user-select: none">⬅</span>
      </template>
      <template v-if="useCustomButtons" #next-button>
        <span style="color: #3b82f6; font-size: 18px; cursor: pointer; user-select: none">➡</span>
      </template>
      <!-- 自定义星期标题 -->
      <template v-if="useCustomWeekdayHeadings" #weekday-heading="{ label }">
        <strong style="color: #f59e0b">{{ label }}</strong>
      </template>
      <!-- 自定义今天按钮 -->
      <template v-if="useCustomTodayBtn" #today-button="{ navigate, active }">
        <sd-button :disabled="active" @click="navigate" size="small" type="outline">
          📅 今天
        </sd-button>
      </template>
      <!-- 自定义完整头部 -->
      <template v-if="useCustomHeader" #header="{ view, availableViews }">
        <div
          style="
            display: flex;
            gap: 8px;
            align-items: center;
            padding: 4px 8px;
            background: #ffedd5;
          "
        >
          <sd-button size="small" @click="view.previous">◀</sd-button>
          <span style="color: #c2410c; font-weight: bold">{{ view.title }}</span>
          <sd-button size="small" @click="view.next">▶</sd-button>
          <div style="display: flex; gap: 4px; margin-left: auto">
            <sd-button
              v-for="(grid, viewId) in availableViews"
              :key="viewId"
              size="small"
              :type="view.id === viewId ? 'primary' : 'outline'"
              @click="currentView = String(viewId)"
            >
              {{ viewId }}
            </sd-button>
          </div>
        </div>
      </template>
    </sd-calendar>
  </section>

  <!-- ========== 按视图自定义标题 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">按视图自定义标题</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      使用具名插槽 <code>#title.week</code>、<code>#title.month</code>
      等按不同视图分别定义标题格式。
    </p>

    <div class="sd:mb-3 sd:flex sd:items-center sd:gap-2">
      <sd-select v-model="titleView" size="small" class="sd:w-32" :options="titleViewOptions" />
      <span class="sd:text-sm sd:text-gray-500">— 根据此视图自定义标题</span>
    </div>

    <sd-calendar :view="titleView" style="height: 380px">
      <template v-for="v in viewOptions" :key="v" #[`title.${v}`]="view">
        {{ v === titleView ? `📌 ${view.title} ❤️` : '' }}
      </template>
    </sd-calendar>
  </section>

  <!-- ========== 自定义事件渲染 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">自定义事件渲染</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>#event</code> 插槽完全接管事件卡片的渲染，插槽参数
      <code>{ event }</code> 包含事件所有数据，
      <code>event._</code> 提供格式化后的时间等元信息。另有 <code>#event.day</code>、<code
        >#event.month</code
      >
      等按视图的变体。
    </p>

    <sd-calendar
      :events="customRenderEvents"
      :time-from="9 * 60"
      :time-to="18 * 60"
      view="week"
      :views-bar="false"
      style="height: 420px"
    >
      <template #event="{ event }">
        <div
          :style="{
            padding: '4px 8px',
            fontSize: '12px',
            lineHeight: '1.4',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: '4px solid ' + (event.backgroundColor || '#3b82f6'),
            background: (event.backgroundColor || '#3b82f6') + '22',
          }"
        >
          <div style="margin-bottom: 2px; font-weight: 600">{{ event.title }}</div>
          <div style="font-size: 11px; opacity: 0.7">
            {{ event._.startTimeFormatted24 }} — {{ event._.endTimeFormatted24 }}
          </div>
          <div v-if="event.location" style="font-size: 11px; opacity: 0.6">
            📍 {{ event.location }}
          </div>
        </div>
      </template>
    </sd-calendar>
  </section>

  <!-- ========== 自定义排班标题 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">自定义排班标题</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>#schedule-heading</code> 插槽自定义排班列的标题，插槽参数
      <code>{ schedule }</code> 包含排班定义信息。
    </p>

    <sd-calendar
      :views="['day', 'week']"
      view="day"
      :schedules="scheduleList"
      :events="scheduleEvents"
      :hide-weekdays="['sat', 'sun']"
      style="height: 420px"
    >
      <template #schedule-heading="{ schedule }">
        <div style="display: flex; gap: 4px; align-items: center">
          <span
            :style="{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: schedule.color || '#999',
            }"
          ></span>
          <strong :style="{ color: schedule.color }">{{ schedule.label }}</strong>
        </div>
      </template>
    </sd-calendar>
  </section>

  <!-- ========== 自定义单元格 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">自定义单元格内容</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>#cell-content</code> 插槽自定义单元格内容和交互，插槽参数：<code
        >{ cell, view, events, goNarrower }</code
      >。
    </p>

    <sd-calendar
      :time="false"
      :dblclick-to-navigate="false"
      view="month"
      :events="richEvents"
      style="height: 480px"
    >
      <template #cell-date="{ cell, view }">
        <span
          v-if="view.id === 'day' || view.id === 'week' || view.id === 'month'"
          @click="cell.goNarrower"
          :style="{
            cursor: 'pointer',
            fontWeight: cell.today ? '700' : '400',
            color: cell.today ? '#3b82f6' : 'inherit',
          }"
        >
          {{ cell.content }}
        </span>
      </template>
    </sd-calendar>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const today = new Date();
  const currentView = ref('week');

  // 插槽开关
  const useCustomTitle = ref(false);
  const useCustomButtons = ref(false);
  const useCustomWeekdayHeadings = ref(false);
  const useCustomTodayBtn = ref(false);
  const useCustomHeader = ref(false);

  // 按视图标题
  const titleView = ref('day');
  const viewOptions = ['day', 'days', 'week', 'month', 'year', 'years'];
  const viewLabels: Record<string, string> = {
    day: '日',
    days: '多日',
    week: '周',
    month: '月',
    year: '年',
    years: '多年',
  };
  const titleViewOptions = viewOptions.map((v) => ({ value: v, label: viewLabels[v] }));

  // 共享事件
  const demoEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 0),
      title: '高尔夫球',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
      title: '购物',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 0),
      title: '团队建设',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
  ];

  // 自定义事件渲染
  const customRenderEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 0),
      title: '产品规划会议',
      backgroundColor: '#3b82f6',
      color: '#fff',
      location: '3F-会议室A',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 0),
      title: '设计走查',
      backgroundColor: '#10b981',
      color: '#fff',
      location: '线上',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
      title: '开发同步会',
      backgroundColor: '#f59e0b',
      color: '#fff',
      location: '5F-开放区',
    },
  ];

  // 排班自定义标题
  const scheduleList = [
    { label: '张三', color: '#3b82f6', class: 'schedule1' },
    { label: '李四', color: '#10b981', class: 'schedule2' },
    { label: '王五', color: '#f59e0b', class: 'schedule3' },
    { label: '赵六', color: '#ef4444', class: 'schedule4' },
  ];
  const scheduleEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      title: '早会',
      backgroundColor: '#3b82f6',
      color: '#fff',
      schedule: 0,
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
      title: '设计讨论',
      backgroundColor: '#10b981',
      color: '#fff',
      schedule: 1,
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      title: '客户评审',
      backgroundColor: '#f59e0b',
      color: '#fff',
      schedule: 2,
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 15, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 16, 0),
      title: '代码评审',
      backgroundColor: '#ef4444',
      color: '#fff',
      schedule: 3,
    },
  ];

  // 自定义单元格
  const richEvents = Array.from({ length: 15 }, (_, i) => ({
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (i % 7),
      9 + (i % 6),
      0,
    ),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (i % 7),
      10 + (i % 6),
      0,
    ),
    title: `日程 ${i + 1}`,
    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5],
    color: '#fff',
  }));
</script>

<style lang="css">
  /* 自定义排班列配色 */
  .sd-calendar__schedule.schedule1 {
    background-color: rgb(59 130 246 / 12%);
  }

  .sd-calendar__schedule.schedule2 {
    background-color: rgb(16 185 129 / 12%);
  }

  .sd-calendar__schedule.schedule3 {
    background-color: rgb(245 158 11 / 12%);
  }

  .sd-calendar__schedule.schedule4 {
    background-color: rgb(239 68 68 / 12%);
  }

  .sd-calendar__schedule--heading {
    font-weight: 600;
    font-size: 13px;
  }
</style>
