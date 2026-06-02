import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';

import ConfigProvider from '../../config-provider';
import Ellipsis from '../../ellipsis';
import Drawer from '../drawer.vue';

describe('Drawer', () => {
  test('should render Drawer', async () => {
    const wrapper = mount(Drawer, {
      props: {
        title: 'Title',
        defaultVisible: true,
        renderToBody: false,
      },
      slots: {
        default: '<div>Drawer Body</div>',
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.findComponent(Ellipsis).props('tooltip')).toBe(true);
  });

  test('should emit ok/cancel event', async () => {
    const wrapper = mount(Drawer, {
      props: {
        title: 'Title',
        defaultVisible: true,
        renderToBody: false,
      },
      slots: {
        default: '<div>Drawer Body</div>',
      },
    });

    await nextTick();
    const buttons = wrapper.findAll('.sd-btn');
    await buttons[0].trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('ok')).toHaveLength(1);
  });

  test('should use drawer defaults from config-provider', async () => {
    const wrapper = mount(
      defineComponent({
        components: {
          ConfigProvider,
          Drawer,
        },
        template: `
          <config-provider
            :drawer="{
              closable: false,
              okText: '全局确认',
              height: 360,
              mask: false,
              hideCancel: true,
              placement: 'bottom',
              escToClose: false,
              titleEllipsisTooltip: false,
            }"
          >
            <drawer title="Title" default-visible :render-to-body="false">
              <div>Drawer Body</div>
            </drawer>
          </config-provider>
        `,
      }),
    );

    await nextTick();
    expect(wrapper.find('.sd-drawer-mask').exists()).toBe(false);
    expect(wrapper.find('.sd-drawer-close-btn').exists()).toBe(false);
    expect(wrapper.text()).toContain('全局确认');
    expect(wrapper.text()).not.toContain('取消');
    expect(wrapper.find('.sd-drawer').attributes('style')).toContain('height: 360px');
    expect(wrapper.find('.sd-drawer').attributes('style')).toContain('bottom: 0px');
    expect(wrapper.findComponent(Ellipsis).props('tooltip')).toBe(false);

    document.documentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();
    expect(wrapper.find('.sd-drawer').exists()).toBe(true);
  });

  test('should prefer explicit drawer props over config-provider defaults', async () => {
    const wrapper = mount(
      defineComponent({
        components: {
          ConfigProvider,
          Drawer,
        },
        template: `
          <config-provider :drawer="{ closable: false, okText: '全局确认', titleEllipsisTooltip: false }">
            <drawer
              title="Title"
              default-visible
              :render-to-body="false"
              closable
              ok-text="本地确认"
              :title-ellipsis-tooltip="true"
            >
              <div>Drawer Body</div>
            </drawer>
          </config-provider>
        `,
      }),
    );

    await nextTick();
    expect(wrapper.find('.sd-drawer-close-btn').exists()).toBe(true);
    expect(wrapper.text()).toContain('本地确认');
    expect(wrapper.text()).not.toContain('全局确认');
    expect(wrapper.findComponent(Ellipsis).props('tooltip')).toBe(true);
  });
});
