import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Popconfirm from '../index';

describe('Popconfirm', () => {
  test('should emit ok/cancel events', async () => {
    const wrapper = mount(Popconfirm, {
      props: {
        content: 'Content',
        defaultPopupVisible: true,
        renderToBody: false,
      },
      slots: {
        default: '<button>Button</button>',
      },
    });

    await nextTick();
    const buttons = wrapper.findAllComponents({ name: 'Button' });
    await buttons[0].trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('ok')).toHaveLength(1);
  });
});
