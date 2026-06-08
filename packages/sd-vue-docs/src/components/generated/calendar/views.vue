<template>
  <div>
    <div class="sd:mb-3 sd:flex sd:flex-wrap sd:gap-2">
      <sd-radio-group type="button" v-model="currentView">
        <sd-radio v-for="v in availableViews" :key="v" :value="v">{{ viewLabels[v] }}</sd-radio>
      </sd-radio-group>
    </div>

    <sd-calendar
      v-model:view="currentView"
      view-date="2025-01-08"
      :views="availableViews"
      :events="events"
      :time-from="8 * 60"
      :time-to="18 * 60"
      style="height: 560px"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const availableViews = ['day', 'week', 'month', 'year'] as const;
  const viewLabels: Record<string, string> = {
    day: '日',
    week: '周',
    month: '月',
    year: '年',
  };

  const currentView = ref('week');

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
      title: '设计评审',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2025-01-08 10:00',
      end: '2025-01-08 11:30',
      title: '开发进度同步',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: '2025-01-09 09:00',
      end: '2025-01-09 11:00',
      title: '用户测试',
      backgroundColor: '#8b5cf6',
      color: '#fff',
    },
    {
      start: '2025-01-10 15:00',
      end: '2025-01-10 16:30',
      title: '复盘总结',
      backgroundColor: '#ef4444',
      color: '#fff',
    },
  ];
</script>
