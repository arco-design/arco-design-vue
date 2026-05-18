import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { afterEach, vi } from 'vitest';

import Message from '../../message';
import Copy from '../index';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Copy', () => {
  test('should copy content and show success message', async () => {
    const clipboardSpy = vi.fn().mockResolvedValue(undefined);
    const messageSpy = vi.spyOn(Message, 'success').mockImplementation(() => ({
      close: vi.fn(),
    }));

    Object.defineProperty(window, 'isSecureContext', {
      configurable: true,
      value: true,
    });
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardSpy,
      },
    });

    const wrapper = mount(Copy, {
      props: {
        content: 'https://sd.design',
      },
      slots: {
        default: '复制链接',
      },
    });

    await wrapper.find('a').trigger('click');
    await nextTick();

    expect(clipboardSpy).toHaveBeenCalledWith('https://sd.design');
    expect(messageSpy).toHaveBeenCalledWith('复制成功');
    expect(wrapper.emitted('copy')).toEqual([['https://sd.design']]);
  });

  test('should not copy when trigger component is disabled', async () => {
    const clipboardSpy = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window, 'isSecureContext', {
      configurable: true,
      value: true,
    });
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardSpy,
      },
    });

    const wrapper = mount(Copy, {
      attrs: {
        disabled: true,
      },
      props: {
        content: 'disabled-text',
      },
      slots: {
        default: '不可复制',
      },
    });

    await wrapper.find('a').trigger('click');
    await nextTick();

    expect(clipboardSpy).not.toHaveBeenCalled();
    expect(wrapper.emitted('copy')).toBeUndefined();
  });

  test('should pass clipboard props to copy-to-clipboard', async () => {
    const promptSpy = vi.fn();
    const execCommandSpy = vi.fn().mockReturnValue(false);

    Object.defineProperty(window, 'isSecureContext', {
      configurable: true,
      value: false,
    });
    Object.defineProperty(window, 'prompt', {
      configurable: true,
      value: promptSpy,
    });
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommandSpy,
    });

    const wrapper = mount(Copy, {
      props: {
        content: 'clipboard-text',
        clipboardProps: {
          fallbackToPrompt: true,
        },
      },
      slots: {
        default: '复制文本',
      },
    });

    await wrapper.find('a').trigger('click');
    await nextTick();

    expect(execCommandSpy).toHaveBeenCalledWith('copy');
    expect(promptSpy).toHaveBeenCalledWith('Copy to clipboard: Ctrl+C, Enter', 'clipboard-text');
  });
});
