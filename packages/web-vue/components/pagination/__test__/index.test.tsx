import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Pagination from '../pagination';

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

  test('`total` causes page count changes to reset `current`', async () => {
    const total = ref(5);
    const current = ref(5);
    const handleChange = (data: number) => {
      current.value = data;
    };
    const wrapper = mount(() => (
      <Pagination
        total={total.value}
        pageSize={1}
        current={current.value}
        onChange={handleChange}
      ></Pagination>
    ));
    await nextTick();
    total.value = 4;
    await nextTick();
    expect(current.value).toBe(4);

    total.value = 5;
    current.value = 3;
    await nextTick();
    total.value = 4;
    await nextTick();
    expect(current.value).toBe(3);
  });
});
