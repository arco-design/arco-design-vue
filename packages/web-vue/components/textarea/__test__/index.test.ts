import { mount } from '@vue/test-utils';
import Textarea from '../index';

describe('Textarea', () => {
  test('should remove href attribute', async () => {
    const wrapper = mount(Textarea, {
      props: {
        maxLength: 10,
        allowClear: true,
        showWordLimit: true,
      },
    });
    const textarea = wrapper.find('textarea');
    await textarea.trigger('focus');
    await textarea.setValue('textarea');
    expect(wrapper.find('.arco-textarea-word-limit').text()).toBe('8/10');
    await textarea.setValue('textareatextarea');
    expect(wrapper.find('.arco-textarea-word-limit').text()).toBe('10/10');
    expect(textarea.element.value).toBe('textareate');
    await wrapper.find('.arco-textarea-clear-btn').trigger('click');
    expect(textarea.element.value).toBe('');
  });
});
