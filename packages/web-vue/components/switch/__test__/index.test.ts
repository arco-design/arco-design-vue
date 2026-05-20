import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';

import Switch from '../index';

describe('Switch', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Switch);
    await wrapper.find('button').trigger('click');
    // @ts-ignore
    expect(wrapper.emitted('change')?.[0]?.[0]).toEqual(true);
  });

  test('should auto enter loading until controlled modelValue updates', async () => {
    vi.useFakeTimers();

    const handleUpdate = vi.fn();
    const Demo = defineComponent({
      setup() {
        const value = ref(false);

        const onUpdate = (nextValue: boolean | string | number) => {
          handleUpdate(nextValue);
          setTimeout(() => {
            value.value = nextValue;
          }, 1000);
        };

        return () =>
          h(Switch, {
            'modelValue': value.value,
            'autoLoading': true,
            'onUpdate:modelValue': onUpdate,
          });
      },
    });
    const wrapper = mount(Demo);

    await wrapper.find('button').trigger('click');

    expect(handleUpdate).toHaveBeenCalledTimes(1);
    expect(wrapper.find('button').classes()).toContain('sd-switch-loading');
    expect(wrapper.find('button').attributes('aria-checked')).toBe('false');

    await wrapper.find('button').trigger('click');
    expect(handleUpdate).toHaveBeenCalledTimes(1);

    await vi.runAllTimersAsync();
    await nextTick();

    expect(wrapper.find('button').classes()).not.toContain('sd-switch-loading');
    expect(wrapper.find('button').attributes('aria-checked')).toBe('true');

    vi.useRealTimers();
  });
});
