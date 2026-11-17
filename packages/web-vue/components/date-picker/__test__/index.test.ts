import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import RangePicker from '../range-picker.vue';

const pickerValue = ['2026-04-01', '2026-04-01'];

async function mountRangePicker() {
  const wrapper = mount(RangePicker, {
    props: {
      defaultPopupVisible: true,
      defaultPickerValue: pickerValue,
      // showConfirmBtn 会让 needConfirm 为 true，点击日期只触发 select，确认后才触发 ok
      showConfirmBtn: true,
    },
  });
  // 弹出框内容在 ClientOnly 挂载后才会渲染
  await nextTick();
  return wrapper;
}

function findDay(panel: VueWrapper<any>, index: number, day: string) {
  const datePanels = panel.findAllComponents({ name: 'DatePanel' });
  const cell = datePanels[index]
    .findAll('.arco-picker-cell-in-view')
    .find((item) => item.find('.arco-picker-date-value').text() === day);
  if (!cell) {
    throw new Error(`Can not find day ${day} in DatePanel ${index}`);
  }
  return cell;
}

describe('RangePicker', () => {
  test('emits select / ok with 2-length arrays after a complete range is confirmed', async () => {
    const wrapper = await mountRangePicker();
    const panel = wrapper.findComponent({ name: 'DateRangePikerPanel' });
    expect(panel.exists()).toBe(true);

    // 完整区间：左面板选开始日期，右面板选结束日期
    await findDay(panel, 0, '10').trigger('click');
    await findDay(panel, 1, '20').trigger('click');

    // select 在选中完整区间后参数为长度 2 的数组（value / date / dateString）
    const selectEvents = wrapper.emitted('select')!;
    const lastSelect = selectEvents[selectEvents.length - 1];
    expect(selectEvents.length).toBeGreaterThanOrEqual(2);
    expect(lastSelect[0]).toHaveLength(2);
    expect(lastSelect[1]).toHaveLength(2);
    expect(lastSelect[2]).toHaveLength(2);
    expect(lastSelect[0]).toEqual(['2026-04-10', '2026-05-20']);

    // 确认按钮触发 ok，参数同样为长度 2 的数组
    await panel.find('.arco-picker-btn-confirm').trigger('click');
    const okEvents = wrapper.emitted('ok')!;
    expect(okEvents).toHaveLength(1);
    expect(okEvents[0][0]).toHaveLength(2);
    expect(okEvents[0][1]).toHaveLength(2);
    expect(okEvents[0][2]).toHaveLength(2);
    expect(okEvents[0][0]).toEqual(['2026-04-10', '2026-05-20']);

    wrapper.unmount();
  });

  test('does not emit ok when only one end of the range is selected', async () => {
    const wrapper = await mountRangePicker();
    const panel = wrapper.findComponent({ name: 'DateRangePikerPanel' });

    await findDay(panel, 0, '10').trigger('click');

    expect(wrapper.emitted('ok')).toBeUndefined();
    // 半截区间也只在 select 里体现长度 1
    const selectEvents = wrapper.emitted('select')!;
    expect(selectEvents).toHaveLength(1);
    expect(selectEvents[0][0]).toHaveLength(1);

    // 此时确认按钮应是禁用状态
    expect(panel.find('.arco-picker-btn-confirm').classes()).toContain(
      'arco-btn-disabled'
    );

    wrapper.unmount();
  });
});
