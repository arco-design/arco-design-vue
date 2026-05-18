import { mount } from '@vue/test-utils';

import Ellipsis, { PerformantEllipsis } from '../../ellipsis';
import Tag from '../index';

describe('Tag', () => {
  test('should ', async () => {
    const wrapper = mount(Tag, {
      props: {
        checkable: true,
      },
    });
    await wrapper.trigger('click');

    // @ts-ignore
    expect(wrapper.emitted('check')?.[0][0]).toEqual(false);
  });

  test('should enable ellipsis by default and forward ellipsis props', () => {
    const wrapper = mount(Tag, {
      props: {
        ellipsisLineClamp: 2,
        ellipsisTooltip: false,
      },
      slots: {
        default: 'A very long tag content that should be truncated.',
      },
    });

    const ellipsis = wrapper.findComponent(Ellipsis);

    expect(ellipsis.exists()).toBe(true);
    expect(wrapper.classes()).toContain('sd-tag-ellipsis-line-clamp');
    expect(ellipsis.props('lineClamp')).toBe(2);
    expect(ellipsis.props('tooltip')).toBe(false);
  });

  test('should render plain content when ellipsis is disabled', () => {
    const wrapper = mount(Tag, {
      props: {
        ellipsis: false,
      },
      slots: {
        default: 'Plain tag content',
      },
    });

    expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
    expect(wrapper.find('.sd-tag-text').text()).toBe('Plain tag content');
    expect(wrapper.classes()).toContain('sd-tag-no-ellipsis');
  });

  test('should switch to performant ellipsis when requested', () => {
    const wrapper = mount(Tag, {
      props: {
        ellipsisPerformant: true,
      },
      slots: {
        default: 'A very long tag content that should be truncated.',
      },
    });

    expect(wrapper.findComponent(PerformantEllipsis).exists()).toBe(true);
  });

  test('should close tag when pressing Enter on close button', async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
      slots: {
        default: 'Closable tag',
      },
    });

    await wrapper.find('.sd-tag-close-btn').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false]);
  });
});
