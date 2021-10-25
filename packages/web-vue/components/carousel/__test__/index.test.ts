import { assertDirectiveLiteral } from '@babel/types';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Carousel from '../index';

const { Item } = Carousel;

const assertActiveAtIndex = (wrapper: any, index: number) => {
  const items = wrapper.findAll('.arco-carousel-indicator-item');
  const isActiveAtIndex = items[index]
    ?.classes()
    .includes('arco-carousel-indicator-item-active');
  expect(isActiveAtIndex).toBe(true);
};

describe('Carousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Current prop should work properly', async () => {
    const wrapper = mount(Carousel, {
      global: {
        components: {
          Item,
        },
      },
      slots: {
        default: `<item v-for="it in 5" :key="it"><img/></item>`,
      },
      props: {
        current: 3,
        autoPlay: false,
      },
    });
    await nextTick();
    assertActiveAtIndex(wrapper, 2);
    await wrapper.setProps({ current: 2 });
    assertActiveAtIndex(wrapper, 1);
  });

  test('AutoPlay should work', async () => {
    const wrapper = mount(Carousel, {
      global: {
        components: {
          Item,
        },
      },
      slots: {
        default: `<item v-for="it in 5" :key="it"><img/></item>`,
      },
      props: {
        autoPlay: {
          interval: 50,
        },
      },
    });
    jest.advanceTimersByTime(10);
    await nextTick();
    assertActiveAtIndex(wrapper, 0);
    jest.advanceTimersByTime(60);
    await nextTick();
    assertActiveAtIndex(wrapper, 1);
  });

  test('Clicking arrow should be able to switch carousel', async () => {
    const wrapper = mount(Carousel, {
      global: {
        components: {
          Item,
        },
      },
      slots: {
        default: `<item v-for="it in 5" :key="it"><img/></item>`,
      },
      props: {
        autoPlay: false,
      },
    });
    await nextTick();
    const nextIndicator = wrapper.find('.arco-carousel-arrow-right');
    assertActiveAtIndex(wrapper, 0);
    nextIndicator.trigger('click');
    await nextTick();
    assertActiveAtIndex(wrapper, 1);
  });

  test('Clicking indicator should be able to switch carousel', async () => {
    const wrapper = mount(Carousel, {
      global: {
        components: {
          Item,
        },
      },
      slots: {
        default: `<item v-for="it in 5" :key="it"><img/></item>`,
      },
      props: {
        autoPlay: false,
      },
    });
    await nextTick();
    const indicators = wrapper.findAll('.arco-carousel-indicator-item');
    indicators[2].trigger('click');
    await nextTick();
    assertActiveAtIndex(wrapper, 2);
  });

  test('Should be responsive to children change', async () => {
    const WrapperComponent = {
      components: {
        Item,
        Carousel,
      },
      props: {
        childrenCount: {
          type: Number,
        },
      },
      template: `
        <carousel>
          <item v-for="it in childrenCount" :key="it">
            <img class="carousel-item-image"/>
          </item>
        </carousel>
      `,
    };
    const wrapper = mount(WrapperComponent, {
      props: {
        childrenCount: 5,
      },
    });
    await nextTick();
    expect(wrapper.findAll('.carousel-item-image').length).toBe(5);
    await wrapper.setProps({ childrenCount: 1 });
    expect(wrapper.findAll('.carousel-item-image').length).toBe(1);
  });

  test('Hover to pause should work', async () => {
    const wrapper = mount(Carousel, {
      global: {
        components: {
          Item,
        },
      },
      slots: {
        default: `<item v-for="it in 5" :key="it"><img/></item>`,
      },
      props: {
        autoPlay: {
          hoverToPause: true,
          interval: 50,
        },
      },
    });
    await nextTick();
    wrapper.trigger('mouseenter');
    jest.advanceTimersByTime(100);
    assertActiveAtIndex(wrapper, 0);
  });

  test('Slider indicator type should work', async () => {
    const wrapper = mount(Carousel, {
      global: {
        components: {
          Item,
        },
      },
      slots: {
        default: `<item v-for="it in 5" :key="it"><img/></item>`,
      },
      props: {
        indicatorType: 'slider',
      },
    });
    await nextTick();
    expect(wrapper.find('.arco-carousel-indicator-slider').exists()).toBe(true);
    wrapper.find('.arco-carousel-indicator-slider').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
