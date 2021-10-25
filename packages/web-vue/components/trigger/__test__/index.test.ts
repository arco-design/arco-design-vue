import { mount } from '@vue/test-utils';
import Trigger from '../index';

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
});
