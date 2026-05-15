<template>
  <div>
    <div :class="toolbarRowClass">
      <sd-radio-group v-model="mode" type="button">
        <sd-radio value="estimated">estimatedSize</sd-radio>
        <sd-radio value="fixed">itemSize</sd-radio>
        <sd-radio value="dynamic">minItemSize</sd-radio>
      </sd-radio-group>

      <sd-radio-group v-model="tableHeight" type="button">
        <sd-radio :value="280">高 280</sd-radio>
        <sd-radio :value="360">高 360</sd-radio>
        <sd-radio :value="480">高 480</sd-radio>
      </sd-radio-group>
    </div>

    <div :class="toolbarRowClass">
      <label :class="checkClass">
        <input v-model="useScrollbar" type="checkbox" />
        <span>使用组件库 scrollbar</span>
      </label>
      <label :class="checkClass">
        <input v-model="stickyHeader" type="checkbox" />
        <span>开启 sticky header</span>
      </label>
    </div>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.6]">
      {{ helperText }}
    </div>

    <div :class="quickActionClass">
      <sd-button size="small" @click="scrollTableToRow(1)">顶部</sd-button>
      <sd-button size="small" @click="scrollTableToRow(48)">第 48 行</sd-button>
      <sd-button size="small" @click="scrollTableToRow(240)">第 240 行</sd-button>
      <sd-button size="small" @click="expandAndScrollToRow(48)">展开第 48 行</sd-button>
    </div>

    <div ref="tableHostRef">
      <sd-table
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        :expandable="expandable"
        v-model:expanded-keys="expandedKeys"
        :virtual-list-props="virtualListProps"
        :pagination="false"
        :scrollbar="useScrollbar"
        :sticky-header="stickyHeader ? 0 : false"
        :scroll="{ x: 1120, y: tableHeight }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, reactive, ref } from 'vue';

  const mode = ref('estimated');
  const tableHeight = ref(360);
  const useScrollbar = ref(true);
  const stickyHeader = ref(false);
  const expandedKeys = ref([]);
  const tableHostRef = ref();

  const toolbarRowClass = 'sd:mb-3 sd:flex sd:flex-wrap sd:items-center sd:gap-3';

  const quickActionClass = 'sd:mb-3 sd:flex sd:flex-wrap sd:gap-2';

  const checkClass =
    'sd:inline-flex sd:items-center sd:gap-2 sd:text-[13px] sd:text-[var(--color-text-2)]';

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left',
      width: 160,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 260,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 280,
    },
    {
      title: '备注',
      dataIndex: 'note',
      width: 320,
    },
  ];

  const data = reactive(
    Array(1200)
      .fill(null)
      .map((_, index) => ({
        key: String(index + 1),
        name: `用户 ${index + 1}`,
        address: `${index + 1} Park Road, London`,
        email: `user.${index + 1}@example.com`,
        note:
          index % 4 === 0
            ? '这是一条更长的备注，用来观察表格在虚拟滚动、固定列和横向滚动并存时的表现。'
            : '普通备注',
        expand: `展开内容 ${index + 1}：用于确认展开行在虚拟模式下仍能正确显示。`,
      })),
  );

  const rowSelection = {
    type: 'checkbox',
    showCheckedAll: true,
  };

  const expandable = {
    title: '展开',
    width: 88,
  };

  const helperText = computed(() => {
    if (mode.value === 'estimated') {
      return 'estimatedSize 适合常规表格场景：给出一个接近真实行高的估值，例如 42，可让首次滚动和定位更平滑。';
    }

    if (mode.value === 'fixed') {
      return 'itemSize 适合所有行高完全一致的表格。这里固定为 42px，可以最直接地观察滚动定位与性能。';
    }

    return 'minItemSize 适合可能出现展开内容或更长文本的场景。它允许行高增长，同时保留共享 VirtualList 的滚动能力。';
  });

  const virtualListProps = computed(() => {
    if (mode.value === 'estimated') {
      return {
        height: tableHeight.value,
        estimatedSize: 42,
        buffer: 20,
      };
    }

    if (mode.value === 'fixed') {
      return {
        height: tableHeight.value,
        itemSize: 42,
        buffer: 20,
      };
    }

    return {
      height: tableHeight.value,
      minItemSize: 42,
      estimatedSize: 42,
      buffer: 20,
    };
  });

  const getTableRowHeight = () => {
    const row = tableHostRef.value?.querySelector('.sd-table-body .sd-table-tr');
    const height = row?.getBoundingClientRect().height ?? 0;

    return height > 0 ? height : 42;
  };

  const scrollTableToRow = async (row) => {
    await nextTick();

    const viewport = tableHostRef.value?.querySelector('.sd-virtual-list-scroller');
    if (!viewport) {
      return;
    }

    const rowHeight = getTableRowHeight();
    viewport.scrollTop = Math.max(row - 1, 0) * rowHeight;
    viewport.dispatchEvent(new Event('scroll'));
  };

  const expandAndScrollToRow = async (row) => {
    expandedKeys.value = [String(row)];
    await scrollTableToRow(row);
  };
</script>
