<template>
  <sd-date-picker
    class="sd:w-63.5 sd:mr-6 sd:mb-5"
    shortcuts-position="left"
    :shortcuts="shortcuts"
  />
  <sd-range-picker class="sd:w-75 sd:mb-5" shortcuts-position="left" :shortcuts="rangeShortcuts" />
  <br />
  <sd-date-picker class="sd:w-63.5 sd:mr-6" shortcuts-position="right" :shortcuts="shortcuts" />
  <sd-range-picker class="sd:w-75" shortcuts-position="right" :shortcuts="rangeShortcuts" />
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';

  const shortcuts = [
    {
      label: 'yesterday',
      value: () => dayjs().subtract(1, 'day').toDate(),
    },
    {
      label: 'today',
      value: () => dayjs().toDate(),
    },
    {
      label: 'a week later',
      value: () => dayjs().add(1, 'week').toDate(),
    },
    {
      label: 'a month later',
      value: () => dayjs().add(1, 'month').toDate(),
    },
    {
      label: '2 months later',
      value: () => dayjs().add(2, 'month').toDate(),
    },
  ];

  const rangeShortcuts = [
    {
      label: 'next 2 days',
      value: () => [dayjs().toDate(), dayjs().add(2, 'day').toDate()],
    },
    {
      label: 'next 7 days',
      value: () => [dayjs().toDate(), dayjs().add(1, 'week').toDate()],
    },
    {
      label: 'next 30 days',
      value: () => [dayjs().toDate(), dayjs().add(1, 'month').toDate()],
    },
    {
      label: 'next 6 months',
      value: () => [dayjs().toDate(), dayjs().add(6, 'month').toDate()],
    },
    {
      label: 'next 12 months',
      value: () => [dayjs().toDate(), dayjs().add(1, 'year').toDate()],
    },
    {
      label: 'next 10 years',
      value: () => [dayjs().toDate(), dayjs().add(10, 'year').toDate()],
    },
  ];
</script>
