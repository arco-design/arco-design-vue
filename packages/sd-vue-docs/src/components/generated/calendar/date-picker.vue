<template>
  <div class="sd:flex sd:flex-wrap sd:gap-4 sd:items-start">
    <sd-calendar
      date-picker
      v-model:selected-date="selectedDate"
      :view-date="selectedDate"
      style="width: 280px; height: 380px"
    />

    <sd-calendar
      view="week"
      :views="['day', 'week', 'month']"
      :selected-date="selectedDate"
      :view-date="selectedDate"
      :events="events"
      :time-from="8 * 60"
      :time-to="20 * 60"
      editable-events
      :snap-to-interval="15"
      style="flex: 1; min-width: 360px; height: 620px"
    />
  </div>

  <p class="sd:mt-2 sd:text-sm sd:text-gray-500">当前选中日期: {{ selectedDate }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const selectedDate = ref('2025-01-08');

  const events = [
    {
      start: '2025-01-06 09:00',
      end: '2025-01-06 11:00',
      title: '需求评审',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: '2025-01-07 14:00',
      end: '2025-01-07 15:30',
      title: '技术讨论',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2025-01-08 10:00',
      end: '2025-01-08 11:30',
      title: '项目启动会',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: '2025-01-08 14:00',
      end: '2025-01-08 16:00',
      title: '团队建设',
      backgroundColor: '#8b5cf6',
      color: '#fff',
    },
    {
      start: '2025-01-09 09:00',
      end: '2025-01-09 10:00',
      title: '代码评审',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: '2025-01-09 15:00',
      end: '2025-01-09 16:00',
      title: '周报撰写',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2025-01-10 09:30',
      end: '2025-01-10 11:00',
      title: '设计评审',
      backgroundColor: '#ef4444',
      color: '#fff',
    },
    {
      start: '2025-01-10 14:00',
      end: '2025-01-10 15:30',
      title: '客户演示',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
  ];
</script>
