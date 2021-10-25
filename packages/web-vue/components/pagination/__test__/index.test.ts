import { mount } from '@vue/test-utils';
import Pagination from '../index';

describe('Pagination', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 200,
        showJumper: true,
      },
    });

    const pageButtons = wrapper.findAll('.arco-pagination-item');
    await pageButtons[2].trigger('click');
    expect(wrapper.emitted('change')[0]).toEqual([2]);
    const ellipsis = wrapper.find('.arco-pagination-item-ellipsis');
    await ellipsis.trigger('click');
    expect(wrapper.emitted('change')[1]).toEqual([7]);
  });
});
