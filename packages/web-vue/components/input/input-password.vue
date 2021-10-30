<template>
  <a-input :type="invisible ? 'password' : 'text'">
    <template #prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <span @click="handleInvisible">
        <a-icon-hover>
          <icon-eye v-if="invisible" />
          <icon-eye-invisible v-else />
        </a-icon-hover>
      </span>
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
      default: (props: any) => {
        return props.type === 'password';
      },
    },
  },
  setup() {
    // 是否隐藏输入内容
    const invisible = ref(true);

    const handleInvisible = () => {
      invisible.value = !invisible.value;
    };

    return {
      invisible,
      handleInvisible,
    };
  },
});
</script>
