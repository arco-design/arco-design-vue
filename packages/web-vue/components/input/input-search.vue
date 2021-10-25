<template>
  <a-input-group v-if="searchButton">
    <a-input v-bind="$attrs" ref="inputRef" />
    <a-button
      type="primary"
      :class="`${prefixCls}-btn`"
      :loading="loading"
      @click="handleClick"
    >
      <template #icon>
        <icon-loading v-if="loading" />
        <icon-search v-else />
      </template>
    </a-button>
  </a-input-group>
  <a-input v-else v-bind="$attrs" ref="inputRef">
    <template #suffix>
      <icon-loading v-if="loading" />
      <a-icon-hover v-else @click="handleClick">
        <icon-search />
      </a-icon-hover>
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import AButton from '../button';
import AIconHover from '../_components/icon-hover.vue';
import AInput from './input';
import AInputGroup from './input-group.vue';
import IconSearch from '../icon/icon-search';
import IconLoading from '../icon/icon-loading';

export default defineComponent({
  name: 'InputSearch',
  components: {
    AInput,
    AInputGroup,
    AIconHover,
    AButton,
    IconLoading,
    IconSearch,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 是否为后置按钮模式
     * @en Whether it is the rear button mode
     */
    searchButton: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * @zh 单击搜索按钮时触发
     * @en Triggered when the search button is clicked
     * @property {string} value
     */
    'search',
  ],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('input-search');

    const inputRef = ref();

    const handleClick = (e: Event) => {
      if (inputRef.value.inputRef) {
        emit('search', (inputRef.value.inputRef as HTMLInputElement).value, e);
      }
    };

    return {
      prefixCls,
      inputRef,
      handleClick,
    };
  },
});
</script>
