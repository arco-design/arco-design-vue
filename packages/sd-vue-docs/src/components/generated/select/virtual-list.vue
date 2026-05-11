<template>
  <div :style="{ width: '360px' }">
    <sd-radio-group v-model="preset" type="button" :style="{ marginBottom: '12px' }">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="explicit">显式设置 itemSize</sd-radio>
    </sd-radio-group>

    <div :style="helperStyle">
      {{ helperText }}
    </div>

    <sd-select
      :style="{ width: '100%' }"
      :options="options"
      placeholder="Please select ..."
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

      const helperStyle = {
        marginBottom: '12px',
        color: 'var(--color-text-2)',
        fontSize: '12px',
        lineHeight: '1.5',
      };

      const helperText = computed(() => {
        return preset.value === 'default'
          ? '使用空对象 `{}` 可展示 Select 控件的新默认固定高度下拉菜单行为。'
          : '使用 itemSize: 36 可显式设置固定高度模式，并增加渲染缓冲区。';
      });

      const virtualListProps = computed(() => {
        return preset.value === 'default' ? {} : { itemSize: 36, buffer: 260 };
      });

      const options = Array(1500)
        .fill(null)
        .map((_, index) => ({
          value: `option-${index}`,
          label: `选项 ${index} · 虚拟行 ${index % 9}`,
        }));

      return {
        preset,
        options,
        helperStyle,
        helperText,
        virtualListProps,
      };
    },
  };
</script>
