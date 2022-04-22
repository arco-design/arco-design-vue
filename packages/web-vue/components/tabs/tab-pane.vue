<template>
  <div
    ref="itemRef"
    :class="[
      `${prefixCls}-content-item`,
      { [`${prefixCls}-content-item-active`]: active },
    ]"
  >
    <div v-if="mounted" :class="`${prefixCls}-pane`">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { useIndex } from '../_hooks/use-index';
import { TabsContext, tabsInjectionKey } from './context';

export default defineComponent({
  name: 'TabPane',
  props: {
    /**
     * @zh 选项卡的标题
     * @en Title of the tab
     */
    title: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否允许关闭此选项卡（仅在可编辑模式生效）
     * @en Whether to allow this tab to be closed (only effective in editable mode)
     */
    closable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const { title, disabled, closable } = toRefs(props);
    const instance = getCurrentInstance();
    const prefixCls = getPrefixCls('tabs');
    const tabsCtx = inject<Partial<TabsContext>>(tabsInjectionKey, {});

    const itemRef = ref<HTMLElement>();
    const key = computed(() => instance?.vnode.key as string | number);
    const active = computed(() => key.value === tabsCtx.activeKey);
    const mounted = ref(!tabsCtx.lazyLoad);

    const { computedIndex } = useIndex({
      itemRef,
      selector: `.${prefixCls}-content-item`,
    });

    const data = reactive({
      index: computedIndex,
      key,
      title: slots.title ?? (() => title?.value),
      disabled,
      closable,
    });

    if (instance?.uid) {
      tabsCtx.addItem?.(instance.uid, data);
    }

    onBeforeUnmount(() => {
      if (instance?.uid) {
        tabsCtx.removeItem?.(instance.uid);
      }
    });

    watch(
      active,
      (active) => {
        if (active && !mounted.value) {
          mounted.value = true;
        }
      },
      { immediate: true }
    );

    return {
      prefixCls,
      active,
      itemRef,
      mounted,
    };
  },
});
</script>
