<template>
  <sd-calendar
    view="week"
    view-date="2026-06-15"
    :views="['day', 'week']"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :schedules="schedules"
    :events="events"
    :special-hours="specialHours"
    editable-events
    :style="{
      'height': '620px',
      '--sd-calendar-min-cell-size': '20rem',
      '--sd-calendar-min-schedule-size': '12rem',
    }"
  />
</template>

<script setup lang="ts">
  const schedules = [
    { id: 'room-a', label: '大会议室', class: 'room room--a' },
    { id: 'room-b', label: '中会议室', class: 'room room--b' },
    { id: 'room-c', label: '小会议室', class: 'room room--c' },
  ];

  const events = [
    {
      start: '2026-06-15 09:00',
      end: '2026-06-15 11:30',
      title: '产品评审',
      class: 'event-meeting',
      schedule: 'room-a',
    },
    {
      start: '2026-06-17 14:00',
      end: '2026-06-17 16:30',
      title: '季度总结',
      class: 'event-review',
      schedule: 'room-a',
    },
    {
      start: '2026-06-15 14:00',
      end: '2026-06-15 15:30',
      title: '设计走查',
      class: 'event-design',
      schedule: 'room-b',
    },
    {
      start: '2026-06-16 09:30',
      end: '2026-06-16 10:30',
      title: '每日站会',
      class: 'event-standup',
      schedule: 'room-b',
    },
    {
      start: '2026-06-15 10:00',
      end: '2026-06-15 11:00',
      title: '1v1 面谈',
      class: 'event-private',
      schedule: 'room-c',
    },
    {
      start: '2026-06-18 14:00',
      end: '2026-06-18 16:00',
      title: '客户演示',
      class: 'event-demo',
      schedule: 'room-c',
    },
  ];

  const specialHours = {
    mon: {
      default: { from: 9 * 60, to: 18 * 60, class: 'open-all-day', label: '全天开放' },
    },
    tue: {
      default: { from: 9 * 60, to: 12 * 60, class: 'open-morning', label: '上午开放' },
      schedules: {
        'room-a': { from: 9 * 60, to: 18 * 60, class: 'room-a-full', label: '全天可用' },
      },
    },
    wed: {
      default: { from: 9 * 60, to: 18 * 60, class: 'open-all-day', label: '全天开放' },
      schedules: {
        'room-c': [
          { from: 9 * 60, to: 12 * 60, class: 'room-c-am', label: '上午' },
          { from: 13 * 60, to: 17 * 60, class: 'room-c-pm', label: '下午' },
        ],
      },
    },
    thu: {
      default: { from: 9 * 60, to: 18 * 60, class: 'open-all-day', label: '全天开放' },
    },
    fri: {
      default: { from: 9 * 60, to: 17 * 60, class: 'open-half-day', label: '半天开放' },
      schedules: {
        'room-b': { from: 9 * 60, to: 12 * 60, class: 'room-b-am', label: '仅上午' },
      },
    },
  };
</script>

<style lang="css">
  .sd-calendar__schedule.room--a {
    background-color: rgba(59, 130, 246, 0.18);
  }
  .sd-calendar__schedule.room--b {
    background-color: rgba(16, 185, 129, 0.18);
  }
  .sd-calendar__schedule.room--c {
    background-color: rgba(245, 158, 11, 0.18);
  }
  .sd-calendar__schedule--heading {
    font-size: 14px;
    font-weight: 600;
  }

  .sd-calendar__special-hours.open-all-day {
    background-color: rgba(99, 102, 241, 0.12);
  }
  .sd-calendar__special-hours.open-morning {
    background-color: rgba(250, 204, 21, 0.16);
  }
  .sd-calendar__special-hours.open-half-day {
    background-color: rgba(239, 68, 68, 0.12);
  }
  .sd-calendar__special-hours.room-a-full {
    background-color: rgba(59, 130, 246, 0.14);
  }
  .sd-calendar__special-hours.room-c-am {
    background-color: rgba(245, 158, 11, 0.16);
  }
  .sd-calendar__special-hours.room-c-pm {
    background-color: rgba(245, 158, 11, 0.08);
  }
  .sd-calendar__special-hours.room-b-am {
    background-color: rgba(16, 185, 129, 0.14);
  }

  .sd-calendar__event.event-meeting {
    background-color: rgba(59, 130, 246, 0.78);
    border-color: rgba(59, 130, 246, 0.55);
    color: #fff;
  }
  .sd-calendar__event.event-review {
    background-color: rgba(99, 102, 241, 0.78);
    border-color: rgba(99, 102, 241, 0.55);
    color: #fff;
  }
  .sd-calendar__event.event-design {
    background-color: rgba(16, 185, 129, 0.78);
    border-color: rgba(16, 185, 129, 0.55);
    color: #fff;
  }
  .sd-calendar__event.event-standup {
    background-color: rgba(20, 184, 166, 0.78);
    border-color: rgba(20, 184, 166, 0.55);
    color: #fff;
  }
  .sd-calendar__event.event-private {
    background-color: rgba(245, 158, 11, 0.78);
    border-color: rgba(245, 158, 11, 0.55);
    color: #fff;
  }
  .sd-calendar__event.event-demo {
    background-color: rgba(239, 68, 68, 0.78);
    border-color: rgba(239, 68, 68, 0.55);
    color: #fff;
  }
</style>
