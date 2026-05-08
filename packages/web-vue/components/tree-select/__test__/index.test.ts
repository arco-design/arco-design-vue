import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import TreeSelect from '../index';

const options = [
  {
    label: 'Root',
    key: 'root',
    children: [
      {
        label: 'Leaf 1',
        key: 'leaf-1',
      },
      {
        label: 'Leaf 2',
        key: 'leaf-2',
      },
    ],
  },
];

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

describe('TreeSelect', () => {
  test('should support options alias and showPath', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        showPath: true,
        defaultValue: 'leaf-2',
        fieldNames: {
          title: 'label',
        },
      },
    });

    expect(wrapper.find('.sd-select-view-value').text()).toBe('Root / Leaf 2');

    await wrapper.setProps({
      showPath: false,
    });

    expect(wrapper.find('.sd-select-view-value').text()).toBe('Leaf 2');

    await wrapper.setProps({
      showPath: true,
      separator: ' | ',
    });

    expect(wrapper.find('.sd-select-view-value').text()).toBe('Root | Leaf 2');
  });

  test('should support v-model:value alias', async () => {
    const wrapper = mount(TreeSelect, {
      attachTo: document.body,
      props: {
        value: 'leaf-1',
        options,
        fieldNames: {
          title: 'label',
        },
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');
    await nextTick();

    const target = document.body.querySelector(
      '.sd-tree-node[data-key="leaf-2"] .sd-tree-node-title',
    ) as HTMLElement | null;

    expect(target).not.toBeNull();
    target?.click();
    await nextTick();

    expect(wrapper.emitted('update:value')?.[0]).toEqual(['leaf-2']);
    expect(wrapper.emitted('change')?.[0]).toEqual(['leaf-2']);
  });

  test('should support v-model:show alias', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        show: false,
        options,
        fieldNames: {
          title: 'label',
        },
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');

    expect(wrapper.emitted('update:show')?.[0]).toEqual([true]);
    expect(wrapper.emitted('showChange')?.[0]).toEqual([true]);
  });

  test('should support responsive maxTagCount', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        multiple: true,
        maxTagCount: 'responsive',
        defaultValue: ['leaf-1', 'leaf-2'],
        options,
        fieldNames: {
          title: 'label',
        },
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
    expect(visibleTags[0].text()).toContain('Leaf 1');
    expect(visibleTags[1].text()).toBe('+1');
  });

  test('should render custom tag slot with selected tree option data', () => {
    const wrapper = mount(TreeSelect, {
      props: {
        multiple: true,
        defaultValue: ['leaf-1'],
        options,
        fieldNames: {
          title: 'label',
        },
      },
      slots: {
        tag: ({ data }) => h('span', { class: 'tree-custom-tag' }, `Tree:${data.label}`),
      },
    });

    expect(wrapper.find('.tree-custom-tag').text()).toBe('Tree:Leaf 1');
  });

  test('should hide arrow icon when showArrow is false', () => {
    const wrapper = mount(TreeSelect, {
      props: {
        showArrow: false,
        options,
        fieldNames: {
          title: 'label',
        },
      },
    });

    expect(wrapper.find('.sd-select-view-arrow-icon').exists()).toBe(false);
  });

  test('should support treeCheckable checkbox selection', async () => {
    const wrapper = mount(TreeSelect, {
      attachTo: document.body,
      props: {
        modelValue: [],
        options,
        treeCheckable: true,
        allowSearch: true,
        fieldNames: {
          title: 'label',
        },
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');
    await nextTick();

    const checkbox = document.body.querySelector(
      '.sd-tree-node[data-key="leaf-1"] .sd-checkbox-target',
    ) as HTMLInputElement | null;

    expect(checkbox).not.toBeNull();
    if (!checkbox) {
      throw new Error('Expected leaf-1 checkbox to exist');
    }

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['leaf-1']]);
    expect(wrapper.emitted('change')?.[0]).toEqual([['leaf-1']]);
  });

  test('should support checkable alias as checkbox mode', async () => {
    const wrapper = mount(TreeSelect, {
      attachTo: document.body,
      props: {
        modelValue: [],
        options,
        checkable: true,
        allowSearch: true,
        fieldNames: {
          title: 'label',
        },
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');
    await nextTick();

    const checkbox = document.body.querySelector(
      '.sd-tree-node[data-key="leaf-2"] .sd-checkbox-target',
    ) as HTMLInputElement | null;

    expect(checkbox).not.toBeNull();
    if (!checkbox) {
      throw new Error('Expected leaf-2 checkbox to exist');
    }

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['leaf-2']]);
    expect(wrapper.emitted('change')?.[0]).toEqual([['leaf-2']]);
  });
});
