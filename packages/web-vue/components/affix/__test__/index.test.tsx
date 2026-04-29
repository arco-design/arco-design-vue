import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Affix from '../index';
import { raf } from '../../_utils/raf';

const _originAddEventListener = window.addEventListener;
const _getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
const events: { [eventName: string]: any } = {};

vi.mock('../../_utils/raf', () => ({
  raf: vi.fn().mockImplementation((cb: (...args: any[]) => void) => cb()),
}));

describe('Affix Render', () => {
  let wrapperRect: { top?: number; bottom?: number } = {
    top: 0,
    bottom: 0,
  };

  const moveWrapper = (offset: { top?: number; bottom?: number }) => {
    wrapperRect = offset;
    events.scroll({
      type: 'scroll',
    });
    vi.runAllTimers();
  };

  beforeEach(() => {
    // @ts-ignore
    raf.mockClear();
  });
  beforeAll(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, 'addEventListener', {
      configurable: true,
      value: vi.fn().mockImplementation((event: string, cb) => {
        events[event] = cb;
      }),
    });
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: vi.fn().mockImplementation(() => wrapperRect),
    });
  });
  afterAll(() => {
    vi.useRealTimers();
    Object.defineProperty(window, 'addEventListener', {
      configurable: true,
      value: _originAddEventListener,
    });
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: _getBoundingClientRect,
    });
  });

  it('Anchor should render correctly', async () => {
    const wrapper = mount(Affix, {
      slots: {
        default: '<div>abc</div>',
      },
    });
    expect(wrapper.find('.arco-affix').exists()).toBe(false);
    moveWrapper({ top: -100 });
    await nextTick();
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(wrapper.find('.arco-affix').exists()).toBe(true);
  });

  it('Should support bottom', async () => {
    const wrapper = mount(Affix, {
      slots: {
        default: '<div>abc</div>',
      },
      props: {
        offsetBottom: 20,
      },
    });
    expect(wrapper.find('.arco-affix').exists()).toBe(false);
    moveWrapper({ bottom: 2500 });
    await nextTick();
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(wrapper.find('.arco-affix').exists()).toBe(true);
  });
});
