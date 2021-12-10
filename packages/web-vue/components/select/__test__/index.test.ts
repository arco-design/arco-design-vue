import { mount } from '@vue/test-utils';
import Select from '../index';

describe('Select', () => {
  test('show dropdown correctly', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou', 'Chengdu'],
      },
    });

    await wrapper.find('.arco-select-view').trigger('click');

    expect(document.body.outerHTML).toMatchSnapshot();
  });

  test('keyboard correctly', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    const baseSelect = wrapper.findComponent({ name: 'BaseSelect' });

    const input = wrapper.find('input');
    await input.trigger('click');
    const dropdown = wrapper.findComponent({ name: 'DropdownPanel' });
    await input.trigger('keydown', { code: 'ArrowUp' });

    expect(dropdown.find('.arco-dropdown-option-active').text()).toBe(
      'Guangzhou'
    );

    await input.trigger('keydown', { code: 'ArrowDown' });

    expect(dropdown.find('.arco-dropdown-option-active').text()).toBe(
      'Beijing'
    );

    await input.trigger('keydown', { code: 'Enter' });

    expect(baseSelect.emitted('change')?.[0]).toEqual(['Beijing']);
  });

  test('should support mouse', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    const baseSelect = wrapper.findComponent({ name: 'BaseSelect' });

    const input = wrapper.find('input');
    await input.trigger('click');
    const dropdown = wrapper.findComponent({ name: 'DropdownPanel' });
    const options = dropdown.findAll('.arco-dropdown-option');
    await options[0].trigger('mouseenter');
    await options[0].trigger('mouseleave');
    await options[1].trigger('mouseenter');
    await options[1].trigger('click');

    expect(baseSelect.emitted('change')?.[0]).toEqual(['Shanghai']);
  });

  test('should show search option', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
        allowSearch: true,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('sh');
    const dropdown = wrapper.findComponent({ name: 'DropdownPanel' });
    const option = dropdown.find('.arco-dropdown-option');
    expect(option.text()).toBe('Shanghai');
  });

  test('should enable create option', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
        allowCreate: true,
      },
    });

    const baseSelect = wrapper.findComponent({ name: 'BaseSelect' });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('Xian');
    await input.trigger('keydown', { code: 'Enter' });

    expect(baseSelect.emitted('change')?.[0]).toEqual(['Xian']);
  });
});
