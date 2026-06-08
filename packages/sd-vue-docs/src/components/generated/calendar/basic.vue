<template>
  <div>
    <sd-calendar
      v-model:view="currentView"
      view-date="2025-01-08"
      :events="events"
      :snap-to-interval="15"
      editable-events
      @event-created="onEventAction('创建', $event)"
      @event-delete="onEventAction('删除', $event)"
      @event-dropped="onEventAction('移动', $event.event)"
      style="height: 640px"
    />

    <div
      v-if="statusMsg"
      class="sd:mt-3 sd:flex sd:items-center sd:gap-2 sd:rounded sd:bg-gray-50 sd:px-3 sd:py-2 sd:text-sm sd:text-gray-600"
    >
      <span class="sd:inline-block sd:h-2 sd:w-2 sd:rounded-full sd:bg-blue-500"></span>
      {{ statusMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const currentView = ref('week');
  const statusMsg = ref('');

  const events = [
    {
      start: '2025-01-06 09:00',
      end: '2025-01-06 11:00',
      title: '产品需求评审',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: '2025-01-06 14:00',
      end: '2025-01-06 15:30',
      title: '技术方案讨论',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2025-01-07 09:30',
      end: '2025-01-07 10:00',
      title: '每日站会',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: '2025-01-07 10:00',
      end: '2025-01-07 11:30',
      title: '前端周会',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: '2025-01-07 14:00',
      end: '2025-01-07 15:00',
      title: '代码审查',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2025-01-08 10:00',
      end: '2025-01-08 11:00',
      title: '跨团队对齐会',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: '2025-01-08 14:00',
      end: '2025-01-08 15:30',
      title: '用户调研访谈',
      backgroundColor: '#8b5cf6',
      color: '#fff',
    },
    {
      start: '2025-01-09 09:00',
      end: '2025-01-09 09:30',
      title: '每日站会',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
    {
      start: '2025-01-09 11:00',
      end: '2025-01-09 11:30',
      title: '1v1 团队沟通',
      backgroundColor: '#8b5cf6',
      color: '#fff',
    },
    {
      start: '2025-01-09 15:00',
      end: '2025-01-09 16:30',
      title: '技术分享会',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: '2025-01-10 16:00',
      end: '2025-01-10 17:00',
      title: '周五下午茶',
      backgroundColor: '#8b5cf6',
      color: '#fff',
    },
  ];

  const onEventAction = (action: string, event: any) => {
    statusMsg.value = `${action}了事件「${event.title ?? '新事件'}」`;
  };
</script>
