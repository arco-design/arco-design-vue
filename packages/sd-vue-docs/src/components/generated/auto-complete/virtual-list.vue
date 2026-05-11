<template>
  <div :style="{ width: '360px' }">
    <sd-radio-group v-model="preset" type="button" :style="{ marginBottom: '12px' }">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="explicit">显式设置 itemSize</sd-radio>
    </sd-radio-group>

    <div :style="helperStyle">
      {{ helperText }}
    </div>

    <sd-auto-complete
      :data="data"
      @search="handleSearch"
      :style="{ width: '100%' }"
      placeholder="Type sd or design"
      :trigger-props="{ popupStyle: { maxHeight: '220px' } }"
      :virtual-list-props="virtualListProps"
    />
  </div>
</template>

<script>
  import { computed, ref } from 'vue';

  export default {
    setup() {
      const preset = ref('default');
      const data = ref([]);

      const helperStyle = {
        marginBottom: '12px',
        color: 'var(--color-text-2)',
        fontSize: '12px',
        lineHeight: '1.5',
      };

      const helperText = computed(() => {
        return preset.value === 'default'
          ? 'AutoComplete 现在默认使用固定高度的虚拟行，当你只启用 virtual-list-props 时。'
          : '显式设置 itemSize: 36 在你希望保持下拉配置自描述时非常有用。';
      });

      const virtualListProps = computed(() => {
        return preset.value === 'default' ? {} : { itemSize: 36, buffer: 260 };
      });

      const createData = (value) => {
        if (!value) {
          return [];
        }

        return [...Array(3000)].map((_, index) => `${value}-result-${index}`);
      };

      const handleSearch = (value) => {
        data.value = createData(value);
      };

      return {
        preset,
        data,
        helperStyle,
        helperText,
        virtualListProps,
        handleSearch,
      };
    },
  };
</script>
