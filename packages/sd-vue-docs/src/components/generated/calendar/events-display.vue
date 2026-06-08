<template>
  <!-- ========== 基础事件与背景事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">基础事件与背景事件</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      事件由 <code>start</code> 和 <code>end</code> 定义，可附加
      <code>title</code>、<code>class</code>、<code>backgroundColor</code>、<code>color</code>
      等属性并配合 CSS 定制外观。设置
      <code>background: true</code> 可将事件降为背景层，不会与其他事件产生重叠推挤。
    </p>

    <div class="sd:mb-3">
      <sd-checkbox v-model="showBgEvents">显示背景事件（午餐时间）</sd-checkbox>
    </div>

    <sd-calendar
      :events="filteredBgEvents"
      :time-from="9 * 60"
      :time-to="15 * 60"
      :views="{ days: { cols: 5, rows: 1 } }"
      view="days"
      :views-bar="false"
      style="height: 320px"
    />
  </section>

  <!-- ========== 不计时事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">不计时事件 (Timeless Events)</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      当 <code>:time="false"</code> 时，日历事件不显示时间轴，事件无法调整大小，仅按天展示。
    </p>

    <sd-calendar
      :time="false"
      :events="timelessEvents"
      :views="{ days: { cols: 5, rows: 1 } }"
      view="days"
      :views-bar="false"
      style="height: 240px"
    />
  </section>

  <!-- ========== 全天事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">全天事件</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      设置 <code>allDay: true</code> 可将事件标记为全天事件。开启
      <code>all-day-events</code> 后，全天事件会显示在固定顶部栏中。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3">
      <sd-checkbox v-model="showAllDayBar">显示全天事件栏</sd-checkbox>
      <sd-checkbox v-model="allDayOn">事件标记为全天</sd-checkbox>
    </div>

    <sd-calendar
      :all-day-events="showAllDayBar"
      :events="allDayEvents"
      :time-from="7 * 60"
      :time-to="19 * 60"
      view="week"
      :views="{ day: {}, week: {}, month: {} }"
      style="height: 420px"
    />
  </section>

  <!-- ========== 月视图事件与计数 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">月视图事件与事件计数</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>events-on-month-view</code> 在月视图中显示完整事件；通过
      <code>event-count</code> 显示每格的事件计数。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3">
      <sd-checkbox v-model="showEventsOnMonth">月视图显示事件</sd-checkbox>
      <sd-checkbox v-model="showEventCount">显示事件计数</sd-checkbox>
    </div>

    <sd-calendar
      :events-on-month-view="showEventsOnMonth"
      :event-count="showEventCount"
      :events="richEvents"
      :views="{ days: { cols: 5, rows: 1 }, month: {} }"
      view="month"
      style="height: 500px"
    />
  </section>

  <!-- ========== 重叠事件堆叠 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">重叠事件堆叠</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      开启
      <code>stack-events</code>
      时，若多个事件在时间上重叠，它们将堆叠展示而非互相挤压，各事件自动获得
      <code>.sd-calendar__event--stack-N-M</code> 类名。
    </p>

    <div class="sd:mb-3">
      <sd-checkbox v-model="stackEvents">堆叠事件</sd-checkbox>
    </div>

    <sd-calendar
      :stack-events="stackEvents"
      :events="overlappingEvents"
      :time-from="9 * 60"
      :time-to="16 * 60"
      :views="{ days: { cols: 5, rows: 1 } }"
      view="days"
      :views-bar="false"
      editable-events
      style="height: 380px"
    />
  </section>

  <!-- ========== 多天事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">多天事件</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      事件的 <code>start</code> 和
      <code>end</code> 跨越不同日期时自动成为多天事件，可拖拽调整时长和水平调整天数。<code
        >editable-events="{ resizeX: true }"</code
      >
      开启水平调整。
    </p>

    <sd-calendar
      :events="multiDayEvents"
      :time-from="8 * 60"
      :time-to="23 * 60"
      :views="{ day: {}, days: { cols: 5, rows: 1 }, week: {}, month: {} }"
      view="week"
      :editable-events="{ resizeX: true }"
      hide-weekends
      style="height: 480px"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const today = new Date();

  // ---------- 背景事件 ----------
  const showBgEvents = ref(false);
  const allBgEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 10, 0),
      title: '医生预约',
      class: 'event-health',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
      title: '牙科检查',
      class: 'event-health',
      backgroundColor: '#57cea9cc',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0),
      title: '团队午餐',
      class: 'event-lunch',
      background: true,
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 13, 0),
      title: '萨尔萨舞蹈课',
      class: 'event-sport',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 14, 0),
      title: '午餐',
      background: true,
      class: 'event-lunch',
    },
  ];
  const filteredBgEvents = computed(() =>
    showBgEvents.value ? allBgEvents : allBgEvents.filter((e) => !e.background),
  );

  // ---------- 不计时事件 ----------
  const timelessEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      title: '舞蹈课',
      backgroundColor: '#ff6666d9',
      color: '#fff',
      class: 'event-sport',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      title: '高尔夫球',
      backgroundColor: '#fd9c42d9',
      color: '#fff',
      class: 'event-leisure',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      title: '购物',
      backgroundColor: '#57cea9cc',
      color: '#fff',
      class: 'event-health',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      title: '医生预约',
      backgroundColor: '#3b82f6cc',
      color: '#fff',
    },
  ];

  // ---------- 全天事件 ----------
  const showAllDayBar = ref(true);
  const allDayOn = ref(true);
  const allDayEvents = computed(() => [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        .toISOString()
        .slice(0, 10),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        .toISOString()
        .slice(0, 10),
      allDay: allDayOn.value,
      title: '休假! 🎉',
      class: 'event-yellow',
      backgroundColor: '#ffc85abf',
      color: '#222',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        .toISOString()
        .slice(0, 10),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
        .toISOString()
        .slice(0, 10),
      allDay: allDayOn.value,
      title: '纪念日 ❤️',
      class: 'event-pink',
      backgroundColor: '#ff3a8fb3',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 30),
      title: '牙科预约',
      backgroundColor: '#57cea9cc',
      color: '#fff',
      class: 'event-health',
    },
  ]);

  // ---------- 月视图事件 ----------
  const showEventsOnMonth = ref(true);
  const showEventCount = ref(false);
  const richEvents = Array.from({ length: 20 }, (_, i) => ({
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (i % 5),
      8 + (i % 6),
      0,
    ),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + (i % 5), 9 + (i % 6), 0),
    title: `事件 ${i + 1}`,
    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5],
    color: '#fff',
    class: ['event-meeting', 'event-leisure', 'event-health', 'event-sport', 'event-pink'][i % 5],
  }));

  // ---------- 重叠事件 ----------
  const stackEvents = ref(false);
  const overlappingEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      title: '大型评审会',
      class: 'event-health',
      backgroundColor: '#57cea9cc',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      title: '项目讨论',
      class: 'event-meeting',
      backgroundColor: '#64c8ffcc',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      title: '方案评审',
      class: 'event-sport',
      backgroundColor: '#ff6666d9',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 13, 0),
      title: '客户电话',
      class: 'event-meeting',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0),
      title: '设计评审',
      class: 'event-yellow',
      backgroundColor: '#ffc85abf',
      color: '#222',
    },
  ];

  // ---------- 多天事件 ----------
  const multiDayEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
      title: '马拉松比赛',
      class: 'event-sport',
      backgroundColor: 'rgba(255, 185, 185, 0.8)',
      color: '#c55656',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 25),
      title: '喝水！',
      class: 'event-health',
      backgroundColor: 'rgba(200, 248, 233, 0.8)',
      color: '#219671',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 8, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 21, 0),
      title: '印度之旅',
      class: 'event-leisure',
      backgroundColor: 'rgba(255, 202, 154, 0.8)',
      color: '#b57335',
    },
  ];
</script>

<style lang="css">
  .sd-calendar__event.event-health {
    background-color: #57cea9cc;
    border-color: #90d2be;
    color: #fff;
  }
  .sd-calendar__event.event-sport {
    background-color: #ff6666d9;
    border-color: #eb5252;
    color: #fff;
  }
  .sd-calendar__event.event-leisure {
    background-color: #fd9c42d9;
    border-color: #e9882e;
    color: #fff;
  }
  .sd-calendar__event.event-meeting {
    background-color: #64c8ffcc;
    border-color: #50b4eb;
    color: #fff;
  }
  .sd-calendar__event.event-pink {
    background-color: #ff3a8fb3;
    border-color: #eb267b;
    color: #fff;
  }
  .sd-calendar__event.event-yellow {
    background-color: #ffc85abf;
    border-color: #ffc356;
  }
  .sd-calendar__event.event-lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.04) 10px,
      rgba(0, 0, 0, 0.04) 20px
    );
    border: none;
    color: #666;
  }
</style>
