---
name: create-component
description: 为 SD Design Vue 组件库新增或重构组件的完整工作流。只要用户提到“新增组件”“补一个组件”“给组件库加文档/测试/样式”“按现有规范实现一个 web-vue 组件”“补齐组件导出、单测、demo、文档”“把内部组件整理成正式组件”就应触发，即使用户只显式提到其中一部分。必须覆盖源码、样式 token、导出入口、测试、文档页和验证步骤，而不是只写单个 .vue 文件或只改一个局部文件。
---

# Create Component

这个 skill 用于在当前仓库里为组件库实现一个“可以合并”的组件，而不是只生成一个演示性质的 Vue 文件。

目标包和目录是固定的：

- 组件源码放在 `packages/web-vue/components/<component-name>/`
- 文档页放在 `packages/sd-vue-docs/src/content/docs/components/<component-name>/index.mdx`
- 文档站的 `src/components/generated/` 默认先视为生成目录，但必须先核实它在当前仓库里是否真的由脚本生成、是否受版本控制、是否实际作为 demo 测试输入

在这个仓库里，组件实现风格优先服从现有组件库约定，而不是通用 Vue 最佳实践的默认答案。

目标不是“能跑”，而是“达到组件库可合并、可维护、可发布的基线”。

## 顶层约束

只要进入这个 skill，默认同时记住下面几点：

- 不要只交付一个 `<component-name>.vue` 文件。
- 尽量使用 `es-toolkit`，非必要不要自己封装工具函数。
- 尽量使用 `type-fest`，非必要不要自己定义类型工具。
- 尽量创建独立的 `types.ts` 文件，并且导出类型，非必要不要把类型写散在各个文件里。
- 尽可能的使用 Composition API typescript 模式，非必要不使用tsx，严格禁止写成选项式 API，如果存在旧组件尽量先改为 setup script 再进行修改。
- 不要漏掉 `index.ts`、样式入口、总导出入口、测试、文档页。
- 不要漏掉文档导航入口；当前仓库新增组件文档后，还要检查 `packages/sd-vue-docs/src/content/docs/components/index.mdx` 和 `packages/sd-vue-docs/src/generated/docs-sidebar.ts` 是否需要同步。
- 不要手改 `packages/sd-vue-docs/src/components/generated/` 这类目录，除非已经确认它在当前任务里就是人工维护源，或者当前仓库根本不存在对应的 demo 生成脚本而测试又直接消费这些 `.vue` 文件。
- 不要编造仓库命令名、生成链路或目录职责；先查真实脚本和相邻组件。
- 不要把“参考组件长得像”误当成“实现路径相同”；要先判断组件形态。
- 不要因为用户只提到其中一项，就省略其余交付面；新增正式组件默认要覆盖完整链路。
- 不要未经确认就修改公共 API 命名、导出形态、事件语义或文档信息架构。
- 不要在一次改动里顺手重构无关组件，除非当前任务明确要求或这是修复根因所必需。
- 不要只看 DemoEditor / 在线 REPL 里是否可用；凡是文档 demo 依赖浮层、裁剪、懒激活、首次 hover/focus/click 或容器尺寸，必须同时确认 `DemoBlock` 预览里的第一轮交互也有可见效果。
- 文档页里的 `*Source` 变量默认应直接使用对应 demo 文件的 `.vue?raw` 导入，不要在 MDX 里再手写一份重复源码字符串。
- 根目录下的 `vendor` 文件夹默认视为“外部依赖的本地化产物”，里面的内容仅供参考，不要默认它们在当前任务里就是需要维护的输入或输出。要实现的是把它们的能力内化到组件库源码里，而不是给组件库加外部运行时依赖。
- 如果是迁移组件，则删除所有公开的 rendered API，改成废弃警告，保持组件可用但不可访问；改用 Vue 的 Slot 替代所有可组合能力；保持现有事件和 props 的语义不变，但不再保证它们的实现细节；在文档页里说明这是一个废弃组件，并引导用户迁移到新的组件上；如果组件库里还有其它组件依赖它，优先先改这些依赖组件去掉对它的直接引用，再改它自己。

