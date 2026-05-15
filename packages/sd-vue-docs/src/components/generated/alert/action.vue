<template>
  <sd-space direction="vertical" size="large" class="sd:w-full">
    <sd-alert closable>
      This is an info alert.
      <template #action>
        <sd-button size="small" type="primary">Detail</sd-button>
      </template>
    </sd-alert>
    <sd-alert title="Example" closable>
      This is an info alert.
      <template #action>
        <sd-button size="small" type="primary">Detail</sd-button>
      </template>
    </sd-alert>
  </sd-space>
</template>
