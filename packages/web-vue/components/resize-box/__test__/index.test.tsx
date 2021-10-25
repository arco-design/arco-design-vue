import { mount } from '@vue/test-utils';
import ResizeBox from '..';

describe('ResizeBox', () => {
  // Simulate wrapper size
  const wrapperElement = {
    clientWidth: 500,
    clientHeight: 200,
  };

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      value: wrapperElement.clientWidth,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      value: wrapperElement.clientHeight,
    });
  });

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      value: HTMLElement.prototype.clientWidth,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      value: HTMLElement.prototype.clientHeight,
    });
  });

  test('trigger event correctly', () => {
    const wrapper = mount(ResizeBox, { props: { width: 500, height: 200 } });

    // Simulate window events
    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });
    window.removeEventListener = jest.fn().mockImplementation((event) => {
      delete map[event];
    });

    // move start
    const resizeTriggerWrapper = wrapper.findComponent({
      name: 'ResizeTrigger',
    });
    resizeTriggerWrapper.trigger('mousedown', { pageX: 500, pageY: 0 });
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

  test('control top trigger correctly', async (done) => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['top'],
      },
    });

    const trigger = wrapper.findComponent({
      name: 'ResizeTrigger',
    });

    // Simulate window events
    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientHeight - offset;
    trigger.trigger('mousedown', { pageX: 0, pageY: startPos });
    map.mousemove({ pageX: 0, pageY: endPos });
    expect(wrapper.emitted('update:height')[0][0]).toEqual(result);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element.getAttribute('style')).toContain(
        `height: ${result}px`
      );
      done();
    });
  });

  test('control right trigger correctly', async (done) => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['right'],
      },
    });

    const trigger = wrapper.findComponent({
      name: 'ResizeTrigger',
    });

    // Simulate window events
    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientWidth + offset;
    trigger.trigger('mousedown', { pageX: startPos, pageY: 0 });
    map.mousemove({ pageX: endPos, pageY: 0 });
    expect(wrapper.emitted('update:width')[0][0]).toEqual(result);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element.getAttribute('style')).toContain(
        `width: ${result}px`
      );
      done();
    });
  });

  test('control bottom trigger correctly', async (done) => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['bottom'],
      },
    });

    const trigger = wrapper.findComponent({
      name: 'ResizeTrigger',
    });

    // Simulate window events
    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientHeight + offset;
    trigger.trigger('mousedown', { pageX: 0, pageY: startPos });
    map.mousemove({ pageX: 0, pageY: endPos });
    expect(wrapper.emitted('update:height')[0][0]).toEqual(result);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element.getAttribute('style')).toContain(
        `height: ${result}px`
      );
      done();
    });
  });

  test('control left trigger correctly', async (done) => {
    const wrapper = mount(ResizeBox, {
      props: {
        directions: ['left'],
      },
    });

    const trigger = wrapper.findComponent({
      name: 'ResizeTrigger',
    });

    // Simulate window events
    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const startPos = 200;
    const endPos = 100;
    const offset = endPos - startPos;
    const result = wrapperElement.clientWidth - offset;
    trigger.trigger('mousedown', { pageX: startPos, pageY: 0 });
    map.mousemove({ pageX: endPos, pageY: 0 });
    expect(wrapper.emitted('update:width')[0][0]).toEqual(result);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element.getAttribute('style')).toContain(
        `width: ${result}px`
      );
      done();
    });
  });

  test('render trigger size correctly', async (done) => {
    const wrapper = mount(ResizeBox);
    const trigger = wrapper.findComponent({ name: 'ResizeTrigger' });
    trigger.vm.$emit('resize', { contentRect: { width: 100 } });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element.getAttribute('style')).toContain(
        'padding-right: 100px'
      );
      done();
    });
  });
});
