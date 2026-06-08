<template>
  <!-- ========== 时间轴范围与步长 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">时间轴范围与步长</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>time-from</code>、<code>time-to</code>、<code>time-step</code>
      控制时间轴显示范围与刻度间隔（单位均为分钟）。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-4 sd:mb-3 sd:items-end">
      <div class="sd:flex-1 sd:min-w-[140px]">
        <label class="sd:text-xs sd:text-gray-500 sd:block sd:mb-1"
          >起始时刻: {{ timeFrom }}:00</label
        >
        <sd-slider v-model="timeFrom" :min="0" :max="12" :step="1" />
      </div>
      <div class="sd:flex-1 sd:min-w-[140px]">
        <label class="sd:text-xs sd:text-gray-500 sd:block sd:mb-1"
          >结束时刻: {{ timeTo }}:00</label
        >
        <sd-slider v-model="timeTo" :min="12" :max="24" :step="1" />
      </div>
      <div class="sd:flex-1 sd:min-w-[140px]">
        <label class="sd:text-xs sd:text-gray-500 sd:block sd:mb-1"
          >刻度间隔: {{ timeStep }} 分钟</label
        >
        <sd-slider v-model="timeStep" :min="10" :max="120" :step="10" />
      </div>
    </div>

    <sd-calendar
      :time-from="timeFrom * 60"
      :time-to="timeTo * 60"
      :time-step="timeStep"
      :views="{ day: {}, days: { cols: 5, rows: 1 }, week: {} }"
      view="days"
      :events="demoEvents"
      style="height: 380px"
    />
  </section>

  <!-- ========== 当前时间线 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">当前时间线</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      当时间轴可见时，今天的当前时间会以一条线标记。通过
      <code>watch-real-time</code> 可实时更新该时间线位置。
    </p>

    <div class="sd:mb-3">
      <sd-checkbox v-model="watchRealTime">实时跟踪时间</sd-checkbox>
    </div>

    <sd-calendar
      :views="['day']"
      view="day"
      :views-bar="false"
      :today-button="false"
      :watch-real-time="watchRealTime"
      xs
      style="width: 300px; height: 240px"
    />
  </section>

  <!-- ========== 最小/最大日期 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">最小 / 最大可交互日期</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>min-date</code> 与 <code>max-date</code> 设定可交互的日期范围，超出范围的格子会带有
      <code>.before-min</code> / <code>.after-max</code> 类名，便于样式定制。
    </p>

    <sd-calendar
      click-to-navigate
      date-picker
      :views-bar="false"
      :min-date="minDate"
      :max-date="maxDate"
      :view-date="new Date()"
      style="width: 300px; height: 380px"
    />
  </section>

  <!-- ========== 禁用特定日期 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">禁用特定日期</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>disable-days</code> 传入日期数组（<code>YYYY-MM-DD</code> 字符串或 Date
      对象），禁用指定日期使其不可选。
    </p>

    <sd-calendar
      date-picker
      :views-bar="false"
      :disable-days="disabledDates"
      :view-date="new Date()"
      style="width: 300px; height: 380px"
    />
  </section>

  <!-- ========== 隐藏特定星期 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">隐藏特定星期</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>hide-weekdays</code> 隐藏指定星期列，如隐藏周末或工作日。对
      <code>days</code>、<code>week</code>、<code>month</code> 视图均有效。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-2 sd:mb-3">
      <sd-checkbox
        v-for="day in weekdays"
        :key="day.value"
        :value="day.value"
        v-model="hiddenWeekdays"
      >
        {{ day.label }}
      </sd-checkbox>
    </div>

    <sd-calendar
      :hide-weekdays="hiddenWeekdays"
      :events="demoEvents"
      :time-from="8 * 60"
      :time-to="18 * 60"
      :view-date="new Date()"
      style="height: 420px"
    />
  </section>

  <!-- ========== 十二小时制 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">十二小时制</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>twelve-hour</code> 将时间显示切换为 12 小时格式（如 9am / 2pm）。
    </p>

    <div class="sd:mb-3">
      <sd-checkbox v-model="useTwelveHour">使用 12 小时制</sd-checkbox>
    </div>

    <sd-calendar
      :twelve-hour="useTwelveHour"
      :events="demoEvents"
      :time-from="8 * 60"
      :time-to="18 * 60"
      :view-date="new Date()"
      style="height: 420px"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  // 时间轴
  const timeFrom = ref(7);
  const timeTo = ref(18);
  const timeStep = ref(60);

  // 当前时间线
  const watchRealTime = ref(false);

  // 最小/最大日期
  const today = new Date();
  const minDate = computed(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 10);
    return d.toISOString().slice(0, 10);
  });
  const maxDate = computed(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 10);
    return d.toISOString().slice(0, 10);
  });

  // 禁用日期
  const disabledDates = computed(() => {
    const d = new Date(today);
    return [
      new Date(d.getFullYear(), d.getMonth(), d.getDate() - 2).toISOString().slice(0, 10),
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10),
      new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2).toISOString().slice(0, 10),
    ];
  });

  // 隐藏星期
  const hiddenWeekdays = ref(['sat', 'sun']);
  const weekdays = [
    { label: '周一', value: 'mon' },
    { label: '周二', value: 'tue' },
    { label: '周三', value: 'wed' },
    { label: '周四', value: 'thu' },
    { label: '周五', value: 'fri' },
    { label: '周六', value: 'sat' },
    { label: '周日', value: 'sun' },
  ];

  // 12 小时制
  const useTwelveHour = ref(false);

  // 共享事件
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
      title: '技术讨论',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      title: '跨团队同步',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 15, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 16, 30),
      title: '用户调研',
      backgroundColor: '#8b5cf6',
      color: '#fff',
    },
  ];
</script>
