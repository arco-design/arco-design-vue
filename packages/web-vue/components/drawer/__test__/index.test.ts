import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
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
    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('ok')).toHaveLength(1);
  });
});
