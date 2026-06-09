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
          '<sd-step>Step1</sd-step>' + '<sd-step>Step2</sd-step>' + '<sd-step>Step3</sd-step>',
      },
    });

    const steps = wrapper.findAllComponents({ name: 'Step' });
    steps[1].trigger('click');
    const emitted = wrapper.emitted<[number]>('change');
    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toEqual(2);
  });

  test('nested step can have correct index', () => {
    const wrapper = mount(Steps, {
      props: {
        changeable: true,
      },
      slots: {
        default:
          '<div><sd-step>Step1</sd-step></div>' +
          '<div><sd-step>Step2</sd-step></div>' +
          '<div><sd-step>Step3</sd-step></div>',
      },
    });

    const steps = wrapper.findAllComponents({ name: 'Step' });
    type StepInternalState = { setupState: { stepNumber: number } };
    expect((steps[0].vm.$ as unknown as StepInternalState).setupState.stepNumber).toEqual(1);
    expect((steps[1].vm.$ as unknown as StepInternalState).setupState.stepNumber).toEqual(2);
    expect((steps[2].vm.$ as unknown as StepInternalState).setupState.stepNumber).toEqual(3);
  });
});
