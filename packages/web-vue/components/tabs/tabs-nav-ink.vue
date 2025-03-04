<template>
  <div :class="cls" :style="style" />
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  toRefs,
  watch,
  inject,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { Direction } from '../_utils/constant';
import { configProviderInjectionKey } from '../config-provider/context';

export default defineComponent({
  name: 'TabsNavInk',
  props: {
    activeTabRef: {
      type: Object as PropType<HTMLElement>,
    },
    direction: {
      type: String as PropType<Direction>,
    },
    disabled: Boolean,
    animation: Boolean,
  },
  setup(props) {
    const { activeTabRef } = toRefs(props);
    const prefixCls = getPrefixCls('tabs-nav-ink');
    const position = ref(0);
    const size = ref(0);
    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => {
      return configCtx?.rtl ?? false;
    });

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
      if (activeTabRef.value) {
        const _position =
          props.direction === 'vertical'
            ? activeTabRef.value.offsetTop
            : activeTabRef.value.offsetLeft;
        const _size =
          props.direction === 'vertical'
            ? activeTabRef.value.offsetHeight
            : activeTabRef.value.offsetWidth;
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

    watch(rtl, () => {
      nextTick(() => getInkStyle());
    });

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-animation`]: props.animation,
        [`${prefixCls}-disabled`]: props.disabled,
      },
    ]);

    return {
      prefixCls,
      cls,
      style,
    };
  },
});
</script>
