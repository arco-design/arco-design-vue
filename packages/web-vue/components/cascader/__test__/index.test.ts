import { DOMWrapper, mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import Cascader from '../cascader.vue';

const mountCascader = async (options: Record<string, any> = {}) => {
  const wrapper = mount(Cascader, options);
  await nextTick();
  await nextTick();
  return wrapper;
};

const getDropdownPanel = () => {
  const element = document.body.querySelector('.sd-cascader-dropdown-panel');
  return element ? new DOMWrapper(element) : null;
};

const getSearchPanel = () => {
  const element = document.body
    .querySelector('.sd-cascader-search-panel')
    ?.closest('.sd-scrollbar');
  return element ? new DOMWrapper(element) : null;
};

function mockElementSize(
  element: HTMLElement,
  size: Partial<Record<'offsetWidth' | 'clientWidth', number>>,
) {
  for (const [key, value] of Object.entries(size)) {
    Object.defineProperty(element, key, {
      configurable: true,
      value,
    });
  }
}

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
  test('should support value alias', async () => {
    const wrapper = await mountCascader({
      props: {
        value: 'chaoyang',
        options,
        defaultPopupVisible: true,
      },
    });

    const panel = getDropdownPanel();
    expect(panel).not.toBeNull();
    await panel?.find('.sd-cascader-option').trigger('click');
    await panel?.findAll('.sd-cascader-option')[3].trigger('click');

    expect(wrapper.emitted('update:value')?.[0]).toEqual(['haidian']);
    expect(wrapper.emitted('change')?.[0]).toEqual(['haidian']);
  });

  test('should support show alias', async () => {
    const wrapper = await mountCascader({
      props: {
        show: false,
        options,
      },
    });

    await wrapper.find('input').trigger('click');

    expect(wrapper.emitted('update:show')?.[0]).toEqual([true]);
    expect(wrapper.emitted('showChange')?.[0]).toEqual([true]);
  });

  test('should support filterable alias', async () => {
    await mountCascader({
      props: {
        options,
        filterable: true,
        inputValue: 'hai',
        defaultPopupVisible: true,
      },
    });

    const panel = getSearchPanel();
    expect(panel?.exists()).toBe(true);
    expect(panel?.text()).toContain('Haidian');
  });

  test('should support clearable alias', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        clearable: true,
        defaultValue: 'chaoyang',
      },
    });

    expect(wrapper.find('.sd-select-view-clear-btn').exists()).toBe(true);
  });

  test('should support showPath and separator', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        defaultValue: 'chaoyang',
        showPath: true,
      },
    });

    expect(wrapper.find('.sd-select-view-value').text()).toBe('Beijing / ChaoYang');

    await wrapper.setProps({
      showPath: false,
    });

    expect(wrapper.find('.sd-select-view-value').text()).toBe('ChaoYang');

    await wrapper.setProps({
      showPath: true,
      separator: ' | ',
    });

    expect(wrapper.find('.sd-select-view-value').text()).toBe('Beijing | ChaoYang');
  });

  test('should support responsive maxTagCount', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        multiple: true,
        maxTagCount: 'responsive',
        defaultValue: ['chaoyang', 'haidian'],
      },
    });

    mockElementSize(wrapper.find('.sd-select-view-inner').element as HTMLElement, {
      clientWidth: 100,
    });
    mockElementSize(wrapper.find('.sd-select-view-input').element as HTMLElement, {
      offsetWidth: 12,
    });

    const measuredTags = wrapper.findAll('.sd-select-view-measure .sd-select-view-tag');
    measuredTags.forEach((tag, index) => {
      mockElementSize(tag.element as HTMLElement, {
        offsetWidth: index === measuredTags.length - 1 ? 28 : 56,
      });
    });

    wrapper.findAllComponents({ name: 'ResizeObserver' }).forEach((observer) => {
      observer.vm.$emit('resize');
    });
    await nextTick();
    await nextTick();

    const visibleTags = wrapper.findAll('.sd-select-view-inner > .sd-select-view-tag');
    expect(visibleTags).toHaveLength(2);
    expect(visibleTags[0].text()).toContain('Beijing / ChaoYang');
    expect(visibleTags[1].text()).toBe('+1');
  });

  test('should render option slot and ignore option render function', async () => {
    await mountCascader({
      props: {
        options,
        defaultPopupVisible: true,
        optionRender: (option: { label: string }) =>
          h('span', { class: 'legacy-render' }, `Legacy:${option.label}`),
      },
      slots: {
        option: ({ data }: { data: { label: string } }) =>
          h('span', { class: 'custom-option' }, `Slot:${data.label}`),
      },
    });

    const customOption = document.body.querySelector('.custom-option');
    const legacyRender = document.body.querySelector('.legacy-render');

    expect(customOption?.textContent).toBe('Slot:Beijing');
    expect(legacyRender).toBeNull();
  });

  test('should render panel', async () => {
    await mountCascader({
      props: {
        options,
        defaultPopupVisible: true,
      },
    });

    const panel = getDropdownPanel();
    expect(panel).not.toBeNull();
    expect(panel?.html()).toMatchSnapshot();
    await panel?.find('.sd-cascader-option').trigger('click');
    expect(panel?.html()).toMatchSnapshot();
  });

  test('should render panel (multiple)', async () => {
    await mountCascader({
      props: {
        options,
        multiple: true,
        defaultPopupVisible: true,
      },
    });

    const panel = getDropdownPanel();
    expect(panel).not.toBeNull();
    expect(panel?.html()).toMatchSnapshot();
    await panel?.find('.sd-cascader-option').trigger('click');
    expect(panel?.html()).toMatchSnapshot();
  });

  test('should render search panel', async () => {
    await mountCascader({
      props: {
        options,
        allowSearch: true,
        inputValue: 'h',
        defaultPopupVisible: true,
      },
    });

    const panel = getSearchPanel();
    expect(panel).not.toBeNull();
    expect(panel?.html()).toMatchSnapshot();
  });

  test('should emit change event', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        defaultPopupVisible: true,
      },
    });

    const panel = getDropdownPanel();
    expect(panel).not.toBeNull();
    await panel?.find('.sd-cascader-option').trigger('click');
    await panel?.findAll('.sd-cascader-option')[2].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual(['chaoyang']);
  });

  test('should emit change event (pathMode)', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        pathMode: true,
        defaultPopupVisible: true,
      },
    });

    const panel = getDropdownPanel();
    expect(panel).not.toBeNull();
    await panel?.find('.sd-cascader-option').trigger('click');
    await panel?.findAll('.sd-cascader-option')[2].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([['beijing', 'chaoyang']]);
  });

  test('should emit change event (multiple)', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        multiple: true,
        defaultPopupVisible: true,
      },
    });

    const panel = getDropdownPanel();
    expect(panel).not.toBeNull();
    await panel?.find('.sd-cascader-option').trigger('click');
    await panel?.findAll('.sd-checkbox')[2].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([['chaoyang']]);
  });

  test('should support keyboard action', async () => {
    const wrapper = await mountCascader({
      props: {
        options,
        defaultPopupVisible: true,
      },
    });

    const input = wrapper.find('input');
    const dropdown = getDropdownPanel();
    expect(dropdown).not.toBeNull();

    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(dropdown?.find('.sd-cascader-option-active')?.text()).toBe('Beijing');

    await input.trigger('keydown', { key: 'ArrowRight' });
    expect(dropdown?.findAll('.sd-cascader-panel-column')).toHaveLength(2);
    expect(dropdown?.findAll('.sd-cascader-option-active')[1]?.text()).toBe('ChaoYang');

    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(dropdown?.findAll('.sd-cascader-option-active')[1]?.text()).toBe('Haidian');

    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('change')?.[0]).toEqual(['haidian']);
  });
});
