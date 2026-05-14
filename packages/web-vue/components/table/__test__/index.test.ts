import { mount } from '@vue/test-utils';
import { h, nextTick, reactive, ref } from 'vue';

import VirtualList from '../../_components/virtual-list';
import { useColumnResize } from '../hooks/use-column-resize';
import { TableChangeExtra, TableColumnData, TableData } from '../interface';
import Table from '../table';

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
    let content = wrapper.find('.sd-table-td-content').element.innerHTML;
    expect(content).toBe('Jane Doe5');
    data.pop();
    await nextTick();
    content = wrapper.find('.sd-table-td-content').element.innerHTML;
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
      currentDataSource: TableData[],
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
    wrapper.find('.sd-table-cell-with-sorter').trigger('click');
    expect(testSortRes.data[0].key).toBe('1');
    expect(testSortRes.extra.sorter?.direction).toBe('ascend');
    expect(testSortRes.currentDataSource).toBeTruthy();
    expect(testSortRes.currentDataSource.length).toBe(5);
    expect(testSortRes.currentDataSource[0].key).toBe('1');
    expect(testSortRes.currentDataSource[4].key).toBe('5');
    await nextTick();
    wrapper.find('.sd-table-cell-with-sorter').trigger('click');
    expect(testSortRes.data[0].key).toBe('5');
    expect(testSortRes.extra.sorter?.direction).toBe('descend');
    expect(testSortRes.currentDataSource).toBeTruthy();
    expect(testSortRes.currentDataSource.length).toBe(5);
    expect(testSortRes.currentDataSource[0].key).toBe('5');
    expect(testSortRes.currentDataSource[4].key).toBe('1');
  });

  test('table virtual list keeps expand rows and uses scrollbar', async () => {
    const data = Array.from({ length: 40 }, (_, index) => ({
      key: String(index + 1),
      name: `Jane Doe${index + 1}`,
      age: index + 1,
      expand: `展开内容 ${index + 1}`,
    }));

    const wrapper = mount(Table as any, {
      attachTo: document.body,
      props: {
        columns: JSONCopy(demoColumns),
        data,
        expandable: {
          title: 'Expand',
        },
        scroll: {
          y: 320,
        },
        virtualListProps: {
          estimatedSize: 32,
          buffer: 20,
        },
      },
    });

    await nextTick();
    await nextTick();

    expect(wrapper.find('.sd-table-body.sd-scrollbar').exists()).toBe(true);
    expect(wrapper.find('.sd-table-body .vue-recycle-scroller__item-view').exists()).toBe(true);
    expect(
      wrapper.findAll('.sd-table-body .sd-table-element > .sd-table-tbody').length,
    ).toBeLessThan(20);

    await wrapper.find('.sd-table-expand-btn').trigger('click');
    await nextTick();
    await nextTick();

    expect(wrapper.text()).toContain('展开内容');
  });

  test('table virtual list does not write virtual padding to table element', async () => {
    const data = Array.from({ length: 80 }, (_, index) => ({
      key: String(index + 1),
      name: `Jane Doe${index + 1}`,
      age: index + 1,
    }));

    const wrapper = mount(Table as any, {
      attachTo: document.body,
      props: {
        columns: JSONCopy(demoColumns),
        data,
        scroll: {
          y: 320,
        },
        virtualListProps: {
          estimatedSize: 32,
          buffer: 20,
        },
      },
    });

    await nextTick();
    await nextTick();

    const element = wrapper.find('.sd-table-element');
    const tbody = wrapper.find('.sd-table-tbody');

    expect(element.exists()).toBe(true);
    expect(tbody.exists()).toBe(true);
    expect(element.attributes('style') ?? '').not.toContain('padding-top');
    expect(element.attributes('style') ?? '').not.toContain('padding-bottom');
    expect(tbody.find('.sd-table-body .vue-recycle-scroller__item-view').exists()).toBe(true);
  });

  test('table column resize forces virtual list rerender', async () => {
    const data = Array.from({ length: 80 }, (_, index) => ({
      key: String(index + 1),
      name: `Jane Doe${index + 1}`,
      age: index + 1,
    }));

    const columns: TableColumnData[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width: 120,
      },
    ];

    const wrapper = mount(Table as any, {
      attachTo: document.body,
      props: {
        columns,
        data,
        columnResizable: true,
        scroll: {
          y: 320,
        },
        virtualListProps: {
          estimatedSize: 32,
          buffer: 20,
        },
      },
    });

    await nextTick();
    await nextTick();

    const virtualList = wrapper.findComponent(VirtualList);
    const forceUpdate = vi.spyOn(
      virtualList.vm.$.exposed as { forceUpdate: (clear?: boolean) => void },
      'forceUpdate',
    );

    const headerCell = wrapper.find('.sd-table-th');
    const headerCellElement = headerCell.element as HTMLElement;
    headerCellElement.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 40,
      right: 120,
      width: 120,
      height: 40,
      toJSON: () => ({}),
    });

    const handle = wrapper.find('.sd-table-column-handle');
    (handle.element as HTMLElement & { setPointerCapture?: () => void }).setPointerCapture =
      vi.fn();

    handle.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 120,
        pointerId: 1,
      }),
    );

    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 150 }));

    await nextTick();
    await nextTick();

    expect(forceUpdate).toHaveBeenCalledWith(true);

    document.dispatchEvent(new PointerEvent('pointerup'));
  });

  test('table supports function rowKey for selection and expansion', async () => {
    const data = [
      {
        id: 'row-1',
        name: 'Jane Doe1',
        age: 1,
        expand: '展开内容 row-1',
      },
      {
        id: 'row-2',
        name: 'Jane Doe2',
        age: 2,
        expand: '展开内容 row-2',
      },
    ];

    const wrapper = mount(Table as any, {
      attachTo: document.body,
      props: {
        columns: JSONCopy(demoColumns),
        data,
        rowKey: (record: { id: string }) => record.id,
        rowSelection: {},
        expandable: {
          title: 'Expand',
        },
      },
    });

    const checkbox = wrapper.find('.sd-table-tbody input[type="checkbox"]');
    expect(checkbox.exists()).toBe(true);

    await checkbox.setValue(true);

    expect(wrapper.emitted('select')?.[0]?.[1]).toBe('row-1');
    expect(wrapper.emitted('selectionChange')?.[0]?.[0]).toEqual(['row-1']);

    await wrapper.find('.sd-table-expand-btn').trigger('click');
    await nextTick();

    expect(wrapper.emitted('expand')?.[0]?.[0]).toBe('row-1');
    expect(wrapper.text()).toContain('展开内容 row-1');
  });

  test('table renders append slot after body content', () => {
    const wrapper = mount(Table as any, {
      props: {
        columns: JSONCopy(demoColumns),
        data: JSONCopy(demoData),
        pagination: false,
      },
      slots: {
        append: () => h('div', { class: 'append-probe' }, 'append content'),
      },
    });

    expect(wrapper.find('.sd-table-append').exists()).toBe(true);
    expect(wrapper.find('.append-probe').text()).toBe('append content');
  });

  test('table syncs header scroll position from body and keeps fixed column classes', async () => {
    const columns: TableColumnData[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 140,
        fixed: 'left',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width: 180,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: 180,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 200,
        fixed: 'right',
      },
    ];

    const data = Array.from({ length: 10 }, (_, index) => ({
      key: String(index + 1),
      name: `Jane Doe${index + 1}`,
      age: index + 1,
      address: `Road ${index + 1}`,
      email: `jane${index + 1}@example.com`,
    }));

    const wrapper = mount(Table as any, {
      attachTo: document.body,
      props: {
        columns,
        data,
        scrollbar: false,
        scroll: {
          x: 700,
          y: 240,
        },
      },
    });

    await nextTick();

    const body = wrapper.find('.sd-table-body').element as HTMLElement;
    const header = wrapper.find('.sd-table-header').element as HTMLElement;

    Object.defineProperty(body, 'clientWidth', {
      configurable: true,
      value: 240,
    });
    Object.defineProperty(body, 'scrollWidth', {
      configurable: true,
      value: 700,
    });

    body.scrollLeft = 180;
    body.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(header.scrollLeft).toBe(180);
    expect(wrapper.find('.sd-table-col-fixed-left').exists()).toBe(true);
    expect(wrapper.find('.sd-table-col-fixed-right').exists()).toBe(true);
  });

  test('column resize calculates width from mouse position', () => {
    const emit = vi.fn();
    const thRefs = ref({
      age: {
        getBoundingClientRect: () => ({ x: 200, width: 120 }),
      } as HTMLElement,
    });

    const { handleThMouseDown, columnWidth } = useColumnResize(thRefs, emit as never);

    handleThMouseDown('age', {
      clientX: 320,
      preventDefault: () => {},
      stopPropagation: () => {},
      target: { setPointerCapture: () => {} },
      pointerId: 1,
    } as unknown as PointerEvent);

    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 320 }));

    expect(columnWidth.age).toBe(120);
  });
});
