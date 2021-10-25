import { mount } from '@vue/test-utils';
import Card from '../index';

const { Meta, Grid } = Card;

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
    const wrapper = mount(Meta, {
      props: {
        title: 'Card meta title',
      },
    });
    const titleElement = wrapper.find('.arco-card-meta-title');
    expect(titleElement.text()).toContain('Card meta title');
  });

  test('Card grid should work', () => {
    const wrapper = mount(Grid, {
      slots: {
        default: [Card, Card, Card],
      },
    });
    expect(wrapper.classes()).toContain('arco-card-grid');
    const cards = wrapper.findAll('.arco-card');
    expect(cards.length).toBe(3);
  });
});
