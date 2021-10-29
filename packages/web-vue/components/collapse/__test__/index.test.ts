import { mount } from '@vue/test-utils';
import Collapse from '../index';

const CollapseItem = Collapse.Item;

describe('Collapse', () => {
  test('should emit change event', async () => {
    const wrapper = mount(Collapse, {
      global: {
        components: {
          CollapseItem,
        },
      },
      slots: {
        default: `<collapse-item key="1" header="Test 1">Test 1</collapse-item>
<collapse-item key="2" header="Test 2" disabled>Test 2</collapse-item>
<collapse-item key="3" header="Test 3">Test 3</collapse-item>`,
      },
    });

    const headers = wrapper.findAll('.arco-collapse-item-header');
    await headers[1].trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
    await headers[2].trigger('click');
    expect(wrapper.emitted('change')[0][0]).toEqual(['3']);
    await wrapper.setProps({ accordion: true });
    await headers[0].trigger('click');
    expect(wrapper.emitted('change')[1][0]).toEqual(['1']);
  });
});
