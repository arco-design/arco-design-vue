<template>
  <span v-if="computedVisible" :class="cls" :style="style" @click="handleClick">
    <span v-if="$slots.icon" :class="`${prefixCls}-icon`">
      <slot name="icon" />
    </span>
    <slot />
    <icon-hover
      v-if="closable"
      :prefix="prefixCls"
      :class="`${prefixCls}-close-btn`"
      @click.stop="handleClose"
    >
      <slot name="close-icon">
        <icon-close />
      </slot>
    </icon-hover>
    <span v-if="loading" :class="`${prefixCls}-loading-icon`">
      <icon-loading />
    </span>
  </span>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent, ref, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import IconLoading from '../icon/icon-loading';
import { TAG_COLORS, TagColor } from './interface';
import { EmitType } from '../_utils/types';
import { useSize } from '../_hooks/use-size';

export default defineComponent({
  name: 'Tag',
  components: {
    IconHover,
    IconClose,
    IconLoading,
  },
  props: {
    /**
     * @zh 标签的颜色
     * @en Label color
     * @values 'red','orangered','orange','gold','lime','green','cyan','blue','arcoblue','purple','pinkpurple','magenta','gray'
     */
    color: {
      type: String as PropType<TagColor | string>,
    },
    /**
     * @zh 标签的大小
     * @en Label size
     * @values 'small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
    },
    /**
     * @zh 标签是否可见
     * @en Whether the tag is visible
     * @vModel
     */
    visible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 标签默认是否可见
     * @en Whether the tag is visible by default
     */
    defaultVisible: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 标签是否为加载中状态
     * @en Whether the tag is loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否可关闭
     * @en Whether the tag can be closed
     */
    closable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否可选中
     * @en Whether the tag can be checked
     */
    checkable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签是否选中（标签可选中时可用）
     * @en Whether the tag is checked (available when the tag is checkable)
     * @vModel
     */
    checked: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 标签默认选中状态（标签可选中时可用）
     * @en Whether the tag is checked by default (available when the tag is checkable)
     */
    defaultChecked: {
      type: Boolean,
      default: true,
    },
    // for JSX
    onClose: {
      type: [Function, Array] as PropType<
        EmitType<(event: MouseEvent) => void>
      >,
    },
    onCheck: {
      type: [Function, Array] as PropType<
        EmitType<(checked: boolean, event: MouseEvent) => void>
      >,
    },
  },
  emits: [
    'update:visible',
    'update:checked',
    /**
     * @zh 点击关闭按钮时触发
     * @en Emitted when the close button is clicked
     */
    'close',
    /**
     * @zh 用户选中时触发（仅在可选中模式下触发）
     * @en Emitted when the user check (emit only in the checkable mode)
     */
    'check',
  ],
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  /**
   * @zh 关闭按钮的图标
   * @en Close button icon
   * @slot close-icon
   */
  setup(props, { emit }) {
    const { size } = toRefs(props);
    const prefixCls = getPrefixCls('tag');
    const isBuiltInColor = computed(
      () => props.color && TAG_COLORS.includes(props.color)
    );
    const isCustomColor = computed(
      () => props.color && !TAG_COLORS.includes(props.color)
    );
    const _visible = ref(props.defaultVisible);
    const _checked = ref(props.defaultChecked);
    const computedVisible = computed(() => props.visible ?? _visible.value);
    const computedChecked = computed(() =>
      props.checkable ? props.checked ?? _checked.value : true
    );
    const { mergedSize: _mergedSize } = useSize(size);
    const mergedSize = computed(() => {
      if (_mergedSize.value === 'mini') {
        return 'small';
      }
      return _mergedSize.value;
    });

    const handleClose = (ev: MouseEvent) => {
      _visible.value = false;
      emit('update:visible', false);
      emit('close', ev);
    };

    const handleClick = (ev: MouseEvent) => {
      if (props.checkable) {
        const newChecked = !computedChecked.value;
        _checked.value = newChecked;
        emit('update:checked', newChecked);
        emit('check', newChecked, ev);
      }
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-loading`]: props.loading,
        [`${prefixCls}-hide`]: !computedVisible.value,
        [`${prefixCls}-${props.color}`]: isBuiltInColor.value,
        [`${prefixCls}-checkable`]: props.checkable,
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-custom-color`]: isCustomColor.value,
      },
    ]);

    const style = computed(() => {
      if (isCustomColor.value) {
        return {
          backgroundColor: props.color,
        } as CSSProperties;
      }
      return undefined;
    });

    return {
      prefixCls,
      cls,
      style,
      computedVisible,
      computedChecked,
      handleClick,
      handleClose,
    };
  },
});
</script>
