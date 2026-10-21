import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Trigger from '../index';

const domRect = (rect: Partial<DOMRect>): DOMRect =>
  ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  } as DOMRect);

describe('Trigger', () => {
  test('trigger correctly', async () => {
    const wrapper = mount(Trigger, {
      slots: {
        default: '<button>Test</button>',
        content: '<div id="popup-content">Popup Content</div>',
      },
      props: {
        trigger: 'click',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(document.body.innerHTML).toContain(
      '<div id="popup-content">Popup Content</div>'
    );
  });

  test('default visible correctly', async () => {
    const wrapper = mount(Trigger, {
      slots: {
        default: '<button>Test</button>',
        content: '<div id="popup-content">Popup Content</div>',
      },
      props: {
        defaultPopupVisible: true,
      },
    });

    expect(document.body.innerHTML).toContain(
      '<div id="popup-content">Popup Content</div>'
    );
  });

  test('keeps the last popup position when the trigger element is hidden', async () => {
    const wrapper = mount(Trigger, {
      slots: {
        default: '<button>Test</button>',
        content: '<div id="hidden-trigger-popup-content">Popup Content</div>',
      },
      props: {
        trigger: 'click',
      },
    });

    const button = wrapper.find('button').element as HTMLElement;
    const rectSpy = vi.spyOn(button, 'getBoundingClientRect').mockReturnValue(
      domRect({
        top: 100,
        bottom: 120,
        left: 200,
        right: 240,
        width: 40,
        height: 20,
        x: 200,
        y: 100,
      })
    );

    await wrapper.find('button').trigger('click');
    await nextTick();

    const popup = document
      .getElementById('hidden-trigger-popup-content')
      ?.closest('.arco-trigger-popup') as HTMLElement;
    const styleBefore = popup.getAttribute('style');

    // a trigger hidden via display:none measures as an all-zero rect; the popup
    // must keep its last position instead of jumping to the viewport corner.
    // Flipping autoFitPopupMinWidth forces a reposition through the watcher.
    rectSpy.mockReturnValue(domRect({}));
    await wrapper.setProps({ autoFitPopupMinWidth: true });
    await nextTick();

    expect(popup.getAttribute('style')).toBe(styleBefore);
  });
});
