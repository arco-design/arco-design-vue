<template>
  <div :class="`${prefixCls}-status`">
    <sd-spin v-if="status === 'loading'" dot :size="20" />
    <template v-else-if="status === 'expired'">
      <p :class="`${prefixCls}-expired`">二维码已过期</p>
      <button type="button" :class="`${prefixCls}-refresh-btn`" @click="handleRefresh">
        刷新
      </button>
    </template>
    <p v-else-if="status === 'scanned'" :class="`${prefixCls}-scanned`">二维码已扫码</p>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';

  import SdSpin from '../spin';

  type QrCodeStatus = 'expired' | 'loading' | 'scanned';

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true,
    },
    status: {
      type: String as PropType<QrCodeStatus>,
      required: true,
    },
  });

  const emit = defineEmits<{
    /**
     * @zh 点击刷新时触发
     * @en Triggered when refresh action is clicked
     */
    refresh: [];
  }>();

  const handleRefresh = () => {
    emit('refresh');
  };
</script>
