<template>
  <sd-date-picker
    class="sd:w-75 sd:mr-6 sd:mb-6"
    :shortcuts="[
      {
        label: '2 hours later',
        value: () => dayjs().add(2, 'hour'),
      },
      {
        label: 'a week later',
        value: () => dayjs().add(1, 'week'),
      },
      {
        label: 'a month later',
        value: () => dayjs().add(1, 'month'),
      },
    ]"
    show-time
  />
  <sd-month-picker
    class="sd:w-75 sd:mr-6 sd:mb-6"
    :shortcuts="[
      {
        label: 'last month',
        value: () => dayjs().subtract(1, 'month'),
      },
      {
        label: 'six months later',
        value: () => dayjs().add(6, 'month'),
      },
      {
        label: 'two years later',
        value: () => dayjs().add(2, 'year'),
      },
    ]"
  />
  <sd-range-picker
    class="sd:w-100 sd:mr-6 sd:mb-6"
    :shortcuts="[
      {
        label: 'next 7 days',
        value: () => [dayjs(), dayjs().add(1, 'week')],
      },
      {
        label: 'next 30 days',
        value: () => [dayjs(), dayjs().add(1, 'month')],
      },
      {
        label: 'next 365 days',
        value: () => [dayjs(), dayjs().add(1, 'year')],
      },
    ]"
  />
  <sd-range-picker
    mode="month"
    class="sd:w-75 sd:mb-6"
    :shortcuts="[
      {
        label: 'next 6 months',
        value: () => [dayjs(), dayjs().add(6, 'month')],
      },
      {
        label: 'next 12 months',
        value: () => [dayjs(), dayjs().add(1, 'year')],
      },
      {
        label: 'next 10 years',
        value: () => [dayjs(), dayjs().add(10, 'year')],
      },
    ]"
  />
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';
</script>
