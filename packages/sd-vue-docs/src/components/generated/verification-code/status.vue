<template>
  <sd-space direction="vertical">
    <sd-space>
      <sd-typography-text class="sd:w-20">Disabled:</sd-typography-text>
      <sd-verification-code defaultValue="123456" class="sd:w-75" disabled />
    </sd-space>
    <sd-space>
      <sd-typography-text class="sd:w-20">Readonly:</sd-typography-text>
      <sd-verification-code defaultValue="123456" class="sd:w-75" readonly />
    </sd-space>
    <sd-space>
      <sd-typography-text class="sd:w-20">Error:</sd-typography-text>
      <sd-verification-code defaultValue="123456" class="sd:w-75" error />
    </sd-space>
  </sd-space>
</template>
