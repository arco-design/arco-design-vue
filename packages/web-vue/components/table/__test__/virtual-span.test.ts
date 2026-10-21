import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Table from '../table';
import { TableColumnData } from '../interface';

const columns: TableColumnData[] = [
  { title: 'Seq', dataIndex: 'seq', width: 80 },
  { title: 'Branch', dataIndex: 'branch', width: 120 },
  { title: 'Center', dataIndex: 'center', width: 140 },
  { title: 'Area', dataIndex: 'area', width: 140 },
  { title: 'Address', dataIndex: 'addr', width: 220 },
];

const data = Array.from({ length: 60 }, (_, index) => ({
  key: String(index),
  seq: index + 1,
  branch: `branch-${index}`,
  center: `center-${index}`,
  area: `area-${index}`,
  addr: `addr-${index}`,
}));

// 操作列（多选）1 列 + 数据列 5 列
const COLUMN_COUNT = columns.length + 1;

const mountTable = (spanMethod?: (data: any) => any) =>
  mount(Table as any, {
    props: {
      columns,
      data,
      spanMethod,
      spanAll: true,
      rowSelection: { type: 'checkbox', showCheckedAll: false },
      virtualListProps: { height: 400 },
      pagination: false,
      scroll: { x: '100%', minWidth: 1200 },
    },
  });

describe('Table virtual list with span-method', () => {
  test('renders a colgroup in the virtual body, same as the header', async () => {
    const wrapper = mountTable();
    await nextTick();
    await nextTick();

    const bodyTable = wrapper.find('.arco-table-body table.arco-table-element');
    expect(bodyTable.exists()).toBe(true);

    const bodyCols = bodyTable.findAll('colgroup col');
    const headerCols = wrapper
      .find('.arco-table-header table.arco-table-element')
      .findAll('colgroup col');

    // 虚拟表格的 body 表格必须自带列定义，否则 table-layout: fixed 会用首行推断列宽
    expect(bodyCols.length).toBe(COLUMN_COUNT);
    expect(bodyCols.length).toBe(headerCols.length);
  });

  test('removes exactly the cells covered by a colspan', async () => {
    // 只做横向合并：每个已渲染行的 colspan 之和必须等于列数，
    // 保证合并后没有多删/漏删单元格（列错位的布局问题由 colgroup 用例覆盖）
    const spanMethod = ({
      rowIndex,
      columnIndex,
    }: {
      rowIndex: number;
      columnIndex: number;
    }) => {
      if (columnIndex === 2 && rowIndex % 2 === 0) {
        return { rowspan: 1, colspan: 2 };
      }
      return { rowspan: 1, colspan: 1 };
    };

    const wrapper = mountTable(spanMethod);
    await nextTick();
    await nextTick();

    const rows = wrapper.findAll('.arco-table-body tr.arco-table-tr');
    expect(rows.length).toBeGreaterThan(0);

    rows.forEach((row) => {
      const colspanSum = row.findAll('td').reduce((total, td) => {
        const colspan = (td.element as HTMLElement).getAttribute('colspan');
        return total + (colspan ? Number(colspan) : 1);
      }, 0);
      expect(colspanSum).toBe(COLUMN_COUNT);
    });
  });
});
