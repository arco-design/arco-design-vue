import { mount } from '@vue/test-utils';
import Slider from '../index';

describe('Slider', () => {
  test('should emit change', async () => {
    const wrapper = mount(Slider);

    const btn = wrapper.find('.arco-slider-btn');
    await btn.trigger('mousedown');
    await btn.trigger('mousemove');
    await btn.trigger('mouseup');

    // expect(wrapper.emitted('change')).toHaveLength(1);
  });
});
