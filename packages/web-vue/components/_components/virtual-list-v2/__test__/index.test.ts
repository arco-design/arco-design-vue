import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import VirtualList from '../index';

describe('VirtualList', () => {
  test('supports function itemKey', async () => {
    const itemKey = vi.fn(
      (item: unknown) => `id-${(item as Record<string, any>).id}`
    );
    const data = [
      { id: 1, label: 'A' },
      { id: 2, label: 'B' },
      { id: 3, label: 'C' },
    ];

    const wrapper = mount(VirtualList, {
      props: {
        data,
        itemKey,
        height: 200,
      },
      slots: {
        item: ({ item }: { item: Record<string, any> }) =>
          h('div', { class: 'virtual-list-item-content' }, item.label),
      },
    });
    await nextTick();

    // itemKey 为函数时会被调用，并且每个数据项都会被传入
    expect(itemKey).toHaveBeenCalled();
    expect(itemKey.mock.calls.map(([item]) => item)).toEqual(
      expect.arrayContaining(data)
    );

    // 列表按 itemKey 返回的 key 渲染
    const items = wrapper.findAllComponents({ name: 'VirtualListItem' });
    expect(items).toHaveLength(3);
    expect(items.map((item) => (item.vm.$ as any).vnode.key)).toEqual([
      'id-1',
      'id-2',
      'id-3',
    ]);
    expect(
      wrapper.findAll('.virtual-list-item-content').map((item) => item.text())
    ).toEqual(['A', 'B', 'C']);
  });
});
