<template>
  <component :is="simple ? 'span' : 'li'" :class="cls" @click="handleClick">
    <slot :type="isNext ? 'next' : 'previous'">
      <icon-right v-if="isNext" />
      <icon-left v-else />
    </slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconLeft from '../icon/icon-left';
import IconRight from '../icon/icon-right';
import { getLegalPage } from './utils';

export default defineComponent({
  name: 'StepPager',
  components: {
    IconLeft,
    IconRight,
  },
  props: {
    pages: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('pagination-item');
    const isNext = props.type === 'next';
    const mergedDisabled = computed(() => {
      if (props.disabled) {
        return props.disabled;
      }
      if (!props.pages) {
        return true;
      }
      if (isNext && props.current === props.pages) {
        return true;
      }
      return !isNext && props.current <= 1;
    });
    const nextPage = computed(() =>
      getLegalPage(props.current + (isNext ? 1 : -1), {
        min: 1,
        max: props.pages,
      })
    );

    const handleClick = (e: MouseEvent) => {
      if (!mergedDisabled.value) {
        emit('click', nextPage.value);
      }
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.type}`,
      {
        [`${prefixCls}-disabled`]: mergedDisabled.value,
      },
    ]);

    return {
      prefixCls,
      cls,
      isNext,
      handleClick,
    };
  },
});
</script>
