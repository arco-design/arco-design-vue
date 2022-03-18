```yaml
title:
  zh-CN: 可编辑表格
  en-US: Editable
```

## zh-CN

可以在使用插槽获得的数据，修改 `data` 中的数据，达到可编辑表格的功能。

---

## en-US

You can use the data obtained from the slot to modify the data in `data` to achieve the function of editing the table.

---

```vue

<template>
  <a-table :columns="columns" :data="data">
    <template #name="{ rowIndex }">
      <a-input v-model="data[rowIndex].name" />
    </template>
    <template #province="{ rowIndex }">
      <a-select v-model="data[rowIndex].province" @change="()=>handleChange(rowIndex)">
        <a-option v-for="value of Object.keys(options)">{{value}}</a-option>
      </a-select>
    </template>
    <template #city="{ rowIndex }">
      <a-select :options="options[data[rowIndex].province] || []" v-model="data[rowIndex].city" />
    </template>
  </a-table>
</template>

<script>
export default {
  data() {
    return {
      options: {
        Beijing: ['Haidian', 'Chaoyang', 'Changping'],
        Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
        Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
      },
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          slotName: 'name'
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
          title: 'Province',
          dataIndex: 'province',
          slotName: 'province'
        },
        {
          title: 'City',
          dataIndex: 'city',
          slotName: 'city'
        },
        {},
        {
          title: 'Email',
          dataIndex: 'email',
        },
      ],
      data: [{
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        province: 'Beijing',
        city: 'Haidian',
        email: 'jane.doe@example.com'
      }, {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com'
      }, {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        address: '31 Park Road, London',
        province: 'Sichuan',
        city: 'Mianyang',
        email: 'kevin.sandra@example.com'
      }, {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com'
      }, {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com'
      }]
    }
  },
  methods: {
    handleChange(rowIndex) {
      this.$data.data[rowIndex].city = ''
    }
  }
}
</script>
```
