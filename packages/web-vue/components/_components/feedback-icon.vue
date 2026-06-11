<template>
  <span :class="cls">
    <icon-loading v-if="type === 'validating'" />
    <icon-check-circle-fill v-else-if="type === 'success'" />
    <icon-exclamation-circle-fill v-else-if="type === 'warning'" />
    <icon-close-circle-fill v-else-if="type === 'error'" />
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import IconCheckCircleFill from '../icon/icon-check-circle-fill';
  import IconCloseCircleFill from '../icon/icon-close-circle-fill';
  import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
  import IconLoading from '../icon/icon-loading';

  defineOptions({ name: 'FeedbackIcon' });

  const props = defineProps({
    type: {
      type: String,
    },
  });

  const prefixCls = getPrefixCls('feedback-icon');

  const cls = computed(() => [prefixCls, `${prefixCls}-status-${props.type}`]);
</script>
