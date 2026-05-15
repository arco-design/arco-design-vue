<template>
  <sd-pagination :total="200">
    <template #page-item="{ page }"> - {{ page }} - </template>
    <template #page-item-step="{ type }">
      <icon-send :class="type === 'previous' ? 'sd:rotate-180' : undefined" />
    </template>
    <template #page-item-ellipsis>
      <icon-sun-fill />
    </template>
  </sd-pagination>
</template>
