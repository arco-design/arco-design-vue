<template>
  <div
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percent"
    :class="`${prefixCls}-wrapper`"
  >
    <div :class="prefixCls" :style="{ height: `${mergedStrokeWidth}px` }">
      <div
        v-for="(active, index) of stepList"
        :key="index"
        :class="[
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: active,
          },
        ]"
        :style="getStepStyle(active)"
      />
    </div>
    <div v-if="showText" :class="`${prefixCls}-text`">
      <slot name="text" :percent="percent">
        {{ text }}
        <icon-exclamation-circle-fill v-if="status === 'danger'" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType, type CSSProperties } from 'vue';

  import NP from 'number-precision';

  import { getPrefixCls } from '../_utils/global-config';
  import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';

  defineOptions({ name: 'ProgressSteps' });

  const props = defineProps({
    steps: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
    },
    color: {
      type: [String, Object],
      default: undefined,
    },
    trackColor: String,
    strokeWidth: {
      type: Number,
    },
    status: {
      type: String,
      default: undefined,
    },
    showText: {
      type: Boolean,
      default: true,
    },
  });

  const prefixCls = getPrefixCls('progress-steps');
  const activeColor = computed(() => (typeof props.color === 'string' ? props.color : undefined));

  const mergedStrokeWidth = computed(() => ((props.strokeWidth ?? props.size === 'small') ? 8 : 4));

  const stepList = computed(() =>
    [...Array(props.steps)].map((_, index) => {
      return props.percent > 0 && props.percent > (1 / props.steps) * index;
    }),
  );

  const text = computed(() => `${NP.times(props.percent, 100)}%`);
  const getStepStyle = (active: boolean): CSSProperties => ({
    backgroundColor: active ? activeColor.value : props.trackColor,
  });
</script>
