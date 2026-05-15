<template>
  <div class="sd:w-[50%]">
    <sd-progress :steps="3" :percent="0.3" />
    <sd-progress :steps="5" status="warning" :percent="1" />
    <sd-progress :steps="3" size="small" :percent="0.3" />
  </div>
</template>
