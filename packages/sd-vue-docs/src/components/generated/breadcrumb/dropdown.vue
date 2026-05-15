<template>
  <sd-space direction="vertical">
    <sd-breadcrumb :routes="routes" />
    <sd-breadcrumb>
      <sd-breadcrumb-item>Home</sd-breadcrumb-item>
      <sd-breadcrumb-item :droplist="droplist"> Channel </sd-breadcrumb-item>
      <sd-breadcrumb-item>News</sd-breadcrumb-item>
    </sd-breadcrumb>
    <sd-breadcrumb>
      <sd-breadcrumb-item>Home</sd-breadcrumb-item>
      <sd-breadcrumb-item>
        <template #droplist>
          <sd-doption>Option 1</sd-doption>
          <sd-dsubmenu value="option-1">
            <template #default>Option 2</template>
            <template #content>
              <sd-doption>Option 2-1</sd-doption>
              <sd-doption>Option 2-2</sd-doption>
              <sd-doption>Option 2-3</sd-doption>
            </template>
            <template #footer>
              <div class="sd:p-1.5 sd:text-center">
                <sd-button>Click</sd-button>
              </div>
            </template>
          </sd-dsubmenu>
          <sd-doption>Option 3</sd-doption>
        </template>
        Channel
      </sd-breadcrumb-item>
      <sd-breadcrumb-item>News</sd-breadcrumb-item>
    </sd-breadcrumb>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const routes = ref([
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/channel',
      label: 'Channel',
      children: [
        {
          path: '/users',
          label: 'Users',
        },
        {
          path: '/permission',
          label: 'Permission',
        },
      ],
    },
    {
      path: '/news',
      label: 'News',
    },
  ]);

  const droplist = ref([
    {
      path: '/goods',
      label: 'Goods',
    },
    {
      path: '/wallet',
      label: 'Wallet',
    },
  ]);
</script>
