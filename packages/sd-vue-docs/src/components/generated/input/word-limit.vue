<template>
  <sd-space direction="vertical" size="large" fill>
    <sd-input
      class="sd:w-80"
      placeholder="Please enter something"
      :max-length="10"
      allow-clear
      show-word-limit
    />
    <sd-input
      class="sd:w-80"
      placeholder="Please enter something"
      :max-length="{ length: 10, errorOnly: true }"
      allow-clear
      show-word-limit
    />
  </sd-space>
</template>
