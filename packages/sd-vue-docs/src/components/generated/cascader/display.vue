<template>
  <sd-space direction="vertical" size="large">
    <sd-cascader
      :options="options"
      default-value="datunli"
      :style="{ width: '320px' }"
      placeholder="Show full path"
      separator=" > "
    />
    <sd-cascader
      :options="options"
      default-value="datunli"
      :style="{ width: '320px' }"
      placeholder="Only show leaf label"
      :show-path="false"
    />
    <sd-cascader
      :options="options"
      :default-value="['chaoyang', 'haidian', 'dongcheng']"
      :style="{ width: '320px' }"
      placeholder="Responsive tags"
      multiple
      allow-clear
      max-tag-count="responsive"
    />
  </sd-space>
</template>

<script>
  export default {
    setup() {
      const options = [
        {
          value: 'beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'ChaoYang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
          ],
        },
        {
          value: 'shanghai',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ];

      return {
        options,
      };
    },
  };
</script>