执行结束前，至少自查一次：源码、样式、导出、测试、文档、验证 6 个面是否都已覆盖。

## 严格禁止

下面这些行为默认禁止：

- 只创建组件目录，不接导出入口。
- 只补功能，不补文档和测试。
- 只补文档，不核实现有 API 与实现是否一致。
- 直接复制参考组件后仅做字符串替换，不重新审视 API 与结构是否合理。
- 在样式里堆魔法值，跳过 token 层。
- 用快照测试替代关键行为断言。
- 为了让测试通过而降低组件 API 的可用性或可读性。
- 未确认生成链路就手改生成产物或把未知脚本写进流程。

## 执行模式

默认把任务分成两个层级推进：

### 1. 必达基线

这部分必须完成：

- 组件源码
- 样式 token 与样式入口
- 总导出入口
- 插件注册入口
- 行为测试
- demo 测试
- 文档页
- 文档和示例内容注释等必须使用简体中文
- 至少一轮有效验证
- 必须使用 typescript，且类型不能随手放宽成 any 或不写

### 2. 进阶优化

这部分在时间和上下文允许时追加，但不要先做它们、后漏掉基线：

- 尽量使用 vue composition API，不要写过多选项式 API
- a11y 细化
- 文案与命名收敛
- API 一致性提升
- demo 结构优化
- 文档叙述质量提升
- 边界态和异常态补测
- 样式 token 语义整理

先完成基线，再做优化。

## 适用范围

用户出现下面这些意图时使用本 skill：

- 新增一个组件到 `@sdata/web-vue`
- 在现有组件基础上补齐缺失的测试、样式入口、文档页
- 按现有组件模式搭一个新组件骨架
- 把一个内部组件整理成正式导出的公共组件
- 为组件补充 props、events、slots、API 文档、demo 测试

如果用户只是改一个很小的 bug，不要强行跑完整建组件流程；只吸收其中相关章节。

## 先确认的上下文

编码前先确认这些信息；如果用户没给全，优先从相邻组件和仓库结构补足，实在缺失再提问：

1. 组件名。
2. 组件是单组件还是组件组。
3. 对外 API：props、events、slots、暴露实例、子组件。
4. 是否需要受控/非受控双模式。
5. 是否需要全局方法或函数式调用。
6. 文档至少需要哪些 demo 场景。
7. 哪些行为必须有测试覆盖。

如果用户描述非常短，优先自行从仓库推断，而不是立刻反问。只有这些信息会直接改变实现形态时再提问：

- 组件是否需要子组件一起导出
- 是否存在函数式 API 或静态方法
- 文档 demo 是写最终 MDX 还是还要接某条生成链路

命名约定：

- 目录名和文档目录名使用 kebab-case，例如 `alert`、`date-picker`
- 组件导出名使用 PascalCase，例如 `Alert`
- CSS 前缀通过 `getPrefixCls('<name>')` 生成，例如 `sd-alert`

如果组件名称天然包含多个词，优先保持与现有目录风格一致，不要自行切换大小写策略。

## 必须先核实的仓库事实

在正式编码前，至少核实下面事实，而不是凭经验假设：


1. 相邻组件是否在同目录下存在多变体文件。
2. `components/index.ts` 的导出写法。
3. `components/sd-vue.ts` 的注册写法。
4. `__test__/index.test.ts` 的断言风格。
5. `__test__/demo.test.ts` 是否接统一 demo 测试脚本。
6. docs 页是直接维护 MDX，还是依赖额外生成步骤。
7. 当前仓库真实存在的验证脚本名。
8. 是否存在 `components/components.ts` 这类全局组件类型声明文件需要同步。
9. 是否存在 `components/index.scss` 这类根样式聚合入口需要同步。
10. 根样式聚合入口当前使用的 import 写法是什么；在本仓库中，现有 `@import url('./foo/style/index.scss');` 写法应视为有效约定，不要擅自去掉 `url()` 或改写路径分隔符。
11. 当前仓库的组件文档发现入口是否还需要同步 `packages/sd-vue-docs/src/content/docs/components/index.mdx` 和 `packages/sd-vue-docs/src/generated/docs-sidebar.ts`。

