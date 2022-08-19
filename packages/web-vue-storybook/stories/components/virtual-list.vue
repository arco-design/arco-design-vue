<template>
  <TypographyTitle>Basic</TypographyTitle>
  <Space style="margin-bottom: 20px">
    <Button @click="toggleHeight">change height</Button>
    <Button @click="scrollTo">scrollTo index 20</Button>
    <Button @click="toggleRawData">toggle {{ data.length > 20 ? 'raw' : 'big' }} data</Button>
    <InputNumber v-model="scrollToIndex" />
  </Space>
  <VirtualList
    ref="basicVirtualList"
    :data="data"
    style="background: #c4c4c4"
    :height="height"
    :threshold="20"
  >
    <template #item="{ item }">
      <div
        :style="{ height: `${item.height}px`, background: item.background }"
        >{{ item.label }}</div
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
import { ref, watch } from 'vue';
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
} from '@web-vue/components';
import VirtualList from '@web-vue/components/_components/virtual-list-v2';
import { bigData } from './json';

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
  },
  setup() {
    const basicVirtualList = ref();
    const listVirtualList = ref();
    const treeVirtualList = ref();
    const data = ref(bigData);
    const rawData = new Array(10).fill(null).map((_, index) => ({
      key: index,
      label: `label-${index}`,
      height: Math.random() * 200 + 16,
      background: ['red', 'blue', 'yellow', 'green'][
        Math.floor(Math.random() * 4)
      ],
    }));
    const listData = ref(
      new Array(10000).fill(null).map((_, index) => ({
        key: index,
        label: `label-${index}`,
        height: Math.random() * 200 + 16,
        background: ['red', 'blue', 'yellow', 'green'][
          Math.floor(Math.random() * 4)
        ],
      }))
    );

    const selectData = new Array(10000).fill(null).map((_, index) => ({
      key: index,
      value: index,
      label: `label-${index}`,
      height: Math.random() * 50 + 16,
      background: ['red', 'blue', 'yellow', 'green'][
        Math.floor(Math.random() * 4)
      ],
    }));
    const treeData = defaultTreeData;
    const height = ref(200);
    const scrollToIndex = ref(1);

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
          listVirtualList.value.scrollIntoView({ key: 100, align: 'bottom' });
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
      toggleRawData() {
        if (data.value.length > 20) {
          data.value = rawData;
        } else {
          data.value = bigData;
        }
      }
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
