import { mount } from '@vue/test-utils';
import { nextTick, reactive, ref } from 'vue';
import Table from '../table';

describe('Table', () => {
  test('Correct rendering after deleting data on the last page', async () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
    ];
    const data = reactive([
      {
        key: '1',
        name: 'Jane Doe1',
      },
      {
        key: '2',
        name: 'Jane Doe2',
      },
      {
        key: '3',
        name: 'Jane Doe3',
      },
      {
        key: '4',
        name: 'Jane Doe4',
      },
      {
        key: '5',
        name: 'Jane Doe5',
      },
    ]);
    const current = ref(5);
    const handleChange = (data: number) => {
      current.value = data;
    };

    const wrapper = mount(Table as any, {
      props: {
        columns,
        data,
        pagination: {
          current,
          onChange: handleChange,
          pageSize: 1,
        },
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
});