如果终端历史、缓存文件、生成目录和 `package.json` 脚本信息互相冲突，以源码中的当前事实为准，优先级通常是：

1. 当前 `package.json` / 脚本源码
2. 当前组件源码与测试引用
3. 当前 docs 源文件
4. 终端历史
5. 生成产物

## 组件形态分支

开始写代码前，先把组件归到下面一种形态，再选参考实现。

### 1. 单组件

适用于 `Alert`、`Badge`、`Empty` 这种一个主导出即可完成主要能力的组件。

要求：

- 一个主组件文件
- 一个导出入口
- 一套样式 token 和样式入口
- 一页文档，按场景补 demo
- 行为测试至少覆盖默认态、核心态、交互态

### 2. 组件组

适用于 `Dropdown + Doption`、`Button + ButtonGroup`、`Anchor + AnchorLink` 这类多导出组件。

额外要求：

- 明确主组件与子组件的责任边界
- 同步补 `components/index.ts` 中的多导出
- 同步补 `components/sd-vue.ts` 中的多注册
- 文档页要区分主组件和子组件 API
- 测试至少覆盖主子组件的组合关系或上下文依赖
- 如果存在 provide/inject、父子注册或 slot 协作，必须至少测一个真实组合场景

### 3. 复合功能组件

适用于 `Progress`、`DatePicker` 这类同目录下存在多个展示形态或变体组件的场景。

额外要求：

- 先判断是“一个组件多个 props 变体”，还是“多个独立导出组件”
- 变体差异写进 API 和 demo，不要全塞进一个超大模板
- 文档 demo 需要覆盖典型形态，而不是只放基础用法
- 需要明确哪些变体属于主组件 props，哪些变体属于独立导出

### 4. 服务式或函数式能力

适用于像 `Message`、`Notification`、`Drawer.open()` 这种除了组件本体，还可能有静态方法或函数式调用的能力。

额外要求：

- 明确默认导出、命名导出、静态方法分别挂在哪里
- 文档里单独给出函数式调用示例
- 测试不能只覆盖模板渲染，还要覆盖调用入口
- 如果服务式能力依赖容器、挂载点或全局配置，要验证最小可用调用链路

## 先看参考组件

开始实现前，至少快速对照一个现有组件。优先找一个复杂度接近的组件，确认这些点：

- `packages/web-vue/components/<name>/<name>.vue` 的组织方式
- `index.ts` 的安装导出模式
- `style/index.scss`、`style/token.scss`、`style/index.ts` 的拆分方式
- `__test__/index.test.ts` 和 `__test__/demo.test.ts` 的测试粒度
- `packages/sd-vue-docs/src/content/docs/components/<name>/index.mdx` 的文档结构
- `packages/web-vue/components/index.ts` 和 `packages/web-vue/components/sd-vue.ts` 的总入口同步方式
- `packages/web-vue/components/components.ts` 是否还需要同步全局组件声明
- `packages/web-vue/components/index.scss` 是否还需要同步根样式入口，以及它当前的 import 写法
- `packages/sd-vue-docs/src/content/docs/components/index.mdx` 和 `packages/sd-vue-docs/src/generated/docs-sidebar.ts` 是否还需要同步组件发现入口

参考选择建议：

- 单组件优先参考 `alert`、`empty`、`badge` 这类目录干净的组件
- 多导出组件优先参考 `anchor`、`button`、`dropdown`
- 多形态组件优先参考 `progress`、`date-picker`
- 有函数式 API 的能力优先参考 `drawer`、`message`、`notification`

如果组件类型判断不准，先看导出入口和 docs 页面，不要只看 `.vue` 文件数量。

参考时重点提取的是“结构规则”和“公共约定”，不是视觉细节或演示文案。

## 组件目录结构

默认按这个结构创建：

```text
packages/web-vue/components/<component-name>/
├── <component-name>.vue
├── index.ts
├── __test__/
│   ├── index.test.ts
│   └── demo.test.ts
└── style/
		├── index.scss
		├── index.ts
		└── token.scss
```

说明：

