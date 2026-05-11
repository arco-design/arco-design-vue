import { mount } from '@vue/test-utils';
import { defineComponent, getCurrentInstance, nextTick } from 'vue';

import Modal from '../index';
import ModalComponent from '../modal.vue';

describe('Modal', () => {
  test('should render modal and emit ok/cancel event', async () => {
    const wrapper = mount(ModalComponent, {
      props: {
        defaultVisible: true,
        renderToBody: false,
      },
      slots: {
        default: `<div>Modal Body</div>`,
        title: 'Title',
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    const buttons = wrapper.findAll('.sd-btn');
    await buttons[0].trigger('click');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('ok')).toHaveLength(1);
  });

  test('should show modal and call cb', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();

    const wrapper = mount(
      defineComponent({
        setup() {
          const instance = getCurrentInstance();

          const handleClick = () => {
            if (!instance) {
              throw new Error('Missing component instance');
            }

            Modal.open(
              {
                title: 'title',
                content: 'content',
                onOk,
                onCancel,
              },
              instance.appContext,
            );
          };

          return {
            handleClick,
          };
        },
        template: `
          <button @click="handleClick">Click</button>`,
      }),
    );

    await wrapper.find('button').trigger('click');
    expect(document.body.outerHTML).toMatchSnapshot();
    const buttons = document.body.querySelectorAll('.sd-btn');
    (buttons[0] as HTMLButtonElement | undefined)?.click();
    await nextTick();
    expect(onCancel).toHaveBeenCalled();
    (buttons[1] as HTMLButtonElement | undefined)?.click();
    await nextTick();
    expect(onOk).toHaveBeenCalled();
  });

  test('should render simple modal', async () => {
    const wrapper = mount(ModalComponent, {
      props: {
        defaultVisible: true,
        simple: true,
        renderToBody: false,
      },
      slots: {
        default: `<div>Modal Body</div>`,
        title: 'Title',
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
