<template>
  <sd-space direction="vertical" size="large" fill>
    <div>
      <div class="sd:mb-2 sd:font-semibold">先兼容迁移</div>
      <div class="sd:mb-3" :style="{ color: `var(${getCssVarToken('--color-text-3')})` }">
        保留 `value`、`show`、`filterable`、`clearable`，先把页面替换到当前组件库。
      </div>
      <sd-space direction="vertical" size="small" fill>
        <sd-button size="small" @click="legacyVisible = !legacyVisible">
          切换 show：{{ legacyVisible ? '打开' : '关闭' }}
        </sd-button>
        <sd-cascader
          v-model:value="legacyValue"
          v-model:show="legacyVisible"
          :options="options"
          filterable
          clearable
          placeholder="兼容别名写法"
          class="sd:w-80"
        />
      </sd-space>
    </div>

    <div>
      <div class="sd:mb-2 sd:font-semibold">再统一到本地命名</div>
      <div class="sd:mb-3" :style="{ color: `var(${getCssVarToken('--color-text-3')})` }">
        新代码建议改成 `model-value`、`popup-visible`、`allow-search`、`allow-clear`。
      </div>
      <sd-space direction="vertical" size="small" fill>
        <sd-button size="small" @click="modernVisible = !modernVisible">
          切换 popup-visible：{{ modernVisible ? '打开' : '关闭' }}
        </sd-button>
        <sd-cascader
          v-model="modernValue"
          v-model:popup-visible="modernVisible"
          :options="options"
          allow-search
          allow-clear
          placeholder="推荐本地写法"
          class="sd:w-80"
        />
      </sd-space>
    </div>
  </sd-space>
</template>

<script setup lang="ts">
  import type { CascaderOption } from '@sdata/web-vue';

  import { ref } from 'vue';

  import { getCssVarToken } from '@sdata/web-vue';

  const legacyValue = ref('chaoyang');
  const legacyVisible = ref(false);
  const modernValue = ref('haidian');
  const modernVisible = ref(false);

  const options: CascaderOption[] = [
    {
      value: 'beijing',
      label: '北京',
      children: [
        {
          value: 'chaoyang',
          label: '朝阳区',
        },
        {
          value: 'haidian',
          label: '海淀区',
        },
      ],
    },
    {
      value: 'shanghai',
      label: '上海',
      children: [
        {
          value: 'pudong',
          label: '浦东新区',
        },
      ],
    },
  ];
</script>
