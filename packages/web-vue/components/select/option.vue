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
      <slot>{{ label }}</slot>
    </checkbox>
    <template v-else>
      <span :class="`${prefixCls}-content`"
        ><slot>{{ label }}</slot></span
      >
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
  onBeforeUnmount,
  onMounted,
  onUpdated,
  getCurrentInstance,
  watch,
} from 'vue';
import type { TagProps } from '../tag';
import { getPrefixCls } from '../_utils/global-config';
import Checkbox from '../checkbox';
import { selectInjectionKey } from './context';
import { getKeyFromValue, isValidOption } from './utils';
import { isEqual } from '../_utils/is-equal';

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
    value: {
      type: [String, Number, Boolean, Object],
      default: undefined,
    },
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
     * @zh 额外数据。2.18.0 版本废弃，可使用对象形式的 value 扩展数据
     * @en Extra data
     * @version 2.10.0
     */
    extra: {
      type: Object,
    },
    /**
     * @zh 用于手动指定选项的 index
     * @en index for manually specifying option
     * @version 2.20.0
     */
    index: {
      type: Number,
    },
    // private
    internal: Boolean,
  },
  setup(props) {
    const { disabled, tagProps: _tagProps, index } = toRefs(props);
    const prefixCls = getPrefixCls('select-option');
    const selectCtx = inject(selectInjectionKey, undefined);
    const instance = getCurrentInstance();
    const itemRef = ref<HTMLElement>();

    const tagProps = ref(_tagProps.value);

    watch(_tagProps, (cur, pre) => {
      if (!isEqual(cur, pre)) {
        tagProps.value = cur;
      }
    });

    const textContent = ref('');
    const value = computed(
      () => props.value ?? props.label ?? textContent.value
    );
    const label = computed(() => props.label ?? textContent.value);
    const key = computed(() =>
      getKeyFromValue(value.value, selectCtx?.valueKey)
    );
    const component = computed(() => selectCtx?.component ?? 'li');

    const setTextContent = () => {
      if (!props.label && itemRef.value) {
        const text = itemRef.value.textContent ?? '';
        if (textContent.value !== text) {
          textContent.value = text;
        }
      }
    };

    onMounted(() => setTextContent());
    onUpdated(() => setTextContent());

    const isSelected = computed(
      () => selectCtx?.valueKeys.includes(key.value) ?? false
    );
    const isActive = computed(
      () => selectCtx?.activeKey === key.value ?? false
    );
    let isValid = ref(true);

    if (!props.internal) {
      const optionInfo = reactive({
        raw: {
          value,
          label,
          disabled,
          tagProps,
        },
        ref: itemRef,
        index,
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

      if (instance) {
        selectCtx?.addSlotOptionInfo(instance.uid, optionInfo);
      }

      onBeforeUnmount(() => {
        if (instance) {
          selectCtx?.removeSlotOptionInfo(instance.uid);
        }
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
        [`${prefixCls}-selected`]: isSelected.value,
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
