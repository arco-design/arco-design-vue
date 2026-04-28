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
    expect(wrapper.emitted('change')).toEqual([['#anchor1']]);
    expect(wrapper.emitted('select')).toEqual([['#anchor1', '#anchor1']]);
  });

  test('should render horizontal anchor', () => {
    const wrapper = mount(Anchor, {
      props: {
        affix: false,
        direction: 'horizontal',
      },
    });

    expect(wrapper.find('.arco-anchor').classes()).toContain(
      'arco-anchor-horizontal'
    );
  });

  test('should not wrap anchor with affix by default', () => {
    const wrapper = mount(Anchor, {
      props: {
        offsetTop: 80,
        affixStyle: {
          zIndex: 1,
        },
      },
    });

    expect(wrapper.findComponent({ name: 'Affix' }).exists()).toBe(false);
  });

  test('should not wrap anchor with affix when affix is false', () => {
    const wrapper = mount(Anchor, {
      props: {
        affix: false,
      },
    });

    expect(wrapper.findComponent({ name: 'Affix' }).exists()).toBe(false);
  });
});
