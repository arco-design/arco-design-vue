<template>
  <div class="config-provider-modal-drawer-demo">
    <sd-config-provider :modal="modalDefaults" :drawer="drawerDefaults">
      <sd-space>
        <sd-button type="primary" @click="modalVisible = true">打开 Modal</sd-button>
        <sd-button @click="drawerVisible = true">打开 Drawer</sd-button>
      </sd-space>

      <sd-modal v-model:visible="modalVisible" title="全局默认值示例">
        Modal 将继承 ConfigProvider.modal 配置。
      </sd-modal>

      <sd-drawer v-model:visible="drawerVisible" title="全局默认值示例">
        Drawer 将继承 ConfigProvider.drawer 配置。
      </sd-drawer>
    </sd-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  type ModalDefaults = {
    mask?: boolean;
    closable?: boolean;
    hideCancel?: boolean;
    alignCenter?: boolean;
    titleAlign?: 'start' | 'center';
    top?: number | string;
    maskStyle?: Record<string, string>;
    draggable?: boolean;
    escToClose?: boolean;
    okText?: string;
    cancelText?: string;
    width?: number | string;
  };

  type DrawerDefaults = {
    placement?: 'top' | 'right' | 'bottom' | 'left';
    mask?: boolean;
    closable?: boolean;
    hideCancel?: boolean;
    escToClose?: boolean;
    okText?: string;
    cancelText?: string;
    width?: number | string;
    height?: number | string;
  };

  const modalVisible = ref(false);
  const drawerVisible = ref(false);

  const modalDefaults: ModalDefaults = {
    mask: false,
    closable: false,
    hideCancel: true,
    alignCenter: false,
    titleAlign: 'start',
    top: '10vh',
    maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
    draggable: true,
    escToClose: false,
    okText: '全局确认',
    cancelText: '全局取消',
    width: 520,
  };

  const drawerDefaults: DrawerDefaults = {
    placement: 'bottom',
    mask: false,
    closable: false,
    hideCancel: true,
    escToClose: false,
    okText: '全局确认',
    cancelText: '全局取消',
    height: 360,
  };
</script>

<style scoped>
  .config-provider-modal-drawer-demo {
    display: grid;
    gap: 12px;
  }
</style>
