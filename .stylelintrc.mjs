import { createRequire } from 'node:module';

// ESM 配置文件中使用 require，以便复用 CJS 导出的配置模块。
const require = createRequire(import.meta.url);
// 复用 stylelint-config-rational-order 的“属性分组顺序”定义数据。
const createRationalOrder = require('stylelint-config-rational-order/config/configCreator');
// 复用该规则集中定义的“特殊属性”白名单，避免误报未知属性。
const rationalSpecialProps = require('stylelint-config-rational-order/groups/special');

export default {
  ignoreFiles: [
    'packages/sd-vue-docs/public/vendor/**',
    'packages/sd-vue-docs/src/components/generated/**',
    'packages/web-vue/es/**',
    'packages/web-vue/lib/**',
    '**/dist/**',
    'packages/web-vue/components/_components/input-label/style/token.less',
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        'at-rule-prelude-no-invalid': null,
        'block-no-empty': null,
        'no-invalid-position-at-import-rule': null,
        'scss/declaration-property-value-no-unknown': null,
      },
    },
    {
      files: ['**/*.{scss,sass}'],
      customSyntax: 'postcss-scss',
      rules: {
        'annotation-no-unknown': null,
        'at-rule-prelude-no-invalid': null,
        'nesting-selector-no-missing-scoping-root': null,
        'scss/declaration-property-value-no-unknown': true,
      },
    },
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'scss/declaration-property-value-no-unknown': null,
      },
    },
  ],
  // 不直接 extend stylelint-config-rational-order：
  // 该包内部会走旧插件实现，在 stylelint@17 下可能触发运行时异常。
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  defaultSeverity: 'error',
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    // 保留 rational-order 的分组排序能力，
    // 但由当前项目安装的 stylelint-order 执行，规避旧插件崩溃问题。
    'order/properties-order': createRationalOrder(),
    'declaration-block-single-line-max-declarations': null,
    'declaration-property-value-keyword-no-deprecated': null,
    'font-family-no-duplicate-names': null,
    'no-empty-source': [
      true,
      {
        severity: 'error',
      },
    ],
    'no-descending-specificity': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    // 与上面的分组规则保持一致：允许 rational-order 预置的特殊属性名。
    'property-no-unknown': [
      true,
      {
        ignoreProperties: rationalSpecialProps,
      },
    ],
    'at-rule-no-unknown': null,
    'at-rule-no-deprecated': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['custom-variant', 'apply', 'tailwind', 'config', 'reference', 'plugin'],
      },
    ],
    'selector-class-pattern': [
      '^(?:[a-z][a-z0-9]*)(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true,
        message: '类名应遵循 BEM 命名规则 \n@see https://getbem.com/',
      },
    ],
    'keyframes-name-pattern': null,
    'number-max-precision': null,
    'declaration-property-value-no-unknown': null,
  },
};
