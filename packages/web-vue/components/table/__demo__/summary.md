```yaml
title:
  zh-CN: 总结行
  en-US: Summary
```

## zh-CN

设置 `summary` 可以开启表尾总结行，并可以通过 `summary-text` 指定首列文字。
如果想要自定义总结行展示，可以传入函数。函数的返回值为需要展示的数据，结构同 `data` 一样即可，支持多行数据。
注意：控制列暂不可以自定义内容

---

## en-US

Set `summary` to turn on the summary line at the end of the table, and specify the first column of text
with `summary-text`. If you want to customize the summary line display, you can pass in a function. The return value of
the function is the data to be displayed, the structure is the same as `data`, and it supports multiple rows of data.
Note: The control column cannot be customized for the time being

---

```vue

<template>
  <a-table :columns="columns" :data="data" :summary="true" :summary-span-method="spanMethod" />
  <a-table :columns="columns" :data="data" :scroll="scroll" :expandable="expandable" :summary="summary">
    <template #summary-cell="{ column,record,rowIndex }">
      <div :style="getColorStyle(column,record)">{{record[column.dataIndex]}}</div>
    </template>
  </a-table>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const expandable = {
      title: 'Expand',
      width: 80
    };
    const scroll = {
      x: 2000,
      y: 200
    }
    const columns = reactive([
      {
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        width: 140
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        summaryCellStyle: (record) => {
          if (record.salary > 100000) {
            return {
              backgroundColor: 'rgb(var(--arcoblue-6))',
              color: '#fff'
            }
          }
        }
      },
      {
        title: 'Data1',
        dataIndex: 'data1',
      },
      {
        title: 'Data2',
        dataIndex: 'data2',
      },
    ]);
    const data = reactive([
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        data1: 10,
        data2: 8,
        expand: 'Expand Content'
      }, {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        data1: 9,
        data2: -12,
      }, {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        data1: 15,
        data2: -2,
      }, {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        data1: 2,
        data2: 3,
      }, {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        data1: 11,
        data2: 0,
      }
    ])

    const summary = ({columns, data}) => {
      let countData = {
        salary: 0,
        data1: 0,
        data2: 0
      };
      data.forEach(record => {
        countData.salary += record.salary;
        countData.data1 += record.data1;
        countData.data2 += record.data2;
      })


      return [{
        name: 'Avg',
        salary: countData.salary / data.length,
        data1: countData.data1 / data.length,
        data2: countData.data2 / data.length,
      }, {
        name: 'Sum',
        salary: countData.salary,
        data1: countData.data1,
        data2: countData.data2,
      }]
    }

    const getColorStyle = (column, record) => {
      if (['data1', 'data2'].includes(column.dataIndex)) {
        return {color: record[column.dataIndex] > 0 ? 'red' : 'green'}
      }
      return undefined
    }

    const spanMethod = ({rowIndex, columnIndex}) => {
      if (rowIndex === 0 && columnIndex === 1) {
        return {
          colspan: 2
        }
      }
    };

    return {
      expandable,
      scroll,
      columns,
      data,
      summary,
      getColorStyle,
      spanMethod
    }
  },
}
</script>
```
