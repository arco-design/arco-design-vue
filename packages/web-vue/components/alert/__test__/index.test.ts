import { mount } from '@vue/test-utils';
import Alert from '../index';

describe('Alert', () => {
  test('should emit event', async () => {
    const wrapper = mount(Alert, {
      props: {
        closable: true,
      },
    });

    const closeBtn = wrapper.find('.arco-alert-close-btn');
    await closeBtn.trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });
});
