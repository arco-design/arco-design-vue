import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import Secret from '../index';

describe('Secret', () => {
  test('should render hidden content by default', () => {
    const wrapper = mount(Secret, {
      props: {
        text: 'AKIAIOSFODNN7EXAMPLE',
      },
    });

    expect(wrapper.find('.sd-secret-placeholder').text()).toBe('********');
    expect(wrapper.find('.sd-copy').exists()).toBe(true);
  });

  test('should toggle visible state in uncontrolled mode', async () => {
    const wrapper = mount(Secret, {
      props: {
        text: 'db-password-prod-2026',
      },
    });

    await wrapper.find('.sd-secret-trigger').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:visible')).toEqual([[true]]);
    expect(wrapper.find('.sd-secret-placeholder').exists()).toBe(false);
    expect(wrapper.html()).toContain('db-password-prod-2026');
  });

  test('should respect visible and showCopy props', () => {
    const wrapper = mount(Secret, {
      props: {
        text: 'visible-secret',
        visible: true,
        showCopy: false,
      },
    });

    expect(wrapper.find('.sd-secret-placeholder').exists()).toBe(false);
    expect(wrapper.html()).toContain('visible-secret');
    expect(wrapper.find('.sd-copy').exists()).toBe(false);
  });

  test('should render custom hidden text', () => {
    const wrapper = mount(Secret, {
      props: {
        text: '18812345678',
        hiddenText: '手机号已隐藏',
      },
    });

    expect(wrapper.find('.sd-secret-placeholder').text()).toBe('手机号已隐藏');
  });
});
