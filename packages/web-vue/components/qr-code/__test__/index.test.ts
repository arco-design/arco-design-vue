import { flushPromises, mount } from '@vue/test-utils';
import { h } from 'vue';

import QrCode from '../index';

describe('QrCode', () => {
  test('should render svg markup when type is svg', async () => {
    const wrapper = mount(QrCode, {
      props: {
        value: 'https://sd-design.js.org',
        type: 'svg',
      },
    });

    await flushPromises();

    expect(wrapper.find('.sd-qr-code-svg').html()).toContain('<svg');
  });

  test('should render icon slot without icon prop', async () => {
    const wrapper = mount(QrCode, {
      props: {
        value: 'https://sd-design.js.org',
      },
      slots: {
        icon: '<span class="custom-icon">QR</span>',
      },
    });

    await flushPromises();

    expect(wrapper.find('.sd-qr-code-icon .custom-icon').exists()).toBe(true);
  });

  test('should emit refresh when expired action is clicked', async () => {
    const wrapper = mount(QrCode, {
      props: {
        value: 'https://sd-design.js.org',
        status: 'expired',
      },
    });

    await wrapper.find('.sd-qr-code-refresh-btn').trigger('click');

    expect(wrapper.emitted('refresh')).toHaveLength(1);
  });

  test('should support custom status render', async () => {
    const wrapper = mount(QrCode, {
      props: {
        value: 'https://sd-design.js.org',
        status: 'scanned',
        statusRender: ({ status }) => h('span', { class: 'custom-status' }, status),
      },
    });

    await flushPromises();

    expect(wrapper.find('.custom-status').text()).toBe('scanned');
  });

  test('should pass spinProps to loading spin', async () => {
    const wrapper = mount(QrCode, {
      props: {
        value: 'https://sd-design.js.org',
        status: 'loading',
        spinProps: {
          size: 10,
          dot: true,
        },
      },
    });

    await flushPromises();

    expect(wrapper.find('.sd-spin-icon').attributes('style')).toContain('font-size: 10px;');
    expect(wrapper.find('.sd-dot-loading').attributes('style')).toContain('width: 70px;');
  });

  test('should render nothing when value is empty', () => {
    const wrapper = mount(QrCode, {
      props: {
        value: '',
      },
    });

    expect(wrapper.find('.sd-qr-code').exists()).toBe(false);
  });
});
