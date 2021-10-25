import { mount } from '@vue/test-utils';
import Message from '../index';
import MessageList from '../message-list';

describe('Message', () => {
  test('should render messages', () => {
    const wrapper = mount(MessageList, {
      props: {
        messages: [
          {
            id: 0,
            content: 'Info Message',
            type: 'info',
          },
          {
            id: 1,
            content: 'Success Message',
            type: 'success',
          },
          {
            id: 2,
            content: 'Warning Message',
            type: 'warning',
          },
          {
            id: 3,
            content: 'Error Message',
            type: 'error',
          },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show & remove message', async () => {
    const wrapper = mount({
      template:
        '<button id="add" @click="handleAdd">Add</button>' +
        '<button id="clear" @click="handleClear">Clear</button>',
      methods: {
        handleAdd() {
          Message.info({
            content: 'Info Message',
            closable: true,
          });
        },
        handleClear() {
          Message.clear();
        },
      },
    });

    const addBtn = wrapper.find('#add');
    await addBtn.trigger('click');
    await addBtn.trigger('click');
    expect(document.querySelectorAll('.arco-message')).toHaveLength(2);
    (document.querySelector('.arco-message-close-btn') as HTMLElement)?.click();

    await wrapper.find('#clear').trigger('click');
    expect(document.querySelectorAll('.arco-message')).toHaveLength(0);
  });

  test('should emit close event', async () => {
    const wrapper = mount(MessageList, {
      props: {
        messages: [
          {
            id: 0,
            content: 'Info Message',
            type: 'info',
            closable: true,
          },
        ],
      },
    });

    await wrapper.find('.arco-message-close-btn').trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  test('should update message content', async () => {
    let count = 0;

    const wrapper = mount({
      template: `
        <button @click="handleClick">Click</button>`,
      methods: {
        handleClick() {
          Message.info({
            id: '1',
            content: `Info Message ${++count}`,
          });
        },
      },
    });

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(document.querySelector('.arco-message')?.textContent).toBe(
      'Info Message 1'
    );
    await button.trigger('click');
    expect(document.querySelector('.arco-message')?.textContent).toBe(
      'Info Message 2'
    );
  });
});
