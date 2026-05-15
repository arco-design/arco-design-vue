<template>
  <sd-space direction="vertical">
    <sd-verification-code
      defaultValue="123456"
      class="sd:w-75"
      :formatter="(inputValue: string) => (/^\d*$/.test(inputValue) ? inputValue : false)"
    />
    <sd-verification-code
      defaultValue="abcdef"
      class="sd:w-75"
      :formatter="
        (inputValue: string) => (/^[a-zA-Z]*$/.test(inputValue) ? inputValue.toUpperCase() : '')
      "
    />
  </sd-space>
</template>
