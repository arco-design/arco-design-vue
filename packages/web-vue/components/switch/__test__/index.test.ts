import { mount } from '@vue/test-utils';
import Switch from '../index';

describe('Switch', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Switch);
    await wrapper.find('button').trigger('click');
    // @ts-ignore
    expect(wrapper.emitted('change')?.[0]?.[0]).toEqual(true);
  });
});