- `__test__/__snapshots__/` 是测试生成产物，通常不手建
- 如果组件有子组件，可以在同目录增加子组件文件或子目录，但主入口仍保持清晰
- 不要把文档示例直接塞进组件目录；文档页放在 docs 包
- 如果是组件组或多形态组件，可以有额外 `.vue` 文件，例如 `progress/circle.vue`、`progress/line.vue`，但仍要保留一个清晰的主入口和统一测试策略

## 必做文件

### 1. 组件主文件

路径：`packages/web-vue/components/<component-name>/<component-name>.vue`

在这个仓库里，优先遵循现有组件库风格：

- 使用 `<script lang="ts" setup>`
- 模板在前、脚本在后，和相邻组件保持一致
- 用 `getPrefixCls('<component-name>')` 生成样式前缀
- class 组合优先用 `computed(() => [...])`
- props、emits、slots 前写中英双语注释，沿用 `@zh` / `@en` 风格
- 事件校验函数里未使用的参数用 `_` 前缀，避免触发仓库的 `oxlint no-unused-vars`

实现时至少覆盖这些设计面：

- 公共 props
- 默认 slot 与具名 slots
- emits
- 可访问性：语义化标签、aria、键盘行为
- 状态 class 命名
- 边界状态

API 设计时还要额外检查：

- 是否沿用了组件库已有命名习惯，例如 `modelValue`、`defaultValue`、`visible`、`status`、`size`
- 是否把可组合能力留给 slot，而不是用过多零散 props 硬编码
- 是否存在明显冲突的 props 组合
- 是否需要暴露实例类型或方法
- 是否需要支持受控与非受控两种模式

如果组件要接收复杂对象、数组或 render 逻辑，优先先看相邻复杂组件的建模方式，不要临时发明一套新约定。

如果组件是纯展示组件，避免无意义的响应式状态。

如果组件需要复杂逻辑，拆出内部工具或 hooks，但不要把公共 API 藏进难追踪的私有抽象。

实现时优先做到“相邻组件可读性一致”，而不是把文件写成抽象程度过高的范式样板。

### 2. 组件导出入口

路径：`packages/web-vue/components/<component-name>/index.ts`

保持现有模式：

- 导入组件主文件 `_Component`
- 用 `Object.assign` 包装 `install`
- 在 `install` 中调用 `setGlobalConfig(app, options)`
- 用 `getComponentPrefix(options)` 注册组件
- 导出 `InstanceType<typeof _Component>` 作为实例类型

参考结构：

```ts
import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Component from './component.vue';

const Component = Object.assign(_Component, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);
    app.component(componentPrefix + _Component.name, _Component);
  },
});

export type ComponentInstance = InstanceType<typeof _Component>;

export default Component;
```

如果组件组有多个导出，确保：

- 主导出仍然清晰可辨
- 子导出顺序与 docs 叙述顺序基本一致
- 类型导出不要遗漏子组件实例或公共类型

### 3. 样式 token 文件

路径：`packages/web-vue/components/<component-name>/style/token.scss`

职责：

- 定义组件级 token
- 从 `../../style/theme/index.scss` 引入基础设计 token
- 把尺寸、字号、圆角、颜色、间距等收敛成变量

要求：

- 不要把大量魔法值直接写进 `index.scss`
- 状态色、文本色、背景色、边框色尽量拆开
- token 命名加组件前缀，如 `@alert-color-close-icon`
- 优先复用全局设计 token，不要在组件 token 层重新发明基础色板或间距体系
- token 命名尽量语义化，不要写成 `@xxx-color-1` 这类无法读懂的名字

### 4. 样式实现文件

路径：`packages/web-vue/components/<component-name>/style/index.scss`

职责：

- `@import url('./token.scss');`
- 定义组件 BEM 风格 class
- 通过 `@{prefix}-<component-name>` 形成最终类名

要求：

- 结构类、状态类、子元素类命名清晰
- 先写根容器，再写修饰符和子元素
- 只在这里消费 token，不重复定义语义变量
- 与组件模板中的 class 名一一对应
- 状态修饰和结构元素分层清晰，不要把选择器写成难维护的深层嵌套
- 优先保持与同类组件相似的 class 组织方式

### 5. 样式入口文件

路径：`packages/web-vue/components/<component-name>/style/index.ts`

固定模式：

