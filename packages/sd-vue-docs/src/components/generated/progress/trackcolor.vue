<template>
  <div class="sd:w-[50%]">
    <sd-progress :percent="0.4" trackColor="var(--color-primary-light-1)" class="sd:mb-5" />
    <sd-progress
      :percent="0.4"
      :steps="4"
      trackColor="var(--color-primary-light-1)"
      class="sd:mb-5"
    />
    <sd-progress
      :percent="0.4"
      type="circle"
      trackColor="var(--color-primary-light-1)"
      class="sd:mb-5"
    />
  </div>
</template>
