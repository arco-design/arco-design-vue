import { mount } from '@vue/test-utils';
import Affix from '../index';
import { raf } from '../../_utils/raf';
import { nextTick } from 'vue';

const _originAddEventListener = window.addEventListener;
const _getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
const events: { [eventName: string]: any} = {};

jest.mock("../../_utils/raf", () => ({
  raf: jest.fn().mockImplementation((cb: (...args: any[]) => void) => cb())
}));

describe('Affix Render', () => {
  let wrapperRect: { top?: number, bottom?: number } = {
    top: 0,
    bottom: 0,
  };

  const moveWrapper = (offset: { top?: number, bottom?: number }) => {
    wrapperRect = offset;
    events.scroll({
      type: 'scroll',
    });
    jest.runAllTimers();
  };

  beforeEach(() => {
    // @ts-ignore
    raf.mockClear();
  });
  beforeAll(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'addEventListener', { 
      value: jest.fn().mockImplementation((event: string, cb) => {
        events[event] = cb;
      })
    });
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', { 
      value: jest.fn().mockImplementation(() => wrapperRect)
    });
  });
  afterAll(() => {
    jest.useRealTimers();
    Object.defineProperty(window, 'addEventListener', { 
      value: _originAddEventListener
    });
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', { 
      value: _getBoundingClientRect
    });
  });

  it('Anchor should render correctly', async () => {
    const wrapper = mount(Affix, {
      slots: {
        default: '<div>abc</div>'
      }
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
        default: '<div>abc</div>'
      },
      props: {
        offsetBottom: 20
      }
    });
    expect(wrapper.find('.arco-affix').exists()).toBe(false);
    moveWrapper({ bottom: 2500 });
    await nextTick();
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(wrapper.find('.arco-affix').exists()).toBe(true);
  });
});