```ts
import '../../style/index.scss';
import './index.scss';
```

不要省略全局样式入口，否则文档站和运行时可能出现样式缺失或优先级异常。

## API 设计硬规则

新增或重构组件时，至少过一遍下面的 API 审核：

- 名称是否和现有组件库术语一致
- 默认值是否合理且与文档一致
- 布尔开关是否采用现有惯用命名
- 事件名是否站在使用者视角，而不是内部实现视角
- slot 名称是否可读、可猜、可扩展
- 是否避免 props 与 slot 表达同一能力却没有优先级说明
- 类型是否足够精确，避免随手放宽成 `string | any`
- 未来是否容易扩展，而不是一开始就把 API 卡死

如果组件是对标仓库里已有同类组件，优先维持横向一致，不要为了“更优雅”擅自做一套新 API。

## 必做总入口同步

新增公共组件后，至少同步下面两个入口。

### 1. 命名导出入口

路径：`packages/web-vue/components/index.ts`

需要增加：

- 组件默认导出，例如 `export { default as Alert } from './alert';`
- 实例类型导出，例如 `export type { AlertInstance } from './alert';`
- 如果有子组件或额外类型，也要在这里导出

### 2. 插件安装入口

路径：`packages/web-vue/components/sd-vue.ts`

需要增加：

- 顶部 import
- `components` 集合注册
- 如有子组件，也要保持与相邻组件一致的导入方式

如果漏掉这一步，组件可能能单独 import，但无法通过插件全量注册使用。

如果任务是重构现有组件，也要反查这两个总入口是否已经存在陈旧导出、重复导出或类型遗漏。

### 3. 全局组件类型声明入口

路径：`packages/web-vue/components/components.ts`

在当前仓库里，这个文件是手工维护的全局组件类型声明入口。新增公共组件后，通常还需要补：

- `declare module 'vue'` 中的 `Sd<ComponentName>` 映射
- 与命名导出保持一致的组件名

如果漏掉这一步，运行时可能可用，但 Volar / TS 的全局组件类型会缺失。

### 4. 根样式聚合入口

路径：`packages/web-vue/components/index.scss`

在当前仓库里，这个文件也是手工维护入口。新增公共组件样式后，通常还需要补：

- `@import url('./<component-name>/style/index.scss');`

额外约束：

- 只做最小改动，新增当前组件自己的样式入口即可
- 保持文件现有风格，不要顺手批量改写其它 import
- 如果现有写法是 `@import url('./...');`，就继续沿用，不要把它改成别的形式
- 不要因为本地工具或操作系统差异去改路径分隔符；以仓库文件当前风格为准

## 测试要求

组件至少补两类测试：行为测试和 demo 快照测试。

如果是组件组或函数式 API，再额外补一类“组合调用”测试，避免只验证静态渲染。

测试质量要求：

- 每个关键公共能力至少有一个非快照断言
- 不要用“存在即可”断言替代语义行为验证
- 不要只测 happy path
- 对有状态切换的组件，至少测一次状态前后变化
- 对事件，至少测是否触发以及触发时机或参数之一

### 1. 行为测试

路径：`packages/web-vue/components/<component-name>/__test__/index.test.ts`

优先覆盖：

- 关键 props 生效
- 关键 events 触发
- slots 渲染
- class 状态切换
- 控制逻辑或边界行为

写法约定：

- 使用 `@vue/test-utils` 的 `mount`
- 测试描述简洁明确
- 断言以用户可观察行为为主，不要过度绑定内部实现
- 不要为了凑覆盖率测试无意义的私有细节

建议至少有这些 case：

- 默认渲染
- 一到两个核心 props
- 一个事件
- 一个 slot 或内容插槽
- 一个边界条件

有下面这些情况时，应再加测试：

- 受控/非受控双模式
- props 联动
- 子组件注册或上下文协作
- 异步关闭、延迟渲染、销毁卸载
- 可访问性交互，例如键盘触发或 aria 状态

### 2. demo 测试

路径：`packages/web-vue/components/<component-name>/__test__/demo.test.ts`

固定模式通常是：

```ts
import demoTest from '../../../scripts/demo-test';

demoTest('<component-name>');
```

作用：

