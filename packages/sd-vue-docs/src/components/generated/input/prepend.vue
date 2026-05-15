<template>
  <sd-space direction="vertical" size="large">
    <sd-input class="sd:w-80" placeholder="Please enter something" allow-clear>
      <template #prepend> +86 </template>
    </sd-input>
    <sd-input class="sd:w-80" placeholder="Please enter something" allow-clear>
      <template #append> RMB </template>
    </sd-input>

    <sd-input class="sd:w-80" placeholder="Please enter something" allow-clear prepend="+86">
    </sd-input>
    <sd-input class="sd:w-80" placeholder="Please enter something" allow-clear append="RMB">
    </sd-input>
  </sd-space>
</template>
