import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import Calendar from '../index';

const overlapEvents = [
  {
    start: '2025-01-08 12:00',
    end: '2025-01-08 13:00',
    title: 'Event 1',
  },
  {
    start: '2025-01-08 12:15',
    end: '2025-01-08 13:15',
    title: 'Event 2',
  },
];

describe('Calendar', () => {
  test('should emit ready and render week view by default', async () => {
    const wrapper = mount(Calendar, {
      props: {
        viewDate: '2025-01-08',
      },
    });

    await nextTick();
    await nextTick();

    expect(wrapper.classes()).toContain('sd-calendar');
    expect(wrapper.classes()).toContain('sd-calendar--week-view');
    expect(wrapper.emitted('ready')).toHaveLength(1);
  });

  test('should render custom header slot', async () => {
    const wrapper = mount(Calendar, {
      props: {
        viewDate: '2025-01-08',
      },
      slots: {
        header: '<div class="calendar-header-slot">自定义头部</div>',
      },
    });

    await nextTick();

    expect(wrapper.find('.calendar-header-slot').exists()).toBe(true);
    expect(wrapper.find('.calendar-header-slot').text()).toContain('自定义头部');
  });

  test('should render overlap stack classes when stackEvents is enabled', async () => {
    const wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        view: 'week',
        viewDate: '2025-01-08',
        stackEvents: true,
        events: overlapEvents,
        timeFrom: 9 * 60,
        timeTo: 18 * 60,
      },
    });

    await nextTick();
    await nextTick();

    expect(wrapper.findAll('.sd-calendar__event').length).toBeGreaterThanOrEqual(2);
    expect(
      wrapper.find('.sd-calendar__event--stack-1-2').exists() ||
        wrapper.find('.sd-calendar__event--stack-2-2').exists(),
    ).toBe(true);

    wrapper.unmount();
  });
});
