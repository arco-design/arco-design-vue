<template>
  <a-input ref="inputRef" :type="invisible ? 'password' : 'text'">
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
        <icon-eye v-if="invisible" />
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
import { defineComponent, ref } from 'vue';
import AIconHover from '../_components/icon-hover.vue';
import IconEye from '../icon/icon-eye';
import IconEyeInvisible from '../icon/icon-eye-invisible';
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
     * @zh 是否显示可见按钮
     * @en Whether to show visible buttons
     */
    invisibleButton: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const inputRef = ref();
    const invisible = ref(true);

    const handleInvisible = () => {
      invisible.value = !invisible.value;
    };

    return {
      inputRef,
      invisible,
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
