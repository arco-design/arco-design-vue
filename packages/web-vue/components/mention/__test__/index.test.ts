import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
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
      wrapper.findComponent({ name: 'SelectDropdown' }).html()
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
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' });
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(dropdown.find('.arco-select-option-active').text()).toBe(
      'Bytedesign'
    );
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(dropdown.find('.arco-select-option-active').text()).toBe(
      'Bytedance'
    );
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('change')?.[1]).toEqual(['@Bytedance']);
  });

  test('should close popup after clear', async () => {
    const wrapper = mount(Mention, {
      props: {
        data: ['Bytedance', 'Bytedesign', 'Bytenumner'],
        allowClear: true,
      },
      attachTo: document.body,
    });
    const input = wrapper.find('input');
    await input.trigger('focusin');
    await input.setValue('@');
    await nextTick();

    const triggerVm = wrapper.findComponent({ name: 'Trigger' }).vm as any;
    expect(triggerVm.$props.popupVisible).toBe(true);

    const clearBtn = wrapper.find('.arco-input-clear-btn');
    await clearBtn.trigger('mousedown');
    await clearBtn.trigger('click');
    await nextTick();

    expect(triggerVm.$props.popupVisible).toBe(false);
  });
});
