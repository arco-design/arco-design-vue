<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-full" placeholder="Please select ..." :bordered="false">
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
    </sd-select>
    <sd-select
      :default-value="['Beijing', 'Shanghai']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :bordered="false"
    >
      <sd-option>Beijing</sd-option>
      <sd-option :tag-props="{ color: 'red' }">Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Wuhan</sd-option>
    </sd-select>
  </sd-space>
</template>
