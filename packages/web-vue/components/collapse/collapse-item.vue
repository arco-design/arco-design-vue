<template>
  <div :class="cls">
    <div :class="headerCls" @click="handleClick">
      <icon-hover :prefix="prefixCls" :class="iconCls" :disabled="disabled">
        <icon-caret-left
          v-if="expandIconPosition === 'right'"
          :class="`${prefixCls}-expand-icon`"
        />
        <icon-caret-right v-else :class="`${prefixCls}-expand-icon`" />
      </icon-hover>
      <div :class="`${prefixCls}-header-title`">
        <slot name="header">
          {{ header }}
        </slot>
      </div>
      <div v-if="$slots.extra" :class="`${prefixCls}-header-extra`">
        <slot name="extra" />
      </div>
    </div>
    <transition name="collapse-slider" v-bind="transitionEvents" appear>
      <div v-if="isActive" :class="contentCls">
        <div ref="contentBoxRef" :class="`${prefixCls}-content-box`">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { collapseKey } from './context';
import IconHover from '../_components/icon-hover.vue';
import IconCaretRight from '../icon/icon-caret-right';
import IconCaretLeft from '../icon/icon-caret-left';
import { isNumber } from '../_utils/is';

export default defineComponent({
  name: 'CollapseItem',
  components: { IconHover, IconCaretRight, IconCaretLeft },
  props: {
    /**
     * @zh 面板的 id，对应 `activeKey` 中的值
     * @en The id of the panel, corresponding to the value in `activeKey`
     */
    key: String,
    /**
     * @zh 面板的标题
     * @en The title of the panel
     */
    header: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示展开图标
     * @en Whether to show the expand icon
     */
    showExpandIcon: {
      type: Boolean,
      default: true,
    },
  },
  /**
   * @zh 面板的标题
   * @en The title of the panel
   * @slot header
   */
  setup(props) {
    const prefixCls = getPrefixCls('collapse-item');
    const component = getCurrentInstance();
    const collapseCtx = inject(collapseKey, undefined);
    const key =
      component && isNumber(component?.vnode.key)
        ? component.vnode.key
        : String(component?.vnode.key ?? '');
    const isActive = computed(() => collapseCtx?.activeKeys.includes(key));
    const expandIconPosition = computed(
      () => collapseCtx?.expandIconPosition ?? 'left'
    );

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        collapseCtx?.handleClick(key, e);
      }
    };

    const transitionEvents = {
      // appear单独处理
      onAppear: (el: HTMLDivElement) => {
        el.style.height = 'auto';
      },
      onBeforeEnter: (el: HTMLDivElement) => {
        el.style.display = 'block';
      },
      onEnter: (el: HTMLDivElement) => {
        el.style.height = `${el.scrollHeight}px`;
      },
      onAfterEnter: (el: HTMLDivElement) => {
        el.style.height = 'auto';
      },
      onBeforeLeave: (el: HTMLDivElement) => {
        el.style.display = 'block';
        el.style.height = `${el.scrollHeight}px`;
      },
      onLeave: (el: HTMLDivElement) => {
        el.style.height = '0';
      },
      onAfterLeave: (el: HTMLDivElement) => {
        el.style.display = 'none';
      },
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: isActive.value,
      },
    ]);

    const headerCls = computed(() => [
      `${prefixCls}-header`,
      `${prefixCls}-header-${collapseCtx?.expandIconPosition}`,
      {
        [`${prefixCls}-header-disabled`]: props.disabled,
      },
    ]);

    const iconCls = computed(() => [
      {
        [`${prefixCls}-icon-right`]:
          collapseCtx?.expandIconPosition === 'right',
      },
    ]);

    const contentCls = computed(() => [
      `${prefixCls}-content`,
      {
        [`${prefixCls}-content-expend`]: isActive.value,
      },
    ]);

    return {
      prefixCls,
      cls,
      headerCls,
      iconCls,
      contentCls,
      isActive,
      expandIconPosition,
      transitionEvents,
      handleClick,
    };
  },
  /**
   * @zh 标题内容
   * @en Header Content
   * @slot header
   */
  /**
   * @zh 额外内容
   * @en Extra Content
   * @slot extra
   */
  render: undefined,
});
</script>
