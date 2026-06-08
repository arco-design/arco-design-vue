<template>
  <!-- ========== 可复用的 special-hours-label 模板 ========== -->
  <!-- 不再使用 v-html。label 中使用 '|' 分隔主标题和副标题 / 备注。
       '营业中'              → 普通文本
       '医生 1|全天班'        → <strong> 主标题 + 换行 <em> 副标题
       '午餐休息|(不可预约)'   → <strong> 主标题 + 空格 + 备注     -->
  <DefineSpecialHoursLabel v-slot="{ range }">
    <template v-if="range.label.includes('|')">
      <strong>{{ range.label.split('|')[0] }}</strong>
      <template v-if="range.label.split('|')[1].startsWith('(')">
        {{ ' ' + range.label.split('|')[1] }}
      </template>
      <template v-else>
        <br /><em>{{ range.label.split('|')[1] }}</em>
      </template>
    </template>
    <template v-else>
      {{ range.label }}
    </template>
  </DefineSpecialHoursLabel>

  <!-- ========== 特殊时段 / 营业时间 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">特殊时段 / 营业时间</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      <code>special-hours</code>
      属性用于在日视图和周视图中高亮指定的时间段。每个星期几可定义一个或多个时间区间， 支持
      <code>label</code>（显示标签）和 <code>class</code>（CSS 样式控制）。
    </p>

    <div class="sd:mb-3 sd:flex sd:items-center sd:gap-2">
      <span class="sd:text-sm">演示模式：</span>
      <sd-select v-model="hoursVariant" size="small" class="sd:w-40">
        <sd-option value="business" label="简单营业时间" />
        <sd-option value="doctors" label="医生轮班" />
      </sd-select>
    </div>

    <sd-calendar
      :special-hours="currentSpecialHours"
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :events="specialHoursEvents"
      editable-events
      style="height: 540px"
    >
      <template #special-hours-label="{ range }">
        <ReuseSpecialHoursLabel :range="range" />
      </template>
    </sd-calendar>
  </section>

  <!-- ========== 排班 (Schedules) ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">排班 (Schedules)</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      <code>schedules</code> 将一天拆分为多个资源列（如人员、房间），事件通过
      <code>schedule</code> 属性指定所属列。 <code>special-hours</code> 可与排班结合，通过
      <code>default</code> 和 <code>schedules</code> 分别定义共用和按列的时段。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3 sd:items-center">
      <span class="sd:text-sm">排班时段：</span>
      <sd-select v-model="scheduleHoursMode" size="small" class="sd:w-40">
        <sd-option value="none" label="关闭" />
        <sd-option value="shared" label="共用时段" />
        <sd-option value="perSchedule" label="按排班区分" />
      </sd-select>
    </div>

    <sd-calendar
      :view-date="'2026-06-15'"
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="21 * 60"
      editable-events
      :events="scheduleEvts"
      :schedules="scheds"
      :special-hours="scheduleSpecialHours"
      :style="{
        'height': '620px',
        '--sd-calendar-min-cell-size': '24rem',
        '--sd-calendar-min-schedule-size': '13rem',
      }"
    >
      <template #special-hours-label="{ range }">
        <ReuseSpecialHoursLabel :range="range" />
      </template>
    </sd-calendar>
  </section>

  <!-- ========== 阻止时间段 (allowEvents) ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">阻止时间段 (allowEvents)</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      在 <code>special-hours</code> 的时间块上设置
      <code>allowEvents: false</code> 可阻止该时间段内的事件创建/拖入/缩放。
      适合午餐时间、休息时间等不可预约时段。
    </p>

    <sd-calendar
      :views="['week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      view="week"
      editable-events
      :special-hours="blockedHours"
      :events="blockedEvents"
      style="height: 400px"
    >
      <template #special-hours-label="{ range }">
        <ReuseSpecialHoursLabel :range="range" />
      </template>
    </sd-calendar>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  import { createReusableTemplate } from '@vueuse/core';

  // ========== 可复用的 special-hours-label 模板 ==========
  // label 中使用 '|' 分隔主标题和副标题 / 备注：
  //   - '营业中'              → 普通文本
  //   - '医生 1|全天班'        → 主标题 <strong> + 换行 + <em>副标题</em>
  //   - '午餐休息|(不可预约)'   → 主标题 <strong> + 空格 + 备注文本
  const [DefineSpecialHoursLabel, ReuseSpecialHoursLabel] = createReusableTemplate<{
    range: { label: string; class?: string; style?: Record<string, string> };
  }>();

  // ---------- 特殊时段 ----------
  const hoursVariant = ref('business');

  const businessHours = {
    mon: { from: 9 * 60, to: 18 * 60, class: 'business-hours', label: '营业中' },
    tue: { from: 9 * 60, to: 18 * 60, class: 'business-hours', label: '营业中' },
    wed: [
      { from: 9 * 60, to: 12 * 60, class: 'business-hours', label: '上午营业' },
      { from: 14 * 60, to: 18 * 60, class: 'business-hours', label: '下午营业' },
    ],
    thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours', label: '营业中' },
    fri: { from: 9 * 60, to: 17 * 60, class: 'business-hours', label: '提前关门' },
  };

  const doctorHours = {
    mon: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '医生 1|全天班' },
    tue: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '医生 2|全天班' },
    wed: [
      { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '医生 1|上午班' },
      { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '医生 3|下午班' },
    ],
    thu: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '医生 1|全天班' },
    fri: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '医生 3|全天班' },
    sat: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '医生 2|全天班' },
    sun: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '休息' },
  };

  const currentSpecialHours = computed(() =>
    hoursVariant.value === 'business' ? businessHours : doctorHours,
  );

  const specialHoursEvents = [
    {
      start: '2026-06-16 09:00',
      end: '2026-06-16 10:30',
      title: '团队早会',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: '2026-06-16 14:00',
      end: '2026-06-16 15:00',
      title: '客户会议',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2026-06-18 11:00',
      end: '2026-06-18 12:30',
      title: '设计评审',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
  ];

  // ---------- 排班 ----------
  const scheduleHoursMode = ref('perSchedule');

  const scheds = [
    { id: 'dr-lee', class: 'doctor doctor--lee', label: '李医生' },
    { id: 'dr-kim', class: 'doctor doctor--kim', label: '金医生' },
    { id: 'lab', class: 'doctor doctor--lab', label: '化验室' },
  ];

  const scheduleEvts = [
    {
      start: '2026-06-15 08:30',
      end: '2026-06-15 10:00',
      title: '查房',
      class: 's-event-health',
      schedule: 'dr-lee',
    },
    {
      start: '2026-06-15 11:00',
      end: '2026-06-15 12:00',
      title: '会诊',
      class: 's-event-health',
      schedule: 'dr-kim',
    },
    {
      start: '2026-06-15 14:00',
      end: '2026-06-15 17:00',
      title: '化验',
      class: 's-event-leisure',
      schedule: 'lab',
    },
    {
      start: '2026-06-16 09:00',
      end: '2026-06-16 10:30',
      title: '巡房',
      class: 's-event-health',
      schedule: 'dr-lee',
    },
    {
      start: '2026-06-16 13:00',
      end: '2026-06-16 15:00',
      title: '急诊',
      class: 's-event-health',
      schedule: 'dr-kim',
    },
    {
      start: '2026-06-17 10:00',
      end: '2026-06-17 12:30',
      title: '筛查',
      class: 's-event-leisure',
      schedule: 'lab',
    },
    {
      start: '2026-06-18 13:30',
      end: '2026-06-18 16:00',
      title: '复查',
      class: 's-event-health',
      schedule: 'dr-lee',
    },
    {
      start: '2026-06-19 18:00',
      end: '2026-06-19 20:00',
      title: '夜诊',
      class: 's-event-health',
      schedule: 'dr-kim',
    },
  ];

  const sharedHours = {
    mon: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
    tue: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
    wed: [
      { from: 8 * 60, to: 12 * 60, class: 'clinic-hours', label: '门诊时间' },
      { from: 13 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
    ],
    thu: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
    fri: { from: 8 * 60, to: 16 * 60, class: 'clinic-hours', label: '门诊时间' },
  };

  const perScheduleHours = {
    mon: {
      default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
      schedules: {
        'dr-lee': [
          { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '李医生|上午门诊' },
          { from: 13 * 60, to: 17 * 60, class: 'doctor-1', label: '李医生|下午门诊' },
        ],
        'dr-kim': { from: 10 * 60, to: 19 * 60, class: 'doctor-2', label: '金医生|晚班' },
      },
    },
    tue: {
      default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
      schedules: {
        'dr-lee': { from: 8 * 60, to: 14 * 60, class: 'doctor-1', label: '李医生|半天' },
      },
    },
    wed: {
      default: [
        { from: 8 * 60, to: 12 * 60, class: 'clinic-hours', label: '门诊时间' },
        { from: 13 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' },
      ],
      schedules: {
        lab: [
          { from: 7 * 60, to: 11 * 60, class: 'doctor-3', label: '化验室|准备' },
          { from: 12 * 60, to: 17 * 60, class: 'doctor-3', label: '化验室|检测' },
        ],
      },
    },
    thu: { default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: '门诊时间' } },
    fri: {
      default: { from: 8 * 60, to: 16 * 60, class: 'clinic-hours', label: '提前关门' },
      schedules: {
        'dr-kim': { from: 12 * 60, to: 20 * 60, class: 'doctor-2', label: '金医生|扩展班' },
      },
    },
  };

  const scheduleSpecialHours = computed(() => {
    if (scheduleHoursMode.value === 'none') return {};
    if (scheduleHoursMode.value === 'shared') return sharedHours;
    return perScheduleHours;
  });

  // ---------- 阻止时间段 ----------
  const blockedHours = {
    wed: [
      { from: 9 * 60, to: 12 * 60, class: 'open-hours', label: '开放' },
      {
        from: 12 * 60,
        to: 13 * 60,
        class: 'lunch-break',
        allowEvents: false,
        label: '午餐休息|(不可预约)',
      },
      { from: 13 * 60, to: 18 * 60, class: 'open-hours', label: '开放' },
    ],
  };

  const blockedEvents = [
    {
      start: '2026-06-17 10:00',
      end: '2026-06-17 11:00',
      title: '尝试拖到此事件靠近午餐时段',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
  ];
</script>

<style lang="css">
  /* 特殊时段 */
  .sd-calendar__special-hours.business-hours {
    background-color: rgba(0, 218, 255, 0.13);
  }
  .sd-calendar__special-hours.doctor-1 {
    background-color: hsl(127, 43%, 60%, 0.15);
    color: hsl(127, 50%, 40%);
    text-align: center;
  }
  .sd-calendar__special-hours.doctor-2 {
    background-color: hsl(217, 43%, 60%, 0.15);
    color: hsl(217, 80%, 40%);
    text-align: center;
  }
  .sd-calendar__special-hours.doctor-3 {
    background-color: hsl(287, 43%, 60%, 0.15);
    color: hsl(287, 80%, 40%);
    text-align: center;
  }
  .sd-calendar__special-hours.closed {
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 6px,
      rgba(255, 162, 87, 0.15) 6px,
      rgba(255, 162, 87, 0.15) 20px
    );
    color: hsl(27, 90%, 40%);
    text-align: center;
  }
  .sd-calendar__special-hours em {
    font-size: 0.85em;
    opacity: 0.7;
  }

  /* 排班 */
  .sd-calendar__schedule.doctor--lee {
    background-color: rgba(192, 235, 255, 0.32);
  }
  .sd-calendar__schedule.doctor--kim {
    background-color: rgba(255, 221, 235, 0.28);
  }
  .sd-calendar__schedule.doctor--lab {
    background-color: rgba(222, 255, 229, 0.28);
  }
  .sd-calendar__schedule--heading {
    font-size: 14px;
    font-weight: 600;
  }
  .sd-calendar__special-hours.clinic-hours {
    background-color: rgba(255, 235, 59, 0.18);
  }
  .sd-calendar__special-hours em {
    font-size: 0.82em;
    opacity: 0.6;
  }

  /* 事件 */
  .s-event-health {
    background-color: rgba(87, 206, 169, 0.82);
    border-color: rgba(76, 175, 80, 0.45);
    color: #fff;
  }
  .s-event-leisure {
    background-color: rgba(253, 156, 66, 0.85);
    border-color: rgba(233, 136, 46, 0.55);
    color: #fff;
  }

  /* 阻止时段 */
  .open-hours {
    background-color: rgba(76, 175, 80, 0.15);
  }
  .lunch-break {
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 5px,
      rgba(0, 0, 0, 0.06) 5px,
      rgba(0, 0, 0, 0.06) 12px
    );
    color: rgba(0, 0, 0, 0.55);
    text-align: center;
  }
</style>
