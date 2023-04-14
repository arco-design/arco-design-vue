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
  onUpdated,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
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
    /**
     * @zh 是否在不显示标签时销毁内容
     * @en Whether to destroy the content when the label is not displayed
     * @version 2.27.0
     */
    destroyOnHide: {
      type: Boolean,
      default: false,
    },
  },
  /**
   * @zh 选项卡标题
   * @en Tab title
   * @slot title
   */
  setup(props, { slots }) {
    const { title, disabled, closable } = toRefs(props);
    const instance = getCurrentInstance();
    const prefixCls = getPrefixCls('tabs');
    const tabsCtx = inject<Partial<TabsContext>>(tabsInjectionKey, {});

    const itemRef = ref<HTMLElement>();
    const key = computed(() => instance?.vnode.key as string | number);
    const active = computed(() => key.value === tabsCtx.activeKey);
    const mounted = ref(tabsCtx.lazyLoad ? active.value : true);

    const data = reactive({
      key,
      title,
      disabled,
      closable,
      slots,
    });

    if (instance?.uid) {
      tabsCtx.addItem?.(instance.uid, data);
    }

    onBeforeUnmount(() => {
      if (instance?.uid) {
        tabsCtx.removeItem?.(instance.uid);
      }
    });

    watch(active, (active) => {
      if (active) {
        if (!mounted.value) {
          mounted.value = true;
        }
      } else if (props.destroyOnHide || tabsCtx.destroyOnHide) {
        mounted.value = false;
      }
    });

    onUpdated(() => {
      data.slots = { ...slots };
    });

    return {
      prefixCls,
      active,
      itemRef,
      mounted,
    };
  },
});
</script>
