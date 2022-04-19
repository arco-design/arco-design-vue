import { mount } from '@vue/test-utils';
import Steps from '../index';

describe('Steps', () => {
  test('should emit change event', () => {
    const wrapper = mount(Steps, {
      props: {
        changeable: true,
      },
      slots: {
        default:
          '<a-step>Step1</a-step>' +
          '<a-step>Step2</a-step>' +
          '<a-step>Step3</a-step>',
      },
      global: {
        plugins: [Steps],
      },
    });

    const steps = wrapper.findAllComponents({ name: 'Step' });
    steps[1].trigger('click');
    expect((wrapper.emitted('change')?.[0] as any[])[0]).toEqual(2);
  });

  test('nested step can have correct index', () => {
    const wrapper = mount(Steps, {
      props: {
        changeable: true,
      },
      slots: {
        default:
          '<div><a-step>Step1</a-step></div>' +
          '<div><a-step>Step2</a-step></div>' +
          '<div><a-step>Step3</a-step></div>',
      },
      global: {
        plugins: [Steps],
      },
    });

    const steps = wrapper.findAllComponents({ name: 'Step' });
    expect((steps[0].vm.$ as any).setupState.stepNumber).toEqual(1);
    expect((steps[1].vm.$ as any).setupState.stepNumber).toEqual(2);
    expect((steps[2].vm.$ as any).setupState.stepNumber).toEqual(3);
  });
});
