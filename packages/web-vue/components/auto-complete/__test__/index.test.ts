import { mount } from '@vue/test-utils';
import AutoComplete from '../index';

describe('AutoComplete', () => {
  test('auto-complete correctly', async () => {
    const wrapper = mount(AutoComplete, {
      props: {
        data: ['Beijing', 'Shanghai', 'Chengdu', 'WuHan'],
      },
    });
    const input = wrapper.find('input');
    await input.trigger('focusin');
    await input.setValue('e');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'Enter' });

    expect(input.element.value).toBe('Chengdu');
  });
});
