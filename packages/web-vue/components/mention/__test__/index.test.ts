import { mount } from '@vue/test-utils';
import Mention from '../index';

describe('Mention', () => {
  test('mention correctly', async () => {
    const wrapper = mount(Mention, {
      props: {
        data: ['Bytedance', 'Bytedesign', 'Bytenumner'],
      },
    });
    const input = wrapper.find('input');
    await input.trigger('focusin');
    await input.setValue('@');

    expect(
      wrapper.findComponent({ name: 'DropdownPanel' }).html()
    ).toMatchSnapshot();
  });

  test('should select value', async () => {
    const wrapper = mount(Mention, {
      props: {
        data: ['Bytedance', 'Bytedesign', 'Bytenumner'],
      },
    });
    const input = wrapper.find('input');
    await input.trigger('focusin');
    await input.setValue('@');
    const dropdown = wrapper.findComponent({ name: 'DropdownPanel' });
    await input.trigger('keydown', { code: 'ArrowDown' });
    expect(dropdown.find('.arco-dropdown-option-active').text()).toBe(
      'Bytedesign'
    );
    await input.trigger('keydown', { code: 'ArrowUp' });
    expect(dropdown.find('.arco-dropdown-option-active').text()).toBe(
      'Bytedance'
    );
    await input.trigger('keydown', { code: 'Enter' });
    expect(wrapper.emitted('change')?.[1]).toEqual(['@Bytedance']);
  });
});
