export const getIconVue = ({
  name,
  componentName,
  svgHtml,
}: {
  name: string;
  componentName: string;
  svgHtml: string;
}) =>
  // language=Vue
  // prettier-ignore
  `<template>
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
    const cls = computed(() => [prefixCls, \`\${prefixCls}-${name.replace('icon-', '')}\`, { [\`\${prefixCls}-spin\`]: props.spin }]);
    const innerStyle = computed(() => {
      const styles: CSSProperties = {};
      if (props.size) {
        styles.fontSize = isNumber(props.size) ? \`\${props.size}px\` : props.size;
      }
      if (props.rotate) {
        styles.transform = \`rotate(\${props.rotate}deg)\`;
      }
      return styles;
    });
    const onClick = (ev: MouseEvent) => {
      emit('click', ev);
    };

    return {
      cls,
      innerStyle,
      onClick,
    };
  }
});
</script>
`;

export const getComponentIndex = ({
  name,
  componentName,
}: {
  name: string;
  componentName: string;
}) =>
  // language=TypeScript
  // prettier-ignore
  `import type { App } from 'vue';
import type { ArcoIconOptions } from '../../_utils/types';
import _${componentName} from './${name}.vue';

const ${componentName} = Object.assign(_${componentName}, {
  install: (app: App, options?: ArcoIconOptions) => {
    const iconPrefix = options?.iconPrefix ?? '';
    app.component(iconPrefix + _${componentName}.name, _${componentName});
  }
});

export default ${componentName};
`;

export const getArcoVueIcon = ({
  imports,
  components,
}: {
  imports: string[];
  components: string[];
}) =>
  // language=TypeScript
  // prettier-ignore
  `import type { App, Plugin } from 'vue';
import type { ArcoIconOptions } from '../_utils/types';
${imports.join('\n')}

const icons: Record<string, Plugin> = {
  ${components.join(',\n  ')}
};

const install = (app: App, options?: ArcoIconOptions) => {
  for (const key of Object.keys(icons)) {
    app.use(icons[key], options);
  }
};

const ArcoVueIcon = {
  ...icons,
  install
};

export default ArcoVueIcon;
`;

export const getIndex = ({ exports }: { exports: string[] }) =>
  // language=TypeScript
  // prettier-ignore
  `export { default } from './arco-vue-icon';
${exports.join('\n')}
export type {} from './icon-components';
`;

export const getType = ({ exports }: { exports: string[] }) =>
  `// @ts-nocheck

declare module 'vue' {
  export interface GlobalComponents {
${exports.map((item) => `${' '.repeat(4)}${item}`).join('\n')}
  }
}

export {};
`;
