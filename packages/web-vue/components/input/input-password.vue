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

<script setup lang="ts">
  import { reactive, ref, toRefs } from 'vue';

  import AIconHover from '../_components/icon-hover.vue';
  import useMergeState from '../_hooks/use-merge-state';
  import IconEye from '../icon/icon-eye';
  import IconEyeInvisible from '../icon/icon-eye-invisible';
  import AInput from './input';

  defineOptions({ name: 'InputPassword' });

  const props = defineProps({
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
  });

  const emit = defineEmits<{
    /**
     * @zh visibility 改变时触发
     * @en Callback when visibility changes
     * @param {boolean} visible
     */
    'visibility-change': [_visible: boolean];
    'update:visibility': [_visible: boolean];
  }>();

  const { visibility, defaultVisibility } = toRefs(props);
  const inputRef = ref();

  const handleInvisible = () => {
    setVisible(!mergedVisible.value);
  };

  const [mergedVisible, setLocalVisible] = useMergeState(
    defaultVisibility.value,
    reactive({
      value: visibility,
    }),
  );

  const setVisible = (newVisible: boolean) => {
    if (newVisible !== mergedVisible.value) {
      emit('visibility-change', newVisible);
      emit('update:visibility', newVisible);
      setLocalVisible(newVisible);
    }
  };

  const focus = () => {
    (inputRef.value as HTMLInputElement)?.focus();
  };

  const blur = () => {
    (inputRef.value as HTMLInputElement)?.blur();
  };

  defineExpose({ focus, blur });
</script>
