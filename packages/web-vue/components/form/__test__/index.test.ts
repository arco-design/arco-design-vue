import { mount } from '@vue/test-utils';
import Demo from './demo.vue';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Form', () => {
  test('should show error message', async () => {
    const wrapper = mount(Demo);

    const nameInput = wrapper.find('#name input');
    await nameInput.trigger('focus');
    await nameInput.setValue('test');
    await nameInput.trigger('blur');

    expect(wrapper.find('.arco-form-item-message').text()).toBe(
      'name should up 6 chars'
    );
  });

  test('should emit submit event', async () => {
    const wrapper = mount(Demo);
    const form = wrapper.getComponent({ name: 'Form' });
    await form.trigger('submit');

    expect((form.emitted('submit')?.[0] as any[])[0]).toHaveProperty(
      'errors.name'
    );
  });
});
