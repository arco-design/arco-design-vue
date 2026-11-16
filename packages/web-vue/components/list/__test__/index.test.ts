import { mount } from '@vue/test-utils';
import { h } from 'vue';
import List from '../index';

describe('List', () => {
  test('should render empty component', () => {
    const wrapper = mount(List, {
      props: {
        data: [],
      },
    });
    const empty = wrapper.find('.arco-empty').exists();
    expect(empty).toBe(true);
  });

  test('virtual list should use component data instead of virtualListProps.data', () => {
    const listData = [{ label: 'list-data-1' }, { label: 'list-data-2' }];
    const customData = [{ label: 'custom-data-1' }];

    const wrapper = mount(List, {
      props: {
        data: listData,
        virtualListProps: {
          data: customData,
          height: 200,
        },
      },
      slots: {
        item: ({ item }: { item: { label: string } }) =>
          h('div', { class: 'list-item' }, item.label),
      },
    });

    const virtualList = wrapper.findComponent({ name: 'VirtualList' });
    expect(virtualList.exists()).toBe(true);
    // data 要覆盖 virtualListProps.data
    expect(virtualList.props('data')).toEqual(listData);

    const rendered = wrapper.findAll('.list-item');
    expect(rendered.map((item) => item.text())).toEqual([
      'list-data-1',
      'list-data-2',
    ]);
  });
});
