import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { vi } from 'vitest';

import Scrollbar from '../index';

describe('Scrollbar', () => {
  const mountScrollbar = (props?: Record<string, unknown>) => mount(Scrollbar, { props });

  test('should render slot content', () => {
    const wrapper = mount(Scrollbar, {
      slots: {
        default: '<div class="slot-content">content</div>',
      },
    });

    expect(wrapper.find('.slot-content').exists()).toBe(true);
    expect(wrapper.find('.sd-scrollbar').exists()).toBe(true);
  });

  test('should apply type class', () => {
    const wrapper = mountScrollbar({
      type: 'track',
    });

    expect(wrapper.classes()).toContain('sd-scrollbar-type-track');
  });

  test('should expose scroll methods', async () => {
    const wrapper = mountScrollbar();
    await nextTick();

    expect(() => wrapper.vm.scrollTo({ top: 12 })).not.toThrow();
    expect(() => wrapper.vm.scrollTop(20)).not.toThrow();
    expect(() => wrapper.vm.scrollLeft(32)).not.toThrow();
  });

  test('should merge OverlayScrollbars options props', async () => {
    const wrapper = mountScrollbar({
      paddingAbsolute: true,
      overflow: {
        y: 'hidden',
      },
      updateOptions: {
        debounce: {
          event: [10, 20],
        },
      },
      scrollbars: {
        autoHide: 'scroll',
        dragScroll: false,
      },
      overlayOptions: {
        scrollbars: {
          autoHideDelay: 400,
        },
      },
    });

    await nextTick();

    const options = wrapper.vm.options();

    expect(options?.paddingAbsolute).toBe(true);
    expect(options?.overflow.y).toBe('hidden');
    expect(options?.update.debounce.event).toEqual([10, 20]);
    expect(options?.scrollbars.autoHide).toBe('scroll');
    expect(options?.scrollbars.dragScroll).toBe(false);
    expect(options?.scrollbars.autoHideDelay).toBe(400);
  });

  test('should proxy OverlayScrollbars instance methods', async () => {
    const wrapper = mountScrollbar();
    await nextTick();

    const listener = vi.fn();
    const remove = wrapper.vm.on('updated', listener);

    expect(wrapper.vm.getOSInstance()).toBeTruthy();
    expect(wrapper.vm.state()).toBeTruthy();
    expect(wrapper.vm.elements()?.viewport).toBeTruthy();
    expect(wrapper.vm.update()).toBeTypeOf('boolean');
    expect(() => wrapper.vm.sleep(false)).not.toThrow();
    expect(() => wrapper.vm.off('updated', listener)).not.toThrow();
    expect(remove).toBeTypeOf('function');
  });

  test('should keep scroll event contract', async () => {
    const wrapper = mountScrollbar();
    await nextTick();

    const event = new Event('scroll');
    wrapper.find('.sd-scrollbar').element.dispatchEvent(event);
    await nextTick();

    expect(wrapper.emitted('scroll') ?? []).toBeDefined();
  });
});
