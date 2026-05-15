<template>
  <sd-config-provider>
    <template #empty="scope">
      <sd-empty
        v-if="scope?.component === 'cascader'"
        description="cascader no data!"
        in-config-provider
      >
      </sd-empty>
      <sd-empty
        v-else-if="scope?.component === 'select'"
        description="select no data!"
        in-config-provider
      ></sd-empty>
      <sd-empty
        v-else-if="scope?.component === 'tree-select'"
        description="tree-select no data!"
        in-config-provider
      ></sd-empty>
      <sd-empty
        v-else-if="scope?.component === 'list'"
        description="list no data!"
        in-config-provider
      ></sd-empty>
      <sd-empty
        v-else-if="scope?.component === 'table'"
        description="table no data!"
        in-config-provider
      ></sd-empty>
      <div v-else class="my-empty">
        <icon-trophy />
      </div>
    </template>
    <sd-space direction="vertical" fill>
      <sd-cascader :options="[]" placeholder="cascader" allow-search />
      <sd-select placeholder="select" allow-search />
      <sd-tree-select placeholder="tree-select" />
      <sd-list>
        <template #header> Empty List </template>
      </sd-list>
      <sd-table :columns="columns" :data="[]" />
      <sd-empty></sd-empty>
    </sd-space>
  </sd-config-provider>
</template>

<script setup lang="ts">
  import { IconTrophy } from '@sdata/web-vue/es/icon/index.js';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
</script>

<style>
  .my-empty {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    text-align: center;
  }
</style>
