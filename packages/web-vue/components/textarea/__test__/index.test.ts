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

  test('should update model before input event handlers run', async () => {
    let modelValue = '';
    let modelValueInInput = '';
    const wrapper = mount(Textarea, {
      props: {
        modelValue,
        'onUpdate:modelValue': (value: string) => {
          modelValue = value;
        },
        'onInput': () => {
          modelValueInInput = modelValue;
        },
      },
    });

    await wrapper.find('textarea').setValue('textarea');

    expect(modelValueInInput).toBe('textarea');
  });

  test('should update model before input event handlers run on compositionend', async () => {
    let modelValue = '';
    let modelValueInInput = '';
    const wrapper = mount(Textarea, {
      props: {
        modelValue,
        'onUpdate:modelValue': (value: string) => {
          modelValue = value;
        },
        'onInput': () => {
          modelValueInInput = modelValue;
        },
      },
    });
    const textarea = wrapper.find('textarea');

    await textarea.trigger('compositionstart');
    textarea.element.value = 'textarea';
    await textarea.trigger('compositionend');

    expect(modelValueInInput).toBe('textarea');
  });
});
