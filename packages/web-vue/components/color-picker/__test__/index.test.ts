import { mount } from '@vue/test-utils';
import ColorPicker from '../index';

describe('ColorPicker', () => {
  test('Whether the size is rendered correctly', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        size: 'mini',
      },
    });
    const colorPickerElement = wrapper.find('.arco-color-picker');
    expect(colorPickerElement.classes()).toContain(
      `arco-color-picker-size-mini`
    );
  });

  test('Whether the disabled is rendered correctly', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        disabled: true,
      },
    });
    const colorPickerElement = wrapper.find('.arco-color-picker');
    expect(colorPickerElement.classes()).toContain(
      `arco-color-picker-disabled`
    );
  });
});
