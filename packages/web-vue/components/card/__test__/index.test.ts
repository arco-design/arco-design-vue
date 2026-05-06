import { h } from 'vue';
import { mount } from '@vue/test-utils';
import Card from '../index';

describe('Card', () => {
  test('Should have prefix', () => {
    const wrapper = mount(Card);
    expect(wrapper.classes()).toContain('arco-card');
  });

  test('Title should work', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Card title',
      },
    });
    const titleElement = wrapper.find('.arco-card-header-title');
    expect(titleElement.text()).toContain('Card title');
  });

  test('Extra slot should work', () => {
    const wrapper = mount(Card, {
      slots: {
        extra: `<div id='extra-content'>Extra content</div>`,
      },
    });
    const extraElement = wrapper.find('#extra-content');
    expect(extraElement.exists()).toBe(true);
  });

  test('Card meta should work', () => {
    const wrapper = mount(Card, {
      slots: {
        default: () => h(Card.Meta, { title: 'Card meta title' }),
      },
    });
    const titleElement = wrapper.find('.arco-card-meta-title');
    expect(titleElement.text()).toContain('Card meta title');
  });

  test('Card grid should work', () => {
    const wrapper = mount(Card, {
      slots: {
        default: () => [
          h(Card.Grid, null, { default: () => 'grid-1' }),
          h(Card.Grid, null, { default: () => 'grid-2' }),
          h(Card.Grid, null, { default: () => 'grid-3' }),
        ],
      },
    });
    const grids = wrapper.findAll('.arco-card-grid');
    expect(grids.length).toBe(3);
  });
});
