import { mount } from '@vue/test-utils';
import Button from '../index';
import { configProviderInjectionKey } from '../../config-provider/context';

describe('Button', () => {
  test('should emit click event', () => {
    const wrapper = mount(Button);
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  test('should not emit click event when disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });

  test('should add loading fixed width class when loadingFixedWidth is true', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
        loadingFixedWidth: true,
      },
    });

    expect(wrapper.find('button').classes()).toContain(
      'arco-btn-loading-fixed-width'
    );
  });

  test('should add two chinese chars class when autoInsertSpaceInButton is enabled', async () => {
    const wrapper = mount(Button, {
      global: {
        provide: {
          [configProviderInjectionKey as symbol]: {
            autoInsertSpaceInButton: true,
          },
        },
      },
      slots: {
        default: '测试',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('button').classes()).toContain(
      'arco-btn-two-chinese-chars'
    );
  });
});
