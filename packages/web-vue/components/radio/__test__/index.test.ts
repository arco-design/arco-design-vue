import { mount } from '@vue/test-utils';
import Radio from '../index';

describe('Radio', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'test',
      },
      slots: {
        default: 'Label',
      },
    });
    await wrapper.find('input').setValue();
    expect(wrapper.emitted('change')).toHaveLength(1);
  });

  test('should not emit change event when disabled', async () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'test',
        disabled: true,
      },
    });
    await wrapper.find('input').setValue();

    expect(wrapper.emitted('change')).toBeUndefined();
  });

  test('should emit change event in group', async () => {
    const wrapper = mount(Radio.Group, {
      slots: {
        default:
          '<a-radio value="1">Option1</a-radio>' +
          '<a-radio value="2">Option2</a-radio>',
      },
      global: {
        plugins: [Radio],
      },
    });

    await wrapper.find('input').setValue();
    expect(wrapper.emitted('change')).toHaveLength(1);
  });
});
