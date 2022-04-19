import { mount } from '@vue/test-utils';
import Cascader from '../cascader.vue';

const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'huangpu',
        label: 'Huangpu',
      },
    ],
  },
];

describe('Cascader', () => {
  test('should render panel', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
      },
    });
    await wrapper.find('input').trigger('click');
    const panel = wrapper.findComponent({ name: 'BaseCascaderPanel' });
    expect(panel.html()).toMatchSnapshot();
    await panel.find('.arco-cascader-option').trigger('click');
    expect(panel.html()).toMatchSnapshot();
  });

  test('should render panel (multiple)', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        multiple: true,
      },
    });
    await wrapper.find('input').trigger('click');
    const panel = wrapper.findComponent({ name: 'BaseCascaderPanel' });
    expect(panel.html()).toMatchSnapshot();
    await panel.find('.arco-cascader-option').trigger('click');
    expect(panel.html()).toMatchSnapshot();
  });

  test('should render search panel', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        allowSearch: true,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('a');
    const panel = wrapper.findComponent({ name: 'CascaderSearchPanel' });
    expect(panel.html()).toMatchSnapshot();
  });

  test('should emit change event', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
      },
    });

    await wrapper.find('input').trigger('click');
    const panel = wrapper.findComponent({ name: 'BaseCascaderPanel' });
    await panel.find('.arco-cascader-option').trigger('click');
    await panel.findAll('.arco-cascader-option')[2].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual(['chaoyang']);
  });

  test('should emit change event (pathMode)', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        pathMode: true,
      },
    });

    await wrapper.find('input').trigger('click');
    const panel = wrapper.findComponent({ name: 'BaseCascaderPanel' });
    await panel.find('.arco-cascader-option').trigger('click');
    await panel.findAll('.arco-cascader-option')[2].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([['beijing', 'chaoyang']]);
  });

  test('should emit change event (multiple)', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        multiple: true,
      },
    });

    await wrapper.find('input').trigger('click');
    const panel = wrapper.findComponent({ name: 'BaseCascaderPanel' });
    await panel.find('.arco-cascader-option').trigger('click');
    await panel.findAllComponents({ name: 'Checkbox' })[2].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([['chaoyang']]);
  });

  test('should support keyboard action', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    const dropdown = wrapper.findComponent({ name: 'BaseCascaderPanel' });

    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(dropdown.find('.arco-cascader-option-active').text()).toBe(
      'Beijing'
    );

    await input.trigger('keydown', { key: 'ArrowRight' });
    expect(dropdown.findAll('.arco-cascader-panel-column')).toHaveLength(2);
    expect(dropdown.findAll('.arco-cascader-option-active')[1].text()).toBe(
      'ChaoYang'
    );

    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(dropdown.findAll('.arco-cascader-option-active')[1].text()).toBe(
      'Haidian'
    );

    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('change')?.[0]).toEqual(['haidian']);
  });
});
