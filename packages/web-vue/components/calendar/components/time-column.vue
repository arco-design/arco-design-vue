<template>
  <div :class="`${prefixCls}__time-column`">
    <div :class="`${prefixCls}__time-column-inner`">
      <div v-if="config.allDayEvents" :class="`${prefixCls}__all-day-label`">
        <slot name="all-day-label">{{ calendar.texts.allDay }}</slot>
      </div>

      <div
        v-for="(time, i) in timeCells"
        :key="i"
        :style="{ height: time.height || undefined }"
        :class="`${prefixCls}__time-cell`"
      >
        <slot
          name="time-cell"
          :index="i"
          :minutes="time.minutes"
          :hours="time.hours"
          :minutes-sum="time.minutesSum"
          :format12="time.formatted12"
          :format24="time.formatted24"
        >
          <label>{{ config.twelveHour ? time.formatted12 : time.formatted24 }}</label>
        </slot>
      </div>

      <div
        v-if="config.currentTimeLabel"
        :style="view.nowLine.style"
        :title="view.nowLine.currentTime"
        :class="`${prefixCls}__current-time`"
      >
        <slot name="current-time-label" :now="view.now" :time-formatted="view.nowLine.currentTime">
          <span>{{ view.nowLine.currentTime }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';

  import { calendarInjectionKey } from '../context';

  const calendar = inject(calendarInjectionKey)!;
  const { config, texts, view } = calendar;
  const prefixCls = calendar.prefixCls;

  const timeCells = computed(() => {
    const cells = [];
    const noon = 12 * 60;

    for (let i = config.timeFrom; i < config.timeTo; i += config.timeStep) {
      const isLastCell = i + config.timeStep > config.timeTo;
      const hours = ~~(i / 60); // 0 to 23.
      const mins = i % 60;
      const amPm = texts[i < noon ? 'am' : 'pm'];

      let cellHeight = null;
      // If last cell, check if the cell is full or truncated.
      // E.g. timeStep = 1h, timeTo = 19h30. -> The last cell will be --${prefixCls}-time-cell-size * 0.5%.
      if (isLastCell) {
        const percentageOfFullCell = (config.timeTo - i) / config.timeStep;
        cellHeight = `calc(var(--${prefixCls}-time-cell-size) * ${percentageOfFullCell})`;
      }

      cells.push({
        minutesSum: i, // The sum of hours + minutes in minutes.
        hours,
        minutes: mins,
        formatted12: `${!(hours % 12) ? 12 : hours % 12}${mins ? `:${mins.toString().padStart(2, '0')}` : ''}${amPm}`,
        formatted24: `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`,
        height: cellHeight,
      });
    }
    return cells;
  });
</script>
