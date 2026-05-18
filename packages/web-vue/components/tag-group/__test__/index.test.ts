import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import TagGroup from '../index';

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

describe('TagGroup', () => {
  test('should use responsive maxCount by default', async () => {
    const wrapper = mount(TagGroup, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    mockElementSize(wrapper.find('.sd-tag-group-inner').element as HTMLElement, {
      clientWidth: 96,
    });

    const measuredItems = wrapper.findAll('.sd-tag-group-measure .sd-tag-group-item');
    measuredItems.forEach((item, index) => {
      mockElementSize(item.element as HTMLElement, {
        offsetWidth: index < 3 ? 56 : 28,
      });
    });

    wrapper.findAllComponents({ name: 'ResizeObserver' }).forEach((observer) => {
      observer.vm.$emit('resize');
    });
    await nextTick();
    await nextTick();

    const root = wrapper.find('.sd-tag-group');
    const visibleItems = wrapper.find('.sd-tag-group-inner').findAll('.sd-tag-group-item');
    expect(root.classes()).toContain('sd-tag-group-responsive');
    expect(visibleItems).toHaveLength(2);
    expect(visibleItems[0].text()).toContain('Beijing');
    expect(visibleItems[1].text()).toBe('+2');
    expect(visibleItems[0].find('.sd-ellipsis').exists()).toBe(true);
  });

  test('should support numeric maxCount', () => {
    const wrapper = mount(TagGroup, {
      props: {
        maxCount: 2,
        options: ['标签1', '标签2', '标签3', '标签4'],
      },
    });

    const visibleItems = wrapper.find('.sd-tag-group-inner').findAll('.sd-tag-group-item');
    expect(visibleItems).toHaveLength(3);
    expect(visibleItems[0].text()).toContain('标签1');
    expect(visibleItems[1].text()).toContain('标签2');
    expect(visibleItems[2].text()).toBe('+2');
  });

  test('should support fieldNames', () => {
    const wrapper = mount(TagGroup, {
      props: {
        maxCount: 1,
        options: [{ text: '文档', id: 'doc' }],
        fieldNames: {
          label: 'text',
          value: 'id',
        },
      },
    });

    expect(wrapper.text()).toContain('文档');
  });

  test('should support custom item slot', () => {
    const wrapper = mount(TagGroup, {
      props: {
        maxCount: 1,
        options: [{ label: '帮助文档', value: 'doc', href: '/docs' }],
      },
      slots: {
        item: ({ data, itemClass, itemStyle }) =>
          h(
            'a',
            {
              class: ['custom-item', itemClass],
              style: itemStyle,
              href: data.href,
            },
            `跳转:${data.label}`,
          ),
      },
    });

    const link = wrapper.find('a.custom-item');
    expect(link.attributes('href')).toBe('/docs');
    expect(link.text()).toBe('跳转:帮助文档');
  });

  test('should support custom counter slot independent from item slot', () => {
    const wrapper = mount(TagGroup, {
      props: {
        maxCount: 1,
        options: ['标签1', '标签2', '标签3'],
      },
      slots: {
        item: ({ data, itemClass }) => h('span', { class: ['custom-item', itemClass] }, data.label),
        counter: ({ hiddenCount, counterClass }) =>
          h('span', { class: ['custom-counter', counterClass] }, `更多:${hiddenCount}`),
      },
    });

    expect(wrapper.find('.custom-item').text()).toBe('标签1');
    expect(wrapper.find('.custom-counter').text()).toBe('更多:2');
    expect(wrapper.find('.custom-counter .sd-ellipsis').exists()).toBe(false);
  });

  test('should recompute responsive layout when width grows again', async () => {
    const wrapper = mount(TagGroup, {
      props: {
        options: ['Beijing', 'Shanghai', 'Guangzhou'],
      },
    });

    const inner = wrapper.find('.sd-tag-group-inner').element as HTMLElement;

    mockElementSize(inner, {
      clientWidth: 96,
    });

    const measuredItems = wrapper.findAll('.sd-tag-group-measure .sd-tag-group-item');
    measuredItems.forEach((item, index) => {
      mockElementSize(item.element as HTMLElement, {
        offsetWidth: index < 3 ? 56 : 28,
      });
    });

    wrapper.findAllComponents({ name: 'ResizeObserver' }).forEach((observer) => {
      observer.vm.$emit('resize');
    });
    await nextTick();
    await nextTick();

    expect(wrapper.findAll('.sd-tag-group-inner > .sd-tag-group-item')).toHaveLength(2);

    mockElementSize(inner, {
      clientWidth: 200,
    });

    wrapper.findAllComponents({ name: 'ResizeObserver' }).forEach((observer) => {
      observer.vm.$emit('resize');
    });
    await nextTick();
    await nextTick();

    const visibleItems = wrapper.findAll('.sd-tag-group-inner > .sd-tag-group-item');
    expect(visibleItems).toHaveLength(3);
    expect(visibleItems[2].text()).toContain('Guangzhou');
  });
});
