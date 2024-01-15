<template>
  <a-input ref="inputRef" :type="mergedVisible ? 'password' : 'text'">
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="invisibleButton || $slots.suffix" #suffix>
      <a-icon-hover
        v-if="invisibleButton"
        @click="handleInvisible"
        @mousedown.prevent
        @mouseup.prevent
      >
        <icon-eye v-if="!mergedVisible" />
        <icon-eye-invisible v-else />
      </a-icon-hover>
      <slot name="suffix" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import AIconHover from '../_components/icon-hover.vue';
import IconEye from '../icon/icon-eye';
import IconEyeInvisible from '../icon/icon-eye-invisible';
import useMergeState from '../_hooks/use-merge-state';
import AInput from './input';

export default defineComponent({
  name: 'InputPassword',
  components: {
    IconEye,
    IconEyeInvisible,
    AIconHover,
    AInput,
  },
  props: {
    /**
     * @zh 是否可见，受控属性
     * @en Whether is visible
     * @vModel
     */
    visibility: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认是否可见，非受控
     * @en Default visibility
     */
    defaultVisibility: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否显示可见按钮
     * @en Whether to show visible buttons
     */
    invisibleButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    /**
     * @zh visibility 改变时触发
     * @en Callback when visibility changes
     * @param {boolean} visible
     */
    'visibility-change',
    'update:visibility',
  ],
  setup(props, { emit }) {
    const { visibility, defaultVisibility } = toRefs(props);
    const inputRef = ref();

    const handleInvisible = () => {
      setVisible(!mergedVisible.value);
    };

    const [mergedVisible, setLocalVisible] = useMergeState(
      defaultVisibility.value,
      reactive({
        value: visibility,
      })
    );

    const setVisible = (newVisible: boolean) => {
      if (newVisible !== mergedVisible.value) {
        emit('visibility-change', newVisible);
        emit('update:visibility', newVisible);
        setLocalVisible(newVisible);
      }
    };

    return {
      inputRef,
      mergedVisible,
      handleInvisible,
    };
  },
  methods: {
    focus() {
      (this.inputRef as HTMLInputElement)?.focus();
    },
    blur() {
      (this.inputRef as HTMLInputElement)?.blur();
    },
  },
});
</script>
