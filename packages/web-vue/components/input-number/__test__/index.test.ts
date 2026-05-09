import { mount } from '@vue/test-utils';
import InputNumber from '../index';

describe('InputNumber', () => {
  test('number add correctly', async () => {
    const wrapper = mount(InputNumber);

    const stepButton = wrapper.find('button');
    await stepButton.trigger('mousedown');
    await stepButton.trigger('mousedown');

    expect(wrapper.find('input').element.value).toBe('1');
  });

  test('should valid input', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        min: 0,
        max: 10,
      },
    });

    const input = wrapper.find('input');
    await input.setValue('-2');
    expect(input.element.value).toBe('-2');
    await input.trigger('blur');
    expect(input.element.value).toBe('0');
    await input.setValue('20');
    expect(input.element.value).toBe('20');
    await input.trigger('blur');
    expect(input.element.value).toBe('10');
  });

  test('init value with scientific notation', () => {
    const wrapper1 = mount(InputNumber, {
      props: {
        defaultValue: 1.234e5,
      },
    });
    expect(wrapper1.find('input').element.value).toBe('123400');

    const wrapper2 = mount(InputNumber, {
      props: {
        defaultValue: -2.34e-5,
      },
    });
    expect(wrapper2.find('input').element.value).toBe('-0.0000234');

    const wrapper3 = mount(InputNumber, {
      props: {
        defaultValue: -0.000000000000000000001,
      },
    });
    expect(wrapper3.find('input').element.value).toBe(
      '-0.000000000000000000001'
    );

    const wrapper4 = mount(InputNumber, {
      props: {
        defaultValue: 10000000000000000000000,
      },
    });
    expect(wrapper4.find('input').element.value).toBe(
      '10000000000000000000000'
    );

    const wrapper5 = mount(InputNumber, {
      props: {
        defaultValue: -10000000000000000000000,
      },
    });
    expect(wrapper5.find('input').element.value).toBe(
      '-10000000000000000000000'
    );
  });

  test('should handle very small numbers without scientific notation', () => {
    const wrapper = mount(InputNumber, {
      props: {
        defaultValue: 0.00000001,
      },
    });
    expect(wrapper.find('input').element.value).toBe('0.00000001');
  });
});
