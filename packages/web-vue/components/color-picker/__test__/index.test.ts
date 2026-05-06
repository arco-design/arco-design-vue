import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';

import { vi } from 'vitest';

const draggableState = vi.hoisted(() => ({
  options: [] as Array<{
    onStart?: (position: { x: number; y: number }, event: PointerEvent) => false | void;
    onMove?: (position: { x: number; y: number }, event: PointerEvent) => void;
    onEnd?: (position: { x: number; y: number }, event: PointerEvent) => void;
  }>,
}));

const loadColorPicker = async () => (await import('../index')).default;

describe('ColorPicker', () => {
  beforeEach(async () => {
    vi.resetModules();
    draggableState.options.length = 0;

    vi.doMock('@vueuse/core', async () => {
      const actual = await vi.importActual<typeof import('@vueuse/core')>('@vueuse/core');

      return {
        ...actual,
        useDraggable: vi.fn((_, options = {}) => {
          draggableState.options.push(options);
          return {};
        }),
      };
    });
  });

  test('Whether the size is rendered correctly', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      props: {
        size: 'mini',
      },
    });
    const colorPickerElement = wrapper.find('.sd-color-picker');
    expect(colorPickerElement.classes()).toContain(`sd-color-picker-size-mini`);
  });

  test('Whether the disabled is rendered correctly', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      props: {
        disabled: true,
      },
    });
    const colorPickerElement = wrapper.find('.sd-color-picker');
    expect(colorPickerElement.classes()).toContain(`sd-color-picker-disabled`);
  });

  test('should bridge panel changes with tdesign change context', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      props: {
        hideTrigger: true,
        format: 'RGBA',
        enableAlpha: true,
      },
    });

    const panel = wrapper.findComponent({ name: 'Panel' });
    const onChange = panel.props('onChange') as (value: string, trigger: 'input') => void;

    onChange('rgba(255, 0, 0, 0.5)', 'input');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['rgba(255, 0, 0, 0.5)']);
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('rgba(255, 0, 0, 0.5)');
    expect(wrapper.emitted('change')?.[0]?.[1]).toMatchObject({
      trigger: 'input',
      color: {
        rgba: 'rgba(255, 0, 0, 0.5)',
      },
    });
  });

  test('should keep legacy recent colors alias working', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      props: {
        hideTrigger: true,
        showHistory: true,
        historyColors: ['#165DFF'],
      },
    });

    expect(wrapper.text()).toContain('最近使用');
    expect(wrapper.find('.sd-color-picker-color-block').exists()).toBe(true);
  });

  test('should render gradient mode panel', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      props: {
        hideTrigger: true,
        colorModes: ['monochrome', 'linear-gradient'],
        value: 'linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
      },
    });

    expect(wrapper.find('.sd-color-picker-gradient-panel').exists()).toBe(true);
    expect(wrapper.findAll('.sd-color-picker-gradient-thumb').length).toBe(2);
  });

  test('should add recent color from current selection', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      props: {
        hideTrigger: true,
        recentColors: [],
        value: 'linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
        colorModes: ['linear-gradient'],
      },
    });

    await wrapper.find('.sd-color-picker-colors-action').trigger('click');

    expect(wrapper.emitted('recent-colors-change')?.[0]?.[0]).toEqual([
      'linear-gradient(45deg, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
    ]);
  });

  test('should add gradient stop when multiple gradient is enabled', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      attachTo: document.body,
      props: {
        hideTrigger: true,
        enableMultipleGradient: true,
        colorModes: ['linear-gradient'],
        value: 'linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
      },
    });

    const bar = wrapper.find('.sd-color-picker-gradient-bar').element as HTMLButtonElement;
    Object.defineProperty(bar, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 100,
        top: 0,
        bottom: 0,
        right: 100,
        height: 16,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    await wrapper.find('.sd-color-picker-gradient-bar').trigger('click', { clientX: 40 });
    await nextTick();

    expect(wrapper.findAll('.sd-color-picker-gradient-thumb').length).toBe(3);
    wrapper.unmount();
  });

  test('should not add gradient stop when multiple gradient is disabled', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      attachTo: document.body,
      props: {
        hideTrigger: true,
        enableMultipleGradient: false,
        colorModes: ['linear-gradient'],
        value: 'linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
      },
    });

    const bar = wrapper.find('.sd-color-picker-gradient-bar').element as HTMLButtonElement;
    Object.defineProperty(bar, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 100,
        top: 0,
        bottom: 0,
        right: 100,
        height: 16,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    await wrapper.find('.sd-color-picker-gradient-bar').trigger('click', { clientX: 40 });
    await nextTick();

    expect(wrapper.findAll('.sd-color-picker-gradient-thumb').length).toBe(2);
    wrapper.unmount();
  });

  test('should move gradient stop when dragging thumb', async () => {
    const ColorPicker = await loadColorPicker();
    const wrapper = mount(ColorPicker, {
      attachTo: document.body,
      props: {
        hideTrigger: true,
        colorModes: ['linear-gradient'],
        value: 'linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
      },
    });

    const bar = wrapper.find('.sd-color-picker-gradient-bar').element as HTMLButtonElement;
    Object.defineProperty(bar, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 100,
        top: 0,
        bottom: 0,
        right: 100,
        height: 16,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    expect(draggableState.options.length).toBeGreaterThan(0);

    const firstThumbDraggable = draggableState.options[0];
    expect(firstThumbDraggable).toBeDefined();

    firstThumbDraggable?.onStart?.(
      { x: 0, y: 0 },
      new PointerEvent('pointerdown', { clientX: 0, button: 0, pointerType: 'mouse' }),
    );
    firstThumbDraggable?.onMove?.(
      { x: 60, y: 0 },
      new PointerEvent('pointermove', { clientX: 60, pointerType: 'mouse' }),
    );
    firstThumbDraggable?.onEnd?.(
      { x: 60, y: 0 },
      new PointerEvent('pointerup', { clientX: 60, pointerType: 'mouse' }),
    );
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toContain('60%');
    wrapper.unmount();
  });

  test('should keep dragging the same thumb in controlled mode', async () => {
    const ColorPicker = await loadColorPicker();
    const ControlledColorPicker = defineComponent({
      setup() {
        const value = ref(
          'linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
        );

        return () =>
          h(ColorPicker, {
            'hideTrigger': true,
            'colorModes': ['linear-gradient'],
            'modelValue': value.value,
            'onUpdate:modelValue': (nextValue: string) => {
              value.value = nextValue;
            },
          });
      },
    });

    const wrapper = mount(ControlledColorPicker, {
      attachTo: document.body,
    });

    const bar = wrapper.find('.sd-color-picker-gradient-bar').element as HTMLButtonElement;
    Object.defineProperty(bar, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 100,
        top: 0,
        bottom: 0,
        right: 100,
        height: 16,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    expect(draggableState.options.length).toBe(2);

    const secondThumbDraggable = draggableState.options[1];
    secondThumbDraggable?.onStart?.(
      { x: 100, y: 0 },
      new PointerEvent('pointerdown', { clientX: 100, button: 0, pointerType: 'mouse' }),
    );
    secondThumbDraggable?.onMove?.(
      { x: 40, y: 0 },
      new PointerEvent('pointermove', { clientX: 40, pointerType: 'mouse' }),
    );
    secondThumbDraggable?.onMove?.(
      { x: 20, y: 0 },
      new PointerEvent('pointermove', { clientX: 20, pointerType: 'mouse' }),
    );
    secondThumbDraggable?.onEnd?.(
      { x: 20, y: 0 },
      new PointerEvent('pointerup', { clientX: 20, pointerType: 'mouse' }),
    );
    await nextTick();
    await nextTick();

    expect(draggableState.options.length).toBe(2);
    expect(wrapper.findAll('.sd-color-picker-gradient-thumb')[1].classes()).toContain(
      'sd-color-picker-gradient-thumb-active',
    );
    wrapper.unmount();
  });
});
