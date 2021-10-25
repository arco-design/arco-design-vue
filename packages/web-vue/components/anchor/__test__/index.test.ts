import { mount } from '@vue/test-utils';
import Anchor from '../index';

describe('Anchor', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Anchor, {
      slots: {
        default:
          '<a-anchor-link href="#anchor1">Anchor1</a-anchor-link>' +
          '<a-anchor-link href="#anchor2">Anchor2</a-anchor-link>',
      },
      global: {
        plugins: [Anchor],
      },
    });
    const link = wrapper.find('a');
    await link.trigger('click');
    expect(wrapper.emitted('change')[0]).toEqual(['#anchor1']);
    expect(wrapper.emitted('select')[0]).toEqual(['#anchor1', '#anchor1']);
  });
});
