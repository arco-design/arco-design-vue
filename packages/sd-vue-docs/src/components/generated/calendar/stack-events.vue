<template>
  <sd-calendar
    view="day"
    view-date="2025-01-08"
    :views="['day']"
    :events="events"
    :stack-events="true"
    :time-from="9 * 60"
    :time-to="16 * 60"
    editable-events
    style="height: 560px"
  />
</template>

<script setup lang="ts">
  const events = [
    {
      start: '2025-01-08 11:30',
      end: '2025-01-08 14:00',
      title: 'Dentist Appt.',
      class: 'health',
    },
    {
      start: '2025-01-08 12:00',
      end: '2025-01-08 14:00',
      title: 'Event 1',
      class: 'leisure',
    },
    {
      start: '2025-01-08 12:00',
      end: '2025-01-08 14:00',
      title: 'Event 2',
      class: 'sport',
    },
  ];
</script>
