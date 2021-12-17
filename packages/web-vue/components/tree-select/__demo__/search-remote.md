```yaml
title:
  zh-CN: 远程搜索
  en-US: Remote search
```

## zh-CN

监听 `search` 事件，在事件处理函数中获取数据并更新 `treeData`。 自定义搜索逻辑时，建议关闭内部过滤逻辑（`:disable-filter="true"`），以免影响自定义结果。

---

## en-US

Listen to the `search` event, get the data in the event processing function and update the `treeData`. When customizing the search logic, it is recommended to turn off the internal filtering logic (`:disable-filter="true"`) to prevent the customized results be affected.

---

```vue
<template>
  <a-tree-select
    :allow-search="true"
    :allow-clear="true"
    :disable-filter="true"
    :data="treeData"
    :loading="loading"
    style="width: 300px"
    placeholder="Please select ..."
    @search="onSearch"
  ></a-tree-select>
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const treeData = ref(defaultTreeData);
      const loading = ref(false);

      function searchData(keyword) {
        const loop = (data) => {
          const result = [];
          data.forEach(item => {
            if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
              result.push({...item});
            } else if (item.children) {
              const filterData = loop(item.children);
              if (filterData.length) {
                result.push({
                  ...item,
                  children: filterData
                })
              }
            }
          })
          return result;
        }

        return loop(defaultTreeData);
      }

      const onSearch = (searchKey) => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          treeData.value = searchData(searchKey);
        }, 200)
      };

      return {
        treeData,
        loading,
        onSearch,
      };
    },
  };

  const defaultTreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf 0-0-1-1',
              key: '0-0-1-1'
            },
            {
              title: 'Leaf 0-0-1-2',
              key: '0-0-1-2'
            }
          ]
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
              title: 'Leaf 0-1-1-0',
              key: '0-1-1-0',
            }
          ]
        },
        {
          title: 'Branch 0-1-2',
          key: '0-1-2',
          children: [
            {
              title: 'Leaf 0-1-2-0',
              key: '0-1-2-0',
            }
          ]
        },
      ],
    },
  ];
</script>
```
