import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Popover from '../index';

const sleep = (timeout = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const mountPopover = (disabled: boolean) =>
  mount(Popover as any, {
    props: { disabled, content: 'content' },
    slots: { default: '<span class="trigger-target">target</span>' },
    attachTo: document.body,
  });

describe('Popover', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('does not show popup when disabled', async () => {
    const wrapper = mountPopover(true);
    await nextTick();

    await wrapper.find('.trigger-target').trigger('mouseenter');
    await sleep(200);

    expect(document.body.querySelector('.arco-trigger-popup')).toBeFalsy();
    wrapper.unmount();
  });

  test('shows popup when not disabled', async () => {
    const wrapper = mountPopover(false);
    await nextTick();

    await wrapper.find('.trigger-target').trigger('mouseenter');
    await sleep(200);

    expect(document.body.querySelector('.arco-trigger-popup')).toBeTruthy();
    wrapper.unmount();
  });
});
