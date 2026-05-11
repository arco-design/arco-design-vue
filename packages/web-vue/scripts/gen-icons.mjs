// oxlint-disable no-console
import { globSync } from 'glob';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { optimize } from 'svgo';

import { toKebabCase, toPascalCase } from './utils/convert-case.mjs';
import paths from './utils/paths.mjs';

const maps = {
  direction: '方向指示类图标',
  tips: '提示建议类图标',
  interactiveButton: '交互按钮类图标',
  edit: '编辑类图标',
  media: '影音类图标',
  logo: '商标类图标',
  general: '通用类图标',
};

const svgoConfig = {
  plugins: [
    'preset-default',
    'removeStyleElement',
    'removeScripts',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['class', 'style', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { ':class': 'cls' },
          { ':style': 'innerStyle' },
          { 'v-bind': 'svgAttrs' },
          { '@click': 'onClick' },
        ],
      },
    },
  ],
};

const getIconVue = ({ name, componentName, svgHtml }) => `<template>
  ${svgHtml}
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils/is';

export default defineComponent({
  name: '${componentName}',
  props: {
    size: {
      type: [Number, String],
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: 'butt',
      validator: (value: any) => {
        return ['butt', 'round', 'square'].includes(value);
      }
    },
    strokeLinejoin: {
      type: String,
      default: 'miter',
      validator: (value: any) => {
        return ['arcs', 'bevel', 'miter', 'miter-clip', 'round'].includes(value);
      }
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (ev: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('icon');
    const cls = computed(() => [
      prefixCls,
      \`${'${prefixCls}'}-${name.replace('icon-', '')}\`,
      { [\`${'${prefixCls}'}-spin\`]: props.spin },
    ]);
    const svgAttrs = computed<Record<string, string | number>>(() => ({
      'stroke-width': props.strokeWidth,
      'stroke-linecap': props.strokeLinecap,
      'stroke-linejoin': props.strokeLinejoin,
    }));
    const innerStyle = computed(() => {
      const styles: CSSProperties = {};
      if (props.size) {
        styles.fontSize = isNumber(props.size) ? \`${'${props.size}'}px\` : props.size;
      }
      if (props.rotate) {
        styles.transform = \`rotate(${'${props.rotate}'}deg)\`;
      }
      return styles;
    });
    const onClick = (ev: MouseEvent) => {
      emit('click', ev);
    };

    return {
      cls,
      innerStyle,
      svgAttrs,
      onClick,
    };
  }
});
</script>
`;

const getComponentIndex = ({ name, componentName }) => `import type { App } from 'vue';
import type { SDIconOptions } from '../../_utils/types';
import _${componentName} from './${name}.vue';

const ${componentName} = Object.assign(_${componentName}, {
  install: (app: App, options?: SDIconOptions) => {
    const iconPrefix = options?.iconPrefix ?? '';
    app.component(iconPrefix + _${componentName}.name, _${componentName});
  }
});

export default ${componentName};
`;

const getSDVueIcon = ({ imports, components }) => `import type { App, Plugin } from 'vue';
import type { SDIconOptions } from '../_utils/types';
${imports.join('\n')}

const icons: Record<string, Plugin> = {
  ${components.join(',\n  ')}
};

const install = (app: App, options?: SDIconOptions) => {
  for (const key of Object.keys(icons)) {
    app.use(icons[key], options);
  }
};

const SDVueIcon = {
  ...icons,
  install
};

export default SDVueIcon;
`;

const getIndex = ({ exports }) => `export { default } from './sd-vue-icon';
${exports.join('\n')}
export type {} from './icon-components';
`;

const getType = ({ exports }) => `// @ts-nocheck

declare module 'vue' {
  export interface GlobalComponents {
${exports.map((item) => `${' '.repeat(4)}${item}`).join('\n')}
  }
}

export {};
`;

function getSvgData() {
  const data = [];

  for (const key of Object.keys(maps)) {
    const iconData = {
      title: maps[key],
      type: key,
      list: [],
    };
    const files = globSync(`${toKebabCase(key)}/**/*.svg`, {
      cwd: paths.iconSvgs,
      absolute: true,
    });

    for (const filePath of files) {
      const name = `icon-${path.basename(filePath, '.svg')}`;
      iconData.list.push({
        name,
        componentName: toPascalCase(name),
        path: filePath,
      });
    }

    data.push(iconData);
  }

  return data;
}

async function ensureCleanIconDir() {
  await rm(paths.iconComponents, { recursive: true, force: true });
  await mkdir(paths.iconComponents, { recursive: true });
}

async function buildIconComponent(data) {
  for (const iconData of data) {
    for (const item of iconData.list) {
      const svgFile = await readFile(item.path, 'utf8');
      const optimizedSvg = optimize(svgFile, {
        path: item.path,
        ...svgoConfig,
      });

      if (!('data' in optimizedSvg)) {
        continue;
      }

      const componentRoot = path.resolve(paths.iconComponents, item.name);
      await mkdir(componentRoot, { recursive: true });
      await writeFile(
        path.resolve(componentRoot, `${item.name}.vue`),
        getIconVue({
          name: item.name,
          componentName: item.componentName,
          svgHtml: optimizedSvg.data,
        }),
        'utf8',
      );
      await writeFile(
        path.resolve(componentRoot, 'index.ts'),
        getComponentIndex({
          name: item.name,
          componentName: item.componentName,
        }),
        'utf8',
      );
    }
  }
}

async function buildIndex(data) {
  const imports = [];
  const exports = [];
  const components = [];

  for (const iconData of data) {
    for (const item of iconData.list) {
      components.push(item.componentName);
      imports.push(`import ${item.componentName} from './${item.name}';`);
      exports.push(`export { default as ${item.componentName} } from './${item.name}';`);
    }
  }

  await writeFile(
    path.resolve(paths.iconComponents, 'sd-vue-icon.ts'),
    getSDVueIcon({ imports, components }),
    'utf8',
  );
  await writeFile(path.resolve(paths.iconComponents, 'index.ts'), getIndex({ exports }), 'utf8');
  await writeFile(path.resolve(paths.icon, 'icons.json'), JSON.stringify(data, null, 2), 'utf8');
  await writeFile(
    path.resolve(paths.iconComponents, 'icon-components.ts'),
    getType({
      exports: components.map(
        (componentName) =>
          `${componentName}: typeof import('@sdata/web-vue/es/icon')['${componentName}'];`,
      ),
    }),
    'utf8',
  );
}

export default async function generateIcons() {
  const data = getSvgData();
  await ensureCleanIconDir();
  await buildIconComponent(data);
  await buildIndex(data);
  console.log('Generated icon components.');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateIcons();
}
