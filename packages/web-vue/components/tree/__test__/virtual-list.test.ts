import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { vi } from 'vitest';

import Tree from '../index';

function getTranslateY(style: string) {
  const match = /translateY\(([-\d.]+)px\)/.exec(style);
  return match ? Number(match[1]) : 0;
}

const options = Array.from({ length: 10 }, (_, index) => ({
  label: `Option ${index}`,
  key: `option-0-${index}`,
  value: `option-0-${index}`,
}));

const treeOptions = Array.from({ length: 10 }, (_, index) => ({
  label: `parent-${index}`,
  key: `parent-${index}`,
  value: `parent-${index}`,
  children: options.map((option) => ({
    ...option,
    key: option.key.replace('0', String(index)),
    value: option.value.replace('0', String(index)),
  })),
}));

describe('Tree virtual list', () => {
  test('should keep dynamic virtual tree scrollable without scroller warnings', async () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(Tree, {
      attachTo: document.body,
      props: {
        data: treeOptions,
        virtualListProps: {
          height: 240,
          minItemSize: 32,
        },
      },
      slots: {
        title: ({ title, key }: { title: string; key: string }) => {
          if (!String(key).startsWith('option-')) {
            return title;
          }

          return `${title} - dynamic node content used to verify the scroller stays virtualized.`;
        },
      },
    });

    await nextTick();
    await nextTick();

    await wrapper.find('.sd-tree-node-switcher').trigger('click');
    await nextTick();
    await nextTick();

    expect(wrapper.find('.vue-recycle-scroller').exists()).toBe(true);
    expect(consoleWarn).not.toHaveBeenCalledWith(
      expect.stringContaining("It seems the scroller element isn't scrolling"),
    );

    consoleWarn.mockRestore();
  });

  test('should keep leading child options contiguous for small virtual data', async () => {
    const wrapper = mount(Tree, {
      attachTo: document.body,
      props: {
        data: treeOptions,
        virtualListProps: {},
      },
    });

    await nextTick();
    await nextTick();

    await wrapper.find('.sd-tree-node-switcher').trigger('click');
    await nextTick();
    await nextTick();

    const visibleTitles = wrapper
      .findAll('.vue-recycle-scroller__item-view')
      .map((view) => {
        const node = view.find('.sd-tree-node');

        return {
          label: node.attributes('label'),
          top: getTranslateY((view.element as HTMLElement).style.transform),
        };
      })
      .filter((item): item is { label: string; top: number } => Boolean(item.label))
      .sort((left, right) => left.top - right.top)
      .map((item) => item.label);

    expect(visibleTitles.slice(0, 5)).toEqual([
      'parent-0',
      'Option 0',
      'Option 1',
      'Option 2',
      'Option 3',
    ]);
  });

  test('should keep dynamic rows contiguous after collapsing and expanding again', async () => {
    const wrapper = mount(Tree, {
      attachTo: document.body,
      props: {
        data: treeOptions,
        virtualListProps: {
          height: 240,
          minItemSize: 32,
        },
      },
      slots: {
        title: ({ title, key }: { title: string; key: string }) => {
          if (!String(key).startsWith('option-')) {
            return title;
          }

          return `${title} - dynamic node content used to verify relayout after toggling.`;
        },
      },
    });

    await nextTick();
    await nextTick();

    const switchers = wrapper.findAll('.sd-tree-node-switcher');
    await switchers[0].trigger('click');
    await nextTick();
    await nextTick();

    await switchers[0].trigger('click');
    await nextTick();
    await nextTick();

    await switchers[0].trigger('click');
    await nextTick();
    await nextTick();

    const visibleTitles = wrapper
      .findAll('.vue-recycle-scroller__item-view')
      .map((view) => {
        const node = view.find('.sd-tree-node');

        return {
          label: node.attributes('label'),
          top: getTranslateY((view.element as HTMLElement).style.transform),
        };
      })
      .filter((item): item is { label: string; top: number } => Boolean(item.label))
      .sort((left, right) => left.top - right.top)
      .map((item) => item.label);

    expect(visibleTitles.slice(0, 5)).toEqual([
      'parent-0',
      'Option 0',
      'Option 1',
      'Option 2',
      'Option 3',
    ]);
  });
});
