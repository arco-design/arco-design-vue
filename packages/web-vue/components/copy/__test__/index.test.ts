import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { vi } from 'vitest';

import * as clipboardUtils from '../../_utils/clipboard';
import Message from '../../message';
import Copy from '../index';

describe('Copy', () => {
  test('should copy content and show success message', async () => {
    const clipboardSpy = vi.spyOn(clipboardUtils, 'clipboard').mockResolvedValue(undefined);
    const messageSpy = vi.spyOn(Message, 'success').mockImplementation(() => ({
      close: vi.fn(),
    }));

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
    const clipboardSpy = vi.spyOn(clipboardUtils, 'clipboard').mockResolvedValue(undefined);

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
});
