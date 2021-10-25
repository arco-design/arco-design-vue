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
});
