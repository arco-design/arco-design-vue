import { OptimizeOptions } from 'svgo';

const options: OptimizeOptions = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeStyleElement',
    'removeScriptElement',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'class',
          'style',
          'stroke-width',
          'stroke-linecap',
          'stroke-linejoin',
        ],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      // @ts-ignore
      params: {
        attributes: [
          { ':class': 'cls' },
          { ':style': 'innerStyle' },
          { ':stroke-width': 'strokeWidth' },
          // SVG 的 stroke-linecap / stroke-linejoin 在 Vue 的类型里是字面量联合
          // （不含 SVG2 的 arcs / miter-clip），而这两个 prop 声明为 String，
          // 这里做一次断言，避免 287 个生成组件都报 TS2322。
          { ':stroke-linecap': '(strokeLinecap as any)' },
          { ':stroke-linejoin': '(strokeLinejoin as any)' },
          { '@click': 'onClick' },
        ],
      },
    },
  ],
};

export default options;
