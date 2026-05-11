<template>
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <sd-popover position="tl">
      <sd-button class="button" :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="top">
      <sd-button class="button" :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="tr">
      <sd-button class="button" :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="bl">
      <sd-button class="button" :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="bottom">
      <sd-button class="button" :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="br">
      <sd-button class="button" :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="lt">
      <sd-button class="button" :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="left">
      <sd-button class="button" :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="lb">
      <sd-button class="button" :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="rt">
      <sd-button class="button" :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="right">
      <sd-button class="button" :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
    <sd-popover position="rb">
      <sd-button class="button" :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</sd-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </sd-popover>
  </div>
</template>

<style scoped lang="scss">
  .button {
    width: 100px;
  }
</style>
