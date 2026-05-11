<template>
  <div :style="{ width: '360px' }">
    <sd-radio-group v-model="preset" type="button" :style="{ marginBottom: '12px' }">
      <sd-radio value="default">default fixed</sd-radio>
      <sd-radio value="explicit">explicit itemSize</sd-radio>
    </sd-radio-group>

    <div :style="helperStyle">
      {{ helperText }}
    </div>

    <sd-cascader
      :options="options"
      :style="{ width: '100%' }"
      placeholder="Please select ..."
      allow-search
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
          ? "The large second-level columns use Cascader's new default fixed-height virtualization."
          : 'Explicit itemSize: 36 is helpful when you want to standardize multiple cascader panels.';
      });

      const virtualListProps = computed(() => {
        return preset.value === 'default' ? {} : { itemSize: 36, buffer: 260 };
      });

      const createLeafOptions = (prefix, count) => {
        return Array(count)
          .fill(null)
          .map((_, index) => ({
            value: `${prefix}-${index}`,
            label: `${prefix} option ${index}`,
          }));
      };

      const options = [
        {
          value: 'beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: createLeafOptions('Chaoyang', 1200),
            },
            {
              value: 'haidian',
              label: 'Haidian',
              children: createLeafOptions('Haidian', 800),
            },
          ],
        },
        {
          value: 'shanghai',
          label: 'Shanghai',
          children: [
            {
              value: 'pudong',
              label: 'Pudong',
              children: createLeafOptions('Pudong', 1500),
            },
            {
              value: 'minhang',
              label: 'Minhang',
              children: createLeafOptions('Minhang', 900),
            },
          ],
        },
      ];

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
