<template>
  <sd-space direction="vertical" size="large">
    <sd-input class="sd:w-80" placeholder="Please enter something" allow-clear>
      <template #prefix>
        <icon-user />
      </template>
    </sd-input>
    <sd-input class="sd:w-80" placeholder="Please enter something" allow-clear>
      <template #suffix>
        <icon-info-circle />
      </template>
    </sd-input>
  </sd-space>
</template>
