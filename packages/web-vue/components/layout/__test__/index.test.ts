import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';

import Scrollbar from '../../scrollbar';
import Layout from '../index';

const { Header, Sider } = Layout;

const _matchMedia = window.matchMedia;

const waitForScrollFrame = async () => {
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  await nextTick();
};

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

  test('header should render app bar sections', () => {
    const wrapper = mount(Header, {
      props: {
        title: '工作台',
        extended: true,
        extensionHeight: 40,
        density: 'compact',
      },
      slots: {
        prepend: '<button class="prepend-trigger">menu</button>',
        default: '<span class="main-content">内容</span>',
        append: '<button class="append-action">action</button>',
        extension: '<div class="extension-node">secondary</div>',
      },
    });

    const header = wrapper.find('.sd-layout-header');

    expect(header.find('.sd-layout-header-title').text()).toBe('工作台');
    expect(header.find('.prepend-trigger').exists()).toBe(true);
    expect(header.find('.append-action').exists()).toBe(true);
    expect(header.find('.extension-node').exists()).toBe(true);
    expect(header.attributes('style')).toContain('--sd-layout-header-content-height: 48px');
    expect(header.attributes('style')).toContain('--sd-layout-header-extension-height: 32px');
  });

  test('header should update visibility by scroll behavior', async () => {
    const pageYOffsetDescriptor = Object.getOwnPropertyDescriptor(window, 'pageYOffset');
    const innerHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight');
    const scrollHeightDescriptor = Object.getOwnPropertyDescriptor(
      document.documentElement,
      'scrollHeight',
    );

    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 600,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2400,
    });

    const wrapper = mount(Header, {
      attachTo: document.body,
      props: {
        fixed: true,
        scrollBehavior: 'hide',
      },
      slots: {
        default: 'Header',
      },
    });

    await nextTick();

    window.pageYOffset = 500;
    window.dispatchEvent(new Event('scroll'));
    await waitForScrollFrame();

    expect(wrapper.emitted('update:modelValue')).toContainEqual([false]);
    expect(wrapper.find('.sd-layout-header').classes()).toContain('sd-layout-header-hidden');

    window.pageYOffset = 0;
    window.dispatchEvent(new Event('scroll'));
    await waitForScrollFrame();

    expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
    expect(wrapper.find('.sd-layout-header').classes()).not.toContain('sd-layout-header-hidden');

    wrapper.unmount();

    if (pageYOffsetDescriptor) {
      Object.defineProperty(window, 'pageYOffset', pageYOffsetDescriptor);
    }
    if (innerHeightDescriptor) {
      Object.defineProperty(window, 'innerHeight', innerHeightDescriptor);
    }
    if (scrollHeightDescriptor) {
      Object.defineProperty(document.documentElement, 'scrollHeight', scrollHeightDescriptor);
    }
  });

  test('header should bind scoped scroll target after mount', async () => {
    const pageYOffsetDescriptor = Object.getOwnPropertyDescriptor(window, 'pageYOffset');
    const innerHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight');
    const scrollHeightDescriptor = Object.getOwnPropertyDescriptor(
      document.documentElement,
      'scrollHeight',
    );

    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 600,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2400,
    });

    const wrapper = mount(
      defineComponent({
        components: {
          LayoutHeader: Header,
        },
        template: `
          <div class="layout-scroll-scope">
            <layout-header fixed scroll-target=".layout-scroll-scope__body" scroll-behavior="hide">
              Header
            </layout-header>
            <div class="layout-scroll-scope__body"></div>
          </div>
        `,
      }),
      {
        attachTo: document.body,
      },
    );

    const header = wrapper.findComponent(Header);
    const scrollBody = wrapper.find('.layout-scroll-scope__body').element as HTMLElement;

    Object.defineProperty(scrollBody, 'clientHeight', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(scrollBody, 'scrollHeight', {
      configurable: true,
      value: 1200,
    });
    Object.defineProperty(scrollBody, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 0,
    });

    window.dispatchEvent(new Event('resize'));
    await waitForScrollFrame();

    window.pageYOffset = 500;
    window.dispatchEvent(new Event('scroll'));
    await waitForScrollFrame();

    expect(header.emitted('update:modelValue')).toBeUndefined();
    expect(header.find('.sd-layout-header').classes()).not.toContain('sd-layout-header-hidden');

    scrollBody.scrollTop = 500;
    scrollBody.dispatchEvent(new Event('scroll'));
    await waitForScrollFrame();

    expect(header.emitted('update:modelValue')).toContainEqual([false]);
    expect(header.find('.sd-layout-header').classes()).toContain('sd-layout-header-hidden');

    scrollBody.scrollTop = 0;
    scrollBody.dispatchEvent(new Event('scroll'));
    await waitForScrollFrame();

    expect(header.emitted('update:modelValue')).toContainEqual([true]);
    expect(header.find('.sd-layout-header').classes()).not.toContain('sd-layout-header-hidden');

    wrapper.unmount();

    if (pageYOffsetDescriptor) {
      Object.defineProperty(window, 'pageYOffset', pageYOffsetDescriptor);
    }
    if (innerHeightDescriptor) {
      Object.defineProperty(window, 'innerHeight', innerHeightDescriptor);
    }
    if (scrollHeightDescriptor) {
      Object.defineProperty(document.documentElement, 'scrollHeight', scrollHeightDescriptor);
    }
  });

  test('header should react to scrollbar viewport scroll', async () => {
    const wrapper = mount(
      defineComponent({
        components: {
          LayoutHeader: Header,
          Scrollbar,
        },
        template: `
          <div class="layout-scrollbar-scope">
            <layout-header fixed scroll-target=".layout-scrollbar-scope__body" scroll-behavior="hide">
              Header
            </layout-header>
            <scrollbar class="layout-scrollbar-scope__body">
              <div style="height: 1200px;">Content</div>
            </scrollbar>
          </div>
        `,
      }),
      {
        attachTo: document.body,
      },
    );

    await nextTick();

    const header = wrapper.findComponent(Header);
    const viewport = wrapper.find('.layout-scrollbar-scope__body [data-overlayscrollbars-viewport]')
      .element as HTMLElement;

    Object.defineProperty(viewport, 'clientHeight', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(viewport, 'scrollHeight', {
      configurable: true,
      value: 1200,
    });
    Object.defineProperty(viewport, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 0,
    });

    window.dispatchEvent(new Event('resize'));
    await waitForScrollFrame();

    viewport.scrollTop = 500;
    viewport.dispatchEvent(new Event('scroll'));
    await waitForScrollFrame();

    expect(header.emitted('update:modelValue')).toContainEqual([false]);
    expect(header.find('.sd-layout-header').classes()).toContain('sd-layout-header-hidden');

    wrapper.unmount();
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
