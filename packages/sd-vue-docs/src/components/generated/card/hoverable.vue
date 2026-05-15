<template>
  <div class="sd:flex">
    <sd-card class="sd:w-90" title="SD Card" hoverable>
      <template #extra>
        <sd-link>More</sd-link>
      </template>
      Card content <br />
      Card content
    </sd-card>
    <sd-card class="card-demo" title="Custom hover style" hoverable>
      <template #extra>
        <sd-link>More</sd-link>
      </template>
      Card content <br />
      Card content
    </sd-card>
  </div>
</template>
<style scoped>
  .card-demo {
    width: 360px;
    margin-left: 24px;
    transition-property: all;
  }

  .card-demo:hover {
    transform: translateY(-4px);
  }
</style>
