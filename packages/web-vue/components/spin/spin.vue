<template>
  <div :class="cls">
    <template v-if="$slots.default">
      <slot />
      <div v-if="loading" :class="`${prefixCls}-mask`">
        <div :class="`${prefixCls}-mask-icon`">
          <div v-if="loading" :class="`${prefixCls}-icon`">
            <a-dot-loading v-if="dot" />
            <icon-loading v-else :spin="true" />
          </div>
          <div v-if="tip" :class="`${prefixCls}-tip`">{{ tip }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div :class="`${prefixCls}-icon`">
        <a-dot-loading v-if="dot" />
        <icon-loading v-else :spin="true" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconLoading from '../icon/icon-loading';
import ADotLoading from './DotLoading';

export default defineComponent({
  name: 'Spin',
  components: {
    ADotLoading,
    IconLoading,
  },
  props: {
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: Boolean,
    /**
     * @zh 是否使用点类型的动画
     * @en Whether to use dot type animation
     */
    dot: Boolean,
    /**
     * @zh 提示内容
     * @en Prompt content
     */
    tip: String,
  },
  setup(props) {
    const prefixCls = getPrefixCls('spin');

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-loading`]: props.loading,
      },
    ]);

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
