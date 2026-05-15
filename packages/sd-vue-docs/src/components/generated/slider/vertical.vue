<template>
  <sd-space align="start">
    <sd-slider :default-value="50" direction="vertical" />

    <sd-slider
      direction="vertical"
      :default-value="5"
      class="sd:w-75"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }"
    />
  </sd-space>
</template>
