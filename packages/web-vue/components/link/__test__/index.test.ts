import { mount } from '@vue/test-utils';

import { PerformantEllipsis } from '../../ellipsis';
import Link from '../index';

describe('Link', () => {
  test('should remove href attribute', () => {
    const wrapper = mount(Link, {
      props: {
        disabled: true,
      },
    });
    const href = wrapper.find('a').attributes('href');

    expect(href).toBeUndefined();
  });

  test('should enable performant ellipsis by default and forward ellipsis props', () => {
    const wrapper = mount(Link, {
      props: {
        ellipsisLineClamp: 2,
        ellipsisTooltip: false,
      },
      slots: {
        default: 'A very long link content that should be truncated.',
      },
    });

    const ellipsis = wrapper.findComponent(PerformantEllipsis);

    expect(ellipsis.exists()).toBe(true);
    expect(ellipsis.props('lineClamp')).toBe(2);
    expect(ellipsis.props('tooltip')).toBe(false);
  });

  test('should render plain content when ellipsis is disabled', () => {
    const wrapper = mount(Link, {
      props: {
        ellipsis: false,
      },
      slots: {
        default: 'Plain link content',
      },
    });

    expect(wrapper.findComponent(PerformantEllipsis).exists()).toBe(false);
    expect(wrapper.find('.sd-link-content').text()).toBe('Plain link content');
  });

  test('should disable hoverable style for icon-only links by default', () => {
    const wrapper = mount(Link, {
      props: {
        icon: true,
      },
    });

    expect(wrapper.classes()).toContain('sd-link-hoverless');
    expect(wrapper.classes()).toContain('sd-link-icon-only');
  });

  test('should wrap the icon with tooltip when iconTooltip is provided', () => {
    const wrapper = mount(Link, {
      props: {
        icon: true,
        iconTooltip: '打开链接',
      },
    });

    const tooltip = wrapper.findComponent({ name: 'Tooltip' });

    expect(tooltip.exists()).toBe(true);
    expect(tooltip.props('content')).toBe('打开链接');
  });
});
