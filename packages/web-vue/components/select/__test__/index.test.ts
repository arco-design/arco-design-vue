import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import Select from '../index';

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

describe('Select', () => {
  test('show dropdown correctly', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou', 'Chengdu'],
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');

    expect(document.body.outerHTML.replace('<body><!---->', '<body>')).toMatchSnapshot();
  });

  test('keyboard correctly', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' });
    await input.trigger('keydown', { key: 'ArrowUp' });

    expect(dropdown.find('.sd-select-option-active').text()).toBe('Guangzhou');

    await input.trigger('keydown', { key: 'ArrowDown' });

    expect(dropdown.find('.sd-select-option-active').text()).toBe('Beijing');

    await input.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('change')?.[0]).toEqual(['Beijing']);
  });

  test('should support mouse', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' });
    const options = dropdown.findAll('.sd-select-option');
    await options[0].trigger('mouseenter');
    await options[0].trigger('mouseleave');
    await options[1].trigger('mouseenter');
    await options[1].trigger('click');

    expect(wrapper.emitted('change')?.[0]).toEqual(['Shanghai']);
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
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' });
    const option = dropdown.find('.sd-select-option');
    expect(option.text()).toBe('Shanghai');
  });

  test('should enable create option', async () => {
    const wrapper = mount(Select, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
        allowCreate: true,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue('Xian');
    await input.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('change')?.[0]).toEqual(['Xian']);
  });

  test('should support v-model:value', async () => {
    const wrapper = mount(Select, {
      props: {
        value: 'Shanghai',
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' });
    await dropdown.findAll('.sd-select-option')[2].trigger('click');

    expect(wrapper.emitted('update:value')?.[0]).toEqual(['Guangzhou']);
    expect(wrapper.emitted('change')?.[0]).toEqual(['Guangzhou']);
  });

  test('should support v-model:show alias', async () => {
    const wrapper = mount(Select, {
      props: {
        show: false,
        options: ['Beijing', 'Shanghai'],
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');

    expect(wrapper.emitted('update:show')?.[0]).toEqual([true]);
    expect(wrapper.emitted('showChange')?.[0]).toEqual([true]);
  });

  test('should support children field names', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          {
            text: 'Cities',
            items: [
              { city: 'bj', text: 'Beijing' },
              { city: 'sh', text: 'Shanghai' },
            ],
          },
        ],
        fieldNames: {
          value: 'city',
          label: 'text',
          children: 'items',
        },
      },
    });

    await wrapper.find('.sd-select-view').trigger('click');
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' });
    const options = dropdown.findAll('.sd-select-option');
    expect(dropdown.text()).toContain('Beijing');
    expect(dropdown.text()).toContain('Shanghai');

    await options[0].trigger('click');

    expect(wrapper.emitted('change')?.[0]).toEqual(['bj']);
  });

  test('should render label slot with options data', () => {
    const wrapper = mount(Select, {
      props: {
        defaultValue: 'Beijing',
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
      slots: {
        label: ({ data }) => h('span', { class: 'custom-label' }, `City:${data.label}`),
      },
    });

    expect(wrapper.find('.custom-label').text()).toBe('City:Beijing');
  });

  test('should render custom tag slot with selected option data', () => {
    const wrapper = mount(Select, {
      props: {
        multiple: true,
        defaultValue: ['Beijing'],
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
      slots: {
        tag: ({ data }) => h('span', { class: 'custom-tag' }, `Tag:${data.label}`),
      },
    });

    expect(wrapper.find('.custom-tag').text()).toBe('Tag:Beijing');
  });

  test('should hide arrow icon when showArrow is false', () => {
    const wrapper = mount(Select, {
      props: {
        showArrow: false,
        options: ['Beijing', 'Shanghai'],
      },
    });

    expect(wrapper.find('.sd-select-view-arrow-icon').exists()).toBe(false);
  });

  test('should keep one visible tag when maxTagCount is responsive', async () => {
    const wrapper = mount(Select, {
      props: {
        multiple: true,
        maxTagCount: 'responsive',
        defaultValue: ['Beijing', 'Shanghai', 'Guangzhou'],
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    mockElementSize(wrapper.find('.sd-select-view-inner').element as HTMLElement, {
      clientWidth: 96,
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
    expect(visibleTags[0].text()).toContain('Beijing');
    expect(visibleTags[1].text()).toBe('+2');
    expect(visibleTags[0].find('.sd-ellipsis').exists()).toBe(true);
  });

  test('should collapse to two tags plus counter when responsive space is tight', async () => {
    const wrapper = mount(Select, {
      props: {
        multiple: true,
        maxTagCount: 'responsive',
        defaultValue: ['选项1', '选项4', '选项5', '选项6'],
        options: ['选项1', '选项4', '选项5', '选项6'],
      },
    });

    mockElementSize(wrapper.find('.sd-select-view-inner').element as HTMLElement, {
      clientWidth: 160,
    });
    mockElementSize(wrapper.find('.sd-select-view-input').element as HTMLElement, {
      offsetWidth: 12,
    });

    const measuredTags = wrapper.findAll('.sd-select-view-measure .sd-select-view-tag');
    measuredTags.forEach((tag, index) => {
      mockElementSize(tag.element as HTMLElement, {
        offsetWidth: index < 4 ? 52 : 28,
      });
    });

    wrapper.findAllComponents({ name: 'ResizeObserver' }).forEach((observer) => {
      observer.vm.$emit('resize');
    });
    await nextTick();
    await nextTick();

    const visibleTags = wrapper.findAll('.sd-select-view-inner > .sd-select-view-tag');
    expect(visibleTags).toHaveLength(3);
    expect(visibleTags[0].text()).toContain('选项1');
    expect(visibleTags[1].text()).toContain('选项4');
    expect(visibleTags[2].text()).toBe('+2');
  });

  test('should ellipsis long responsive tag instead of increasing height', async () => {
    const wrapper = mount(Select, {
      props: {
        multiple: true,
        maxTagCount: 'responsive',
        defaultValue: ['选项1长长长长长长长', '选项2'],
        options: ['选项1长长长长长长长', '选项2'],
      },
    });

    mockElementSize(wrapper.find('.sd-select-view-inner').element as HTMLElement, {
      clientWidth: 110,
    });
    mockElementSize(wrapper.find('.sd-select-view-input').element as HTMLElement, {
      offsetWidth: 12,
    });

    const measuredTags = wrapper.findAll('.sd-select-view-measure .sd-select-view-tag');
    measuredTags.forEach((tag, index) => {
      mockElementSize(tag.element as HTMLElement, {
        offsetWidth: index === 0 ? 120 : 28,
      });
    });

    wrapper.findAllComponents({ name: 'ResizeObserver' }).forEach((observer) => {
      observer.vm.$emit('resize');
    });
    await nextTick();
    await nextTick();

    const visibleTags = wrapper.findAll('.sd-select-view-inner > .sd-select-view-tag');
    expect(visibleTags).toHaveLength(2);
    expect(visibleTags[0].classes()).toContain('sd-select-view-tag-overflow');
    expect(visibleTags[0].find('.sd-ellipsis').exists()).toBe(true);
  });

  test('should render single label without native title', () => {
    const wrapper = mount(Select, {
      props: {
        defaultValue: 'Beijing',
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    expect(wrapper.find('.sd-select-view').attributes('title')).toBeUndefined();
    expect(wrapper.find('.sd-ellipsis').exists()).toBe(true);
  });
});
