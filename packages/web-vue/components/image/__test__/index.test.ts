import { mount } from '@vue/test-utils';
import Image from '../index';
import getScale from '../utils/get-scale';

const { Preview, PreviewGroup } = Image;

const imgSrc = 'http://it-does-not-matter.png/';

async function getPreviewInstance() {
  const wrapper = await mount(Preview, {
    props: {
      src: imgSrc,
      defaultVisible: true,
      renderToBody: false,
    },
  });
  await wrapper.vm.onImgLoad();
  return wrapper;
}

describe('Image', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test('Render image with error src', async () => {
    const wrapper = await mount(Image, {
      props: {
        src: imgSrc,
      },
    });
    await wrapper.vm.onImgLoadError();
    expect(wrapper.find('.arco-image-error').exists()).toBe(true);
  });

  test('Footer should work', async () => {
    const wrapper = await mount(Image, {
      props: {
        src: imgSrc,
        title: 'My title',
      },
    });
    await wrapper.vm.onImgLoaded();

    expect(wrapper.find('.arco-image-footer-caption-title').text()).toBe(
      'My title'
    );
  });

  test('Should show preview on click', async () => {
    const wrapper = await mount(Image, {
      props: {
        src: imgSrc,
        renderToBody: false,
      },
    });
    await wrapper.vm.onImgLoaded();
    await wrapper.find('img').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('preview-visible-change');
    expect(wrapper.html()).toMatchSnapshot();
  });

  // Preview
  test('Preview should close on mask click', async () => {
    const wrapper = await getPreviewInstance();
    const maskWrapper = wrapper.find('.arco-image-preview-wrapper');
    await maskWrapper.trigger('click');
    expect(wrapper.find('.arco-image-preview-wrapper').exists()).toBe(false);
  });

  test('Preview should be able to move', async () => {
    const map: any = {};
    const _addEventListener = window.addEventListener;
    Object.defineProperty(window, 'addEventListener', {
      value: jest.fn().mockImplementation((event, cb) => {
        map[event] = cb;
      }),
    });
    window.removeEventListener = jest.fn().mockImplementation((event) => {
      delete map[event];
    });
    const wrapper = await getPreviewInstance();
    const imageElement = wrapper.find('.arco-image-preview-img');
    await imageElement.trigger('mousedown');
    expect(imageElement.attributes('class')).toContain(
      'arco-image-preview-img-moving'
    );
    await map.mouseup({ preventDefault: () => {} });
    expect(imageElement.attributes('class')).not.toContain(
      'arco-image-preview-img-moving'
    );
    Object.defineProperty(window, 'addEventListener', {
      value: _addEventListener,
    });
  });

  test('Preview fullscreen should work', async () => {
    const wrapper = await getPreviewInstance();
    const fullscreenAction = wrapper.findAll(
      '.arco-image-preview-toolbar-action'
    )[0];
    await fullscreenAction.trigger('click');
    expect(
      wrapper.find('.arco-image-preview-img-container').attributes('style')
    ).not.toContain('scale(1, 1)');
  });

  test('Preview rotate right should work', async () => {
    const wrapper = await getPreviewInstance();
    const rotateRightAction = wrapper.findAll(
      '.arco-image-preview-toolbar-action'
    )[1];
    await rotateRightAction.trigger('click');
    expect(
      wrapper.find('.arco-image-preview-img').attributes('style')
    ).toContain('rotate(90deg)');
  });

  test('Preview rotate left should work', async () => {
    const wrapper = await getPreviewInstance();
    const rotateLeftAction = wrapper.findAll(
      '.arco-image-preview-toolbar-action'
    )[2];
    await rotateLeftAction.trigger('click');
    expect(
      wrapper.find('.arco-image-preview-img').attributes('style')
    ).toContain('rotate(270deg)');
  });

  test('Preview zoom in should work', async () => {
    const wrapper = await getPreviewInstance();
    const zoomInAction = wrapper.findAll(
      '.arco-image-preview-toolbar-action'
    )[3];
    await zoomInAction.trigger('click');
    expect(
      wrapper.find('.arco-image-preview-img-container').attributes('style')
    ).toContain('scale(1.1, 1.1)');
  });

  test('Preview zoom out should work', async () => {
    const wrapper = await getPreviewInstance();
    const zoomOutAction = wrapper.findAll(
      '.arco-image-preview-toolbar-action'
    )[4];
    await zoomOutAction.trigger('click');
    expect(
      wrapper.find('.arco-image-preview-img-container').attributes('style')
    ).toContain('scale(0.9, 0.9)');
  });

  // PreviewGroup
  test('Should handle arrow click correctly', async () => {
    const wrapper = await mount(PreviewGroup, {
      props: {
        srcList: ['https://1.jpg', 'https://2.jpg', 'https://3.jpg'],
        defaultVisible: true,
        renderToBody: false,
      },
    });
    const rightIcon = wrapper.find('.arco-image-preview-arrow-right');
    await rightIcon.trigger('click');
    expect(wrapper.emitted('change')![0]).toContain(1);
    const leftIcon = wrapper.find('.arco-image-preview-arrow-left');
    await leftIcon.trigger('click');
    expect(wrapper.emitted('change')![1]).toContain(0);
  });

  // Utils getScale
  test('Should get scale correctly', () => {
    expect(getScale(1.3)).toEqual(1.5);
    expect(getScale(0.79)).toEqual(0.9);
  });
});
