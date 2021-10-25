import { mount } from '@vue/test-utils';
import Transfer from '../index';

describe('Transfer', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Transfer, {
      props: {
        data: Array(4)
          .fill(undefined)
          .map((_, index) => ({
            value: `option${index + 1}`,
            label: `Option ${index + 1}`,
          })),
      },
    });

    const options = wrapper.findAll(
      '.arco-transfer-list-item .arco-checkbox-target'
    );
    await options[0].setValue();
    const moveButton = wrapper.findComponent({ name: 'Button' });
    await moveButton.trigger('click');
    expect(wrapper.emitted('change')[0]).toEqual([['option1']]);
  });

  test('should emit select event', async () => {
    const wrapper = mount(Transfer, {
      props: {
        data: Array(4)
          .fill(undefined)
          .map((_, index) => ({
            value: `option${index + 1}`,
            label: `Option ${index + 1}`,
          })),
      },
    });

    const checkAll = wrapper.find(
      '.arco-transfer-view-header .arco-checkbox-target'
    );
    await checkAll.setValue();
    expect(wrapper.emitted('select')[0]).toEqual([
      ['option1', 'option2', 'option3', 'option4'],
    ]);
  });
});
