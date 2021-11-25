import { mount } from '@vue/test-utils';
import InputTag from '../index';

describe('InputTag', () => {
  test('should emit change event', () => {
    const wrapper = mount(InputTag);
    const input = wrapper.find('input');

    input.setValue('test');
    input.trigger('keydown', { key: 'Enter' });
    const emits = wrapper.emitted('change');
    expect(emits).toHaveLength(1);

    // @ts-ignore
    expect(emits?.[0][0][0]).toEqual('test');
  });

  test('should clear content', async () => {
    const wrapper = mount(InputTag, {
      props: {
        defaultValue: ['test', 'test-2', 'test-3'],
        allowClear: true,
      },
    });
    const tags = wrapper.findAllComponents({ name: 'Tag' });
    expect(tags).toHaveLength(3);
    await tags[1].find('.arco-tag-close-btn').trigger('click');
    expect(wrapper.emitted('remove')).toHaveLength(1);
    await wrapper.find('.arco-input-tag-clear-btn').trigger('click');
    expect(wrapper.emitted('clear')).toHaveLength(1);
  });
});
