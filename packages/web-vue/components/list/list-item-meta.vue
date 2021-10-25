<template>
  <div :class="prefixCls">
    <div v-if="$slots.avatar" :class="`${prefixCls}-avatar`">
      <slot name="avatar" />
    </div>
    <div v-if="hasContent" :class="`${prefixCls}-content`">
      <div v-if="$slots.title || title" :class="`${prefixCls}-title`">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="$slots.description || description"
        :class="`${prefixCls}-description`"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'ListItemMeta',
  props: {
    /**
     * @zh 标题
     * @en Title
     */
    title: String,
    /**
     * @zh 描述内容
     * @en Description
     */
    description: String,
  },
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 描述内容
   * @en Description
   * @slot description
   */
  /**
   * @zh 头像
   * @en Avatar
   * @slot avatar
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('list-item-meta');
    const hasContent = Boolean(
      props.title || props.description || slots.title || slots.description
    );

    return {
      prefixCls,
      hasContent,
    };
  },
});
</script>
