import { mount } from '@vue/test-utils';
import Timeline from '../index';

const { Item } = Timeline;

describe('Timeline', () => {
  test('Reverse should work', () => {
    const wrapper = mount(Timeline, {
      props: {
        reverse: true,
      },
    });
    expect(wrapper.classes()).toContain('arco-timeline-is-reverse');
  });

  test('Should work with timeline item', () => {
    const wrapper = mount(Timeline, {
      global: {
        components: {
          TimelineItem: Item,
        },
      },
      slots: {
        default: `
          <timeline-item>1</timeline-item>
          <timeline-item>2</timeline-item>
        `,
      },
    });
    expect(wrapper.findAll('.arco-timeline-item').length).toBe(2);
  });

  test('Dot type and dot color should work for timeline item', () => {
    const wrapper = mount(Item, {
      props: {
        label: 'hello world',
        dotColor: 'rgb(10, 180, 42)',
      },
    });
    const dot = wrapper.find('.arco-timeline-item-dot');
    expect(dot.attributes('style')).toContain(
      'background-color: rgb(10, 180, 42)'
    );
  });
});
