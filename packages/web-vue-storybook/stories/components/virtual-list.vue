<template>
  <TypographyTitle>Basic</TypographyTitle>
  <Space style="margin-bottom: 20px">
    <Button @click="toggleHeight">change height</Button>
    <Button @click="scrollTo">scrollTo index 20</Button>
    <Button @click="toggleVirtual"
      >Switch to {{ isVirtual ? 'Raw' : 'Virtual' }}</Button
    >
    <Button @click="addData">Add Data</Button>
    <InputNumber v-model="scrollToIndex" />
    <Input v-model="keyword" />
    <span>{{ filterData.length }}</span>
  </Space>
  <VirtualList
    ref="basicVirtualList"
    :data="filterData"
    style="background: #c4c4c4"
    :height="height"
    :threshold="20"
  >
    <template #item="{ item, index }">
      <div :style="{ height: `${item.height}px`, background: item.background }"
        >[[ {{ index }} ]]-{{ item.label }}</div
      >
    </template>
  </VirtualList>

  <TypographyTitle>AutoComplete</TypographyTitle>
  <AutoComplete :data="selectData" />

  <TypographyTitle>Select</TypographyTitle>
  <Select :options="selectData" />

  <TypographyTitle>List</TypographyTitle>
  <Space style="margin-bottom: 20px">
    <Button @click="listScrollTo">scrollTo index 20</Button>
    <Button @click="listScrollToKey">scrollTo key 100</Button>
  </Space>
  <List
    ref="listVirtualList"
    :data="listData"
    :virtual-list-props="{ height: 256 }"
  >
    <template #item="{ item }">
      <ListItem>{{ item.label }}</ListItem>
    </template>
  </List>

  <TypographyTitle>Tree</TypographyTitle>
  <Space style="margin-bottom: 20px">
    <Button @click="treeScrollTo">scrollTo index 4</Button>
    <Button @click="treeScrollToKey">scrollTo key 0-1-1</Button>
  </Space>
  <Tree
    ref="treeVirtualList"
    :data="treeData"
    :virtual-list-props="{ height: 100 }"
  />

  <TypographyTitle>TreeSelect</TypographyTitle>
  <TreeSelect :data="treeData" />
</template>

<script>
import { ref, watch, computed } from 'vue';
import {
  Button,
  Tree,
  Typography,
  TreeSelect,
  AutoComplete,
  List,
  Select,
  Space,
  InputNumber,
  Input,
} from '@web-vue/components';
import VirtualList from '@web-vue/components/_components/virtual-list/virtual-list.vue';
import { bigData } from './json';

function randomString(length = 10) {
  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tLen = t.length;
  return new Array(length)
    .fill(null)
    .map(() => t[Math.floor(Math.random() * tLen)])
    .join('');
}

function generateData(length, startIndex, rangeHeight, baseHeight) {
  return new Array(length).fill(null).map((_, index) => {
    const itemIndex = (startIndex || 0) + index;
    return {
      key: itemIndex,
      label: `[${itemIndex}]-${randomString()}`,
      height: Math.random() * (rangeHeight || 200) + (baseHeight || 16),
      background: ['red', 'blue', 'yellow', 'green'][
        Math.floor(Math.random() * 4)
      ],
    };
  });
}

export default {
  components: {
    Button,
    VirtualList,
    Tree,
    TypographyTitle: Typography.Title,
    TreeSelect,
    AutoComplete,
    List,
    ListItem: List.Item,
    Select,
    Space,
    InputNumber,
    Input,
  },
  setup() {
    const basicVirtualList = ref();
    const listVirtualList = ref();
    const treeVirtualList = ref();
    const data = ref(generateData(100));
    const listData = ref(generateData(10000));
    const selectData = generateData(10000, 0, 50);
    const treeData = defaultTreeData;
    const height = ref(200);
    const scrollToIndex = ref(1);
    const isVirtual = ref(true);
    const keyword = ref('');
    const filterData = computed(() =>
      keyword.value
        ? data.value.filter((i) => i.label.includes(keyword.value))
        : data.value
    );

    const addData = () => {
      const { length } = data.value;
      data.value = [...data.value, ...generateData(10, length - 1)];
    };

    // setInterval(() => addData(), 1000);

    watch(scrollToIndex, () => {
      basicVirtualList.value.scrollTo({
        index: scrollToIndex.value,
        align: 'top',
      });
    });

    return {
      scrollToIndex,
      basicVirtualList,
      listVirtualList,
      treeVirtualList,
      treeData,
      data,
      selectData,
      listData,
      height,
      isVirtual,
      toggleHeight() {
        height.value = height.value === 200 ? 400 : 200;
      },
      scrollTo() {
        basicVirtualList.value &&
          basicVirtualList.value.scrollTo({ index: 20 });
      },
      listScrollTo() {
        listVirtualList.value &&
          listVirtualList.value.scrollIntoView({ index: 20, align: 'top' });
      },
      listScrollToKey() {
        listVirtualList.value &&
          listVirtualList.value.scrollIntoView({ key: 100 });
      },
      treeScrollTo() {
        treeVirtualList.value &&
          treeVirtualList.value.scrollIntoView({ index: 4, align: 'top' });
      },
      treeScrollToKey() {
        treeVirtualList.value &&
          treeVirtualList.value.scrollIntoView({
            key: '0-1-1',
            align: 'bottom',
          });
      },
      toggleVirtual() {
        isVirtual.value = !isVirtual.value;
      },
      addData,
      keyword,
      filterData,
    };
  },
};

const defaultTreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    dragIcon: () => 'ss',
    children: [
      {
        title: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        disableCheckbox: true,
        children: [
          {
            draggable: false,
            title: 'Leaf 0-0-2-1 (Drag disabled)',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1',
        checkable: false,
        children: [
          {
            title: 'Leaf 0-1-1-1',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf 0-1-1-2',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
  {
    title: 'Trunk 1-1',
    key: '1-1',
    children: [
      {
        title: 'Branch 1-1-1',
        key: '1-1-1',
        checkable: false,
        children: [
          {
            title: 'Leaf 1-1-1-1',
            key: '1-1-1-1',
          },
          {
            title: 'Leaf 1-1-1-2',
            key: '1-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf 1-1-2',
        key: '1-1-2',
      },
    ],
  },
];
</script>
