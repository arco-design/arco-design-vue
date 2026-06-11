<template>
  <div :class="cls" :style="style" />
</template>

<script setup lang="ts">
  import type { CSSProperties, PropType } from 'vue';
  import { computed, nextTick, onMounted, onUpdated, ref } from 'vue';

  import { Direction } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'TabsNavInk' });

  const props = defineProps({
    activeTabRef: {
      type: Object as PropType<HTMLElement>,
    },
    direction: {
      type: String as PropType<Direction>,
    },
    disabled: Boolean,
    animation: Boolean,
  });

  const prefixCls = getPrefixCls('tabs-nav-ink');
  const position = ref(0);
  const size = ref(0);

  const style = computed<CSSProperties>(() => {
    if (props.direction === 'vertical') {
      return {
        top: `${position.value}px`,
        height: `${size.value}px`,
      };
    }
    return {
      left: `${position.value}px`,
      width: `${size.value}px`,
    };
  });

  const getInkStyle = () => {
    const _activeTabRef = props.activeTabRef;
    if (_activeTabRef) {
      const _position =
        props.direction === 'vertical' ? _activeTabRef.offsetTop : _activeTabRef.offsetLeft;
      const _size =
        props.direction === 'vertical' ? _activeTabRef.offsetHeight : _activeTabRef.offsetWidth;
      if (_position !== position.value || _size !== size.value) {
        position.value = _position;
        size.value = _size;
      }
    }
  };

  onMounted(() => {
    nextTick(() => getInkStyle());
  });

  onUpdated(() => {
    getInkStyle();
  });

  const cls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-animation`]: props.animation,
      [`${prefixCls}-disabled`]: props.disabled,
    },
  ]);

  defineExpose({
    getInkStyle,
  });
</script>
