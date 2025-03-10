import { mount } from '@vue/test-utils';
import { nextTick, reactive, ref } from 'vue';
import Table from '../table';
import { TableChangeExtra, TableColumnData, TableData } from '../interface';

const demoData = [
  {
    key: '1',
    name: 'Jane Doe1',
    age: 1,
  },
  {
    key: '2',
    name: 'Jane Doe2',
    age: 2,
  },
  {
    key: '3',
    name: 'Jane Doe3',
    age: 3,
  },
  {
    key: '4',
    name: 'Jane Doe4',
    age: 4,
  },
  {
    key: '5',
    age: 5,
    name: 'Jane Doe5',
  },
];
const demoColumns: TableColumnData[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];
const JSONCopy = (val: unknown) => JSON.parse(JSON.stringify(val));
describe('Table', () => {
  test('Correct rendering after deleting data on the last page', async () => {
    const data = reactive(JSONCopy(demoData));
    const columns = JSONCopy(demoColumns);
    const current = ref(5);
    const handleChange = (data: number) => {
      current.value = data;
    };
    const pagination = reactive({
      current,
      onChange: handleChange,
      pageSize: 1,
    });
    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        pagination,
      },
    });
    await nextTick();
    let content = wrapper.find('.arco-table-td-content').element.innerHTML;
    expect(content).toBe('Jane Doe5');
    data.pop();
    await nextTick();
    content = wrapper.find('.arco-table-td-content').element.innerHTML;
    expect(content).toBe('Jane Doe4');
  });

  test('table sort', async () => {
    const data = reactive(JSONCopy(demoData));
    const columns = JSONCopy(demoColumns);
    columns[1].sortable = {
      sortDirections: ['ascend', 'descend'],
    };
    let testSortRes = {
      data: [] as TableData[],
      extra: {} as TableChangeExtra,
      currentDataSource: [] as TableData[],
    };
    const handleChange = (
      data: TableData[],
      extra: TableChangeExtra,
      currentDataSource: TableData[]
    ) => {
      testSortRes = { data, extra, currentDataSource };
    };
    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        onChange: handleChange,
        pagination: {
          pageSize: 2,
        },
      },
    });
    await nextTick();
    wrapper.find('.arco-table-cell-with-sorter').trigger('click');
    expect(testSortRes.data[0].key).toBe('1');
    expect(testSortRes.extra.sorter?.direction).toBe('ascend');
    expect(testSortRes.currentDataSource).toBeTruthy();
    expect(testSortRes.currentDataSource.length).toBe(5);
    expect(testSortRes.currentDataSource[0].key).toBe('1');
    expect(testSortRes.currentDataSource[4].key).toBe('5');
    await nextTick();
    wrapper.find('.arco-table-cell-with-sorter').trigger('click');
    expect(testSortRes.data[0].key).toBe('5');
    expect(testSortRes.extra.sorter?.direction).toBe('descend');
    expect(testSortRes.currentDataSource).toBeTruthy();
    expect(testSortRes.currentDataSource.length).toBe(5);
    expect(testSortRes.currentDataSource[0].key).toBe('5');
    expect(testSortRes.currentDataSource[4].key).toBe('1');
  });
});
