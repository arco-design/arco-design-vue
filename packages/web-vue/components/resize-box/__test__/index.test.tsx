import { mount } from '@vue/test-utils';

import ResizeBox from '..';

describe('ResizeBox', () => {
  // Simulate wrapper size
  const wrapperElement = {
    clientWidth: 500,
    clientHeight: 200,
  };

  const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const originalClientHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'clientHeight',
  );

  const dispatchMouseDown = (element: Element, pageX: number, pageY: number) => {
    const event = new MouseEvent('mousedown', { bubbles: true });

    Object.defineProperties(event, {
      pageX: {
        configurable: true,
        get: () => pageX,
      },
      pageY: {
        configurable: true,
        get: () => pageY,
      },
    });

    element.dispatchEvent(event);
  };

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        if ((this as HTMLElement).classList?.contains('sd-resizebox')) {
          return wrapperElement.clientWidth;
        }

        return originalClientWidth?.get?.call(this) ?? 0;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() {
        if ((this as HTMLElement).classList?.contains('sd-resizebox')) {
          return wrapperElement.clientHeight;
        }

        return originalClientHeight?.get?.call(this) ?? 0;
      },
    });
  });

  afterEach(() => {
    if (originalClientWidth) {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
    }

    if (originalClientHeight) {
      Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight);
    }
  });

  test('trigger event correctly', () => {
    const wrapper = mount(ResizeBox, { props: { width: 500, height: 200 } });

    // Simulate window events
    const map: any = {};
    window.addEventListener = vi.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });
    window.removeEventListener = vi.fn().mockImplementation((event) => {
      delete map[event];
    });

    // move start
    const resizeTriggerWrapper = wrapper.findComponent({
      name: 'ResizeTrigger',
    });
    dispatchMouseDown(resizeTriggerWrapper.element, 500, 0);
    expect(wrapper.emitted('movingStart')).toHaveLength(1);

    expect(map.mousemove).toBeDefined();
    expect(map.mouseup).toBeDefined();
    expect(map.contextmenu).toBeDefined();

    // moving
    map.mousemove({ pageX: 200, pageY: 0 });
    expect(wrapper.emitted('moving')).toHaveLength(1);
    expect(wrapper.emitted('update:width')).toHaveLength(1);

    // move end
    map.mouseup({ pageX: 200, pageY: 0 });
    expect(wrapper.emitted('movingEnd')).toHaveLength(1);

    expect(map.mousemove).toBeUndefined();
    expect(map.mouseup).toBeUndefined();
    expect(map.contextmenu).toBeUndefined();
  });

  test('control top trigger correctly', async () => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['top'],
      },
    });

    const trigger = wrapper.find('.sd-resizebox-direction-top');

    // Simulate window events
    const map: any = {};
    window.addEventListener = vi.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientHeight - offset;
    dispatchMouseDown(trigger.element, 0, startPos);
    map.mousemove({ pageX: 0, pageY: endPos });
    expect(wrapper.emitted('update:height')?.[0]?.[0]).toEqual(result);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.getAttribute('style')).toContain(`height: ${result}px`);
  });

  test('control right trigger correctly', async () => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['right'],
      },
    });

    const trigger = wrapper.find('.sd-resizebox-direction-right');

    // Simulate window events
    const map: any = {};
    window.addEventListener = vi.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientWidth + offset;
    dispatchMouseDown(trigger.element, startPos, 0);
    map.mousemove({ pageX: endPos, pageY: 0 });
    expect(wrapper.emitted('update:width')?.[0]?.[0]).toEqual(result);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.getAttribute('style')).toContain(`width: ${result}px`);
  });

  test('control bottom trigger correctly', async () => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['bottom'],
      },
    });

    const trigger = wrapper.find('.sd-resizebox-direction-bottom');

    // Simulate window events
    const map: any = {};
    window.addEventListener = vi.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientHeight + offset;
    dispatchMouseDown(trigger.element, 0, startPos);
    map.mousemove({ pageX: 0, pageY: endPos });
    expect(wrapper.emitted('update:height')?.[0]?.[0]).toEqual(result);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.getAttribute('style')).toContain(`height: ${result}px`);
  });

  test('control left trigger correctly', async () => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['left'],
      },
    });

    const trigger = wrapper.find('.sd-resizebox-direction-left');

    // Simulate window events
    const map: any = {};
    window.addEventListener = vi.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientWidth - offset;
    dispatchMouseDown(trigger.element, startPos, 0);
    map.mousemove({ pageX: endPos, pageY: 0 });
    expect(wrapper.emitted('update:width')?.[0]?.[0]).toEqual(result);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.getAttribute('style')).toContain(`width: ${result}px`);
  });

  test('render trigger size correctly', async () => {
    const wrapper = mount(ResizeBox);
    const trigger = wrapper.findComponent({ name: 'ResizeTrigger' });
    trigger.vm.$emit('resize', { contentRect: { width: 100 } });
    await wrapper.vm.$nextTick();
    expect(wrapper.element.getAttribute('style')).toContain('padding-right: 100px');
  });
});
