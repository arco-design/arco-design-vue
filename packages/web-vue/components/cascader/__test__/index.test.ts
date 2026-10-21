import { mount } from '@vue/test-utils';
import Cascader from '../cascader.vue';

const sleep = (timeout = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

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

  test('search panel uses virtual list when virtual-list-props is set', async () => {
    const manyOptions = Array.from({ length: 200 }, (_, index) => ({
      value: `v${index}`,
      label: `SameLabel ${index}`,
    }));
    const wrapper = mount(Cascader, {
      props: {
        options: manyOptions,
        allowSearch: true,
        virtualListProps: { height: 200 },
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('SameLabel');

    const panel = wrapper.findComponent({ name: 'CascaderSearchPanel' });
    expect(panel.find('.arco-virtual-list').exists()).toBe(true);

    const rendered = panel.findAll('.arco-cascader-search-option');
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(200);
  });

  test('search panel renders all matches without virtual-list-props', async () => {
    const manyOptions = Array.from({ length: 200 }, (_, index) => ({
      value: `v${index}`,
      label: `SameLabel ${index}`,
    }));
    const wrapper = mount(Cascader, {
      props: {
        options: manyOptions,
        allowSearch: true,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('SameLabel');

    const panel = wrapper.findComponent({ name: 'CascaderSearchPanel' });
    expect(panel.find('.arco-virtual-list').exists()).toBe(false);
    expect(panel.findAll('.arco-cascader-search-option')).toHaveLength(200);
  });

  test('debounces filtering for large option trees', async () => {
    const manyOptions = Array.from({ length: 2001 }, (_, index) => ({
      value: `v${index}`,
      label: `SameLabel ${index}`,
    }));
    const wrapper = mount(Cascader, {
      props: {
        options: manyOptions,
        allowSearch: true,
        searchDelay: 20,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('SameLabel');

    const panel = wrapper.findComponent({ name: 'CascaderSearchPanel' });
    // 超过阈值时过滤被防抖，立即查询不会有结果
    expect(panel.findAll('.arco-cascader-search-option')).toHaveLength(0);

    await sleep(60);
    expect(panel.findAll('.arco-cascader-search-option')).toHaveLength(2001);
  });
});
