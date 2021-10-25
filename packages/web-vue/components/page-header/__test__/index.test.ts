import { mount } from '@vue/test-utils';
import PageHeader from '../index';

describe('PageHeader', () => {
  test('should emit back event', async () => {
    const wrapper = mount(PageHeader, {
      props: {
        title: 'ArcoDesign',
      },
    });

    await wrapper.find('.arco-page-header-back-btn').trigger('click');
    expect(wrapper.emitted('back')).toHaveLength(1);
  });
});
