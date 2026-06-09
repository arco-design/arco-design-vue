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

    const checkEvent = wrapper.emitted('check') as Array<[boolean]> | undefined;
    expect(checkEvent?.[0][0]).toEqual(false);
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

  test('should apply custom color with CSS variables', () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#ff5722',
      },
      slots: {
        default: 'Custom',
      },
    });

    const style = wrapper.find('.sd-tag').attributes('style');
    // CSS 变量应被设置
    expect(style).toContain('--sd-tag-color');
    expect(style).toContain('--sd-tag-bg-color');
    // 自定义颜色 class
    expect(wrapper.classes()).toContain('sd-tag-custom-color');
    // 不应该包含内置颜色 class
    expect(wrapper.classes()).not.toContain('sd-tag-red');
  });

  test('should use textColor prop to override auto text color', () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#ff5722',
        textColor: '#000000',
      },
      slots: {
        default: 'Custom',
      },
    });

    const style = wrapper.find('.sd-tag').attributes('style');
    expect(style).toContain('--sd-tag-color: #000000');
  });

  test('should not apply custom color variables for built-in colors', () => {
    const wrapper = mount(Tag, {
      props: {
        color: 'red',
      },
      slots: {
        default: 'Red',
      },
    });

    // 内置颜色不应设置 CSS 变量
    const style = wrapper.find('.sd-tag').attributes('style');
    expect(style).toBeUndefined();
    // 应有内置颜色 class
    expect(wrapper.classes()).toContain('sd-tag-red');
    expect(wrapper.classes()).not.toContain('sd-tag-custom-color');
  });

  test('should apply bordered style with custom color', () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#ff5722',
        bordered: true,
      },
      slots: {
        default: 'Bordered',
      },
    });

    const style = wrapper.find('.sd-tag').attributes('style');
    expect(style).toContain('--sd-tag-border-color');
    expect(wrapper.classes()).toContain('sd-tag-bordered');
  });
});
