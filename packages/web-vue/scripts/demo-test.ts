import path from 'path';
import glob from 'glob';
import { mount, config } from '@vue/test-utils';
import ArcoVue from '../components';
import ArcoVueIcon from '../components/icon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
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
      const candidates = Object.values(demo.default?.components ?? {});
      const target = candidates.length > 0 ? candidates[0] : demo.default;
      const wrapper = mount(target as any);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
}

export default demoTest;
