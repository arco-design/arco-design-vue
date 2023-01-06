import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Upload from '../index';

const fileList = [
  {
    uid: '-2',
    name: '20200717-103937.png',
    url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  },
];

describe('Upload', () => {
  test('IconEye should hidden when image-preview miss', async () => {
    const wrapper = mount(Upload, {
      props: {
        listType: 'picture-card',
        defaultFileList: fileList,
        imagePreview: false,
      },
    });
    await nextTick();
    expect(wrapper.find('.arco-upload-icon-preview').exists()).toBe(false);
    await wrapper.setProps({ imagePreview: true });
    await nextTick();
    expect(wrapper.find('.arco-upload-icon-preview').exists()).toBe(true);
  });
});
