<template>
  <sd-progress :percent="0.2" class="sd:w-[50%]" />
  <br />
  <br />
  <sd-progress :percent="0.3" class="sd:w-[50%]">
    <template v-slot:text="scope"> 进度 {{ scope.percent * 100 }}% </template>
  </sd-progress>
</template>