- 自动挂载 docs 包里生成的 demo 组件
- 对 demo HTML 做快照校验

注意：

- 这依赖 docs 包里的生成 demo 文件存在
- `__snapshots__` 由测试生成，不要手写

如果 demo 组件来源不明，先查 `scripts/demo-test` 和 docs 目录引用链路，再决定是否需要额外同步步骤。

## 文档要求

文档页路径固定：

- `packages/sd-vue-docs/src/content/docs/components/<component-name>/index.mdx`

文档页通常包括：

1. frontmatter：`title`、`description`
2. `DemoBlock` 引入
3. 每个 demo 的组件 import 和源码字符串
4. 场景小节
5. API 表格

推荐结构：

```mdx
---
title: 组件名 EnglishName
description: 一句话描述组件用途。
---

import DemoBlock from '../../../../components/docs/DemoBlock.astro';
import XxxBasicDemo from '../../../../components/generated/<component-name>/basic.vue';
export const xxxBasicSource = '...';

### 基本用法

一句话说明。

<DemoBlock source={xxxBasicSource} mainFile="src/<component-name>-basic.vue">

<XxxBasicDemo client:only="vue" />

</DemoBlock>

## API
```

文档编写要求：

- 标题与描述面向使用者，不面向实现者
- demo 小节按“从基础到高级”排序
- API 至少覆盖 Props、Events、Slots；有方法或 expose 时补 Methods
- 事件名在文档中保持用户视角命名，例如 `after-close`
- 版本字段只在确实需要注明时填写
- 示例代码优先展示推荐用法，而不是实现者最省事的写法
- 场景标题要让使用者看得懂，不要写成内部开发术语
- 文档描述要解释“什么时候用”，不是只解释“它是什么”

如果组件是组件组或复合组件，文档页还要补：

- 主组件与子组件的职责说明
- 何时用 props，何时用 slot，何时用子组件组合
- 变体之间的取舍，不要只堆 API 表格

如果是服务式能力，还要补：

- 组件式调用和函数式调用的区别
- 最小可用示例
- 可能的挂载、副作用或生命周期注意事项

## 关于 demo 生成目录

下面这个目录通常是生成产物，不要直接手改：

- `packages/sd-vue-docs/src/components/generated/`

在当前仓库里，先把这件事当成“待确认事实”，不要默认存在某条 demo 生成命令。

处理顺序：

1. 先查目标包和根目录 `package.json` 的 scripts。
2. 再查相邻组件的测试、文档和脚本引用。
3. 如果终端历史显示存在某条命令，也要回到源码脚本里核实来源。
4. 只有真实存在并确认归属后，才把该命令写入操作步骤。

如果没有确认出生成链路，优先维护最终 MDX 页面和可执行测试，不要把未知生成流程写成硬要求。

当前仓库还要额外注意：

- 如果 `package.json` 里不存在 `docs:generate-demos` 或 `generate-demos` 一类脚本，就不要因为终端历史里出现过类似命令而把它当真
- 如果 `scripts/demo-test` 直接从 `packages/sd-vue-docs/src/components/generated/<component-name>/*.vue` 加载 demo，而这些文件又已经受版本控制，那么它们在当前仓库里应视为需要维护的输入文件，而不是可以忽略的纯产物
- 结论必须以当前源码和脚本为准，不以历史命令名为准
- 当前已确认存在的 docs 相关脚本包括：`docs:prepare`、`docs:vendor`、`docs:vendor:only`、`dev`、`dev:serve`、`build`、`build:site`、`preview`
- 对文档 demo 来说，`DemoEditor` 能运行不等于 `DemoBlock` 预览可用；如果组件有 tooltip / popover / teleported popup / overflow 裁剪 / 懒激活切换，必须按文档预览容器的真实约束检查一遍

## 文档 demo 设计规则

demo 不是越多越好，优先覆盖使用者最关心的能力。默认至少包含：

1. 基本用法
2. 一个核心变体
3. 一个交互或状态变化场景
4. 一个插槽、自定义内容或组合场景

复杂组件再补：

- 尺寸或状态矩阵
- 受控用法
- 自定义渲染
- 边界或异常态

避免这些低价值 demo：

