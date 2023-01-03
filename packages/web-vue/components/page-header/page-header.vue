<template>
  <div :class="cls">
    <div :class="`${prefixCls}-wrapper`">
      <div v-if="$slots.breadcrumb" :class="`${prefixCls}-breadcrumb`">
        <slot name="breadcrumb" />
      </div>
      <div :class="`${prefixCls}-header`">
        <span :class="`${prefixCls}-main`">
          <a-icon-hover
            v-if="showBack"
            :class="`${prefixCls}-back-btn`"
            :prefix="prefixCls"
            @click="handleBack"
          >
            <slot name="back-icon">
              <icon-left />
            </slot>
          </a-icon-hover>
          <span :class="`${prefixCls}-title`">
            <slot name="title">{{ title }}</slot>
          </span>
          <span
            v-if="$slots.subtitle || subtitle"
            :class="`${prefixCls}-divider`"
          />
          <span
            v-if="$slots.subtitle || subtitle"
            :class="`${prefixCls}-subtitle`"
          >
            <slot name="subtitle">{{ subtitle }}</slot>
          </span>
        </span>
        <span v-if="$slots.extra" :class="`${prefixCls}-extra`">
          <slot name="extra" />
        </span>
      </div>
    </div>
    <div v-if="$slots.default" :class="`${prefixCls}-content`">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import AIconHover from '../_components/icon-hover.vue';
import IconLeft from '../icon/icon-left';

export default defineComponent({
  name: 'PageHeader',
  components: { AIconHover, IconLeft },
  props: {
    /**
     * @zh 页头的主标题
     * @en Main title
     */
    title: String,
    /**
     * @zh 页头的次标题
     * @en Subtitle
     */
    subtitle: String,
    /**
     * @zh 是否显示返回按钮
     * @en Whether to show the back button
     */
    showBack: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    /**
     * @zh 点击返回按钮时触发
     * @en Emitted when the back button is clicked
     * @property {Event} event
     */
    'back',
  ],
  /**
   * @zh 返回按钮
   * @en Back icon
   * @slot back-icon
   * @version 2.36.0
   */
  /**
   * @zh 主标题
   * @en Main title
   * @slot title
   */
  /**
   * @zh 次标题
   * @en Subtitle
   * @slot subtitle
   */
  /**
   * @zh 面包屑
   * @en Breadcrumb
   * @slot breadcrumb
   */
  /**
   * @zh 额外的展示内容
   * @en Extra content
   * @slot extra
   */
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('page-header');

    const handleBack = (e: Event) => {
      emit('back', e);
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-with-breadcrumb`]: Boolean(slots.breadcrumb),
        [`${prefixCls}-with-content`]: Boolean(slots.default),
      },
    ]);

    return {
      prefixCls,
      cls,
      handleBack,
    };
  },
});
</script>
