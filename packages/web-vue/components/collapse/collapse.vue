<template>
  <div :class="cls">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isArray } from '../_utils/is';
import { collapseKey } from './context';

const EXPAND_ICON_POSITIONS = ['left', 'right'] as const;
type ExpandIconPositions = typeof EXPAND_ICON_POSITIONS[number];

export default defineComponent({
  name: 'Collapse',
  props: {
    /**
     * @zh 当前展开的面板的 `key`
     * @en The `key` of the currently expanded panel
     * @vModel
     */
    activeKey: {
      type: Array as PropType<(string | number)[]>,
      default: undefined,
    },
    /**
     * @zh 默认展开的面板的 `key` （非受控模式）
     * @en The `key` of the panel expanded by default (uncontrolled mode)
     */
    defaultActiveKey: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    },
    /**
     * @zh 是否开启手风琴模式
     * @en Whether to enable accordion mode
     */
    accordion: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 展开图标显示的位置
     * @en The location where the expand icon is displayed
     * @values 'left', 'right'
     */
    expandIconPosition: {
      type: String as PropType<ExpandIconPositions>,
      default: 'left',
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    // for JSX
    onChange: {
      type: Function as PropType<
        (activeKey: string | number | (string | number)[]) => void
      >,
    },
  },
  emits: [
    'update:activeKey',
    /**
     * @zh 展开的面板发生改变时触发
     * @en Emitted when the expanded panel changes
     */
    'change',
  ],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('collapse');
    const { expandIconPosition } = toRefs(props);

    const _activeKey = ref(props.defaultActiveKey);
    const computedActiveKeys = computed(() => {
      const activeKey = props.activeKey ?? _activeKey.value;
      if (!isArray(activeKey)) {
        return [activeKey];
      }
      return activeKey;
    });

    const handleClick = (key: string | number, e: Event) => {
      let newActiveKeys: (string | number)[] = [];
      if (props.accordion) {
        if (!computedActiveKeys.value.includes(key)) {
          newActiveKeys = [key];
        }
        _activeKey.value = newActiveKeys;
      } else {
        newActiveKeys = [...computedActiveKeys.value];
        const _index = newActiveKeys.indexOf(key);
        if (_index > -1) {
          newActiveKeys.splice(_index, 1);
        } else if (props.accordion) {
          newActiveKeys = [key];
        } else {
          newActiveKeys.push(key);
        }
        _activeKey.value = newActiveKeys;
      }
      emit('update:activeKey', newActiveKeys);
      emit('change', newActiveKeys, e);
    };

    provide(
      collapseKey,
      reactive({
        activeKeys: computedActiveKeys,
        expandIconPosition,
        handleClick,
      })
    );

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-borderless`]: !props.bordered,
      },
    ]);

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