- 只换几组文案、没有新能力
- API 完全重复、只是颜色不同
- 实现上很复杂，但对用户没有新增认知价值

## 实现流程

按这个顺序推进，避免返工：

1. 先判断组件形态。
2. 定义组件 API。
3. 选择参考组件。
4. 创建组件目录骨架。
5. 实现 `<component-name>.vue` 或相关变体组件。
6. 补 `index.ts` 安装导出。
7. 补 `style/token.scss`、`style/index.scss`、`style/index.ts`。
8. 更新 `packages/web-vue/components/index.ts`。
9. 更新 `packages/web-vue/components/sd-vue.ts`。
10. 更新 `packages/web-vue/components/components.ts`。
11. 更新 `packages/web-vue/components/index.scss`。
12. 写 `__test__/index.test.ts`。
13. 写 `__test__/demo.test.ts`。
14. 写 `packages/sd-vue-docs/src/content/docs/components/<component-name>/index.mdx`。
15. 同步 `packages/sd-vue-docs/src/content/docs/components/index.mdx` 和 `packages/sd-vue-docs/src/generated/docs-sidebar.ts`，确保组件在文档导航中可发现。
16. 核实 demo 相关链路是否需要额外同步，以及 `generated/<component-name>` 是否需要补 demo 源文件。
17. 如果 demo 有浮层、裁剪、懒激活或首次交互逻辑，额外确认 `DemoBlock` 预览里的第一轮交互不是“无效果”。
18. 运行验证命令。
19. 修复和本次改动直接相关的错误。

不要跳过第 1 步和第 3 步。很多返工都来自先写实现、后发现组件形态判断错了。

如果是重构现有组件，开始改之前先补一件事：

16. 先盘点现有组件实际对外契约，再决定哪些要保留、兼容或迁移。

## 验证命令

优先使用仓库中已经验证存在的命令：

```bash
pnpm --filter @sdata/web-vue test
pnpm --filter @sdata/web-vue run build:module
pnpm --filter @sd-design/sd-vue-docs run docs:vendor
pnpm --filter @sd-design/sd-vue-docs run build
pnpm --filter @sd-design/sd-vue-docs run dev
```

验证目标：

- 组件测试通过
- 组件可正常构建为模块产物
- 文档站能拿到最新组件产物和 vendor 依赖
- 文档页能在开发环境正常打开

如果只需要快速验证，也至少跑组件测试；如果改了文档或样式入口，补跑 docs 相关命令。

更严格的验证顺序建议：

1. 先跑与当前组件直接相关的测试
2. 再跑 `@sdata/web-vue` 级别测试
3. 再跑模块构建
4. 再跑 docs vendor 或 docs build，验证文档侧接入
5. 如需人工联调，再跑 docs dev / dev:serve

如果某条验证因为仓库基线问题失败，要区分：

- 是本次改动引入的问题
- 还是仓库已有问题

不要把仓库历史遗留问题误写成当前改动失败。

## 发布级检查

如果用户要求的是“正式组件”而不是临时骨架，结束前再检查这些项：

- 导出名、类型名、事件名、slot 名是否适合长期保留
- 文档 API 与源码注释是否一致
- 组件在 docs 中是否可被正常理解和发现
- 是否影响同类组件的一致性
- 是否需要更新变更日志、版本说明或发布说明
- 是否需要补 migration note 或 breaking change 说明

如果任务触及现有 public API，默认把兼容性风险写进最终说明。

## 完成标准

只有同时满足下面条件，才算组件真正完成：

- 组件源码可读且 API 清晰
- 样式 token 与样式入口齐全
- 公共导出入口已同步
- 插件安装入口已同步
- 行为测试已补齐
- demo 测试已补齐
- 文档页已补齐
- 文档总览页和侧边栏等发现入口已补齐
- 文档中的 `DemoBlock` 预览已验证，不存在“在线编辑器可用但文档示例首轮交互无效果”的断层
- 如果是组件组、复合组件或服务式能力，对应的额外导出和调用入口已补齐
- 关键命令已验证，或明确说明为什么本次未验证

更严格地说，只有当下面三个问题都能回答“是”时，才算真正完成：

