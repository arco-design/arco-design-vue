<template>
  <div class="sd:flex">
    <sd-timeline class="sd:mr-10">
      <sd-timeline-item label="2020-04-12" dotColor="#00B42A">
        The first milestone
      </sd-timeline-item>
      <sd-timeline-item label="2020-05-17"> The second milestone </sd-timeline-item>
      <sd-timeline-item label="2020-06-22">
        <template #dot>
          <IconClockCircle class="sd:text-xs sd:text-[#f53f3f]" />
        </template>
        The third milestone
      </sd-timeline-item>
      <sd-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
        The third milestone
      </sd-timeline-item>
    </sd-timeline>

    <sd-timeline class="sd:mr-10">
      <sd-timeline-item label="2020-04-12">
        <template #dot>
          <IconCheck
            class="sd:text-xs sd:p-0.5 sd:box-border sd:rounded-full sd:bg-[var(--color-primary-light-1)]"
          />
        </template>
        The first milestone
      </sd-timeline-item>
      <sd-timeline-item label="2020-05-17">
        <template #dot>
          <IconCheck
            class="sd:text-xs sd:p-0.5 sd:box-border sd:rounded-full sd:bg-[var(--color-primary-light-1)]"
          />
        </template>
      </sd-timeline-item>
      <sd-timeline-item label="2020-06-22">The third milestone</sd-timeline-item>
      <sd-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
        The third milestone
      </sd-timeline-item>
    </sd-timeline>

    <sd-timeline>
      <sd-timeline-item label="2020-04-12">The first milestone</sd-timeline-item>
      <sd-timeline-item label="2020-05-17" dotColor="var(--color-fill-4)">
        The second milestone
      </sd-timeline-item>
      <sd-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)">
        The third milestone
      </sd-timeline-item>
    </sd-timeline>
  </div>
</template>

<script setup lang="ts">
  import { IconCheck } from '@sdata/web-vue/es/icon/index.js';
</script>
