<template>
  <sd-space direction="vertical" size="large">
    <sd-input-search
      class="sd:w-80"
      placeholder="Please enter something"
      button-text="Search"
      search-button
    />
    <sd-input-search class="sd:w-80" placeholder="Please enter something" search-button>
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default> Search </template>
    </sd-input-search>
  </sd-space>
</template>
