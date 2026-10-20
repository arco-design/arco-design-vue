```yaml
changelog: true
```

## 2.59.0

`2026-10-20`

### 🆕 新增功能

- 新增 `Modal.config` 与 `Modal.destroyAll`，并补充类型定义与测试。 ([#3647](https://github.com/arco-design/arco-design-vue/pull/3647))


## 2.57.0

`2025-03-10`

### 💎 功能优化

- 修复执行 onBeforeOk  时错误未传播的问题 ([#3407](https://github.com/arco-design/arco-design-vue/pull/3407))


## 2.54.6

`2024-03-01`

### 💅 样式更新

- 修复遮罩层 fade-modal 过渡动画在进入时不生效问题 ([#3007](https://github.com/arco-design/arco-design-vue/pull/3007))


## 2.50.0

`2023-08-11`

### 💎 功能优化

- 增加 `hide-title` 属性，支持隐藏标题 ([#2605](https://github.com/arco-design/arco-design-vue/pull/2605))

### 🆎 类型修正

- 补全 ModalConfig 缺失的属性 ([#2628](https://github.com/arco-design/arco-design-vue/pull/2628))


## 2.50.0

`2023-8-1`

### 💎 功能优化

- 增加 `hide-title` 属性，支持隐藏标题 ([#2605](https://github.com/arco-design/arco-design-vue/pull/2605))

## 2.47.0

`2023-06-02`

### ⚠️ 重点注意

- 修复Modal.confirm标题缺少warning icon的问题 ([#2465](https://github.com/arco-design/arco-design-vue/pull/2465))


## 2.46.2

`2023-05-31`

### 🐛 问题修复

- 修复modal组件不能设置width属性的问题 ([#2467](https://github.com/arco-design/arco-design-vue/pull/2467))


## 2.46.1

`2023-05-26`

### 🐛 问题修复

- 修复定义了top属性时拖拽错误 ([#2446](https://github.com/arco-design/arco-design-vue/pull/2446))
- 修复同时设置 `width` 和 `fullscreen` 时，没有全屏的问题 ([#2441](https://github.com/arco-design/arco-design-vue/pull/2441))

### 🆎 类型修正

- 修复函数调用形式ts报错 ([#2426](https://github.com/arco-design/arco-design-vue/pull/2426))


## 2.45.2

`2023-04-21`


## 2.43.2

`2023-02-24`

### 💎 功能优化

- 添加函数调用的更新方法 ([#2155](https://github.com/arco-design/arco-design-vue/pull/2155))


## 2.40.0

`2022-12-09`


## 2.38.0

`2022-10-28`

### 🐛 问题修复

- 修复自定义 style 时 z-index 不能生效的问题 ([#1796](https://github.com/arco-design/arco-design-vue/pull/1796))
- 修复函数式调用中关闭未卸载内部组件的问题 ([#1778](https://github.com/arco-design/arco-design-vue/pull/1778))


## 2.38.0-beta.2

`2022-10-21`

### 🐛 问题修复

- **modal:** 修复函数式调用下，传入子组件不会触发卸载的问题


## 2.38.0-beta.1

`2022-10-14`

### 💎 功能优化

- 函数式调用可以设置 renderToBody 参数 ([#1682](https://github.com/arco-design/arco-design-vue/pull/1682))


## 2.37.4

`2022-09-30`

### 💎 功能优化

- 修复对话框关闭的问题 ([#1696](https://github.com/arco-design/arco-design-vue/pull/1696))


## 2.36.1

`2022-09-09`

### 💎 功能优化

- on-before-ok 属性支持函数返回 Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))


## 2.34.0

`2022-07-29`

### 💎 功能优化

- 支持在函数调用中隐藏页脚 ([#1410](https://github.com/arco-design/arco-design-vue/pull/1410))


## 2.33.1

`2022-07-22`

### 🐛 问题修复

- 修复默认标题类名错误的问题 ([#1413](https://github.com/arco-design/arco-design-vue/pull/1413))


## 2.33.0

`2022-07-08`

### 💅 样式更新

- 修复 footer 按钮不居中的问题 ([#1391](https://github.com/arco-design/arco-design-vue/pull/1391))


## 2.32.0

`2022-06-24`

### 🐛 问题修复

- 修复当模态框超出屏幕大小后，移动位置导致错位的问题 ([#1336](https://github.com/arco-design/arco-design-vue/pull/1336))


## 2.31.0

`2022-06-17`

### 🆕 新增功能

- 增加 bodyClass 和 bodyStyle ([#1303](https://github.com/arco-design/arco-design-vue/pull/1303))


## 2.30.0

`2022-06-10`

### 🐛 问题修复

- 在组件卸载时重置 overflow 设置 ([#1262](https://github.com/arco-design/arco-design-vue/pull/1262))


## 2.27.0

`2022-05-13`

### 🐛 问题修复

- 修复拖拽后开启全屏产生位置偏移的问题 ([#1070](https://github.com/arco-design/arco-design-vue/pull/1070))

### 🆎 类型修正

- 补全 ModalConfig 缺失的属性 ([#1120](https://github.com/arco-design/arco-design-vue/pull/1120))


## 2.26.0

`2022-04-29`

### 💅 样式更新

- body 层增加 `overflow: auto` ([#1030](https://github.com/arco-design/arco-design-vue/pull/1030))


## 2.25.0

`2022-04-22`

### 💎 功能优化

- 使用 `esc` 关闭时只会关闭最上层弹窗 ([#1018](https://github.com/arco-design/arco-design-vue/pull/1018))


## 2.24.0

`2022-04-15`

### 🆕 新增功能

- 增加动画名属性 ([#985](https://github.com/arco-design/arco-design-vue/pull/985))

### 🐛 问题修复

- 修复在某些情况下不会锁定 body 的问题 ([#968](https://github.com/arco-design/arco-design-vue/pull/968))

### 💅 样式更新

- 修复全屏下动画导致闪现滚动条的问题 ([#985](https://github.com/arco-design/arco-design-vue/pull/985))


## 2.23.0

`2022-04-08`

### 💎 功能优化

- 修复在滚动条为浮动的情况下，body没有锁定的问题 ([#945](https://github.com/arco-design/arco-design-vue/pull/945))

### 💅 样式更新

- 修复在简单模式下，title-align 靠左对齐失效的问题 ([#945](https://github.com/arco-design/arco-design-vue/pull/945))


## 2.22.0

`2022-04-01`

### 🐛 问题修复

- 修复 `align-center="false"` 时自动宽度和拖动错误的问题 ([#918](https://github.com/arco-design/arco-design-vue/pull/918))


## 2.21.0

`2022-03-25`

### 🐛 问题修复

- 修复使用函数方式触发Modal显示时，按钮处于焦点，此时点击回车会继续出发点击事件 ([#860](https://github.com/arco-design/arco-design-vue/pull/860))


## 2.20.0

`2022-03-18`

### 🐛 问题修复

- 修复创建方法中返回的 `close` 函数错误的问题 ([#840](https://github.com/arco-design/arco-design-vue/pull/840))


## 2.19.0

`2022-03-11`

### 🆕 新增功能

- 增加 `draggable` 属性，支持可拖动 ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- 增加 `fullscreen` 属性，支持全屏展示 ([#802](https://github.com/arco-design/arco-design-vue/pull/802))


## 2.18.0-beta.2

`2022-02-25`

### 💎 功能优化

- 优化点击遮罩层关闭 ([#737](https://github.com/arco-design/arco-design-vue/pull/737))


## 2.17.0

`2022-02-11`

### 🆕 新增功能

- 增加 `title-align` 属性 ([#673](https://github.com/arco-design/arco-design-vue/pull/673))


## 2.16.0

`2022-01-21`

### 🆕 新增功能

- 增加 `before-open` 和 `before-close` 事件 ([#628](https://github.com/arco-design/arco-design-vue/pull/628))

### 🐛 问题修复

- 修复样式文件缺少 `<button>` 组件样式引用的问题 ([#635](https://github.com/arco-design/arco-design-vue/pull/635))


## 2.15.0

`2022-01-14`

### 🆕 新增功能

- 增加 `escToClose` 属性并默认开启 ([#577](https://github.com/arco-design/arco-design-vue/pull/577))


## 2.12.2

`2021-12-27`

### 🐛 问题修复

- 修复 modalStyle 失效的问题 ([#459](https://github.com/arco-design/arco-design-vue/pull/459))
- 修复 flex 布局导致垂直居中且超出高度显示不全的问题 ([#459](https://github.com/arco-design/arco-design-vue/pull/459))


## 2.12.0

`2021-12-24`

### ⚠️ 重点注意

- 修改 wrapper 层展示 modal 的方式，并添加 `width` 和 `top` 属性 ([#454](https://github.com/arco-design/arco-design-vue/pull/454))

### 🐛 问题修复

- 修复按钮内容不能动态修改的问题 ([#453](https://github.com/arco-design/arco-design-vue/pull/453))


## 2.11.0

`2021-12-17`

### 🐛 问题修复

- 修复 `alignCenter` 属性不生效的问题 ([#384](https://github.com/arco-design/arco-design-vue/pull/384))
- 调整组件的 `alignCenter` 属性默认为 `true` ([#384](https://github.com/arco-design/arco-design-vue/pull/384))


## 2.10.1

`2021-12-14`

### 🆎 类型修正

- `ModalConfig ` 增加 `simple` 属性注解 ([#389](https://github.com/arco-design/arco-design-vue/pull/389))


## 2.10.0

`2021-12-10`

### 💅 样式更新

- 修复 modal 信息展示模式错误的问题 ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- 简单模式下不展示标题栏关闭按钮 ([#351](https://github.com/arco-design/arco-design-vue/pull/351))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))

### 🐛 问题修复

- 修复初始触发 `open` 事件的问题 ([#267](https://github.com/arco-design/arco-design-vue/pull/267))


## 2.4.0

`2021-11-17`

### 💎 功能优化

- 统一管理弹出层的 zIndex ([#167](https://github.com/arco-design/arco-design-vue/pull/167))


## 2.1.1

`2021-11-08`

### 🐛 问题修复

- 修复 `title` 属性不生效的问题 ([#116](https://github.com/arco-design/arco-design-vue/pull/116))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- 修复主按钮类型错误的问题 ([#30](https://github.com/arco-design/arco-design-vue/pull/30))

