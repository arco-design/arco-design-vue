<template>
  <div class="layout-demo">
    <sd-layout class="sd:h-100">
      <sd-layout-header>Header</sd-layout-header>
      <sd-layout-content>Content</sd-layout-content>
      <sd-layout-footer>Footer</sd-layout-footer>
    </sd-layout>
    <br />
    <sd-layout class="sd:h-100">
      <sd-layout-header>Header</sd-layout-header>
      <sd-layout>
        <sd-layout-sider theme="dark">Sider</sd-layout-sider>
        <sd-layout-content>Content</sd-layout-content>
      </sd-layout>
      <sd-layout-footer>Footer</sd-layout-footer>
    </sd-layout>
    <br />
    <sd-layout class="sd:h-100">
      <sd-layout-header>Header</sd-layout-header>
      <sd-layout>
        <sd-layout-content>Content</sd-layout-content>
        <sd-layout-sider>Sider</sd-layout-sider>
      </sd-layout>
      <sd-layout-footer>Footer</sd-layout-footer>
    </sd-layout>
    <br />
    <sd-layout class="sd:h-100">
      <sd-layout-header>Header</sd-layout-header>
      <sd-layout>
        <sd-layout-sider :width="64">Sider</sd-layout-sider>
        <sd-layout-sider :width="206" class="sd:ml-px">Sider</sd-layout-sider>
        <sd-layout-content>Content</sd-layout-content>
      </sd-layout>
      <sd-layout-footer>Footer</sd-layout-footer>
    </sd-layout>
  </div>
</template>
<style scoped>
  .layout-demo :deep(.sd-layout-header),
  .layout-demo :deep(.sd-layout-footer),
  .layout-demo :deep(.sd-layout-sider-children),
  .layout-demo :deep(.sd-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
  }

  .layout-demo :deep(.sd-layout-header),
  .layout-demo :deep(.sd-layout-footer) {
    height: 64px;
    background-color: var(--color-primary-light-4);
  }

  .layout-demo :deep(.sd-layout-sider) {
    width: 206px;
    background-color: var(--color-primary-light-3);
  }

  .layout-demo :deep(.sd-layout-content) {
    background-color: rgb(var(--sdblue-6));
  }
</style>
