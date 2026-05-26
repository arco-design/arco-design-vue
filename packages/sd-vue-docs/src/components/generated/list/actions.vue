<template>
  <sd-list>
    <sd-list-item v-for="idx in 4" :key="idx">
      <sd-list-item-meta
        title="Beijing Bytedance Technology Co., Ltd."
        description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <sd-avatar shape="square">
            <img alt="avatar" src="https://picsum.photos/1000/1000" />
          </sd-avatar>
        </template>
      </sd-list-item-meta>
      <template #actions>
        <icon-edit />
        <icon-delete />
      </template>
    </sd-list-item>
  </sd-list>
</template>
