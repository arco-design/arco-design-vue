<template>
  <sd-space direction="vertical" size="large">
    <sd-input-number
      placeholder="Please Enter"
      :default-value="3.6"
      :step="1.2"
      :precision="2"
      class="input-demo sd:w-80"
    />
    <sd-input-number
      placeholder="Please Enter"
      :default-value="1.22"
      :step="1.22"
      :precision="1"
      class="input-demo sd:w-80"
    />
  </sd-space>
</template>
