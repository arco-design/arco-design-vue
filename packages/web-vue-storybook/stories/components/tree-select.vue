<template>
  <div>
    <TypographyTitle>点击结点可收起</TypographyTitle>
    <p><TypographyText>只能选择叶子节点的时候默认开启</TypographyText></p>
    <TreeSelect :data="treeData" selectable="leaf" />
    <p><TypographyText>自定义选中并收起</TypographyText></p>
    <TreeSelect
      :data="treeData"
      multiple
      :tree-props="{ actionOnNodeClick: 'expand' }"
    />
    <TypographyTitle>Tag 可关闭</TypographyTitle>
    <p><TypographyText>默认</TypographyText></p>
    <TreeSelect :data="treeData" tag-closable multiple />
    <p><TypographyText>显示复选框</TypographyText></p>
    <TreeSelect :data="treeData" tree-checkable tag-closable />
    <p><TypographyText>显示复选框，取消父子关联</TypographyText></p>
    <TreeSelect
      :data="treeData"
      tree-checkable
      tag-closable
      tree-check-strictly
    />
    <p><TypographyText>仅叶子结点可选</TypographyText></p>
    <Space fill>
      <TreeSelect
        :data="treeData"
        tag-closable
        selectable="leaf"
        style="width: 300px"
      />
      <TreeSelect
        :data="treeData"
        tree-checkable
        tag-closable
        selectable="leaf"
        style="width: 400px"
      />
    </Space>
  </div>
</template>

<script>
// import { ref } from 'vue';
import { TreeSelect, Typography, Space } from '@web-vue/components';

export default {
  components: {
    TreeSelect,
    TypographyTitle: Typography.Title,
    TypographyText: Typography.Text,
    Space,
  },
  setup() {
    return {
      treeData,
    };
  },
};

const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        disabled: true,
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
          },
          {
            title: 'Leaf',
            key: '0-0-2-2',
            disableCheckbox: true,
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
        children: [
          {
            title: 'Leaf ',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf ',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf',
        key: '0-1-2',
      },
    ],
  },
];
</script>
