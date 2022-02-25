<template>
  <component
    :is="component"
    v-show="isValid"
    ref="itemRef"
    :class="[cls, { [`${prefixCls}-has-suffix`]: Boolean($slots.suffix) }]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span v-if="$slots.icon" :class="`${prefixCls}-icon`">
      <slot name="icon" />
    </span>
    <checkbox
      v-if="selectCtx && selectCtx.multiple"
      :class="`${prefixCls}-checkbox`"
      :model-value="isSelected"
      :disabled="disabled"
      uninject-group-context
    >
      <slot />
    </checkbox>
    <template v-else>
      <slot />
    </template>
    <span v-if="$slots.suffix" :class="`${prefixCls}-suffix`">
      <slot name="suffix" />
    </span>
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  inject,
  reactive,
  ref,
  toRefs,
  watch,
  onBeforeUnmount,
  onMounted,
} from 'vue';
import type { TagProps } from '../tag';
import { getPrefixCls } from '../_utils/global-config';
import { useIndex } from '../_hooks/use-index';
import Checkbox from '../checkbox';
import { selectInjectionKey } from './context';
import { getKeyFromValue, isValidOption } from './utils';

export default defineComponent({
  name: 'Option',
  components: {
    Checkbox,
  },
  props: {
    /**
     * @zh 选项值（如不填，会从内容中获取）
     * @en Option value (if not filled, it will be obtained from the content)
     */
    value: [String, Number, Object],
    /**
     * @zh 选项标签（如不填，会从内容中获取）
     * @en Option label (if not filled, it will be obtained from the content)
     */
    label: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: Boolean,
    /**
     * @zh 展示的标签属性
     * @en Displayed tag attributes
     * @version 2.8.0
     */
    tagProps: {
      type: Object as PropType<TagProps>,
    },
    /**
     * @zh 额外数据
     * @en Extra data
     * @version 2.10.0
     */
    extra: {
      type: Object,
    },
    // private
    internal: Boolean,
  },
  setup(props) {
    const { disabled, tagProps } = toRefs(props);
    const prefixCls = getPrefixCls('select-option');
    const selectCtx = inject(selectInjectionKey, undefined);
    const itemRef = ref<HTMLElement>();

    const value = ref(props.value ?? props.label ?? '');
    const label = ref(props.label ?? '');
    const component = computed(() => selectCtx?.component ?? 'li');

    onMounted(() => {
      if ((value.value === '' || label.value === '') && itemRef.value) {
        const text = itemRef.value.textContent ?? '';
        if (value.value === '') {
          value.value = text;
        }
        if (label.value === '') {
          label.value = text;
        }
      }
    });

    const key = computed(() =>
      getKeyFromValue(value.value, selectCtx?.valueKey)
    );

    const isSelected = computed(
      () => selectCtx?.valueKeys.includes(key.value) ?? false
    );
    const isActive = computed(
      () => selectCtx?.activeKey === key.value ?? false
    );
    let isValid = ref(true);

    if (!props.internal) {
      const { computedIndex } = useIndex({
        itemRef,
        selector: `.${prefixCls}`,
      });

      const optionInfo = reactive({
        ref: itemRef,
        index: computedIndex,
        key,
        origin: 'slot' as const,
        value,
        label,
        disabled,
        tagProps,
      });

      isValid = computed(() =>
        isValidOption(optionInfo, {
          inputValue: selectCtx?.inputValue,
          filterOption: selectCtx?.filterOption,
        })
      );

      watch(
        key,
        (cur, pre) => {
          if (pre) {
            selectCtx?.removeSlotOptionInfo(pre);
          }
          if (cur) {
            selectCtx?.addSlotOptionInfo(cur, optionInfo);
          }
        },
        { immediate: true }
      );

      onBeforeUnmount(() => {
        selectCtx?.removeSlotOptionInfo(key.value);
      });
    }

    const handleClick = (ev: MouseEvent) => {
      if (!props.disabled) {
        selectCtx?.onSelect(key.value, ev);
      }
    };

    const handleMouseEnter = () => {
      if (!props.disabled) {
        selectCtx?.setActiveKey(key.value);
      }
    };

    const handleMouseLeave = () => {
      if (!props.disabled) {
        selectCtx?.setActiveKey();
      }
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-multiple`]: selectCtx?.multiple,
      },
    ]);

    return {
      prefixCls,
      cls,
      selectCtx,
      itemRef,
      component,
      isSelected,
      isValid,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
    };
  },
});
</script>
