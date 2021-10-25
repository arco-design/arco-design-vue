import path from 'path';
import glob from 'glob';
import { mount, config } from '@vue/test-utils';
import ArcoVue from '../components';
import ArcoVueIcon from '../components/icon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

config.global.plugins = [ArcoVue, ArcoVueIcon];

function demoTest(component: string) {
  describe(`<${component}> demo:`, () => {
    const files = glob.sync(`components/${component}/__demo__/*.md`);
    const table = files.map((filename) => [
      path.basename(filename, '.md'),
      filename,
    ]);

    test.each(table)('render [%s] correctly', async (_, filename) => {
      const demo = await import(`../${filename}`);
      const wrapper = mount(demo.default);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
}

export default demoTest;
