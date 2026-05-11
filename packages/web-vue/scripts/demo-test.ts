import { mount } from '@vue/test-utils';
import type { Component } from 'vue';

import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';
import path from 'path';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.resolve(packageRoot, '..', 'sd-vue-docs');
const demoModules = import.meta.glob<{ default: Component }>(
  '../../sd-vue-docs/src/components/generated/**/*.vue',
);

function getSnapshotName(component: string, demoName: string) {
  if (component === 'notification') {
    if (demoName === 'update-duration') {
      return 'update_duration';
    }

    if (demoName === 'update-notification') {
      return 'update_notification';
    }
  }

  return demoName;
}

function demoTest(component: string) {
  describe(`<${component}> demo:`, () => {
    const files = globSync(`src/components/generated/${component}/*.vue`, {
      cwd: docsRoot,
      posix: true,
    });
    const table = files.map((filename) => {
      const demoName = path.basename(filename, '.vue');
      return [getSnapshotName(component, demoName), filename] as const;
    });

    test.each(table)('render [%s] correctly', async (_, filename) => {
      const loadDemo = demoModules[`../../sd-vue-docs/${filename}`];
      if (!loadDemo) {
        throw new Error(`Demo module not found: ${filename}`);
      }

      const demo = await loadDemo();
      const wrapper = mount(demo.default);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
}

export default demoTest;
