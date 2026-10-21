import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
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

describe('Cascader keyboard selection', () => {
  const wrappers: VueWrapper[] = [];

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
  });

  const open = async (props: Record<string, unknown> = {}) => {
    const wrapper = mount(Cascader, { props: { options, ...props } });
    wrappers.push(wrapper);
    await wrapper.find('input').trigger('click');
    return wrapper;
  };

  const press = (wrapper: VueWrapper, key: string) =>
    wrapper.find('input').trigger('keydown', { key });

  const expectChange = (wrapper: VueWrapper, value: unknown) => {
    expect(wrapper.emitted('change')?.slice(-1)).toEqual([[value]]);
    expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([[value]]);
  };

  test.each(
    [false, true].flatMap((pathMode) =>
      ['keyboard', 'mouseenter'].map((activation) => ({ pathMode, activation }))
    )
  )(
    'should expand but not select a parent ($activation, pathMode=$pathMode)',
    async ({ pathMode, activation }) => {
      const wrapper = await open({ pathMode });
      const panel = wrapper.findComponent({ name: 'BaseCascaderPanel' });
      if (activation === 'keyboard') {
        await press(wrapper, 'ArrowDown');
      } else {
        await panel.find('.arco-cascader-option').trigger('mouseenter');
      }
      await press(wrapper, 'Enter');
      expect(wrapper.emitted('change')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(wrapper.find('.arco-select-view-opened').exists()).toBe(true);
      expect(panel.findAll('.arco-cascader-panel-column')).toHaveLength(2);

      await press(wrapper, 'ArrowRight');
      await press(wrapper, 'Enter');
      expectChange(wrapper, pathMode ? ['beijing', 'chaoyang'] : 'chaoyang');
      expect(wrapper.find('.arco-select-view-opened').exists()).toBe(false);
      expect(wrapper.findComponent({ name: 'SelectView' }).text()).toContain(
        'ChaoYang'
      );
    }
  );

  test.each([false, true])(
    'should keep strict single parents selectable (pathMode=%s)',
    async (pathMode) => {
      const wrapper = await open({ checkStrictly: true, pathMode });
      await press(wrapper, 'ArrowDown');
      await press(wrapper, 'Enter');
      expectChange(wrapper, pathMode ? ['beijing'] : 'beijing');
      expect(wrapper.findComponent({ name: 'SelectView' }).text()).toBe(
        'Beijing'
      );
      expect(wrapper.find('.arco-select-view-opened').exists()).toBe(false);
    }
  );

  test.each(
    [false, true].flatMap((pathMode) =>
      [false, true].map((checkStrictly) => ({ pathMode, checkStrictly }))
    )
  )(
    'should toggle multiple parents (strict=$checkStrictly, pathMode=$pathMode)',
    async ({ pathMode, checkStrictly }) => {
      const wrapper = await open({
        multiple: true,
        checkStrictly,
        pathMode,
        options: [
          {
            ...options[0],
            children: [
              ...options[0].children,
              { value: 'disabled', label: 'Disabled', disabled: true },
            ],
          },
        ],
      });
      await press(wrapper, 'ArrowDown');
      await press(wrapper, 'Enter');
      const expected = checkStrictly
        ? pathMode
          ? [['beijing']]
          : ['beijing']
        : pathMode
        ? [
            ['beijing', 'chaoyang'],
            ['beijing', 'haidian'],
          ]
        : ['chaoyang', 'haidian'];
      expectChange(wrapper, expected);
      expect(wrapper.find('.arco-select-view-opened').exists()).toBe(true);
      await press(wrapper, 'Enter');
      expectChange(wrapper, []);
      expect(wrapper.find('.arco-select-view-opened').exists()).toBe(true);
    }
  );

  test.each([false, true])(
    'should preserve object values while expanding parents (pathMode=%s)',
    async (pathMode) => {
      const parentValue = { id: 'department', name: 'Engineering' };
      const leafValue = { id: 'team', name: 'Frontend' };
      const wrapper = await open({
        valueKey: 'id',
        pathMode,
        options: [
          {
            value: parentValue,
            label: 'Department',
            children: [{ value: leafValue, label: 'Team' }],
          },
        ],
      });
      await press(wrapper, 'ArrowDown');
      await press(wrapper, 'Enter');
      expect(wrapper.emitted('change')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(wrapper.find('.arco-select-view-opened').exists()).toBe(true);
      expect(
        wrapper
          .findComponent({ name: 'BaseCascaderPanel' })
          .findAll('.arco-cascader-panel-column')
      ).toHaveLength(2);
      await press(wrapper, 'ArrowRight');
      await press(wrapper, 'Enter');
      expectChange(wrapper, pathMode ? [parentValue, leafValue] : leafValue);
    }
  );

  test('should not select an unloaded lazy parent on Enter', async () => {
    const wrapper = await open({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      loadMore: () => undefined,
    });
    await press(wrapper, 'ArrowDown');
    await press(wrapper, 'Enter');
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.find('.arco-select-view-opened').exists()).toBe(true);
  });
});