- 使用者能从 API 和文档直接理解怎么用吗
- 维护者能从结构和测试直接理解怎么改吗
- CI 或本地验证链路能证明这次改动没有明显断层吗

有任一答案是否定，都不应把任务表述成“完全完成”。

## 常见遗漏

- 只写了 `<component-name>.vue`，忘了 `index.ts`
- 只补了 `packages/web-vue/components/index.ts`，忘了 `packages/web-vue/components/sd-vue.ts`
- 忘了 `packages/web-vue/components/components.ts` 的全局组件类型声明
- 忘了 `packages/web-vue/components/index.scss` 的根样式入口
- 样式写进组件里，却没补 `style/index.ts`
- token 没抽出来，导致 `index.scss` 堆满魔法值
- 只写功能测试，没写 `demo.test.ts`
- 只写 MDX 页面，没有核实 generated demo 到底是不是当前仓库里的手工源
- 文档写了 props，却漏了 events 或 slots
- 使用不存在的仓库脚本名
- 改了 public API，却没在最终说明里提示兼容性影响
- 新增了子组件或静态方法，却没补类型导出
- 参考了多形态组件，却错误地套到了单组件流程
- 文档 demo 很多，但没有一个覆盖推荐用法

## 常见反模式

- 把组件写成“所有能力都靠一个巨大 props 表驱动”的万能组件
- 因为想复用，把模板和状态拆得过碎，最后比相邻组件更难读
- 用实现细节命名 public props / events
- 过度追求抽象，导致 docs 很难写、测试很难断言
- 组件本体可用，但样式 token 不可复用、不可维护
- demo 看起来很多，但用户仍看不懂主路径用法

如果出现这些反模式，优先回退到和相邻成熟组件一致的简单方案。

## 可优化项

在基线已经完成的前提下，可以继续检查这些优化点：

### 1. a11y

- 是否补足语义角色
- 是否需要 aria 属性
- 是否支持键盘交互
- 是否有焦点可见性问题

### 2. API 一致性

- 是否和同类组件保持命名一致
- 是否能减少歧义 props
- 是否明确 slot 与 props 的优先级

### 3. 测试稳健性

- 是否过度依赖快照
- 是否遗漏边界态
- 是否存在只测结构不测行为的问题

### 4. 文档质量

- 标题是否是用户语言
- demo 排序是否自然
- API 表和正文是否互补，而不是互相重复

### 5. 样式可维护性

- token 是否语义清晰
- 选择器是否过深
- 是否存在难以复用的局部魔法值

### 6. 未来扩展性

- 新增能力是否还能平滑扩展
- 是否已经把未来空间提前锁死
- 是否需要预留 slots、types 或 helper exports

## 输出要求

执行这个 skill 时，最终输出至少要告诉用户：

1. 改了哪些关键区域。
2. 哪些验证已经完成。
3. 哪些风险或未完成项仍然存在。

如果有兼容性影响，再加第 4 项：

4. 哪些 public API 或使用方式发生了变化。

推荐直接按这个收尾模板输出：

```md
已完成：

- ...

已验证：

- ...

剩余风险：

- ...
```

如果用户是让你“先搭骨架”，也要明确说明哪些文件已经建好，哪些内容只是占位，避免让用户误以为组件已可发布。

如果用户要的是“最终可合并版本”，不要用“已完成骨架”这种表述模糊交付状态。

## 示例触发语句

- “给我的 web-vue 组件库新增一个 Empty State 组件，按现有 alert 那套结构来。”
- “帮我补一个组件，包括样式 token、测试、文档页和导出入口。”
- “把这个内部 Vue 组件整理成正式组件库组件，并接到 docs 里。”
- “按照仓库规范创建一个带 props、events、slots 和文档 demo 的新组件。”
- “给 progress 这种多形态组件补齐文档和测试。”
- “把一个带 ButtonGroup / 子组件导出的组件按现有组件库规范落地。”
- “把一个现有内部组件升级成正式公共组件，并一次性补齐导出、测试、文档、验证。”
- “按仓库里最严格的标准实现一个可发布的组件，不要只搭骨架。”
- “给 message / drawer 这类带函数式调用的能力补源码、测试和文档。”
