<template>
  <sd-space direction="vertical" size="large">
    <sd-input-group>
      <sd-input class="sd:w-40" placeholder="first" />
      <sd-input class="sd:w-40" placeholder="second" />
    </sd-input-group>
    <sd-input-group>
      <sd-select :options="['Option1', 'Option2', 'Option3']" class="sd:w-40" placeholder="first" />
      <sd-input class="sd:w-40" placeholder="second" />
    </sd-input-group>
  </sd-space>
</template>
