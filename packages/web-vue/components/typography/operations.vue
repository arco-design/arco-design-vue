<template>
  <template v-if="editable">
    <Tooltip :content="t('typography.edit')" v-bind="editTooltipProps">
      <span :class="`${prefixCls}-operation-edit`" @click.stop="onEditClick">
        <IconEdit />
      </span>
    </Tooltip>
  </template>
  <template v-if="copyable">
    <Tooltip v-bind="copyTooltipProps">
      <template #content>
        <slot name="copy-tooltip" :copied="isCopied">
          {{ isCopied ? t('typography.copied') : t('typography.copy') }}
        </slot>
      </template>
      <span
        :class="{
          [`${prefixCls}-operation-copied`]: isCopied,
          [`${prefixCls}-operation-copy`]: !isCopied,
        }"
        @click.stop="onCopyClick"
      >
        <slot name="copy-icon" :copied="isCopied">
          <IconCheckCircleFill v-if="isCopied" />
          <IconCopy v-else />
        </slot>
      </span>
    </Tooltip>
  </template>
  <a
    v-if="showExpand"
    :class="`${prefixCls}-operation-expand`"
    @click.stop="onExpandClick"
  >
    <slot name="expand-node" :expanded="expanded">
      {{ expanded ? t('typography.collapse') : t('typography.expand') }}
    </slot>
  </a>
</template>
<script>
import { defineComponent, computed } from 'vue';
import Tooltip from '../tooltip';
import IconCheckCircleFill from '../icon/icon-check-circle-fill';
import IconCopy from '../icon/icon-copy';
import IconEdit from '../icon/icon-edit';
import { getPrefixCls } from '../_utils/global-config';
import { useI18n } from '../locale';

export default defineComponent({
  name: 'TypographyOperations',
  components: {
    Tooltip,
    IconCheckCircleFill,
    IconCopy,
    IconEdit,
  },
  props: {
    editable: Boolean,
    copyable: Boolean,
    expandable: Boolean,
    isCopied: Boolean,
    isEllipsis: Boolean,
    expanded: Boolean,
    forceRenderExpand: Boolean,
    editTooltipProps: Object,
    copyTooltipProps: Object,
  },
  emits: {
    /**
     * @zh 点击编辑时触发
     * @en Triggered when editing is clicked
     */
    edit: () => true,
    /**
     * @zh 点击复制时触发
     * @en Triggered when copy is clicked
     */
    copy: () => true,
    /**
     * @zh 点击展开时触发
     * @en Triggered when click to expand
     */
    expand: () => true,
  },
  /**
   * @zh 自定义复制按钮的 tooltip 内容
   * @en Customize the tooltip content of the copy button
   * @slot copy-tooltip
   * @binding {boolean} copied
   */
  /**
   * @zh 自定义复制按钮图标
   * @en Custom copy button icon
   * @slot copy-icon
   * @binding {boolean} copied
   */
  /**
   * @zh 自定义展开和折叠按钮
   * @en Custom expand and collapse buttons
   * @slot expand-node
   * @binding {boolean} expanded
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('typography');
    const showExpand = computed(
      () => props.forceRenderExpand || (props.expandable && props.isEllipsis)
    );
    const { t } = useI18n();

    return {
      prefixCls,
      showExpand,
      t,
      onEditClick() {
        emit('edit');
      },
      onCopyClick() {
        emit('copy');
      },
      onExpandClick() {
        emit('expand');
      },
    };
  },
});
</script>
