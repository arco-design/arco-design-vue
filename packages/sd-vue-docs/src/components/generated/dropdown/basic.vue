<template>
  <sd-space size="large">
    <sd-dropdown @select="handleSelect">
      <sd-button>Click Me</sd-button>
      <template #content>
        <sd-doption>Option 1</sd-doption>
        <sd-doption disabled>Option 2</sd-doption>
        <sd-doption :value="{ value: 'Option3' }">Option 3</sd-doption>
      </template>
    </sd-dropdown>
    <sd-dropdown @select="handleSelect" disabled>
      <sd-button disabled>Click Me</sd-button>
      <template #content>
        <sd-doption>Option 1</sd-doption>
        <sd-doption disabled>Option 2</sd-doption>
        <sd-doption>Option 3</sd-doption>
      </template>
    </sd-dropdown>
    <sd-dropdown @select="handleSelect" :popup-max-height="false">
      <sd-button>No Max Height <icon-down /></sd-button>
      <template #content>
        <sd-doption>Option 1</sd-doption>
        <sd-doption disabled>Option 2</sd-doption>
        <sd-doption>Option 3</sd-doption>
        <sd-doption>Option 4</sd-doption>
        <sd-doption>Option 5</sd-doption>
        <sd-doption>Option 6</sd-doption>
        <sd-doption>Option 7</sd-doption>
        <sd-doption>Option 8</sd-doption>
        <sd-doption>Option 9</sd-doption>
      </template>
    </sd-dropdown>
  </sd-space>
</template>

<script setup lang="ts">
  const handleSelect = (v) => {
    console.log(v);
  };
</script>

<style>
  .sd-dropdown-open .sd-icon-down {
    transform: rotate(180deg);
  }
</style>
