import { mount } from '@vue/test-utils';

import Layout from '../index';

const { Sider } = Layout;

const _matchMedia = window.matchMedia;

describe('Layout', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: _matchMedia,
    });
  });

  test('Collapse should work for Sider', async () => {
    const wrapper = mount(Sider, {
      props: {
        collapsible: true,
      },
    });
    expect(wrapper.find('.sd-layout-sider').attributes('style')).toContain('width: 200px');
    const collapseTrigger = wrapper.find('.sd-layout-sider-trigger');
    await collapseTrigger.trigger('click');
    expect(wrapper.find('.sd-layout-sider').attributes('style')).toContain('width: 48px');
    expect(wrapper.emitted('collapse')).toHaveLength(1);
  });

  test('temporary sider should close by mask and esc', async () => {
    const wrapper = mount(Sider, {
      attachTo: document.body,
      props: {
        temporary: true,
        defaultVisible: true,
        location: 'left',
      },
    });

    const sider = wrapper.find('.sd-layout-sider');

    expect(sider.classes()).toContain('sd-layout-sider-temporary');
    expect(sider.classes()).toContain('sd-layout-sider-active');
    expect(sider.classes()).toContain('sd-layout-sider-left');
    expect(document.body.querySelector('.sd-layout-sider-mask')).not.toBeNull();

    await wrapper.find('.sd-layout-sider-mask').trigger('click');
    expect(sider.classes()).not.toContain('sd-layout-sider-active');

    await wrapper.setProps({ defaultVisible: false, modelValue: true });
    document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper.emitted('update:modelValue')).toContainEqual([false]);

    wrapper.unmount();
  });

  test('rail sider should expand on hover', async () => {
    const wrapper = mount(Sider, {
      props: {
        defaultRail: true,
        expandOnHover: true,
      },
    });

    expect(wrapper.find('.sd-layout-sider').attributes('style')).toContain('width: 56px');
    await wrapper.find('.sd-layout-sider').trigger('mouseenter');
    expect(wrapper.find('.sd-layout-sider').attributes('style')).toContain('width: 200px');
    await wrapper.find('.sd-layout-sider').trigger('mouseleave');
    expect(wrapper.find('.sd-layout-sider').attributes('style')).toContain('width: 56px');
    expect(wrapper.emitted('update:rail')).toHaveLength(2);
  });
});
