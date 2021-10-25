import { mount } from '@vue/test-utils';
import Checkbox from '../index';

describe('Checkbox', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Checkbox, {
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
    const wrapper = mount(Checkbox, {
      props: {
        value: 'test',
        disabled: true,
      },
    });
    await wrapper.find('input').setValue();

    expect(wrapper.emitted('change')).toBeUndefined();
  });

  test('should emit change event in group', async () => {
    const wrapper = mount(Checkbox.Group, {
      slots: {
        default:
          '<a-checkbox value="1">Option1</a-checkbox>' +
          '<a-checkbox value="2">Option2</a-checkbox>',
      },
      global: {
        plugins: [Checkbox],
      },
    });

    await wrapper.find('input').setValue();
    expect(wrapper.emitted('change')).toHaveLength(1);
  });
});
