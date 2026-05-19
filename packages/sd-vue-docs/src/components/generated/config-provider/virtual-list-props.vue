<template>
  <div class="config-provider-virtual-list-props-demo">
    <sd-space align="center" wrap>
      <sd-switch v-model="enabled">
        <template #checked>全局 virtualListProps 开启</template>
        <template #unchecked>全局 virtualListProps 关闭</template>
      </sd-switch>
      <sd-tag color="blue">组件显式传入 virtual-list-props 时优先级更高</sd-tag>
    </sd-space>

    <sd-config-provider :virtual-list-props="providerVirtualListProps">
      <div class="config-provider-virtual-list-props-demo__grid">
        <section class="config-provider-virtual-list-props-demo__card">
          <div class="config-provider-virtual-list-props-demo__title">Select 继承全局默认值</div>
          <div class="config-provider-virtual-list-props-demo__popup-host">
            <sd-select :options="selectOptions" placeholder="继承 176px 的虚拟滚动高度" />
          </div>
        </section>

        <section class="config-provider-virtual-list-props-demo__card">
          <div class="config-provider-virtual-list-props-demo__title">
            AutoComplete 也会继承这组参数
          </div>
          <div class="config-provider-virtual-list-props-demo__popup-host">
            <sd-auto-complete
              ref="autoCompleteRef"
              :data="autoCompleteOptions"
              placeholder="继承 176px 的虚拟滚动高度"
            />
          </div>
        </section>

        <section class="config-provider-virtual-list-props-demo__card">
          <div class="config-provider-virtual-list-props-demo__title">Cascader 继承同一组参数</div>
          <div class="config-provider-virtual-list-props-demo__popup-host">
            <sd-cascader :options="cascaderOptions" placeholder="继承 176px 的虚拟滚动高度" />
          </div>
        </section>

        <section class="config-provider-virtual-list-props-demo__card">
          <div class="config-provider-virtual-list-props-demo__title">TreeSelect 也会继承</div>
          <div class="config-provider-virtual-list-props-demo__popup-host">
            <sd-tree-select
              :data="treeOptions"
              placeholder="继承 176px 的虚拟滚动高度"
              tree-check-strictly
            />
          </div>
        </section>

        <section class="config-provider-virtual-list-props-demo__card">
          <div class="config-provider-virtual-list-props-demo__title">显式 props 仍然优先</div>
          <div class="config-provider-virtual-list-props-demo__popup-host">
            <sd-select
              :options="selectOptions"
              :virtual-list-props="overrideVirtualListProps"
              placeholder="这个 Select 显式改成 132px 高度"
            />
          </div>
        </section>
      </div>
    </sd-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref } from 'vue';

  const enabled = ref(true);
  const autoCompleteRef = ref<{ focus: () => void } | null>(null);

  onMounted(() => {
    nextTick(() => {
      autoCompleteRef.value?.focus();
    });
  });

  const providerVirtualListProps = computed(() => {
    if (!enabled.value) {
      return undefined;
    }

    return {
      height: 176,
      buffer: 220,
    };
  });

  const overrideVirtualListProps = {
    height: 132,
    buffer: 160,
  };

  const selectOptions = Array.from({ length: 1200 }, (_, index) => ({
    label: `城市选项 ${index + 1}`,
    value: `city-${index + 1}`,
  }));

  const autoCompleteOptions = Array.from({ length: 1600 }, (_, index) => `搜索建议 ${index + 1}`);

  const cascaderOptions = Array.from({ length: 2400 }, (_, groupIndex) => ({
    label: `区域 ${groupIndex + 1}`,
    value: `region-${groupIndex + 1}`,
    children: Array.from({ length: 12 }, (_, childIndex) => ({
      label: `节点 ${groupIndex + 1}-${childIndex + 1}`,
      value: `region-${groupIndex + 1}-node-${childIndex + 1}`,
    })),
  }));

  const treeOptions = [
    {
      title: '组织架构',
      key: 'root',
      value: 'root',
      children: Array.from({ length: 800 }, (_, index) => ({
        title: `成员 ${index + 1}`,
        key: `member-${index + 1}`,
        value: `member-${index + 1}`,
      })),
    },
  ];
</script>

<style scoped>
  .config-provider-virtual-list-props-demo {
    display: grid;
    gap: 12px;
  }

  .config-provider-virtual-list-props-demo__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .config-provider-virtual-list-props-demo__card {
    display: grid;
    gap: 10px;
  }

  .config-provider-virtual-list-props-demo__title {
    color: rgb(var(--sd-color-text-2));
    font-size: 13px;
    line-height: 1.5;
  }

  .config-provider-virtual-list-props-demo__popup-host {
    position: relative;
    min-height: 240px;
    padding: 12px;
    overflow: hidden;
    background: rgb(var(--sd-color-fill-1));
    border: 1px solid rgb(var(--sd-color-border-2));
    border-radius: var(--sd-border-radius-medium);
  }
</style>
