```yaml
changelog: true
```

## 2.58.0

`2026-04-16`

### 🆕 新增功能

- **drawer:** 关闭mask,增加事件穿透 ([#3626](https://github.com/arco-design/arco-design-vue/pull/3626))
- **tooltip:** 增加禁用属性 ([#3626](https://github.com/arco-design/arco-design-vue/pull/3626))

### 🐛 问题修复

- **date-picker:** 添加禁用日期功能并优化日期检查逻辑 ([#3630](https://github.com/arco-design/arco-design-vue/pull/3630))


## 2.57.0

`2025-03-10`

### 🆕 新增功能

- **input:** 新增`prepend`、`append`属性 ([#3452](https://github.com/arco-design/arco-design-vue/pull/3452))
- **drawer:** 增加 bodyClass 和 bodyStyle ([#3437](https://github.com/arco-design/arco-design-vue/pull/3437))

### 🐛 问题修复

- **form:** 修复表单 `id` 属性被消费无法透传问题 ([#3450](https://github.com/arco-design/arco-design-vue/pull/3450))
- **input:** 修复 input 内 preValue 计算错误问题 ([#3427](https://github.com/arco-design/arco-design-vue/pull/3427))
- **tabs:** 解决`wheel`事件监听器性能警告 ([#3413](https://github.com/arco-design/arco-design-vue/pull/3413))
- **tabs:** 优化标签页动态增减时内存释放问题 ([#3413](https://github.com/arco-design/arco-design-vue/pull/3413))
- **descriptions:** 修复 `span` 分配布局的错误使其更遵循用户配置 ([#3409](https://github.com/arco-design/arco-design-vue/pull/3409))
- **message:** 修复 message 定位会受到布局影响，从而不显示的问题 ([#3406](https://github.com/arco-design/arco-design-vue/pull/3406))
- **table:** 修复暗黑模式下固定列选中背景样式透明 ([#3398](https://github.com/arco-design/arco-design-vue/pull/3398))
- **slider:** 修复拖动更改滑块值在移动端无效 ([#3343](https://github.com/arco-design/arco-design-vue/pull/3343))

### 💎 功能优化

- **modal:** 修复执行 onBeforeOk  时错误未传播的问题 ([#3407](https://github.com/arco-design/arco-design-vue/pull/3407))
- **drawer:** 修复执行 onBeforeOk  时错误未传播的问题 ([#3407](https://github.com/arco-design/arco-design-vue/pull/3407))
- **popconfirm:** 修复执行 onBeforeOk  时错误未传播的问题 ([#3407](https://github.com/arco-design/arco-design-vue/pull/3407))


## 2.56.3

`2024-10-25`

### 🆕 新增功能

- **button:** 支持button的autofocus属性 ([#3293](https://github.com/arco-design/arco-design-vue/pull/3293))

### 🐛 问题修复

- 修复高棉语翻译 ([#3328](https://github.com/arco-design/arco-design-vue/pull/3328))
- **cascader:** 修复自定义空插槽部分情况下不生效问题 ([#3315](https://github.com/arco-design/arco-design-vue/pull/3315))
- **input-number:** 修复左右按钮模式下只读属性不生效问题 ([#3314](https://github.com/arco-design/arco-design-vue/pull/3314))

### 💎 功能优化

- **textarea:** 支持textarea的textareaAttrs属性 ([#3303](https://github.com/arco-design/arco-design-vue/pull/3303))


## 2.56.2

`2024-09-13`

### 🆕 新增功能

- 新增俄语 ([#3290](https://github.com/arco-design/arco-design-vue/pull/3290))

### 🐛 问题修复

- **select:** fix(switch): 修复当加载状态被真值初始化后无法受控 ([#3285](https://github.com/arco-design/arco-design-vue/pull/3285))
- **calendar:** 修复modes 不生效问题 ([#3281](https://github.com/arco-design/arco-design-vue/pull/3281))
- **radio:** 修复未继承注入的size问题 ([#3267](https://github.com/arco-design/arco-design-vue/pull/3267))

### 🆎 类型修正

- **card:** 更新headerStyle与bodyStyle的类型 ([#3268](https://github.com/arco-design/arco-design-vue/pull/3268))


## 2.56.1

`2024-08-22`

### 🆕 新增功能

- **select:** 增加 `tagNowrap` 选项 ([#3270](https://github.com/arco-design/arco-design-vue/pull/3270))


## 2.56.0

`2024-07-26`

### 🆕 新增功能

- **input-number:** 增加 'keydown' 事件，可以禁止默认行为 ([#3248](https://github.com/arco-design/arco-design-vue/pull/3248))

### 🐛 问题修复

- **tree:** 修复树折叠动画不生效问题 ([#3234](https://github.com/arco-design/arco-design-vue/pull/3234))
- **color-picker:** 修复在 v-model 下选择颜色时出现的抖动问题 ([#3180](https://github.com/arco-design/arco-design-vue/pull/3180))
- **time-picker:** triggerProps 属性未正确透传问题 ([#3178](https://github.com/arco-design/arco-design-vue/pull/3178))

### 💎 功能优化

- **menu:** 修复已选中菜单项中的颜色动画过渡效果 ([#3192](https://github.com/arco-design/arco-design-vue/pull/3192))


## 2.55.3

`2024-06-07`

### 🆕 新增功能

- **table:** column 增加 minWidth 属性 ([#3157](https://github.com/arco-design/arco-design-vue/pull/3157))

### 🐛 问题修复

- **time-picker:** 修复只读模式仍可编辑问题 ([#3173](https://github.com/arco-design/arco-design-vue/pull/3173))
- **time-picker:** 补充 `placeholder` 类型定义 ([#3173](https://github.com/arco-design/arco-design-vue/pull/3173))
- **input:** 修复只读状态下显示清空输入框按钮 ([#3172](https://github.com/arco-design/arco-design-vue/pull/3172))
- **table:** 修复虚拟滚动条开启时 sticky-header 吸顶失效 ([#3170](https://github.com/arco-design/arco-design-vue/pull/3170))
- **table:** table动态切换row-selection时恢复默认样式 ([#3155](https://github.com/arco-design/arco-design-vue/pull/3155))


## 2.55.2

`2024-05-10`

### 🐛 问题修复

- **verification-code:** 修复粘贴时`formatter`未生效 ([#3110](https://github.com/arco-design/arco-design-vue/pull/3110))
- **upload:** 修复上传组件预览样式引入缺失 ([#3101](https://github.com/arco-design/arco-design-vue/pull/3101))
- **transfer:** 修复 simple 模式下禁用失效 ([#3067](https://github.com/arco-design/arco-design-vue/pull/3067))
- **color-picker:** 修复样式按需导入错误 ([#3052](https://github.com/arco-design/arco-design-vue/pull/3052))

### 💅 样式更新

- **color-picker:** 优化颜色控制条背景圆角样式 ([#3116](https://github.com/arco-design/arco-design-vue/pull/3116))

### 🆎 类型修正

- correct the type definition for popupContainer ([#2998](https://github.com/arco-design/arco-design-vue/pull/2998))


## 2.55.1

`2024-03-29`

### 🐛 问题修复

- **empty:** 修复属性自动继承的错误 ([#3048](https://github.com/arco-design/arco-design-vue/pull/3048))
- **trigger:** 修正位置的弹出动画方向 ([#3045](https://github.com/arco-design/arco-design-vue/pull/3045))
- **color-picker:** 修复双向绑定不生效问题 ([#3030](https://github.com/arco-design/arco-design-vue/pull/3030))
- **color-picker:** 修复文案错误 ([#3028](https://github.com/arco-design/arco-design-vue/pull/3028))

### 💅 样式更新

- **tree:** 修复scrollHeight计算异常问题 ([#3044](https://github.com/arco-design/arco-design-vue/pull/3044))


## 2.55.0

`2024-03-15`

### 🆕 新增功能

- **tree-select:** 新增 `input-value` 相关属性 ([#3024](https://github.com/arco-design/arco-design-vue/pull/3024))
- **tree:** `title` 插槽新增 `title` 参数 ([#3024](https://github.com/arco-design/arco-design-vue/pull/3024))
- **color-picker:** 新增颜色选择器 ([#2958](https://github.com/arco-design/arco-design-vue/pull/2958))

### 💅 样式更新

- **tabs:** 修复 title 过渡动画效果 ([#3008](https://github.com/arco-design/arco-design-vue/pull/3008))


## 2.54.6

`2024-03-01`

### 🐛 问题修复

- **input-number:** 修复步进按钮与 suffix/append 的样式重叠 ([#3005](https://github.com/arco-design/arco-design-vue/pull/3005))
- **collapse:** 解决 `vue` 保留属性警告 ([#2997](https://github.com/arco-design/arco-design-vue/pull/2997))
- **transfer:** 修复 disabled 属性不生效问题 ([#2996](https://github.com/arco-design/arco-design-vue/pull/2996))
- **tree:** 解决无效的属性名称控制台警告问题 ([#2995](https://github.com/arco-design/arco-design-vue/pull/2995))

### 💅 样式更新

- **modal:** 修复遮罩层 fade-modal 过渡动画在进入时不生效问题 ([#3007](https://github.com/arco-design/arco-design-vue/pull/3007))


## 2.54.5

`2024-02-21`

### 🐛 问题修复

- **menu:** 修复警告 “Invalid prop name: key is a reserved property.” ([#2978](https://github.com/arco-design/arco-design-vue/pull/2978))
- **date-picker:** 重构日期 utility 函数和 WeekPicker，以正确显示所选星期 ([#2970](https://github.com/arco-design/arco-design-vue/pull/2970))
- **input-number:** 修复双向绑定失效 ([#2961](https://github.com/arco-design/arco-design-vue/pull/2961))


## 2.54.4

`2024-02-02`

### 🐛 问题修复

- **table:** 修复表格虚拟列表下不显示 empty  问题 ([#2949](https://github.com/arco-design/arco-design-vue/pull/2949))
- **watermark:** 修复字体颜色不生效问题 ([#2942](https://github.com/arco-design/arco-design-vue/pull/2942))
- **input-number:** 修复 change 事件触发逻辑 ([#2915](https://github.com/arco-design/arco-design-vue/pull/2915))


## 2.54.3

`2024-01-19`

### 🐛 问题修复

- **rate:** 修复在`nuxt`中图标元素缺失的问题 ([#2930](https://github.com/arco-design/arco-design-vue/pull/2930))
- **avatar:** 修复头像组气泡中部分头像不显示问题 ([#2925](https://github.com/arco-design/arco-design-vue/pull/2925))
- **image:** 修复错误的类型定义和文档说明 ([#2924](https://github.com/arco-design/arco-design-vue/pull/2924))
- **image:** 修正单词拼写错误 ([#2924](https://github.com/arco-design/arco-design-vue/pull/2924))
- **input:** 修正文档单词拼写错误 ([#2924](https://github.com/arco-design/arco-design-vue/pull/2924))


## 2.54.2

`2024-01-11`

### 🐛 问题修复

- **table:** 修复 `span-method` 在超出行列数后报错的问题 ([#2914](https://github.com/arco-design/arco-design-vue/pull/2914))

### 💎 功能优化

- **select:** 下拉选择器添加选中效果 ([#2895](https://github.com/arco-design/arco-design-vue/pull/2895))

### 💅 样式更新

- **input:** 修复 input-group 相邻组件样式叠加时的问题 ([#2889](https://github.com/arco-design/arco-design-vue/pull/2889))


## 2.54.1

`2023-12-28`

### 🆕 新增功能

- **watermark:** 水印字体色跟随主题变化 ([#2790](https://github.com/arco-design/arco-design-vue/pull/2790))
- **input:** 新增密码框密码可见性相关属性 ([#2784](https://github.com/arco-design/arco-design-vue/pull/2784))

### 🐛 问题修复

- **select:** 修复 `defaultPopupVisible` 失效的问题 ([#2881](https://github.com/arco-design/arco-design-vue/pull/2881))


## 2.54.0

`2023-12-15`

### 🆕 新增功能

- 新增验证码输入组件 ([#2823](https://github.com/arco-design/arco-design-vue/pull/2823))

### 🐛 问题修复

- **date-picker:** 修复日期范围部分模式下箭头点击问题 ([#2865](https://github.com/arco-design/arco-design-vue/pull/2865))
- **pagination:** 修复页码可能为 `0` 的问题 ([#2828](https://github.com/arco-design/arco-design-vue/pull/2828))

### 💎 功能优化

- **cascader:** 修改 `multiple` 和 `pathMode` 时会触发绑定值的改变 ([#2867](https://github.com/arco-design/arco-design-vue/pull/2867))

### 🆎 类型修正

- **button:** TS类型优化 ([#2825](https://github.com/arco-design/arco-design-vue/pull/2825))


## 2.53.3

`2023-11-24`

### 🐛 问题修复

- **input-tag:** 修复 `read-only` 下仍然能被删除的问题 ([#2824](https://github.com/arco-design/arco-design-vue/pull/2824))
- **date-picker:** 修复日期与format不一致导致出现无效日期 ([#2789](https://github.com/arco-design/arco-design-vue/pull/2789))


## 2.53.2

`2023-11-10`

### 🐛 问题修复

- **watermark:** 修复样式按需加载报错问题 ([#2787](https://github.com/arco-design/arco-design-vue/pull/2787))


## 2.53.1

`2023-11-08`

### 🐛 问题修复

- **watermark:** 修复组件入口未暴露问题 ([#2782](https://github.com/arco-design/arco-design-vue/pull/2782))


## 2.53.0

`2023-11-03`

### 🆕 新增功能

- **watermark:** 新增水印组件 ([#2741](https://github.com/arco-design/arco-design-vue/pull/2741))
- **calendar:** 新增 `header` 和 `default` 插槽 ([#2674](https://github.com/arco-design/arco-design-vue/pull/2674))

### 🐛 问题修复

- **descriptions:** 修复 `DescriptionsItem` 组件 `span` 属性失效的问题 ([#2765](https://github.com/arco-design/arco-design-vue/pull/2765))


## 2.52.1

`2023-10-13`

### 🐛 问题修复

- **mention:** 修复在text-area下disabled属性无法正常工作的问题 ([#2723](https://github.com/arco-design/arco-design-vue/pull/2723))

### 💎 功能优化

- **switch:** 优化对 `undefined` 和 `null` 值的处理 ([#2737](https://github.com/arco-design/arco-design-vue/pull/2737))


## 2.52.0

`2023-09-22`

### 🆕 新增功能

- **input-number:** 增加 `input-attrs` 属性 ([#2716](https://github.com/arco-design/arco-design-vue/pull/2716))
- **transfer:** 增加操作图标插槽 ([#2708](https://github.com/arco-design/arco-design-vue/pull/2708))
- **avatar:** 添加了新的 `ObjectFit` 属性 ([#2691](https://github.com/arco-design/arco-design-vue/pull/2691))
- **auto-complete:** 增加下拉菜单滚动事件 ([#2635](https://github.com/arco-design/arco-design-vue/pull/2635))

### 🐛 问题修复

- **date-picker:** 修复范围选择器操作箭头显示错误问题 ([#2712](https://github.com/arco-design/arco-design-vue/pull/2712))


## 2.51.2

`2023-09-15`

### 🐛 问题修复

- **form:** 修复field为数组对象时滚动报错问题 ([#2707](https://github.com/arco-design/arco-design-vue/pull/2707))


## 2.51.1

`2023-09-08`

### 🐛 问题修复

- **cascader:** 修复开启虚拟列表时空状态不显示 ([#2686](https://github.com/arco-design/arco-design-vue/pull/2686))


## 2.51.0

`2023-09-01`

### ⚠️ 重点注意

- **form:** `form-item` 渲染元素增加 `id` 属性，请注意对原始网页的影响

### 🆕 新增功能

- **form:** 新增滚动到指定表单字段 ([#2680](https://github.com/arco-design/arco-design-vue/pull/2680))
- **table:** 支持显示空子树 ([#2673](https://github.com/arco-design/arco-design-vue/pull/2673))
- **select:** 支持`boolean` 类型 ([#2661](https://github.com/arco-design/arco-design-vue/pull/2661))

### 🐛 问题修复

- **typography:** 修复按需导入时缺少相关组件样式的问题 ([#2682](https://github.com/arco-design/arco-design-vue/pull/2682))


## 2.50.2

`2023-08-25`

### 🐛 问题修复

- 修复虚拟滚动 scrollTop 位置不对 ([#2665](https://github.com/arco-design/arco-design-vue/pull/2665))

### 💎 功能优化

- **input-number:** 优化步长按钮的长按效果 ([#2668](https://github.com/arco-design/arco-design-vue/pull/2668))


## 2.50.1

`2023-08-18`

### 🆕 新增功能

- **transfer:** 增加搜索框的配置属性 ([#2656](https://github.com/arco-design/arco-design-vue/pull/2656))

### 🐛 问题修复

- DOM 位置计算兼容 Shadow DOM ([#2649](https://github.com/arco-design/arco-design-vue/pull/2649))


## 2.50.0

`2023-08-11`

### ⚠️ 重点注意

- 修正 `Alter` 为 `Alert` ([#2633](https://github.com/arco-design/arco-design-vue/pull/2633))

### 🆕 新增功能

- **image:** 支持键盘快捷、鼠标滚轮操作等一系列功能 ([#2616](https://github.com/arco-design/arco-design-vue/pull/2616))
- **auto-complete:** 添加虚拟列表支持 ([#2596](https://github.com/arco-design/arco-design-vue/pull/2596))
- **timeline:** 添加自定义标签插槽 ([#2591](https://github.com/arco-design/arco-design-vue/pull/2591))

### 🐛 问题修复

- 修复全局引入时提示重复注册的问题 ([#2633](https://github.com/arco-design/arco-design-vue/pull/2633))
- 修复了导致"␍"错误的格式问题 ([#2626](https://github.com/arco-design/arco-design-vue/pull/2626))

### 💎 功能优化

- **modal:** 增加 `hide-title` 属性，支持隐藏标题 ([#2605](https://github.com/arco-design/arco-design-vue/pull/2605))

### 🆎 类型修正

- **modal:** 补全 ModalConfig 缺失的属性 ([#2628](https://github.com/arco-design/arco-design-vue/pull/2628))
- **image:** 添加 ImagePreviewAction 类型声明 ([#2625](https://github.com/arco-design/arco-design-vue/pull/2625))


## 2.49.3

`2023-08-04`

### 🐛 问题修复

- **grid:** 修复a-grid-item中使用v-show，初始值为false，但仍展示出来的问题 ([#2604](https://github.com/arco-design/arco-design-vue/pull/2604))


## 2.49.2

`2023-07-28`

### 🐛 问题修复

- **statistic:** 修复 `value-style` 在数字内容时不能修改字体大小的问题 ([#2600](https://github.com/arco-design/arco-design-vue/pull/2600))
- **table:** 修复在固定列中开启调整列宽出现的问题 ([#2598](https://github.com/arco-design/arco-design-vue/pull/2598))
- **typography:** 增强对连续长单词的省略支持 ([#2583](https://github.com/arco-design/arco-design-vue/pull/2583))
- **table:** 修复树形表格拖拽问题 ([#2503](https://github.com/arco-design/arco-design-vue/pull/2503))


## 2.49.1

`2023-07-24`

### 🐛 问题修复

- **tree-select:** 修复 `border` 属性默认值错误的问题 ([#2580](https://github.com/arco-design/arco-design-vue/pull/2580))


## 2.49.0

`2023-07-21`

### 🆕 新增功能

- **cascader:** 增加虚拟列表功能 ([#2577](https://github.com/arco-design/arco-design-vue/pull/2577))
- **tree-select:** 增加空状态下 header 和 footer 的显示状态 ([#2573](https://github.com/arco-design/arco-design-vue/pull/2573))
- **input-number:** 增加数值操作自定义图标插槽 ([#2560](https://github.com/arco-design/arco-design-vue/pull/2560))
- **list:** 滚动最大高度支持字符串类型 ([#2544](https://github.com/arco-design/arco-design-vue/pull/2544))

### 🐛 问题修复

- **table:** 修复 rowClass 函数 record 参数错误的问题 ([#2570](https://github.com/arco-design/arco-design-vue/pull/2570))
- **tree-select:** 修复 border 属性失效的问题 ([#2568](https://github.com/arco-design/arco-design-vue/pull/2568))

### 💅 样式更新

- **result:** 修复 500 图片错位问题 ([#2578](https://github.com/arco-design/arco-design-vue/pull/2578))


## 2.48.1

`2023-07-14`

### 🐛 问题修复

- **image:** 在错误状态下，没有 alt 或description情况图标不垂直居中 ([#2563](https://github.com/arco-design/arco-design-vue/pull/2563))
- **divider:** 修复竖向自适应高度 ([#2561](https://github.com/arco-design/arco-design-vue/pull/2561))
- **table:** 修复 `summary-span-method` 属性中传出参数错误的问题 ([#2552](https://github.com/arco-design/arco-design-vue/pull/2552))
- **table:** 修复子树的合并单元格的bug ([#2540](https://github.com/arco-design/arco-design-vue/pull/2540))


## 2.48.0

`2023-06-30`

### 🆕 新增功能

- **config-provider:** 增加 `exchangeTime` 属性 ([#2529](https://github.com/arco-design/arco-design-vue/pull/2529))
- **table:** 单元格新增鼠标移入移出事件 ([#2489](https://github.com/arco-design/arco-design-vue/pull/2489))

### 🐛 问题修复

- **table:** 增加headerCell下调整列宽高亮 ([#2519](https://github.com/arco-design/arco-design-vue/pull/2519))
- **list:** 修复virtual-list在数据发生修改时候滚动位置不对 ([#2502](https://github.com/arco-design/arco-design-vue/pull/2502))


## 2.47.1

`2023-06-09`

### 🐛 问题修复

- **tree-select:** 修复在虚拟列表下搜索内容不可选择的问题 ([#2488](https://github.com/arco-design/arco-design-vue/pull/2488))
- **select:** 修复搜索模式下鼠标光标定位问题 ([#2487](https://github.com/arco-design/arco-design-vue/pull/2487))
- **badge:** 修复组件在自定义 `prefix-cls` 时失效的问题 ([#2476](https://github.com/arco-design/arco-design-vue/pull/2476))


## 2.47.0

`2023-06-02`

### ⚠️ 重点注意

- **modal:** 修复Modal.confirm标题缺少warning icon的问题 ([#2465](https://github.com/arco-design/arco-design-vue/pull/2465))
- **input-number:** `hide-button` 在 `mode="button"` 时也会生效 ([#2461](https://github.com/arco-design/arco-design-vue/pull/2461))

### 🆕 新增功能

- **empty:** 增加 `in-config-provider` 属性 ([#2474](https://github.com/arco-design/arco-design-vue/pull/2474))
- **alert:** 新增 `center` 属性 ([#2464](https://github.com/arco-design/arco-design-vue/pull/2464))
- **config-provider:** empty slots 增加component 属性 ([#2448](https://github.com/arco-design/arco-design-vue/pull/2448))
- **select:** 空状态下可以显示 header 和 footer ([#2429](https://github.com/arco-design/arco-design-vue/pull/2429))
- **tree-select:** 增加树选择器页头和页脚插槽 ([#2417](https://github.com/arco-design/arco-design-vue/pull/2417))
- **mention:** search 事件增加 `prefix` 属性 ([#2356](https://github.com/arco-design/arco-design-vue/pull/2356))
- **spin:** 新增隐藏图标属性 ([#2303](https://github.com/arco-design/arco-design-vue/pull/2303))
- **spin:** 新增提示内容插槽 ([#2303](https://github.com/arco-design/arco-design-vue/pull/2303))

### 🐛 问题修复

- **date-picker:** 添加 getDefaultValueFormat 解决周选择器和季度选择器的v-model 问题 ([#2437](https://github.com/arco-design/arco-design-vue/pull/2437))


## 2.46.2

`2023-05-31`

### 🐛 问题修复

- **modal:** 修复modal组件不能设置width属性的问题 ([#2467](https://github.com/arco-design/arco-design-vue/pull/2467))


## 2.46.1

`2023-05-26`

### 🐛 问题修复

- **date-picker:** 修复日期范围选择器年、月、季度模式的箭头显示逻辑 ([#2451](https://github.com/arco-design/arco-design-vue/pull/2451))
- **modal:** 修复定义了top属性时拖拽错误 ([#2446](https://github.com/arco-design/arco-design-vue/pull/2446))
- **transfer:** 修复穿梭框选项被禁用时仍可以点击以及全选/半选在存在被禁用选项时错误 ([#2445](https://github.com/arco-design/arco-design-vue/pull/2445))
- **modal:** 修复同时设置 `width` 和 `fullscreen` 时，没有全屏的问题 ([#2441](https://github.com/arco-design/arco-design-vue/pull/2441))

### 💎 功能优化

- **table:** 增加表格右击、双击的相关事件 ([#2452](https://github.com/arco-design/arco-design-vue/pull/2452))

### 🆎 类型修正

- **modal:** 修复函数调用形式ts报错 ([#2426](https://github.com/arco-design/arco-design-vue/pull/2426))


## 2.46.0

`2023-05-12`

### 🆕 新增功能

- **trigger:** 增加 scrollToClose 属性 ([#2414](https://github.com/arco-design/arco-design-vue/pull/2414))
- **image:** 添加 actions 插槽 ([#2389](https://github.com/arco-design/arco-design-vue/pull/2389))
- **cascader:** 非严格模式下支持全路径搜索 ([#2363](https://github.com/arco-design/arco-design-vue/pull/2363))

### 🐛 问题修复

- **table:** 修复当 dataIndex 为路径格式时，排序和总结栏功能不生效的问题 ([#2413](https://github.com/arco-design/arco-design-vue/pull/2413))
- **divider:** 修复 margin 无法设置为 0 的问题 ([#2390](https://github.com/arco-design/arco-design-vue/pull/2390))

### 💎 功能优化

- **select:** 选择框增加 title 提示 ([#2412](https://github.com/arco-design/arco-design-vue/pull/2412))

### 🆎 类型修正

- **date-picker:** 日期选择器 ([#2359](https://github.com/arco-design/arco-design-vue/pull/2359))


## 2.45.3

`2023-04-28`

### 🐛 问题修复

- **select:** 修复输入法状态下 Enter 键会触发选择的问题 ([#2378](https://github.com/arco-design/arco-design-vue/pull/2378))

### 💎 功能优化

- **drawer:** 添加 onOk & onCancel 的事件参数 ([#2358](https://github.com/arco-design/arco-design-vue/pull/2358))

### 🆎 类型修正

- **checkbox:** 修复 `value` 属性使用 boolean 值出现 ts 错误的问题 ([#2373](https://github.com/arco-design/arco-design-vue/pull/2373))


## 2.45.2

`2023-04-21`

### 🐛 问题修复

- **date-picker:** 修复只使用面板情况下的样式问题 ([#2349](https://github.com/arco-design/arco-design-vue/pull/2349))

### 💅 样式更新

- **select:** 修复 select-view-input 的 line-height 和 height 不一致 ([#2346](https://github.com/arco-design/arco-design-vue/pull/2346))


## 2.45.1

`2023-04-14`

### 🐛 问题修复

- **image:** 修复 `sizeStyle` 失效的问题 ([#2327](https://github.com/arco-design/arco-design-vue/pull/2327))
- **cascader:** 修复控件宽度较短时，搜索结果展示异常 ([#2326](https://github.com/arco-design/arco-design-vue/pull/2326))
- **tabs:** 修复个别情况下tab-pane 的title 插槽不更新的问题 ([#2325](https://github.com/arco-design/arco-design-vue/pull/2325))

### 💅 样式更新

- **table:** 修复虚拟列表下显示横向滚动条的问题 ([#2337](https://github.com/arco-design/arco-design-vue/pull/2337))


## 2.45.0

`2023-04-07`

### 🆕 新增功能

- **transfer:** 添加自定义标题栏插槽 ([#2314](https://github.com/arco-design/arco-design-vue/pull/2314))
- **date-picker:** 增加 abbreviation 属性，控制月份是否显示简称 ([#2264](https://github.com/arco-design/arco-design-vue/pull/2264))
- **switch:** 新增文案显示props ([#2223](https://github.com/arco-design/arco-design-vue/pull/2223))
- **tree:** 树节点增加 data-level 和 data-key 数据属性 ([#2192](https://github.com/arco-design/arco-design-vue/pull/2192))

### 🐛 问题修复

- **date-picker:** 修复 exchange-time 在选择时失效的问题 ([#2302](https://github.com/arco-design/arco-design-vue/pull/2302))


## 2.44.7

`2023-04-03`

### 🐛 问题修复

- **trigger:** 修复在 iframe 中报错的问题 ([#2300](https://github.com/arco-design/arco-design-vue/pull/2300))


## 2.44.6

`2023-03-31`

### 🐛 问题修复

- **list:** 修复向上滚动时可能触发 reach-bottom 的问题 ([#2295](https://github.com/arco-design/arco-design-vue/pull/2295))
- **select:** 修复设置 modelValue 为 undefined 失效的问题 ([#2285](https://github.com/arco-design/arco-design-vue/pull/2285))
- **transfer:** 修复 title 部分 ellipsis 失效 ([#2278](https://github.com/arco-design/arco-design-vue/pull/2278))
- **upload:** 调整 extra-button 插槽参数 ([#2272](https://github.com/arco-design/arco-design-vue/pull/2272))
- **time-picker:** 修复清除事件冒泡行为 ([#2271](https://github.com/arco-design/arco-design-vue/pull/2271))

### 💎 功能优化

- **trigger:** 优化弹出位置在 ShadowRoot 中不准确问题 ([#2273](https://github.com/arco-design/arco-design-vue/pull/2273))


## 2.44.3

`2023-03-24`

### 🐛 问题修复

- **date-picker:** 修复年份范围选择器存在的问题 ([#2270](https://github.com/arco-design/arco-design-vue/pull/2270))
- 组件包增加 `exports` 标识，解决 nuxt3 下解析为 CommonJS 的问题 ([#2270](https://github.com/arco-design/arco-design-vue/pull/2270))
- **select:** 修复动态 slot options 导致 dropdown 为空的问题 ([#2265](https://github.com/arco-design/arco-design-vue/pull/2265))
- **select:** 不允许自动创建空字符串条目。含有空字符串的下拉选项，清空时将值设置为 `undefined` ([#2257](https://github.com/arco-design/arco-design-vue/pull/2257))

### 🆎 类型修正

- 更新一些组件的的buttonProps类型 ([#2266](https://github.com/arco-design/arco-design-vue/pull/2266))


## 2.44.2

`2023-03-17`

### 🐛 问题修复

- **form:** 修复 field 属性中对数组格式不支持的问题 ([#2242](https://github.com/arco-design/arco-design-vue/pull/2242))
- **slider:** 修复在 range 模式下 model-value 绑定错误的问题 ([#2241](https://github.com/arco-design/arco-design-vue/pull/2241))
- **tree:** 调整 select 和 update:selectedKeys, check 和 update:checkedKeys 的触发顺序 ([#2228](https://github.com/arco-design/arco-design-vue/pull/2228))
- **divider:** 修复分割线展示错误的问题 ([#2205](https://github.com/arco-design/arco-design-vue/pull/2205))
- **list:** 列表支持后端数据分页 ([#2199](https://github.com/arco-design/arco-design-vue/pull/2199))
- **select:** 下拉选项值支持空字符串 ([#2190](https://github.com/arco-design/arco-design-vue/pull/2190))
- **input:** 修复达到最大值后非输入法状态下无法修改内容问题 ([#2188](https://github.com/arco-design/arco-design-vue/pull/2188))

### 💎 功能优化

- **form:** 增加中文检验信息 ([#2240](https://github.com/arco-design/arco-design-vue/pull/2240))
- 新增越南语`vi-VN` ([#2219](https://github.com/arco-design/arco-design-vue/pull/2219))
- 新增高棉语(柬埔寨) `km-KH` ([#2219](https://github.com/arco-design/arco-design-vue/pull/2219))

### 💅 样式更新

- **calendar:** 修复一些样式问题 ([#2239](https://github.com/arco-design/arco-design-vue/pull/2239))

### 🆎 类型修正

- **upload:** 允许beforeUpload返回布尔值 ([#2204](https://github.com/arco-design/arco-design-vue/pull/2204))
- 修正虚拟列表 ts 定义问题 ([#2168](https://github.com/arco-design/arco-design-vue/pull/2168))


## 2.44.1

`2023-03-10`

### 🐛 问题修复

- **calendar:** 修复内部 import 路径问题


## 2.44.0

`2023-03-10`

### 🆕 新增功能

- **calendar:** 新增日历组件 ([#2217](https://github.com/arco-design/arco-design-vue/pull/2217))


## 2.43.2

`2023-02-24`

### 🐛 问题修复

- **input-number:** 修复禁用状态下显示步长按钮 ([#2169](https://github.com/arco-design/arco-design-vue/pull/2169))
- **form:** 修复 FormItem 的 validateStatus 失效问题 ([#2158](https://github.com/arco-design/arco-design-vue/pull/2158))
- **checkbox:** 修复复选框在取消选择时会保留悬停样式的问题 ([#2124](https://github.com/arco-design/arco-design-vue/pull/2124))

### 💎 功能优化

- **modal:** 添加函数调用的更新方法 ([#2155](https://github.com/arco-design/arco-design-vue/pull/2155))
- **drawer:** 添加函数调用的更新方法 ([#2155](https://github.com/arco-design/arco-design-vue/pull/2155))


## 2.43.1

`2023-02-17`

### 🐛 问题修复

- **date-picker:** 修复因dayjs不支持季度解析导致返回错误的问题 ([#2110](https://github.com/arco-design/arco-design-vue/pull/2110))


## 2.43.0

`2023-02-10`

### 🆕 新增功能

- **select:** 新增 `defaultActiveFirstOption` 属性 ([#2107](https://github.com/arco-design/arco-design-vue/pull/2107))
- **select:** 增加 header 插槽 ([#2099](https://github.com/arco-design/arco-design-vue/pull/2099))
- **dropdown:** 添加hide-on-select属性 ([#2078](https://github.com/arco-design/arco-design-vue/pull/2078))
- **date-picker:** 增加 `disabled-input` 属性，可以禁用键盘输入 ([#2072](https://github.com/arco-design/arco-design-vue/pull/2072))
- **drawer:** 添加 `before-open` 和 `before-close` 事件 ([#2064](https://github.com/arco-design/arco-design-vue/pull/2064))
- **upload:** 新增文件列表额外按钮插槽 `#extra-button` ([#2060](https://github.com/arco-design/arco-design-vue/pull/2060))

### 🐛 问题修复

- **notification:** 修复更新 duration 失效的问题 ([#2106](https://github.com/arco-design/arco-design-vue/pull/2106))
- **tabs:** 无匹配选项卡时，隐藏选项卡指示器 ([#2105](https://github.com/arco-design/arco-design-vue/pull/2105))
- **menu:** 修复热更新问题 ([#2091](https://github.com/arco-design/arco-design-vue/pull/2091))

### 🆎 类型修正

- 更新部分组件 `triggerProps` 的类型 ([#2090](https://github.com/arco-design/arco-design-vue/pull/2090))


## 2.42.1

`2023-02-03`

### 🐛 问题修复

- **scrollbar:** 修复emits 的 ts 声明错误 ([#2077](https://github.com/arco-design/arco-design-vue/pull/2077))
- **slider:** 优化数字输入框无效输入时能够自动修复 ([#1952](https://github.com/arco-design/arco-design-vue/pull/1952))
- **input-number:** 修复当最小/最大值改变时进步按钮不能正确禁用或启用的问题 ([#1777](https://github.com/arco-design/arco-design-vue/pull/1777))


## 2.42.0

`2023-01-13`

### 🆕 新增功能

- **upload:** 增加 `showPreviewButton` 属性 ([#2049](https://github.com/arco-design/arco-design-vue/pull/2049))
- **slider:** 添加show-tooltip属性 ([#2037](https://github.com/arco-design/arco-design-vue/pull/2037))
- **mention:** 增加focus与blur方法 ([#2022](https://github.com/arco-design/arco-design-vue/pull/2022))
- **date-picker:** 增加 blur 事件，可以在表单中支持相应检验 ([#1958](https://github.com/arco-design/arco-design-vue/pull/1958))

### 🐛 问题修复

- **upload:** 修复上传时可能导致删除文件错误的问题 ([#2048](https://github.com/arco-design/arco-design-vue/pull/2048))
- **switch:** 修复类型为`line`时自定义颜色样式错误的问题 ([#2044](https://github.com/arco-design/arco-design-vue/pull/2044))


## 2.41.1

`2023-01-06`

### 🐛 问题修复

- **tabs:** 修复在 `capsule` 类型下滚动异常的问题 ([#2031](https://github.com/arco-design/arco-design-vue/pull/2031))
- **table:** 修复开启 `scroll` 时浏览器缩放后可能出现宽度错误的问题 ([#2028](https://github.com/arco-design/arco-design-vue/pull/2028))
- 修复 ts 不能识别自定义属性的问题 ([#2027](https://github.com/arco-design/arco-design-vue/pull/2027))

### 💎 功能优化

- **icon:** 优化组件 `click` 事件，在组件中进行封装透传 ([#2030](https://github.com/arco-design/arco-design-vue/pull/2030))

### 🆎 类型修正

- **checkbox:** 修复 `value` 值缺少类型的问题 ([#2029](https://github.com/arco-design/arco-design-vue/pull/2029))


## 2.41.0

`2022-12-30`

### 🆕 新增功能

- **upload:** 增加 `upload` 方法 ([#2010](https://github.com/arco-design/arco-design-vue/pull/2010))
- **alert:** 增加 `normal` 类型 ([#2009](https://github.com/arco-design/arco-design-vue/pull/2009))
- **message:** 增加 `normal` 类型 ([#2009](https://github.com/arco-design/arco-design-vue/pull/2009))
- **date-picker:** `date-picker` 支持 `prefix` 插槽。 ([#1997](https://github.com/arco-design/arco-design-vue/pull/1997))
- **time-picker:** `time-picker` 支持 `prefix` 插槽。 ([#1997](https://github.com/arco-design/arco-design-vue/pull/1997))
- **form:** `form-item` 支持 tooltip 属性 ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))
- **form:** `form-item` 支持 asteriskPosition 属性 ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))
- 增加西班牙语 ([#2008](https://github.com/arco-design/arco-design-vue/pull/2008))
- 增加 印度尼西亚语， 法语（法国）， 德语（德国）， 韩语， 意大利语(意大利)，马来语（马来西亚），泰语语言文件。 ([#2011](https://github.com/arco-design/arco-design-vue/pull/2011))

### 🐛 问题修复

- **mention:** 修复 textarea 模式下回车键失效的问题 ([#2013](https://github.com/arco-design/arco-design-vue/pull/2013))
- **upload:** 修复 `upload` 组件在部分场景下验证上传文件符合 `accept` 格式时，判断错误的 bug。 ([#2007](https://github.com/arco-design/arco-design-vue/pull/2007))
- **typography:** 修复父容器设置`white-space: nowrap`时 ellipsis 失效 ([#1995](https://github.com/arco-design/arco-design-vue/pull/1995))
- **image:** 修复 `imageId` 可能未收集导致预览出错的 bug ([#1992](https://github.com/arco-design/arco-design-vue/pull/1992))
- **input:** 修复自定义计算字符长度不会被 `max-length` 限制的问题 ([#1942](https://github.com/arco-design/arco-design-vue/pull/1942))
- **checkbox:** `modevalue` 不是数组时设置为空数组 ([#1940](https://github.com/arco-design/arco-design-vue/pull/1940))
- **table:** 修复仅 `operations` 列固定的情况下没有阴影的问题 ([#1938](https://github.com/arco-design/arco-design-vue/pull/1938))

### 💅 样式更新

- **select:** 统一 `select` 组件单选和多选时后缀图标为 `arrow-icon`。 ([#2005](https://github.com/arco-design/arco-design-vue/pull/2005))


## 2.40.1

`2022-12-23`

### 🐛 问题修复

- **input:** 修复 `change` 事件触发逻辑问题 ([#1990](https://github.com/arco-design/arco-design-vue/pull/1990))
- **switch:** 修复switch组件type为line,size为small,checked状态圆点偏移不正确 ([#1975](https://github.com/arco-design/arco-design-vue/pull/1975))
- **list:** 修复栅格列表模式出现滚动条的问题 ([#1970](https://github.com/arco-design/arco-design-vue/pull/1970))
- **date-picker:** 修复在国际化下面板文案显示错误的问题 ([#1965](https://github.com/arco-design/arco-design-vue/pull/1965))

### 💅 样式更新

- **tabs:** 修复 `rounded` 和 `capsule` 类型下 `size` 不生效的问题 ([#1988](https://github.com/arco-design/arco-design-vue/pull/1988))


## 2.40.0

`2022-12-09`

### 🆕 新增功能

- **scrollbar:** 增加 scrollLeft 和 scrollTop 方法 ([#1909](https://github.com/arco-design/arco-design-vue/pull/1909))
- **table:** change 事件增加当前数据参数 ([#1893](https://github.com/arco-design/arco-design-vue/pull/1893))
- **avatar:** 增加 image-url 属性，支持使用图片地址 ([#1810](https://github.com/arco-design/arco-design-vue/pull/1810))
- **auto-complete:** 增加 focus 和 blur 方法 ([#1809](https://github.com/arco-design/arco-design-vue/pull/1809))

### 🐛 问题修复

- **date-picker:** 修复 `Form` 组件的 `feedback` 属性在  `date-picker` 组件不生效的 bug。 ([#1932](https://github.com/arco-design/arco-design-vue/pull/1932))
- **list:** 修复 scrollbar 属性传递虚拟滚动条属性时失效的问题 ([#1929](https://github.com/arco-design/arco-design-vue/pull/1929))
- **form:** 修复 `Form` 组件的 `validate-status` 属性在 `date-picker` 组件不生效的 bug。 ([#1928](https://github.com/arco-design/arco-design-vue/pull/1928))


## 2.39.2

`2022-12-02`

### 🐛 问题修复

- **table:** 修复 thead 在某些情况下会出现纵向滚动条的问题 ([#1913](https://github.com/arco-design/arco-design-vue/pull/1913))
- **input:** 修复 change 事件触发问题，以及 clear 清除问题 ([#1912](https://github.com/arco-design/arco-design-vue/pull/1912))
- **divider:** 修复设置 size 时，样式错误的问题 ([#1905](https://github.com/arco-design/arco-design-vue/pull/1905))
- **carousel:** 修复 `Carousel` 透明背景图片无法遮罩上一张图片的问题 ([#1901](https://github.com/arco-design/arco-design-vue/pull/1901))


## 2.39.1

`2022-11-25`

### 🐛 问题修复

- 修复日文语言包缺失某些属性的问题 ([#1890](https://github.com/arco-design/arco-design-vue/pull/1890))
- **pagination:** 修复 pages 变小时，可能会出现页码超出页数的问题 ([#1879](https://github.com/arco-design/arco-design-vue/pull/1879))

### 🆎 类型修正

- **tree-select:** 更新trigger-props的类型 ([#1885](https://github.com/arco-design/arco-design-vue/pull/1885))


## 2.39.0

`2022-11-18`

### 🆕 新增功能

- **transfer:** 新增面板插槽，允许自定义内容 ([#1873](https://github.com/arco-design/arco-design-vue/pull/1873))
- **transfer:** 内部替换为虚拟滚动条 ([#1873](https://github.com/arco-design/arco-design-vue/pull/1873))
- **tree-select:** 替换虚拟滚动条组件，增加 scrollbar 属性 ([#1872](https://github.com/arco-design/arco-design-vue/pull/1872))
- **transfer:** 可以隐藏全选勾选框 ([#1845](https://github.com/arco-design/arco-design-vue/pull/1845))
- **message:** 增加 `resetOnHover` 属性，在鼠标移入时暂停并重新计时 ([#1841](https://github.com/arco-design/arco-design-vue/pull/1841))

### 🐛 问题修复

- **space:** 修复分隔符间距 ([#1864](https://github.com/arco-design/arco-design-vue/pull/1864))
- **switch:** 修复状态改变前钩子的值 ([#1859](https://github.com/arco-design/arco-design-vue/pull/1859))
- **switch:** 修复样式 token 问题 ([#1859](https://github.com/arco-design/arco-design-vue/pull/1859))
- **date-picker:** 修复选择年范围时无法跳转10年 ([#1847](https://github.com/arco-design/arco-design-vue/pull/1847))

### 💎 功能优化

- **upload:** 添加一些常见的文件类型 ([#1857](https://github.com/arco-design/arco-design-vue/pull/1857))


## 2.38.3

`2022-11-11`

### 🐛 问题修复

- **table:** 修复某些场景下自定义表格元素时会出现警告的问题


## 2.38.2

`2022-11-09`

### 🐛 问题修复

- **table:** 修复行选择器状态错误的问题 ([#1849](https://github.com/arco-design/arco-design-vue/pull/1849))


## 2.38.1

`2022-11-04`

### 🐛 问题修复

- **input-tag:** 修复删除键会删除不可用选项的问题 ([#1836](https://github.com/arco-design/arco-design-vue/pull/1836))
- 修复虚拟列表的一些问题 ([#1834](https://github.com/arco-design/arco-design-vue/pull/1834))
- **slider:** 修复滑动输入条设置最小值起始位置错误 ([#1826](https://github.com/arco-design/arco-design-vue/pull/1826))
- **pagination:** 修复 jumper 提示警告的问题 ([#1822](https://github.com/arco-design/arco-design-vue/pull/1822))
- **input:** 修复某些场景下组件光标报错的问题 ([#1820](https://github.com/arco-design/arco-design-vue/pull/1820))
- **date-picker:** 修复内部属性错误问题 ([#1818](https://github.com/arco-design/arco-design-vue/pull/1818))
- **radio:** 修复 `radio-group` 重置值时状态没有重置的问题 ([#1813](https://github.com/arco-design/arco-design-vue/pull/1813))
- **table:** 修复rowClass为函数时的参数 ([#1812](https://github.com/arco-design/arco-design-vue/pull/1812))

### 💎 功能优化

- **icon:** 替换飞书图标 ([#1835](https://github.com/arco-design/arco-design-vue/pull/1835))


## 2.38.0

`2022-10-28`

### 🆕 新增功能

- **space:** 增加`split`插槽 ([#1774](https://github.com/arco-design/arco-design-vue/pull/1774))

### 🐛 问题修复

- **select:** 修复 formatLabel 在无数据时报错的问题 ([#1797](https://github.com/arco-design/arco-design-vue/pull/1797))
- **modal:** 修复自定义 style 时 z-index 不能生效的问题 ([#1796](https://github.com/arco-design/arco-design-vue/pull/1796))
- **radio:** 修复清除 model-value 时状态未清除的问题 ([#1794](https://github.com/arco-design/arco-design-vue/pull/1794))
- **checkbox:** 修复清除 model-value 时状态未清除的问题 ([#1794](https://github.com/arco-design/arco-design-vue/pull/1794))
- **form:** 不修改规则原始对象数据 ([#1779](https://github.com/arco-design/arco-design-vue/pull/1779))
- **modal:** 修复函数式调用中关闭未卸载内部组件的问题 ([#1778](https://github.com/arco-design/arco-design-vue/pull/1778))
- **drawer:** 修复函数式调用中关闭未卸载内部组件的问题 ([#1778](https://github.com/arco-design/arco-design-vue/pull/1778))

### 💅 样式更新

- **table:** 修复暗黑模式下 stripe 样式问题 ([#1795](https://github.com/arco-design/arco-design-vue/pull/1795))

### 🆎 类型修正

- 添加实例类型导出 ([#1782](https://github.com/arco-design/arco-design-vue/pull/1782))


## 2.38.0-beta.2

`2022-10-21`

### 🐛 问题修复

- **date-picker:** 修复在 safari 下 disabled 样式错误的问题 ([#1770](https://github.com/arco-design/arco-design-vue/pull/1770))
- **trigger:** 修复在 windows 中 arrow 定位错误的问题 ([#1480](https://github.com/arco-design/arco-design-vue/pull/1480))
- **modal:** 修复函数式调用下，传入子组件不会触发卸载的问题

### 💎 功能优化

- **cascader:** 优化多选时的子菜单全部禁用时，父级禁止选择 ([#1771](https://github.com/arco-design/arco-design-vue/pull/1771))
- **progress:** 优化分割点的展示逻辑 ([#1755](https://github.com/arco-design/arco-design-vue/pull/1755))
- **pagination:** 优化输入页码时的数字处理 ([#1750](https://github.com/arco-design/arco-design-vue/pull/1750))


## 2.38.0-beta.1

`2022-10-14`

### 🆕 新增功能

- table、select、list 组件增加 scrollbar 属性，支持开关虚拟滚动条 ([#1747](https://github.com/arco-design/arco-design-vue/pull/1747))
- **notification:** 提示框和提示框列表间隔样式调整 ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** `showIcon` 属性无效 ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** 支持自定义关闭按钮和元素 ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** 支持自定义样式 ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** 删除对应 `id` 的提示框 ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** 使用案例 ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **descriptions:** 描述中表格样式的 `layout-fixed`，当设置成 `fixed` 时，宽度会均分 ([#1670](https://github.com/arco-design/arco-design-vue/pull/1670))

### 🐛 问题修复

- **transfer:** 修复无法滚动问题 ([#1723](https://github.com/arco-design/arco-design-vue/pull/1723))
- **spin:** 修复 size 在失效的问题 ([#1717](https://github.com/arco-design/arco-design-vue/pull/1717))

### 💎 功能优化

- **select:** 增加已选择项的缓存，优化在远程搜索时的 label 显示问题 ([#1731](https://github.com/arco-design/arco-design-vue/pull/1731))
- **modal:** 函数式调用可以设置 renderToBody 参数 ([#1682](https://github.com/arco-design/arco-design-vue/pull/1682))

### 💅 样式更新

- **table:** 修复表格同时开启总结行和滚动时，总结行高度被压缩的问题 ([#1733](https://github.com/arco-design/arco-design-vue/pull/1733))

### 🆎 类型修正

- **collapse:** 修复 `collapse-item` 的 key 属性定义，允许 number ([#1743](https://github.com/arco-design/arco-design-vue/pull/1743))


## 2.37.4

`2022-09-30`

### 🐛 问题修复

- **table:** 修复 default sorter&filters 在模板用法下失效的问题 ([#1707](https://github.com/arco-design/arco-design-vue/pull/1707))
- 修复弹出层叠顺序 ([#1659](https://github.com/arco-design/arco-design-vue/pull/1659))

### 💎 功能优化

- **button:** 使用 flex 布局方式，解决 icon 大小不一致时的居中问题 ([#1702](https://github.com/arco-design/arco-design-vue/pull/1702))
- **link:** 使用 flex 布局方式，解决 icon 大小不一致时的居中问题 ([#1702](https://github.com/arco-design/arco-design-vue/pull/1702))
- **modal:** 修复对话框关闭的问题 ([#1696](https://github.com/arco-design/arco-design-vue/pull/1696))
- **drawer:** 修复抽屉关闭的问题 ([#1696](https://github.com/arco-design/arco-design-vue/pull/1696))

### 💅 样式更新

- **tabs:** 修复 `card` 类型下标签内容没有居中的问题 ([#1704](https://github.com/arco-design/arco-design-vue/pull/1704))
- **select:** 修复自定义标签颜色显示错误的问题 ([#1703](https://github.com/arco-design/arco-design-vue/pull/1703))
- **collapse:** 当expand-icon在右侧时,调整collapse-item-content的padding ([#1680](https://github.com/arco-design/arco-design-vue/pull/1680))


## 2.37.3

`2022-09-23`

### 🐛 问题修复

- **table:** 修复内容变化后tooltip不显示的问题 ([#1662](https://github.com/arco-design/arco-design-vue/pull/1662))

### 💎 功能优化

- **empty:** 优化自定义显示优先级，image 插槽高于全局 empty 插槽 ([#1673](https://github.com/arco-design/arco-design-vue/pull/1673))
- **input:** 优化最大限制时不再可以从中间输入内容 ([#1672](https://github.com/arco-design/arco-design-vue/pull/1672))
- **image:** actionsLayout为空时不显示操作栏 ([#1668](https://github.com/arco-design/arco-design-vue/pull/1668))
- **overflow-list:** 溢出数量改变事件 ([#1287](https://github.com/arco-design/arco-design-vue/pull/1287))

### 🆎 类型修正

- **table:** 修复 TableRowSelection 类型声明 ([#1667](https://github.com/arco-design/arco-design-vue/pull/1667))
- **icon:** 增加 Icon 相关类型声明 ([#1619](https://github.com/arco-design/arco-design-vue/pull/1619))


## 2.37.2

`2022-09-21`

### 🐛 问题修复

- **list:** 修复加载更多使用中滚动条高度的问题 ([#1658](https://github.com/arco-design/arco-design-vue/pull/1658))
- 修复内置虚拟滚动条的组件按需加载时丢失样式的问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **scrollbar:** 修复在 Firefox 下的样式问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **table:** 修复 scroll 属性中 maxHeight 导致虚拟滚动条样式错误问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **select:** 修复键盘交互中下拉菜单没有跟随滚动的问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **select:** 修复内置虚拟滚动条部分情况下报错的问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))

### 💎 功能优化

- 组件 onBeforeOk 属性的返回值 `Promise<void>` 与 `done()`方法默认行为调整为成功 ([#1650](https://github.com/arco-design/arco-design-vue/pull/1650))


## 2.37.1

`2022-09-16`

### 🆕 新增功能

- **overflow-list:** 新增 `OverflowList` 组件 ([#1634](https://github.com/arco-design/arco-design-vue/pull/1634))
- **scrollbar:** 增加虚拟滚动条组件 ([#1634](https://github.com/arco-design/arco-design-vue/pull/1634))
- **scrollbar:** table、select、list、cascader、dropdown 组件替换虚拟滚动条 ([#1634](https://github.com/arco-design/arco-design-vue/pull/1634))


## 2.37.0

`2022-09-16`

### 🆕 新增功能

- **typography:** 省略模式增加支持 CSS 方式（实验性） ([#1635](https://github.com/arco-design/arco-design-vue/pull/1635))
- **switch:** 支持 `beforeChange` 切换事件拦截 ([#1626](https://github.com/arco-design/arco-design-vue/pull/1626))
- **link:** 添加加载中状态属性 ([#1616](https://github.com/arco-design/arco-design-vue/pull/1616))

### 💎 功能优化

- **list:** 支持响应式网格布局参数 ([#1625](https://github.com/arco-design/arco-design-vue/pull/1625))


## 2.36.1

`2022-09-09`

### 🐛 问题修复

- **select:** 修复 option 插槽参数错误的问题 ([#1607](https://github.com/arco-design/arco-design-vue/pull/1607))

### 💎 功能优化

- **modal:** on-before-ok 属性支持函数返回 Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))
- **drawer:** on-before-ok 属性支持函数返回 Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))
- **popconfirm:** on-before-ok 属性支持函数返回 Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))
- **dropdown:** 选项禁用时不触发单击事件 ([#1611](https://github.com/arco-design/arco-design-vue/pull/1611))

### 🆎 类型修正

- 增加 `virtual-list` 接口和使用说明 ([#1614](https://github.com/arco-design/arco-design-vue/pull/1614))


## 2.36.0

`2022-09-02`

### 🆕 新增功能

- **image:** hideFooter 增加新参数，支持错误状态下展示 footer ([#1595](https://github.com/arco-design/arco-design-vue/pull/1595))
- **breadcrumb:** 增加 customUrl 属性 ([#1594](https://github.com/arco-design/arco-design-vue/pull/1594))
- **table:** 新增自定义类名相关属性 ([#1580](https://github.com/arco-design/arco-design-vue/pull/1580))
- 增加`繁体中文（中国台湾）`支持 ([#1551](https://github.com/arco-design/arco-design-vue/pull/1551))
- 增加`葡萄牙语（葡萄牙）`支持 ([#1551](https://github.com/arco-design/arco-design-vue/pull/1551))
- **alert:** 支持自定义关闭元素 ([#1544](https://github.com/arco-design/arco-design-vue/pull/1544))
- **checkbox:** 新增 max 属性，支持设置最多可被勾选的项目数 ([#1540](https://github.com/arco-design/arco-design-vue/pull/1540))
- **image:** 增加 fit 属性 ([#1534](https://github.com/arco-design/arco-design-vue/pull/1534))
- **breadcrumb:** 支持 separator  属性 ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **breadcrumb:** 支持 routes  属性 ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **breadcrumb:** 支持 more-icon  插槽 ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **breadcrumb:** `breadcrumb-item` 支持 droplist  属性和插槽 ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **page-header:** 支持自定义返回按钮 ([#1499](https://github.com/arco-design/arco-design-vue/pull/1499))

### 💎 功能优化

- **table:** 扩展 key 的类型 ([#1580](https://github.com/arco-design/arco-design-vue/pull/1580))
- **input:** 修改密码输入框图标 ([#1436](https://github.com/arco-design/arco-design-vue/pull/1436))

### 🆎 类型修正

- 增加 dropdown 和 breadcrumb 组件中类型的导出 ([#1594](https://github.com/arco-design/arco-design-vue/pull/1594))
- **layout:** 增加 ts 类型导出 ([#1571](https://github.com/arco-design/arco-design-vue/pull/1571))


## 2.35.3

`2022-08-31`

### 🐛 问题修复

- 修复 icon 类组件新属性未生效的问题


## 2.35.2

`2022-08-29`

### 🐛 问题修复

- **date-picker:** 修复部分模式下选择面板年月选择时单击选择事件异常 ([#1562](https://github.com/arco-design/arco-design-vue/pull/1562))

### 💎 功能优化

- **date-picker:** 优化范围选择器在选择时也会修正顺序 ([#1578](https://github.com/arco-design/arco-design-vue/pull/1578))
- 组件库内部 matchMedia 方法调整兼容 Safari 13 ([#1576](https://github.com/arco-design/arco-design-vue/pull/1576))

### 💅 样式更新

- **pagination:** 修复显示内容被压缩的问题 ([#1579](https://github.com/arco-design/arco-design-vue/pull/1579))
- **image:** 修复预览模式下关闭按钮图标位置错误的问题 ([#1577](https://github.com/arco-design/arco-design-vue/pull/1577))


## 2.35.1

`2022-08-19`

### 🐛 问题修复

- **spin:** 修复 fixed-column 的 z-index 提高导致的 spin 问题 ([#1533](https://github.com/arco-design/arco-design-vue/pull/1533))
- **time-picker:** 修复 time-picker 中 size 属性的默认值问题 ([#1513](https://github.com/arco-design/arco-design-vue/pull/1513))

### 💎 功能优化

- **trigger:** 优化在 KeepAlive 下使用的问题，缓存时关闭弹出层 ([#1529](https://github.com/arco-design/arco-design-vue/pull/1529))
- **button:** 当状态为 loading 或 disabled 时点击不会触发默认事件 ([#1516](https://github.com/arco-design/arco-design-vue/pull/1516))


## 2.35.0

`2022-08-12`

### 🆕 新增功能

- **icon:** 支持旋转属性 ([#1490](https://github.com/arco-design/arco-design-vue/pull/1490))
- **icon:** 图标列表支持类型筛选和名称搜索 ([#1490](https://github.com/arco-design/arco-design-vue/pull/1490))
- **divider:** 分割线宽度及样式设置 ([#1473](https://github.com/arco-design/arco-design-vue/pull/1473))
- **divider:** 分割线边距设置 ([#1473](https://github.com/arco-design/arco-design-vue/pull/1473))
- **date-picker:** 增加范围选择器头部点击与基础选择器月份点击至年份功能 ([#1421](https://github.com/arco-design/arco-design-vue/pull/1421))

### 💅 样式更新

- **table:** 调整固定列的 zIndex ([#1479](https://github.com/arco-design/arco-design-vue/pull/1479))


## 2.34.1

`2022-08-05`

### 🐛 问题修复

- **upload:** 修复设置 `accept=*` 时失效的问题 ([#1488](https://github.com/arco-design/arco-design-vue/pull/1488))
- **menu:** 修复新版本 Chrome 中 popup 属性导致警告的问题 ([#1487](https://github.com/arco-design/arco-design-vue/pull/1487))

### 💎 功能优化

- 重构虚拟列表组件，修复功能问题 ([#1444](https://github.com/arco-design/arco-design-vue/pull/1444))

### 💅 样式更新

- **cascader:** 修复下拉面板为空时的样式问题 ([#1483](https://github.com/arco-design/arco-design-vue/pull/1483))


## 2.34.0

`2022-07-29`

### 🆕 新增功能

- **tree:** 给 slot 添加节点状态信息 ([#1469](https://github.com/arco-design/arco-design-vue/pull/1469))
- **pagination:** 增加 autoAdjust 属性 ([#1466](https://github.com/arco-design/arco-design-vue/pull/1466))
- **tabs:** 增加 trigger 属性，支持更改切换方式 ([#1456](https://github.com/arco-design/arco-design-vue/pull/1456))
- **auto-complete:** 增加`footer`插槽 ([#1445](https://github.com/arco-design/arco-design-vue/pull/1445))
- **dropdown:** 为icon插槽加入新的prop:  `popup-visible` ([#1430](https://github.com/arco-design/arco-design-vue/pull/1430))
- **drawer:** 添加函数调用 ([#1409](https://github.com/arco-design/arco-design-vue/pull/1409))

### 🐛 问题修复

- **timeline:** 修复时间线使用 v-if 时计算错误的问题 ([#1467](https://github.com/arco-design/arco-design-vue/pull/1467))

### 💎 功能优化

- **table:** columns 支持 reactive 类型的更新 ([#1470](https://github.com/arco-design/arco-design-vue/pull/1470))
- **table:** rowClass 支持函数类型的值 ([#1453](https://github.com/arco-design/arco-design-vue/pull/1453))
- **transfer:** item 插槽增加 value 属性 ([#1447](https://github.com/arco-design/arco-design-vue/pull/1447))
- **modal:** 支持在函数调用中隐藏页脚 ([#1410](https://github.com/arco-design/arco-design-vue/pull/1410))
- **input-number:** 支持`read-only`属性 ([#1408](https://github.com/arco-design/arco-design-vue/pull/1408))


## 2.33.1

`2022-07-22`

### 🐛 问题修复

- **input-tag:** 修复设置 max-tag-count 后，remove 事件中 value 参数错误的问题 ([#1442](https://github.com/arco-design/arco-design-vue/pull/1442))
- **cascader:** 修复搜索下拉菜单的横向滚动条位置错误问题 ([#1438](https://github.com/arco-design/arco-design-vue/pull/1438))
- **cascader:** 修复搜索模式下，输入内容后不能使用光标的问题 ([#1438](https://github.com/arco-design/arco-design-vue/pull/1438))
- **form:** 修复 form-item 内容可能超出限制宽度的问题 ([#1437](https://github.com/arco-design/arco-design-vue/pull/1437))
- **modal:** 修复默认标题类名错误的问题 ([#1413](https://github.com/arco-design/arco-design-vue/pull/1413))
- **typography:** 后缀 icon 点击事件取消冒泡 ([#1411](https://github.com/arco-design/arco-design-vue/pull/1411))

### 💎 功能优化

- **table:** 单独设置 selected-keys 时可以显示选中行 ([#1440](https://github.com/arco-design/arco-design-vue/pull/1440))


## 2.33.0

`2022-07-08`

### 🆕 新增功能

- **drawer:** 添加 header 属性和插槽 ([#1399](https://github.com/arco-design/arco-design-vue/pull/1399))
- **collapse:** 支持自定义展开图标 ([#1344](https://github.com/arco-design/arco-design-vue/pull/1344))
- **tag:** 支持 `bordered` 显示边框 ([#1342](https://github.com/arco-design/arco-design-vue/pull/1342))

### 🐛 问题修复

- **date-picker:** 修复 readonly 模式下仍可打开下拉菜单和清除选项的问题 ([#1400](https://github.com/arco-design/arco-design-vue/pull/1400))
- **upload:** 修复在阿里云OSS中的使用问题 ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))
- **tree:** 修复子树展开动画中为处理过滤数据的问题 ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))
- **tree:** 修复设置 defaultExpandSelected 失效的问题 ([#1362](https://github.com/arco-design/arco-design-vue/pull/1362))

### 💅 样式更新

- **tabs:** 修复聚焦时样式错误的问题 ([#1398](https://github.com/arco-design/arco-design-vue/pull/1398))
- **modal:** 修复 footer 按钮不居中的问题 ([#1391](https://github.com/arco-design/arco-design-vue/pull/1391))
- **upload:** 移除了 upload-list-item 末尾的多余空白 ([#1379](https://github.com/arco-design/arco-design-vue/pull/1379))


## 2.32.1

`2022-07-01`

### 🐛 问题修复

- **table:** 修复文本提示没有跟随内容更新的问题 ([#1373](https://github.com/arco-design/arco-design-vue/pull/1373))
- **select:** 修复在火狐浏览器下搜索模式的点击展开问题 ([#1371](https://github.com/arco-design/arco-design-vue/pull/1371))
- **tree-select:** 修复 `modelValue` 为 0 时, 导致状态不被选中 ([#1370](https://github.com/arco-design/arco-design-vue/pull/1370))
- **input-number:** 修复设定精度后会省略 '0' 的问题 ([#1368](https://github.com/arco-design/arco-design-vue/pull/1368))

### 💅 样式更新

- **popconfirm:** 修复不同类型下图标默认黑色的问题 ([#1366](https://github.com/arco-design/arco-design-vue/pull/1366))


## 2.32.0

`2022-06-24`

### 🆕 新增功能

- **typography:** 新增 `tooltip-props` 类属性 ([#1338](https://github.com/arco-design/arco-design-vue/pull/1338))
- **table:** TableRowSelection 增加 onlyCurrent 属性，更改表格默认维护所有分页的选择状态 ([#1334](https://github.com/arco-design/arco-design-vue/pull/1334))
- **statistic:** 支持自定义显示值样式 ([#1320](https://github.com/arco-design/arco-design-vue/pull/1320))

### 🐛 问题修复

- **modal:** 修复当模态框超出屏幕大小后，移动位置导致错位的问题 ([#1336](https://github.com/arco-design/arco-design-vue/pull/1336))
- **input-tag:** 修复中文输入法时报错问题 ([#1335](https://github.com/arco-design/arco-design-vue/pull/1335))
- **tree:** 修复点击半选状态的节点显示错误的问题 ([#1331](https://github.com/arco-design/arco-design-vue/pull/1331))
- **input-number:** 修复在表单以外清除时的错误 ([#1329](https://github.com/arco-design/arco-design-vue/pull/1329))

### 💎 功能优化

- **trigger:** 弹出层动画期间不再可以触发事件 ([#1337](https://github.com/arco-design/arco-design-vue/pull/1337))
- **table:** cellStyle 类属性添加的样式移动到 td 元素上，解决部分场景下背景色问题 ([#1334](https://github.com/arco-design/arco-design-vue/pull/1334))

### 💅 样式更新

- **tag:** 火狐浏览器溢出样式兼容 ([#1317](https://github.com/arco-design/arco-design-vue/pull/1317))


## 2.31.0

`2022-06-17`

### 🆕 新增功能

- **form:** resetFields 和  clearValidate 方法增加参数支持 ([#1305](https://github.com/arco-design/arco-design-vue/pull/1305))
- **table:** 增加新的组件方法，详情可见文档 ([#1304](https://github.com/arco-design/arco-design-vue/pull/1304))
- **table:** titleSlotName 定义的插槽增加 column 参数 ([#1304](https://github.com/arco-design/arco-design-vue/pull/1304))
- **modal:** 增加 bodyClass 和 bodyStyle ([#1303](https://github.com/arco-design/arco-design-vue/pull/1303))

### 🐛 问题修复

- 修复虚拟滚动条 `scrollIntoView` 定位错误的问题 ([#1301](https://github.com/arco-design/arco-design-vue/pull/1301))
- **menu:** 修复横向菜单收起后无法展开的问题 ([#1297](https://github.com/arco-design/arco-design-vue/pull/1297))


## 2.30.2

`2022-06-11`

### 🐛 问题修复

- **table:** 修复 align='left' 时表头居中的问题 ([#1278](https://github.com/arco-design/arco-design-vue/pull/1278))

### 💎 功能优化

- **table:** 无展开按钮时不再显示缩进 ([#1278](https://github.com/arco-design/arco-design-vue/pull/1278))


## 2.30.1

`2022-06-10`

### 💅 样式更新

- **space:** 仅在横向模式使用 flex 布局的 item ([#1277](https://github.com/arco-design/arco-design-vue/pull/1277))


## 2.30.0

`2022-06-10`

### ⚠️ 重点注意

- **table:** 由于功能需要，`arco-table-cell` 改为 flex 布局，且在表格内容外新增 `arco-table-td-content`  包裹层，如有自定义样式请留意 DOM 结构的改变 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 🆕 新增功能

- **table:** 增加 `sticky-header` 表头吸顶功能 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))
- **table:** 表格列配置增加 `summaryCellStyle` 属性 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 🐛 问题修复

- **select:** 修复远程搜索与 fieldNames 同时使用，没有显示选项的问题 ([#1271](https://github.com/arco-design/arco-design-vue/pull/1271))
- **input:** 修复在输入法后不会触发 form 校验的问题 ([#1263](https://github.com/arco-design/arco-design-vue/pull/1263))
- **input:** 修复在 Drawer 中使用带前后置标签产生的高度问题 ([#1263](https://github.com/arco-design/arco-design-vue/pull/1263))
- **modal:** 在组件卸载时重置 overflow 设置 ([#1262](https://github.com/arco-design/arco-design-vue/pull/1262))
- **table:** 修复树型数据时文字省略错误的问题 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))
- **table:** 修复分组表头与固定列同时使用出现的问题 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 💎 功能优化

- **tabs:** 增加 focus 样式和键盘事件 ([#1264](https://github.com/arco-design/arco-design-vue/pull/1264))
- **table:** 支持虚拟列表和固定列同时使用 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 💅 样式更新

- **select:** 修复在选项 label 为空时，选择框塌陷的问题 ([#1274](https://github.com/arco-design/arco-design-vue/pull/1274))
- **space:** space-item 修改为 flex 布局，解决行内元素垂直居中问题 ([#1273](https://github.com/arco-design/arco-design-vue/pull/1273))
- **table:** 修复横向滚动阴影问题 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))


## 2.29.1

`2022-06-02`

### 🐛 问题修复

- **list:** 修复在某些情况下 reachBottom 不会触发的问题 ([#1228](https://github.com/arco-design/arco-design-vue/pull/1228))
- **mention:** 修复按需加载时丢失 textarea 样式的问题 ([#1227](https://github.com/arco-design/arco-design-vue/pull/1227))
- **space:** 修复子组件使用 key 失效的问题 ([#1223](https://github.com/arco-design/arco-design-vue/pull/1223))
- **cascader:** 修复使用 number 类型的 value 匹配失败的问题 ([#1230](https://github.com/arco-design/arco-design-vue/pull/1230))

### 💎 功能优化

- 虚拟列表减少没必要的高度计算，防止抖动 ([#1233](https://github.com/arco-design/arco-design-vue/pull/1233))
- **tree-select:** 搜索模式下组件失焦后会默认清空输入值 ([#1232](https://github.com/arco-design/arco-design-vue/pull/1232))
- **input-tag:** 失焦时会默认清空输入值 ([#1232](https://github.com/arco-design/arco-design-vue/pull/1232))
- **trigger:** 不再默认阻止右键默认事件 ([#1231](https://github.com/arco-design/arco-design-vue/pull/1231))
- **cascader:** cascader-panel 增加键盘事件 ([#1230](https://github.com/arco-design/arco-design-vue/pull/1230))
- **button:** 增加 focus 样式 ([#1229](https://github.com/arco-design/arco-design-vue/pull/1229))
- **input-number:** 增加键盘事件，聚焦时显示步进按钮 ([#1224](https://github.com/arco-design/arco-design-vue/pull/1224))


## 2.29.0

`2022-05-27`

### ⚠️ 重点注意

- **cascader:** 外露参数从 CascaderOptionInfo 改为 CascaderOption。不再包含内部数据，用户数据不受影响 ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))

### 🆕 新增功能

- **tree-select:** 默认支持通过标签删除已选项 ([#1206](https://github.com/arco-design/arco-design-vue/pull/1206))
- **dropdown:** 增加 `popup-max-height` 属性 ([#1203](https://github.com/arco-design/arco-design-vue/pull/1203))
- **dropdown:** 子菜单增加 `option-props` 和 icon 插槽 ([#1203](https://github.com/arco-design/arco-design-vue/pull/1203))
- **table:** 行选择器增加非严格模式支持（级联控制） ([#1202](https://github.com/arco-design/arco-design-vue/pull/1202))
- **table:** 列属性增加 headerCellStyle 和 bodyCellStyle ([#1202](https://github.com/arco-design/arco-design-vue/pull/1202))
- **cascader:** 选项 value 支持对象格式，增加 `value-key` 属性 ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **cascader:** 增加 `fallback` 属性，可以自定义不存在选项的展示 ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **cascader:** 增加 `expand-child` 属性，可以展开子菜单 ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **date-picker:** 新增属性 `show-confirm-btn` 用于自定义是否显示确认按钮 ([#1198](https://github.com/arco-design/arco-design-vue/pull/1198))

### 🐛 问题修复

- **tree-select:** 修复设置了 field-names 后拖拽失效的问题 ([#1207](https://github.com/arco-design/arco-design-vue/pull/1207))
- **mention:** 修复 textarea 模式下输入后光标移动的问题 ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))
- **input-number:** 修复 clear 没有触发 form 校验的问题 ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))
- **select:** 修复 inputValue 受控失效的问题 ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))

### 💎 功能优化

- **cascader:** 优化子菜单展开逻辑和键盘事件 ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **date-picker:** 拼接时间的时候只更新日期 ([#1199](https://github.com/arco-design/arco-design-vue/pull/1199))
- 组件增加无障碍化 ARIA 属性 ([#1196](https://github.com/arco-design/arco-design-vue/pull/1196))


## 2.28.0

`2022-05-20`

### ⚠️ 重点注意

- 本版本对组件事件类型进行了修正，可能会出现 TS 警告，可根据提示信息修正类型

### 🆕 新增功能

- **config-provider:** 增加 `empty` 和 `loading` 插槽 ([#1180](https://github.com/arco-design/arco-design-vue/pull/1180))
- **statistic:** 增加 `placeholder` 属性，用于无值时显示 ([#1179](https://github.com/arco-design/arco-design-vue/pull/1179))
- **table:** `expand ` 和 `select ` 事件增加 record 参数 ([#1178](https://github.com/arco-design/arco-design-vue/pull/1178))
- **table:** 新增 `columnResize`  事件 ([#1178](https://github.com/arco-design/arco-design-vue/pull/1178))
- **date-picker:** 新增属性 `preview-shortcut` 用于自定义是否要预览快捷选项的结果 ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))

### 🐛 问题修复

- **cascader:** 修复懒加载情况下，多选状态显示错误的问题 ([#1177](https://github.com/arco-design/arco-design-vue/pull/1177))
- **cascader:** 修复点击选择框时，多次调用懒加载函数的问题 ([#1177](https://github.com/arco-design/arco-design-vue/pull/1177))
- **date-picker:** `选择时间`没有国际化 ([#1173](https://github.com/arco-design/arco-design-vue/pull/1173))

### 💎 功能优化

- **date-picker:** 移出 `shortcut` 的时候重置回已选值 ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))

### 💅 样式更新

- **textarea:** 修复设置高度样式后，文本框的显示问题 ([#1176](https://github.com/arco-design/arco-design-vue/pull/1176))

### 🆎 类型修正

- 修正全部组件事件相关 TS 类型 ([#1160](https://github.com/arco-design/arco-design-vue/pull/1160))


## 2.27.1

`2022-05-16`

### 🐛 问题修复

- **select:** 修复使用 options 属性时，分组选项不能选择的问题 ([#1141](https://github.com/arco-design/arco-design-vue/pull/1141))

### 🆎 类型修正

- 修复部分组件 ts 错误问题 ([#1139](https://github.com/arco-design/arco-design-vue/pull/1139))


## 2.27.0

`2022-05-13`

### 🆕 新增功能

- **tree:** `checkable` 支持函数格式 ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **tree:** `seleable` 支持函数格式 ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **tree:** 新增属性 `actionOnNodeClick`，可用于开启点击节点触发展开 ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **tree-select:** 新增属性 `seletable`，支持自定义可选节点 ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **input-number:** 增加 modelEvent 属性和 input 事件 ([#1115](https://github.com/arco-design/arco-design-vue/pull/1115))
- **tabs:** 增加 destroyOnHide 属性 ([#1107](https://github.com/arco-design/arco-design-vue/pull/1107))
- **input:** 增加 input-attrs 属性 ([#1106](https://github.com/arco-design/arco-design-vue/pull/1106))
- **input:** 修改 blur 事件触发顺序到 change 之后 ([#1106](https://github.com/arco-design/arco-design-vue/pull/1106))
- **collapse:** 增加 destroyOnHide 属性，默认不会在隐藏时销毁内容 ([#1100](https://github.com/arco-design/arco-design-vue/pull/1100))
- **radio:** `radio-group` 支持 `options` 属性 ([#1090](https://github.com/arco-design/arco-design-vue/pull/1090))
- **checkbox:** `checkbox-group` 增加 `checkbox` 插槽 ([#1087](https://github.com/arco-design/arco-design-vue/pull/1087))
- **checkbox:** `checkbox-group` 支持 `options` 属性配置子元素 ([#1058](https://github.com/arco-design/arco-design-vue/pull/1058))

### 🐛 问题修复

- **list:** 修复分页属性失效的问题 ([#1125](https://github.com/arco-design/arco-design-vue/pull/1125))
- **pagination:** 修复 simple 模式下，size 失效的问题 ([#1123](https://github.com/arco-design/arco-design-vue/pull/1123))
- **typography:** 修复按下回车的时候触发两次 `editEnd` 的问题 ([#1122](https://github.com/arco-design/arco-design-vue/pull/1122))
- **select:** 修复 options 属性中 `render`、`tagProps` 不生效的问题 ([#1114](https://github.com/arco-design/arco-design-vue/pull/1114))
- **tree:** 修复当 key 为 number 的时候，expandAll 失败的问题 ([#1113](https://github.com/arco-design/arco-design-vue/pull/1113))
- **date-picker:** 修复使用 `v-model` 绑定 `week-picker ` 和 `quarter-picker` 的时候值错误的问题 ([#1112](https://github.com/arco-design/arco-design-vue/pull/1112))
- **message:** 修复 clear 方法在多次调用时出现错误的问题 ([#1095](https://github.com/arco-design/arco-design-vue/pull/1095))
- **modal:** 修复拖拽后开启全屏产生位置偏移的问题 ([#1070](https://github.com/arco-design/arco-design-vue/pull/1070))

### 💎 功能优化

- **trigger:** 在右键触发时，点击触发元素可以关闭下拉框 ([#1111](https://github.com/arco-design/arco-design-vue/pull/1111))
- **trigger:** 支持弹出组件嵌套使用 ([#1111](https://github.com/arco-design/arco-design-vue/pull/1111))

### 💅 样式更新

- **table:** 修复存在固定列时，出现竖向滚动条的问题 ([#1124](https://github.com/arco-design/arco-design-vue/pull/1124))
- **select:** 修复开启搜索时，禁用状态下鼠标指针错误的问题 ([#1114](https://github.com/arco-design/arco-design-vue/pull/1114))

### 🆎 类型修正

- **modal:** 补全 ModalConfig 缺失的属性 ([#1120](https://github.com/arco-design/arco-design-vue/pull/1120))
- **table:** 使用 VNodeChild 替代接口中的 VNode，支持更广泛类型 ([#1118](https://github.com/arco-design/arco-design-vue/pull/1118))


## 2.26.0

`2022-04-29`

### 🆕 新增功能

- **table:** column 配置增加 tooltip 属性 ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))
- **table:** 增加 thead、th 插槽，tr、td 插槽增加传出数据 ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))
- **list:** 支持 `empty` 插槽 ([#1045](https://github.com/arco-design/arco-design-vue/pull/1045))

### 🐛 问题修复

- **collapse:** 修复 `showExpandIcon` 属性失效的问题 ([#1060](https://github.com/arco-design/arco-design-vue/pull/1060))
- **carousel:** 修复 `trigger` 和 `autoPlay` 属性设置失效的问题 ([#1059](https://github.com/arco-design/arco-design-vue/pull/1059))

### 💎 功能优化

- **table:** table-column 动态修改顺序不需要再手动指定 index ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))

### 💅 样式更新

- **modal:** body 层增加 `overflow: auto` ([#1030](https://github.com/arco-design/arco-design-vue/pull/1030))


## 2.25.2

`2022-04-27`

### 💅 样式更新

- **cascader:** 修复搜索下拉菜单在空白时的宽度问题 ([#1056](https://github.com/arco-design/arco-design-vue/pull/1056))


## 2.25.1

`2022-04-27`

### 🐛 问题修复

- **space:** 修复 size 属性类型检测问题 ([#1052](https://github.com/arco-design/arco-design-vue/pull/1052))
- **grid:** 修复 gutter 属性类型检测问题 ([#1052](https://github.com/arco-design/arco-design-vue/pull/1052))
- **config-provider:** 修复 size 属性的设置在某些组件中失效的问题 ([#1051](https://github.com/arco-design/arco-design-vue/pull/1051))
- **tabs:** 修复 #title 插槽在某些情况下不能更新的问题 ([#1050](https://github.com/arco-design/arco-design-vue/pull/1050))
- 修复部分组件 `popup-visible` 双向绑定状态异常的问题 ([#1049](https://github.com/arco-design/arco-design-vue/pull/1049))
- **table:** 修复 `2.25.0` 版本中扩展行传出 record 参数格式错误问题 ([#1047](https://github.com/arco-design/arco-design-vue/pull/1047))
- **date-picker:** 按钮 `今天` 无法通过将 `show-now-btn` 设置为 false 来隐藏 ([#1046](https://github.com/arco-design/arco-design-vue/pull/1046))
- **menu:** 菜单数据收集器收集到的数据有缺失 ([#1034](https://github.com/arco-design/arco-design-vue/pull/1034))

### 💅 样式更新

- **table:** 增加内部 table 类名，修复与 `descriptions` 组件一起使用的样式问题 ([#1053](https://github.com/arco-design/arco-design-vue/pull/1053))
- **input-number:** 修复清除按钮显示位置问题 ([#1048](https://github.com/arco-design/arco-design-vue/pull/1048))
- **checkbox:** 修复禁用状态下 hover 样式还会改变的问题 ([#1040](https://github.com/arco-design/arco-design-vue/pull/1040))


## 2.25.0

`2022-04-22`

### 🆕 新增功能

- **notification:** 增加 footer 属性 ([#1029](https://github.com/arco-design/arco-design-vue/pull/1029))
- **tabs:** 增加 hideContent 属性 ([#1025](https://github.com/arco-design/arco-design-vue/pull/1025))
- **table:** 增加行选择器和展开行双向绑定属性 ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- **date-picker:** 增加参数 `exchangeTime` ([#1020](https://github.com/arco-design/arco-design-vue/pull/1020))
- **icon:** 增加 `attachment`, `archive`, `calendar-clock`, `palette`, `launch` 图标 ([#1017](https://github.com/arco-design/arco-design-vue/pull/1017))
- **config-provider:** 增加 updateAtScroll 属性 ([#1015](https://github.com/arco-design/arco-design-vue/pull/1015))
- **table:** `select` 事件新增第二个参数 `rowKey` ([#999](https://github.com/arco-design/arco-design-vue/pull/999))
- **config-provider:** 添加 `global` 属性 ([#933](https://github.com/arco-design/arco-design-vue/pull/933))

### 🐛 问题修复

- **input-number:** 修复 error 属性失效的问题 ([#1026](https://github.com/arco-design/arco-design-vue/pull/1026))
- 修复 Volar 智能提示失效的问题 ([#1022](https://github.com/arco-design/arco-design-vue/pull/1022))
- **icon:** 修正 `link`, `image-close`,`lock`, `unlock`,`sync` 图标 ([#1017](https://github.com/arco-design/arco-design-vue/pull/1017))

### 💎 功能优化

- **table:** 自定义单元格渲染的 `record` 参数支持修改 ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- **tree:** 调用方法操作单个节点的时候在回调参数重增加目标节点信息 ([#1021](https://github.com/arco-design/arco-design-vue/pull/1021))
- **modal:** 使用 `esc` 关闭时只会关闭最上层弹窗 ([#1018](https://github.com/arco-design/arco-design-vue/pull/1018))

### 💅 样式更新

- **menu:** 弹出菜单的 icon 增加 margin-right ([#1029](https://github.com/arco-design/arco-design-vue/pull/1029))

### 🆎 类型修正

- **tag:** 修复 TagProps 的问题 ([#1024](https://github.com/arco-design/arco-design-vue/pull/1024))


## 2.24.1

`2022-04-16`

### 🐛 问题修复

- **button:** 修复 `config-provide` 注入失效的问题 ([#986](https://github.com/arco-design/arco-design-vue/pull/986))


## 2.24.0

`2022-04-15`

### 💎 功能优化

- **date-picker:** 传递了 timePickerProps 就会在最终值上拼接时间 ([#981](https://github.com/arco-design/arco-design-vue/pull/981))
- **table:** 当 columns 属性中存在 titleSlotName 时会优先使用 ([#969](https://github.com/arco-design/arco-design-vue/pull/969))

### 🆕 新增功能

- **modal:** 增加动画名属性 ([#985](https://github.com/arco-design/arco-design-vue/pull/985))
- **button:** `button-group` 支持为子组件 `button` 设置属性 ([#967](https://github.com/arco-design/arco-design-vue/pull/967))

### 🐛 问题修复

- **typography:** 解决 `slots.default` 报警告的问题 ([#980](https://github.com/arco-design/arco-design-vue/pull/980))
- **modal:** 修复在某些情况下不会锁定 body 的问题 ([#968](https://github.com/arco-design/arco-design-vue/pull/968))
- **menu:** 修复 `auto-scroll-into-view` 无效的问题 ([#966](https://github.com/arco-design/arco-design-vue/pull/966))
- **cascader:** 修复复选框的半选状态显示错误的问题 ([#963](https://github.com/arco-design/arco-design-vue/pull/963))
- **steps:** 修复 Steps 与 Step 组件非直接父子关系时 index 错误的问题 ([#959](https://github.com/arco-design/arco-design-vue/pull/959))

### 💅 样式更新

- **modal:** 修复全屏下动画导致闪现滚动条的问题 ([#985](https://github.com/arco-design/arco-design-vue/pull/985))
- **pagination:** 分页选择项增加 padding ([#984](https://github.com/arco-design/arco-design-vue/pull/984))

### 🆎 类型修正

- 增加常用 typescript 类型定义的导出 ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **select:** `Option、OptionData、GroupOption`  接口名修改为 `SelectOption、SelectOptionData、SelectOptionGroup` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **table:** `TableColumn` 接口名修改为 `TableColumnData` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **tree:** `FieldNames` 修改为 `TreeFieldNames` ([#977](https://github.com/arco-design/arco-design-vue/pull/977))


## 2.23.0

`2022-04-08`

### 💎 功能优化

- **pagination:** 优化切换 pageSize 时的页码改变逻辑 ([#954](https://github.com/arco-design/arco-design-vue/pull/954))
- **input:** 输入类组件的 `clear` 事件会同时触发 `change` 事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **table:** 横向滚动模式下，如果数据为空，表头会显示滚动条 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **modal:** 修复在滚动条为浮动的情况下，body没有锁定的问题 ([#945](https://github.com/arco-design/arco-design-vue/pull/945))

### 🆕 新增功能

- **pagination:** 增加 `jumper-prepend` 和  `jumper-append` 插槽 ([#954](https://github.com/arco-design/arco-design-vue/pull/954))
- **image:** 增加 footer-class  属性 ([#953](https://github.com/arco-design/arco-design-vue/pull/953))
- **cascader:** 增加 empty 插槽 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **select:** 增加 trigger 插槽 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **mention:** 增加 allow-clear 属性和事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **auto-complete:** 增加 allow-clear 属性和事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **menu:** 支持通过 `popup-max-height` 设置弹出框的最大高度 ([#949](https://github.com/arco-design/arco-design-vue/pull/949))
- **table:** columns 属性增加 titleSlotName，filterable 属性增加 slotName ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **table:** table-column 增加 filter-content，filter-content 插槽 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **table:** 增加 summary-cell 插槽 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **upload:** 增加图标相关插槽 ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- **upload:** 增加 updateFile 方法，onBeforeUpload 支持返回 File ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- **upload:** 优化初始图片显示逻辑 ([#944](https://github.com/arco-design/arco-design-vue/pull/944))

### 🐛 问题修复

- **cascader:** 修复 2.22.0 版本中懒加载的 isLeaf 失效的问题 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **cascader:** 修复 options 属性在某些情况下不能触发更新的问题 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **tree-select:** 当 label-in-value 为 true 的时候，事件 change 的入参错误 ([#939](https://github.com/arco-design/arco-design-vue/pull/939))

### 💅 样式更新

- **image:** 修复 footer 区域底部圆角样式问题 ([#953](https://github.com/arco-design/arco-design-vue/pull/953))
- **modal:** 修复在简单模式下，title-align 靠左对齐失效的问题 ([#945](https://github.com/arco-design/arco-design-vue/pull/945))


## 2.22.1

`2022-04-02`

### 🐛 问题修复

- **menu:** 修复菜单图标的高度不对的问题 ([#928](https://github.com/arco-design/arco-design-vue/pull/928))
- **table:** 修复虚拟列表和滚动一起使用的问题 ([#926](https://github.com/arco-design/arco-design-vue/pull/926))
- **mention:** 修复开发环境下出现警告提示的问题 ([#925](https://github.com/arco-design/arco-design-vue/pull/925))


## 2.22.0

`2022-04-01`

### 💎 功能优化

- **select:** 加载状态下不再可以触发回车事件 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🆕 新增功能

- **table:** 增加 `selectAll` 方法 ([#920](https://github.com/arco-design/arco-design-vue/pull/920))
- **form:** 支持修改表单项标签的渲染元素 ([#919](https://github.com/arco-design/arco-design-vue/pull/919))
- **cascader:** 增加 `field-names` 属性，允许自定义字段 ([#912](https://github.com/arco-design/arco-design-vue/pull/912))
- **select:** 增加 `field-names` 属性，允许自定义字段 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))
- **input-tag:** 增加 `field-names` 属性 ([#910](https://github.com/arco-design/arco-design-vue/pull/910))
- **tree-select:** 新增参数 `fallback-option` ([#894](https://github.com/arco-design/arco-design-vue/pull/894))

### 🐛 问题修复

- **table:** 修复某些情况下虚拟列表宽度错误的问题 ([#920](https://github.com/arco-design/arco-design-vue/pull/920))
- **modal:** 修复 `align-center="false"` 时自动宽度和拖动错误的问题 ([#918](https://github.com/arco-design/arco-design-vue/pull/918))
- 修复虚拟列表在项目高度偏差较大的时候出现底部空白的问题 ([#917](https://github.com/arco-design/arco-design-vue/pull/917))
- **tree-select:** 修复  null 值显示为空的问题 ([#916](https://github.com/arco-design/arco-design-vue/pull/916))
- **typography:** 修复复制无效的问题 ([#915](https://github.com/arco-design/arco-design-vue/pull/915))
- **select:** 修复 `allow-create` 模式下会出现重复选项的问题 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))
- **input-number:** 修复切换 `mode` 时展示错误的问题 ([#909](https://github.com/arco-design/arco-design-vue/pull/909))
- **mention:** 修复 v-model 双向绑定在选择值时错误的问题 ([#908](https://github.com/arco-design/arco-design-vue/pull/908))
- **upload:** 修复 onButtonClick 属性不可用的问题 ([#907](https://github.com/arco-design/arco-design-vue/pull/907))
- **menu:** 弹出框中的图标与文字没有对齐 ([#889](https://github.com/arco-design/arco-design-vue/pull/889))

### 💅 样式更新

- **form:** 表单项内容样式增加最大宽度，防止溢出 ([#919](https://github.com/arco-design/arco-design-vue/pull/919))


## 2.21.2

`2022-03-29`

### 🐛 问题修复

- **select:** 修复 `fallback-option` 属性设置 false 失效的问题 ([#893](https://github.com/arco-design/arco-design-vue/pull/893))
- **select:** 修复多选模式下选择的标签默认不显示删除的问题 ([#886](https://github.com/arco-design/arco-design-vue/pull/886))


## 2.21.1

`2022-03-25`

### 🐛 问题修复

- **affix:** 修复组件在 SSR 下报错的问题 ([#879](https://github.com/arco-design/arco-design-vue/pull/879))


## 2.21.0

`2022-03-25`

### 💎 功能优化

- 支持 SSR 使用 ([#872](https://github.com/arco-design/arco-design-vue/pull/872))

### 🆕 新增功能

- **table:** 增加总结行功能 ([#877](https://github.com/arco-design/arco-design-vue/pull/877))
- **tree:** 新增配置项 `onlyCheckLeaf` ([#876](https://github.com/arco-design/arco-design-vue/pull/876))
- **date-picker:** `dayStartOfWeek` 支持设置为 0-6 ([#874](https://github.com/arco-design/arco-design-vue/pull/874))
- **tree:** 支持关闭展开时的动效 ([#867](https://github.com/arco-design/arco-design-vue/pull/867))

### 🐛 问题修复

- **tree-select:** 修复 `max-tags` 参数名错误的问题，应为 `max-tag-count` ([#873](https://github.com/arco-design/arco-design-vue/pull/873))
- 修复部分组件使用 `popup-container` 指定的容器不存在时报错的问题 ([#871](https://github.com/arco-design/arco-design-vue/pull/871))
- **trigger:** 修复在未卸载的情况下，最外层 `div` 没有隐藏的问题 ([#871](https://github.com/arco-design/arco-design-vue/pull/871))
- **avatar:** 修复没有内容时会出现警告提示的问题 ([#870](https://github.com/arco-design/arco-design-vue/pull/870))
- **tag:** 移除尺寸类型 `mini` ([#860](https://github.com/arco-design/arco-design-vue/pull/860))
- **modal:** 修复使用函数方式触发Modal显示时，按钮处于焦点，此时点击回车会继续出发点击事件 ([#860](https://github.com/arco-design/arco-design-vue/pull/860))

### 💅 样式更新

- **menu:** 解决菜单项的缩进换行的问题 ([#866](https://github.com/arco-design/arco-design-vue/pull/866))
- **tree:** 修复连接线显示错乱的问题 ([#865](https://github.com/arco-design/arco-design-vue/pull/865))

### 🆎 类型修正

- **tree:** 增加filednames的自定义icon功能 ([#848](https://github.com/arco-design/arco-design-vue/pull/848))


## 2.20.2

`2022-03-24`

### 🐛 问题修复

- **table:** 修复 `table-column` 组件在模板中直接书写对象参数时导致不断更新的问题 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- **table:** 修复仅有一个 `table-column` 时没有列数据的问题 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- **table:** 修复 `table-column` 的排序问题，可通过 `index` 参数解决 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))

### 💅 样式更新

- **dropdown:** 修复选项中图标的垂直居中问题 ([#862](https://github.com/arco-design/arco-design-vue/pull/862))
- 修复部分组件的下拉菜单动画问题 ([#862](https://github.com/arco-design/arco-design-vue/pull/862))


## 2.20.1

`2022-03-21`

### 🐛 问题修复

- **tree:** 修复新版本中展开事件名称错误的问题 ([#853](https://github.com/arco-design/arco-design-vue/pull/853))

### 💅 样式更新

- **form:** 修复 `form-item` 星号与 windicss 的兼容问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **select:** 修复选项 #icon 插槽的垂直居中问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **select:** 修复选项超出宽度后没有显示省略的问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **transfer:** 修复选项超出宽度后没有显示省略的问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.20.0

`2022-03-18`

### 🆕 新增功能

- **table:** 使用 Context 方式重构组件，`table-colum` 支持二次封装 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- **table:** scroll 属性增加 `maxHeight`, `minWidth` 属性 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- **cascader:** 增加 `cascader-panel` 组件 ([#842](https://github.com/arco-design/arco-design-vue/pull/842))
- **descriptions:** `column` 属性支持响应式配置 ([#839](https://github.com/arco-design/arco-design-vue/pull/839))
- **list:** 增加 `#scroll-loading` 插槽 ([#838](https://github.com/arco-design/arco-design-vue/pull/838))
- **tree:** 添加树的实例方法 ([#837](https://github.com/arco-design/arco-design-vue/pull/837))

### 🐛 问题修复

- **date-picker:** 选择结束时间的时候没有触发 select 事件 ([#844](https://github.com/arco-design/arco-design-vue/pull/844))
- **cascader:** 修复下拉菜单选中路径可能与当前值不符的问题 ([#843](https://github.com/arco-design/arco-design-vue/pull/843))
- **select:** 修复开启虚拟列表时，搜索功能失败的问题 ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- **select:** 修复小键盘 `Enter` 键不能选中的问题 ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- **modal:** 修复创建方法中返回的 `close` 函数错误的问题 ([#840](https://github.com/arco-design/arco-design-vue/pull/840))
- **typography:** 修复 `ellipsisText` 未更新的问题 ([#833](https://github.com/arco-design/arco-design-vue/pull/833))

### 💅 样式更新

- **table:** 修复开启排序后，表头文字不能居中的问题 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))

## 2.19.0

`2022-03-11`

### ⚠️ 重点注意

- **table:** 修改排序函数 sorter 的传出数据，增强使用 ([#810](https://github.com/arco-design/arco-design-vue/pull/810))

### 💎 功能优化

- `modal`, `message`, `notifaction` 组件的函数式调用增加 appContext 的支持，详情请参见文档 ([#804](https://github.com/arco-design/arco-design-vue/pull/804))

### 🆕 新增功能

- **tree:** 支持设置半选节点 ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- **tree:** 实例上新增可调用的方法:  `getCheckedNodes` `getSelectedNodes` `getExpandedNodes` `getHalfCheckedNodes` ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- **drawer:** 增加 `hide-cancel` 属性 ([#803](https://github.com/arco-design/arco-design-vue/pull/803))
- **modal:** 增加 `draggable` 属性，支持可拖动 ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- **modal:** 增加 `fullscreen` 属性，支持全屏展示 ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- **grid:** 当列跨度为0的时候`a-col`将被隐藏 ([#797](https://github.com/arco-design/arco-design-vue/pull/797))

### 🐛 问题修复

- **descriptions:** 修复 `data` 为空数据时报错的问题 ([#812](https://github.com/arco-design/arco-design-vue/pull/812))
- **form:** 修复 `form-item` 的 `field` 属性中存在数组时失效的问题 ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- **form:** 修复 `disabled` 开启后，部分组件功能仍可用问题 ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- **tree:** 修复当节点找不到的时候组件渲染出错的问题 ([#800](https://github.com/arco-design/arco-design-vue/pull/800))
- **date-picker:** 修复范围选择器弹出层的偏移量错误的问题 ([#796](https://github.com/arco-design/arco-design-vue/pull/796))


## 2.18.1

`2022-03-07`

### 🐛 问题修复

- **tabs:** 修复初始化时会触发 activeKey 修改的问题 ([#787](https://github.com/arco-design/arco-design-vue/pull/787))
- **upload:** 修复上传进度计算错误的问题 ([#786](https://github.com/arco-design/arco-design-vue/pull/786))
- **upload:** 修复上传中，取消按钮失效的问题 ([#786](https://github.com/arco-design/arco-design-vue/pull/786))


## 2.18.0

`2022-03-04`

### 💎 功能优化

- **select:** 选择框展示使用 flex 布局方式 ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- **select:** trigger-props 属性可以覆盖默认属性 ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- **breadcrumb:** 使用 Context 方式优化组件 ([#774](https://github.com/arco-design/arco-design-vue/pull/774))
- **avatar:** 使用 Context 方式优化组件 ([#773](https://github.com/arco-design/arco-design-vue/pull/773))
- **steps:** 使用 Context 方式优化组件 ([#772](https://github.com/arco-design/arco-design-vue/pull/772))
- **tabs:** 使用 Context 方式优化组件，支持对 TabPane 的二次封装 ([#771](https://github.com/arco-design/arco-design-vue/pull/771))
- **tabs:** key 支持 number 类型 ([#771](https://github.com/arco-design/arco-design-vue/pull/771))
- **tabs:** 增加 autoSwitch 属性 ([#771](https://github.com/arco-design/arco-design-vue/pull/771))

### 🆕 新增功能

- 增加 GlobalComponents 定义 ([#782](https://github.com/arco-design/arco-design-vue/pull/782))
- **cascader:** 增加 `#option`, `#label` 插槽 ([#781](https://github.com/arco-design/arco-design-vue/pull/781))
- **table:** 滚动模式支持设置高度百分比 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **table:** column 数据增加 slotName 属性，允许指定渲染插槽 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **table:** 增加 `pagination-left` 和 `pagination-right` 插槽 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **rate:** 增加 color 属性 ([#770](https://github.com/arco-design/arco-design-vue/pull/770))
- **checkbox:** 增加 checkbox 插槽，可以自定义复选框 ([#769](https://github.com/arco-design/arco-design-vue/pull/769))
- **radio:** 增加 radio 插槽，可以自定义单选框 ([#769](https://github.com/arco-design/arco-design-vue/pull/769))
- **date-picker:** 支持在头部快捷切换年月 ([#754](https://github.com/arco-design/arco-design-vue/pull/754))

### 🐛 问题修复

- **select:** 修复 label 属性失效的问题 ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- **select:** 修复 option 的属性没有同步更新的问题 ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- **list:** 列表项应渲染为 div ([#776](https://github.com/arco-design/arco-design-vue/pull/776))
- **slider:** 修复输入框改变时不会触发 change 的问题 ([#775](https://github.com/arco-design/arco-design-vue/pull/775))
- **form:** 修复嵌套数据中重置方法失效的问题 ([#768](https://github.com/arco-design/arco-design-vue/pull/768))

### 💅 样式更新

- **menu:** 菜单项的图标没有垂直居中 ([#767](https://github.com/arco-design/arco-design-vue/pull/767))


## 2.18.0-beta.3

`2022-02-26`

### 💎 功能优化

- **input:** modelValue 支持 null ([#743](https://github.com/arco-design/arco-design-vue/pull/743))

### 🐛 问题修复

- **transfer:** 修复列表显示问题 ([#744](https://github.com/arco-design/arco-design-vue/pull/744))


## 2.18.0-beta.2

`2022-02-25`

### ⚠️ 重点注意

- **trigger:** 弹出层增加一层 `wrapper div` 用来提供对tranform动画的支持 ([#732](https://github.com/arco-design/arco-design-vue/pull/732))
- **list:** 默认渲染 spin 组件，防止切换状态时导致组件重新挂载 ([#730](https://github.com/arco-design/arco-design-vue/pull/730))
- **list:** 支持渲染任何子元素 ([#730](https://github.com/arco-design/arco-design-vue/pull/730))

### 💎 功能优化

- **form:** `auto-label-width` 开启时不在允许标签换行，防止换行后计算错误 ([#738](https://github.com/arco-design/arco-design-vue/pull/738))
- **modal:** 优化点击遮罩层关闭 ([#737](https://github.com/arco-design/arco-design-vue/pull/737))

### 🆕 新增功能

- **descriptions:** 增加 `descriptions-item` 组件 ([#739](https://github.com/arco-design/arco-design-vue/pull/739))
- **table:** 增加 `span-all`  属性 ([#735](https://github.com/arco-design/arco-design-vue/pull/735))
- **trigger:** 增加 `show` 和 `hide` 事件 ([#731](https://github.com/arco-design/arco-design-vue/pull/731))
- **cascader:** 增加 `search-delay` 属性，并默认为 `500ms` ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- **cascader:** 增加 `search-option-only-label` 属性，并修改搜索下拉菜单中的选项默认展示路径标签 ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- **select:** 增加 `search-delay` 属性，并默认为 `500ms` ([#728](https://github.com/arco-design/arco-design-vue/pull/728))
- **form:** 校验错误信息新增 label 属性 ([#724](https://github.com/arco-design/arco-design-vue/pull/724))
- **tree:** 新增插槽 `icon` 用于全局定制节点图标 ([#710](https://github.com/arco-design/arco-design-vue/pull/710))

### 🐛 问题修复

- **table:** 修复 table-column 嵌套使用时，v-for 不能渲染的问题 ([#734](https://github.com/arco-design/arco-design-vue/pull/734))
- **cascader:** 修复选项更新后选择框展示没有更新的问题 ([#727](https://github.com/arco-design/arco-design-vue/pull/727))
- **upload:** 修复使用插槽 `upload-item` 报错的问题 ([#715](https://github.com/arco-design/arco-design-vue/pull/715))
- 修复 `virtual-list` 在滚动条显示和隐藏的边界情况下数据变化没有更新视图的问题 ([#711](https://github.com/arco-design/arco-design-vue/pull/711))
- 修复 `virtual-list` 行高计算没有包含边框的问题 ([#711](https://github.com/arco-design/arco-design-vue/pull/711))
- **upload:** 仅在文件类型为图片时生成初始预览图片 ([#706](https://github.com/arco-design/arco-design-vue/pull/706))
- **message:** 修复同时调用时，出现销毁报错的问题 ([#705](https://github.com/arco-design/arco-design-vue/pull/705))

### 💅 样式更新

- **pagination:** 修复在safari下跳转器文字没有对齐的问题 ([#736](https://github.com/arco-design/arco-design-vue/pull/736))
- **tooltip:** 优化显示动画，同 react 版本保持一致 ([#733](https://github.com/arco-design/arco-design-vue/pull/733))
- **popover:** 优化显示动画 ([#733](https://github.com/arco-design/arco-design-vue/pull/733))
- **popconfirm:** 优化显示动画 ([#733](https://github.com/arco-design/arco-design-vue/pull/733))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ 重点注意

- 本版本为 beta 版本，存在较大改动，情谨慎测试后在生产环境使用
- **form:** <form-item> 组件重构，使用 context 管理输入组件。如果用户存在自定义输入组件，可参考 `自定义输入组件` 示例更改。 ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- 所有输入组件增加 FormItemContext 的注入 ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **radio:** 外层包裹 DOM 从 span 改为 label ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **checkbox:** 外层包裹 DOM 从 span 改为 label ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **select:** 组件使用 context 重构，允许对 Option 组件的封装使用 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **select:** 增加 `valueKey` 属性，选项 value 支持 object 形式 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **select:** <option> 组件的类名由 arco-dropdown-option 改为 arco-select-option，并使用 flex 垂直居中布局 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **dropdown:** <doption> 组件修改使用 flex 垂直居中布局 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))

### 💎 功能优化

- **table:** 在数据为空时，不展示分页组件 ([#684](https://github.com/arco-design/arco-design-vue/pull/684))

### 🆕 新增功能

- **menu:** 支持响应式收缩 ([#700](https://github.com/arco-design/arco-design-vue/pull/700))
- **grid:** 支持响应式配置 ([#693](https://github.com/arco-design/arco-design-vue/pull/693))
- 增加 ssr 支持（beta） ([#675](https://github.com/arco-design/arco-design-vue/pull/675))

### 🐛 问题修复

- **cascader:** 修复严格模式下禁用项仍可通过单选选择器选择的问题 ([#701](https://github.com/arco-design/arco-design-vue/pull/701))
- **cascader:** 修复严格模式下搜索结果没有包含路径选项的问题 ([#701](https://github.com/arco-design/arco-design-vue/pull/701))


## 2.17.0

`2022-02-11`

### 💎 功能优化

- **input:** 增加 input 元素部分原始属性的透传 ([#664](https://github.com/arco-design/arco-design-vue/pull/664))
- **trigger:** 优化自动调整位置后箭头的位置 ([#655](https://github.com/arco-design/arco-design-vue/pull/655))

### 🆕 新增功能

- **image:** 新增 actions 插槽用于自定义预览的操作项 ([#679](https://github.com/arco-design/arco-design-vue/pull/679))
- **modal:** 增加 `title-align` 属性 ([#673](https://github.com/arco-design/arco-design-vue/pull/673))

### 🐛 问题修复

- **image:** 修复旋转方向错误的问题 ([#678](https://github.com/arco-design/arco-design-vue/pull/678))
- **image:** 修复操作项的 `Tooltip` 被遮盖的问题 ([#677](https://github.com/arco-design/arco-design-vue/pull/677))
- **tooltip:** 修复按需加载时丢失 trigger 样式的问题 ([#674](https://github.com/arco-design/arco-design-vue/pull/674))
- **transfer:** 修复搜索功能应该检查选项的问题 ([#659](https://github.com/arco-design/arco-design-vue/pull/659))

### 💅 样式更新

- 修复部分图标默认颜色不统一问题 ([#676](https://github.com/arco-design/arco-design-vue/pull/676))
- **switch:** 修复开关动画偶现抖动问题 ([#656](https://github.com/arco-design/arco-design-vue/pull/656))


## 2.16.2

`2022-01-24`

### 🐛 问题修复

- **date-picker:** `headerValue` 在 `vue 3.2.28` 中报错 ([#643](https://github.com/arco-design/arco-design-vue/pull/643))
- **table:** 修复阻止冒泡导致懒加载失效的问题 ([#641](https://github.com/arco-design/arco-design-vue/pull/641))
- **table:** 修复在展开行展开时，删除后显示空行的问题

### 💅 样式更新

- 自定义 icon 组件增加 fill 属性，解决自定义颜色问题 ([#642](https://github.com/arco-design/arco-design-vue/pull/642))
- **input:** 修复 `input-group` 中使用 input 组件圆角问题 ([#640](https://github.com/arco-design/arco-design-vue/pull/640))


## 2.16.1

`2022-01-21`

### 🐛 问题修复

- **dropdown:** `<dropdown-button>` 组件补全 dropdown 相关属性 ([#637](https://github.com/arco-design/arco-design-vue/pull/637))


## 2.16.0

`2022-01-21`

### 💎 功能优化

- **table:** 内部按钮不再触发 `row-click` 事件 ([#630](https://github.com/arco-design/arco-design-vue/pull/630))

### 🆕 新增功能

- **select:** 增加自定义图标插槽 ([#634](https://github.com/arco-design/arco-design-vue/pull/634))
- **typography:** 新增属性 `copy-delay` 用于自定义复制成功状态消失的延迟时间 ([#632](https://github.com/arco-design/arco-design-vue/pull/632))
- **date-picker:** 增加属性 `value-format` 用于格式化返回值 ([#631](https://github.com/arco-design/arco-design-vue/pull/631))
- **modal:** 增加 `before-open` 和 `before-close` 事件 ([#628](https://github.com/arco-design/arco-design-vue/pull/628))
- **input:** `<input-search>` 组件增加自定义搜素按钮内容的功能 ([#625](https://github.com/arco-design/arco-design-vue/pull/625))
- **form:** 增加表单和相应输入组件的反馈图标功能 ([#622](https://github.com/arco-design/arco-design-vue/pull/622))
- **table:** 增加拖拽排序的支持（实验性） ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **table:** 增加调整列宽的支持（实验性） ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **table:** 增加 `tbody`、`tr`、`td` 插槽 ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **dropdown:** 使用 context 重构组件，支持嵌套使用 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** value 增加对 object 的支持 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** 新增 `dropdown-button` 组件 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** 下拉菜单打开时，为触发元素增加标识类名 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **split:** 属性 `min` `max` 支持设置 px ([#607](https://github.com/arco-design/arco-design-vue/pull/607))

### 🐛 问题修复

- **message:** 修复使用 loading 类型时类型警告的问题 ([#635](https://github.com/arco-design/arco-design-vue/pull/635))
- **modal:** 修复样式文件缺少 `<button>` 组件样式引用的问题 ([#635](https://github.com/arco-design/arco-design-vue/pull/635))
- **date-picker:** 点击清除按钮的时候不要展开弹出层 ([#633](https://github.com/arco-design/arco-design-vue/pull/633))
- **cascader:** 修复在 `check-strictly` 模式下，搜索中不能选择的问题 ([#627](https://github.com/arco-design/arco-design-vue/pull/627))
- **date-picker:** 返回值在不显示时间选择面板的时候不应该拼接时间 ([#612](https://github.com/arco-design/arco-design-vue/pull/612))
- **typography:** 修复 JSX 使用中存在警告的问题 ([#591](https://github.com/arco-design/arco-design-vue/pull/591))
- **icon:** 修复 2.15.0 版本缺失的 icon-relation 图标

### 💅 样式更新

- **button:** 修复链接模式文字未居中的问题 ([#636](https://github.com/arco-design/arco-design-vue/pull/636))
- **input:** 修复 `<input-group>` 组件包裹 `<select>` 组件的样式问题 ([#588](https://github.com/arco-design/arco-design-vue/pull/588))


## 2.15.1

`2022-01-15`

### 🐛 问题修复

- **grid:** 修复组件名注册错误问题 ([#581](https://github.com/arco-design/arco-design-vue/pull/581))


## 2.15.0

`2022-01-14`

### 💎 功能优化

- 优化组件内置的选择框不会受到外部选择框组的控制 ([#569](https://github.com/arco-design/arco-design-vue/pull/569))
- **select:** 优化加载中状态显示 ([#557](https://github.com/arco-design/arco-design-vue/pull/557))

### 🆕 新增功能

- **input-tag:** 增加 `uniqueValue` 属性，支持输入时验证值不重复 ([#578](https://github.com/arco-design/arco-design-vue/pull/578))
- **modal:** 增加 `escToClose` 属性并默认开启 ([#577](https://github.com/arco-design/arco-design-vue/pull/577))
- **drawer:** 增加 `escToClose` 属性并默认开启 ([#577](https://github.com/arco-design/arco-design-vue/pull/577))
- **grid:** 新增基于 grid 的布局组件 `Grid` `Grid.Item` ([#576](https://github.com/arco-design/arco-design-vue/pull/576))
- **table:** `sortable.sorter` 增加 boolean 类型，支持服务器端排序 ([#575](https://github.com/arco-design/arco-design-vue/pull/575))
- 增加 `icon` 组件，并提供对 iconfont.cn 的支持 ([#574](https://github.com/arco-design/arco-design-vue/pull/574))
- **cascader:** 增加 loading 属性 ([#558](https://github.com/arco-design/arco-design-vue/pull/558))

### 🐛 问题修复

- **date-picker:** 修复事件参数缺失的问题 ([#579](https://github.com/arco-design/arco-design-vue/pull/579))

### 💅 样式更新

- **tag:** 修复 checkable 状态样式错误的问题 ([#570](https://github.com/arco-design/arco-design-vue/pull/570))
- **button:** 修复按钮组中 iconOnly 按钮的对齐问题 ([#567](https://github.com/arco-design/arco-design-vue/pull/567))
- **input:** 修复暗黑模式下背景颜色错误的问题 ([#560](https://github.com/arco-design/arco-design-vue/pull/560))


## 2.14.3

`2022-01-12`

### 🐛 问题修复

- **input:** 修复 input-search 在 button 模式属性失效的问题 ([#552](https://github.com/arco-design/arco-design-vue/pull/552))
- **input-number:** 修复输入时光标位置改变的问题 ([#552](https://github.com/arco-design/arco-design-vue/pull/552))
- **select:** 调用虚拟列表的 `scrollTo` 函数时缺失了参数 ([#543](https://github.com/arco-design/arco-design-vue/pull/543))


## 2.14.2

`2022-01-10`

### 🐛 问题修复

- **steps:** 修复 dot 模式下可以开启 small 的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **form:** label-col 改用 flex 布局，解决 mini 尺寸下高度错误的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **table:** 修复 table 内容超出容器，导致某些情况下边框不显示的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **select:** 修复按需加载没有导入样式的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **input:** 修复在 Safari 浏览器下 disabled 状态字体颜色错误的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **textarea:** 修复在 Firefox 浏览器下行高设置失效的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **statistic:** 修复动态赋值问题 ([#534](https://github.com/arco-design/arco-design-vue/pull/534))

### 💅 样式更新

- **button:** 修复 onlyIcon 模式图标未对齐问题 ([#538](https://github.com/arco-design/arco-design-vue/pull/538))


## 2.14.1

`2022-01-08`

### 🐛 问题修复

- **form:** 修复form默认大小样式问题 ([#526](https://github.com/arco-design/arco-design-vue/pull/526))
- **config-provider:** 修复按需加载样式问题 ([#526](https://github.com/arco-design/arco-design-vue/pull/526))


## 2.14.0

`2022-01-07`

### 🆕 新增功能

- **table:** 增加 hideExpandButtonOnEmpty 属性 ([#520](https://github.com/arco-design/arco-design-vue/pull/520))
- **upload:** 增加 imagePreview 属性，可以使用内置图片预览功能 ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **upload:** 当 `listType` 为图片类时，默认设置 accept 为 `image/*` ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **upload:** 增加 `showOnExceedLimit` 属性 ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **drawer:** 当没有设置 title 和 closable 时，隐藏标题栏 ([#515](https://github.com/arco-design/arco-design-vue/pull/515))
- **statistic:** value 值支持响应式修改 ([#514](https://github.com/arco-design/arco-design-vue/pull/514))
- **config-provider:** 增加 `size` 属性 ([#513](https://github.com/arco-design/arco-design-vue/pull/513))

### 🐛 问题修复

- **image:** `Image.PreviewGroup` 应该优先收集 `previewProps.src` ([#522](https://github.com/arco-design/arco-design-vue/pull/522))
- **table:** 修复 x 轴 resize 问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **table:** 修复存在固定列时，展开行宽度设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **table:** 修复存在子树时，复选框全选设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **trigger:** 修复某些情况下弹出框箭头位置错误的问题 ([#518](https://github.com/arco-design/arco-design-vue/pull/518))
- **input:** 修复 change 事件触发问题 ([#516](https://github.com/arco-design/arco-design-vue/pull/516))
- **input:** 修复当存在前后置标签时，样式设置位置错误的问题 ([#516](https://github.com/arco-design/arco-design-vue/pull/516))

### 💅 样式更新

- **dropdown:** 修复选项后缀样式问题 ([#523](https://github.com/arco-design/arco-design-vue/pull/523))


## 2.13.0

`2021-12-31`

### ⚠️ 重点注意

- **form:** `form-item` 组件增加一个新的 `content-wrapper` div 元素包裹原先 `content` div 元素，以来支持新的布局方式 ([#488](https://github.com/arco-design/arco-design-vue/pull/488))

### 🆕 新增功能

- **form:** 增加 `autoLabelWidth` 属性，支持标签宽度自适应 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **form:** 增加 `labelColFlex` 属性，支持标签宽度设置 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **form:** 增加 `mergeProps` 属性，支持自定义属性和事件覆写 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **table:** 增加 `loadMore` 属性，支持子树懒加载 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **table:** 增加 `filterIconAlignLeft` 属性 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **table:** 增加 `change` 事件，可获取处理后数据 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **upload:** 增加 `show-link` 属性 ([#483](https://github.com/arco-design/arco-design-vue/pull/483))
- **auto-complete:** 增加 input 中的插槽和 option 插槽支持 ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **mention:** 增加 input 中的插槽和 option 插槽支持 ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **mention:** 文本域类型下的下拉菜单跟随提示文字显示 ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **cascader:** 增加 `load-more` 属性，支持数据懒加载 ([#476](https://github.com/arco-design/arco-design-vue/pull/476))
- **grid:** `Row` 新增属性 `wrap` ([#471](https://github.com/arco-design/arco-design-vue/pull/471))
- **descriptions:** `value` 和 `label` 插槽增加 index、data 参数 ([#470](https://github.com/arco-design/arco-design-vue/pull/470))

### 🐛 问题修复

- **pagination:** 修复跳转输入框失焦时没有清除值的问题 ([#487](https://github.com/arco-design/arco-design-vue/pull/487))
- **input-tag:** 修复中文输入法问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **select:** 修复搜索时中文输入法问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **select:** 修复在 `drawer` 中 placeholder 显示不全的问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **form:** 修复表单项 help 内容显示错误的问题 ([#480](https://github.com/arco-design/arco-design-vue/pull/480))
- **table:** 修复 `sortOrder ` 置空失效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **table:** 修复 `expand-icon` 插槽在子树中不生效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **table:** 修复固定列在表格尺寸动态变化时阴影不显示的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **date-picker:** 修复 `readonly` 无效的问题 ([#472](https://github.com/arco-design/arco-design-vue/pull/472))

### 💅 样式更新

- **steps:** 修复下一步错误连线颜色错误问题 ([#477](https://github.com/arco-design/arco-design-vue/pull/477))


## 2.12.2

`2021-12-27`

### 🐛 问题修复

- **modal:** 修复 modalStyle 失效的问题 ([#459](https://github.com/arco-design/arco-design-vue/pull/459))
- **modal:** 修复 flex 布局导致垂直居中且超出高度显示不全的问题 ([#459](https://github.com/arco-design/arco-design-vue/pull/459))


## 2.12.1

`2021-12-24`

### 🐛 问题修复

- **upload:** 修复照片墙模式错误的问题 ([#457](https://github.com/arco-design/arco-design-vue/pull/457))


## 2.12.0

`2021-12-24`

### ⚠️ 重点注意

- **modal:** 修改 wrapper 层展示 modal 的方式，并添加 `width` 和 `top` 属性 ([#454](https://github.com/arco-design/arco-design-vue/pull/454))
- **textarea:** max-length 的计算不再排除回车情况，同 React 版本保持一致 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))
- **input:** 修改 change 事件仅在值发生改变时触发 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))
- **input-number:** 修改 change 事件仅在失焦和按下回车时触发，解决受控不能输入的问题 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))

### 💎 功能优化

- **badge:** count 为 0 时不再渲染徽标 ([#445](https://github.com/arco-design/arco-design-vue/pull/445))

### 🆕 新增功能

- 图标类组件增加 size 属性 ([#455](https://github.com/arco-design/arco-design-vue/pull/455))
- **input:** `max-length` 增加 `errorOnly` 属性，增加 `word-slice` 属性 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **textarea:** `max-length` 增加 `errorOnly` 属性，增加 `word-slice` 属性 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **input-number:** 增加对 input 插槽的支持 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **link:** 增加 click 事件 ([#450](https://github.com/arco-design/arco-design-vue/pull/450))
- **drawer:** 增加 unmount-on-close 属性 ([#449](https://github.com/arco-design/arco-design-vue/pull/449))
- **switch:** 增加 `checked-value` 和 `unchecked-value` 属性 ([#444](https://github.com/arco-design/arco-design-vue/pull/444))
- **switch:** 增加 `checked-color` 和 `unchecked-color` 属性 ([#444](https://github.com/arco-design/arco-design-vue/pull/444))

### 🐛 问题修复

- **modal:** 修复按钮内容不能动态修改的问题 ([#453](https://github.com/arco-design/arco-design-vue/pull/453))
- **affix:** 修复与 anchor 组件组合使用，显示 warning 的问题 ([#448](https://github.com/arco-design/arco-design-vue/pull/448))
- **progress:** 修复显示数值精度问题 ([#447](https://github.com/arco-design/arco-design-vue/pull/447))
- **upload:** 修复按钮模式下 tip 没有显示的问题 ([#446](https://github.com/arco-design/arco-design-vue/pull/446))
- **upload:** 修复 `upload` 组件的禁用样式不生效的 bug ([#430](https://github.com/arco-design/arco-design-vue/pull/430))

### 💅 样式更新

- **table:** 修复 table 滚动模式下最后一行多余边框的问题 ([#456](https://github.com/arco-design/arco-design-vue/pull/456))


## 2.11.1

`2021-12-20`

### 🐛 问题修复

- **input-tag:** 修复 resize 导致的中文输入失效的问题 ([#428](https://github.com/arco-design/arco-design-vue/pull/428))
- **dropdown:** 修复使用 JSX 时，Group 不可用的问题 ([#427](https://github.com/arco-design/arco-design-vue/pull/427))
- **select:** 修复使用 JSX 时，Group 不可用的问题 ([#427](https://github.com/arco-design/arco-design-vue/pull/427))


## 2.11.0

`2021-12-17`

### 🆕 新增功能

- **upload:** 增加 `download` 属性 ([#418](https://github.com/arco-design/arco-design-vue/pull/418))
- **space:** 新增属性 `fill` ([#415](https://github.com/arco-design/arco-design-vue/pull/415))
- **menu:** `sub-menu` 和 `menu-item` 新增 icon 的 slot ([#412](https://github.com/arco-design/arco-design-vue/pull/412))
- **table:** `columns` 新增 cellStyle 属性 ([#411](https://github.com/arco-design/arco-design-vue/pull/411))
- **upload:** 新增 `show-remove-buttoon` 、`show-retry-button`、`show-cancel-button` 属性 ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- **upload:** 新增 `imageLoading` 属性 ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- **drawer:** 新增属性 `footer` ([#394](https://github.com/arco-design/arco-design-vue/pull/394))

### 🐛 问题修复

- **upload:** 修复上传中的图标位置不对的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **upload:** 修复拖拽上传文件夹时，`beforeUpload` 的第二个参数获取到的不是全部文件的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **upload:** 修复拖拽上传时，鼠标进入内部文字，拖拽样式闪动的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **table:** 修复固定列模式下，表格尺寸变化导致表头和主体宽度不一致问题 ([#410](https://github.com/arco-design/arco-design-vue/pull/410))
- **tabs:** 修复标签栏宽度变化时，没有重新计算滚动的问题 ([#409](https://github.com/arco-design/arco-design-vue/pull/409))
- **tabs:** 修复标签选项宽度变化时，指示器宽度不能跟随更新的问题 ([#409](https://github.com/arco-design/arco-design-vue/pull/409))
- **input-tag:** 修复某些情况下内部 input 大小计算错误的问题 ([#408](https://github.com/arco-design/arco-design-vue/pull/408))
- **input-number:** 修复 `model-value` 为 0 时展示错误的问题 ([#407](https://github.com/arco-design/arco-design-vue/pull/407))
- **trigger:** 修复容器尺寸变化导致弹出层位置错误的问题 ([#406](https://github.com/arco-design/arco-design-vue/pull/406))
- **trigger:** 修复嵌套使用中 hover 方式导致弹出层关闭的问题 ([#406](https://github.com/arco-design/arco-design-vue/pull/406))
- **tree-select:** 修复设置 key 字段名的时候搜索失效的问题 ([#405](https://github.com/arco-design/arco-design-vue/pull/405))
- **anchor:** 修复加载后不会定位到 hash 位置的问题 ([#400](https://github.com/arco-design/arco-design-vue/pull/400))
- **cascader:** 修复层级 totalLevel 计算错误的问题 ([#399](https://github.com/arco-design/arco-design-vue/pull/399))
- **modal:** 修复 `alignCenter` 属性不生效的问题 ([#384](https://github.com/arco-design/arco-design-vue/pull/384))
- **modal:** 调整组件的 `alignCenter` 属性默认为 `true` ([#384](https://github.com/arco-design/arco-design-vue/pull/384))

### 💅 样式更新

- **menu:** 修复侧边栏可折叠的时候高度溢出的问题 ([#416](https://github.com/arco-design/arco-design-vue/pull/416))


## 2.10.1

`2021-12-14`

### 🐛 问题修复

- **cascader:** 修复多选模式下存在空子菜单时计数错误的问题 ([#388](https://github.com/arco-design/arco-design-vue/pull/388))
- **dropdown:** 修复 <doption> 组件 disabled 失效和属性继承的问题 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **select:** 修复 options 属性中 disabled 失效的问题 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **select:** 修复 bordered 属性未生效的问题，添加示例 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **trigger:** 修复弹出层尺寸变化不会触发更新的问题 ([#382](https://github.com/arco-design/arco-design-vue/pull/382))
- **trigger:** 修复 `align-point` 模式下位置和自适应不生效的问题 ([#382](https://github.com/arco-design/arco-design-vue/pull/382))
- **card:** 修复 slots 内容存在不更新的问题 ([#380](https://github.com/arco-design/arco-design-vue/pull/380))

### 💅 样式更新

- **popconfirm:** 修正组件样式问题，并调整按钮默认大小为 `mini`，同React保持一致 ([#390](https://github.com/arco-design/arco-design-vue/pull/390))
- **input-tag:** 修复组件高度问题 ([#383](https://github.com/arco-design/arco-design-vue/pull/383))
- **input-tag:** 修复组件关闭按钮宽度问题 ([#383](https://github.com/arco-design/arco-design-vue/pull/383))

### 🆎 类型修正

- **modal:** `ModalConfig ` 增加 `simple` 属性注解 ([#389](https://github.com/arco-design/arco-design-vue/pull/389))


## 2.10.0

`2021-12-10`

### 💎 功能优化

- **select:** 输入框可编辑时，点击不会关闭下拉菜单 ([#348](https://github.com/arco-design/arco-design-vue/pull/348))
- **cascader:** 输入框可编辑时，点击不会关闭下拉菜单 ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 新增功能

- **tabs:** 增加 headerPadding 属性并默认开启 ([#362](https://github.com/arco-design/arco-design-vue/pull/362))
- **form:** `form-item` 增加布局和类名相关属性 ([#361](https://github.com/arco-design/arco-design-vue/pull/361))
- **table:** 增加 span-method 属性 ([#360](https://github.com/arco-design/arco-design-vue/pull/360))
- **collapse:** key增加对number的支持 ([#358](https://github.com/arco-design/arco-design-vue/pull/358))
- **dropdown:** 增加 footer 插槽 ([#350](https://github.com/arco-design/arco-design-vue/pull/350))
- **cascader:** 增加 checkStrictly 属性 ([#349](https://github.com/arco-design/arco-design-vue/pull/349))
- **select:** 增加 fallback-option 和 show-extra-options 属性 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- **grid:** 组件 `a-col` 新增属性 `flex` ([#340](https://github.com/arco-design/arco-design-vue/pull/340))

### 🐛 问题修复

- **input-number:** 修复可重复输入 `-` 和 `.` 的问题 ([#359](https://github.com/arco-design/arco-design-vue/pull/359))
- **statistic:** 修复 precision 为 0 时没有生效的问题 ([#357](https://github.com/arco-design/arco-design-vue/pull/357))
- **tabs:** 修复可编辑模式下选项卡 closable 失效的问题 ([#356](https://github.com/arco-design/arco-design-vue/pull/356))
- **menu:** 修复菜单宽度没有撑满父元素的问题 ([#346](https://github.com/arco-design/arco-design-vue/pull/346))
- **carousel:** out子项内未隐藏 ([#343](https://github.com/arco-design/arco-design-vue/pull/343))
- **select:** 修复组件在 JSX 使用中出现警告、插槽不能使用变量的问题 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- **select:** 修复多选输入框首次点击图标不能弹出下拉菜单的问题 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))

### 💅 样式更新

- **textarea:** 修正禁止模式的样式问题 ([#355](https://github.com/arco-design/arco-design-vue/pull/355))
- **message:** 使用 flex 布局方式展示信息 ([#354](https://github.com/arco-design/arco-design-vue/pull/354))
- **modal:** 修复 modal 信息展示模式错误的问题 ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- **modal:** 简单模式下不展示标题栏关闭按钮 ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- **input-tag:** 优化标签动画和关闭按钮样式 ([#345](https://github.com/arco-design/arco-design-vue/pull/345))


## 2.9.0

`2021-12-03`

### 🆕 新增功能

- **drawer:** `Drawer` 支持 `okButtonProps` 和  `cancelButtonProps` 属性 ([#325](https://github.com/arco-design/arco-design-vue/pull/325))
- **pagination:** 修改和增加插槽，支持模板自定义 ([#324](https://github.com/arco-design/arco-design-vue/pull/324))
- **tree:** 新增属性 `default-expand-selected` `default-expand-checked` `auto-expand-parent` ([#322](https://github.com/arco-design/arco-design-vue/pull/322))
- **steps:** 增加 title 属性 ([#316](https://github.com/arco-design/arco-design-vue/pull/316))

### 🐛 问题修复

- **table:** 修复树形展开按钮触发表单提交的问题 ([#321](https://github.com/arco-design/arco-design-vue/pull/321))
- **spin:** 修复容器模式下切换状态导致子组件重新加载的问题 ([#320](https://github.com/arco-design/arco-design-vue/pull/320))
- **space:** 修复渲染 v-if 节点的问题 ([#318](https://github.com/arco-design/arco-design-vue/pull/318))


## 2.8.0

`2021-12-01`

### ⚠️ 重点注意

- **spin:** 容器模式的非加载情况下，不会再额外增加一层 `<div>`

### 🆕 新增功能

- **textarea:** 增加最小行和最大行的支持 ([#309](https://github.com/arco-design/arco-design-vue/pull/309))
- **select:** 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **cascader:** 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **input-tag:** 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **menu:** 新增属性  `auto-open-selected` ([#306](https://github.com/arco-design/arco-design-vue/pull/306))
- **result:** 增加 `extra` 插槽和 `default` 插槽 ([#302](https://github.com/arco-design/arco-design-vue/pull/302))
- **list:** 增加空数据的展示 ([#296](https://github.com/arco-design/arco-design-vue/pull/296))
- 增加 body 上的 font-family ([#287](https://github.com/arco-design/arco-design-vue/pull/287))

### 🐛 问题修复

- **form:** 修复 `setFields` 方法设定空值失效的问题 ([#311](https://github.com/arco-design/arco-design-vue/pull/311))
- **auto-complete:** 修复 disabled 不可用的问题 ([#310](https://github.com/arco-design/arco-design-vue/pull/310))
- **pagination:** 修复 `disabled` 属性设置为 true 时，输入框和条数选择器未禁用的问题 ([#297](https://github.com/arco-design/arco-design-vue/pull/297))
- **drawer:** 修复设置 `popup-container` 属性时，抽屉仍然是 `fixed` 布局的问题 ([#297](https://github.com/arco-design/arco-design-vue/pull/297))
- **input-number:** 修复 button 模式下按钮没有添加 size 的问题 ([#293](https://github.com/arco-design/arco-design-vue/pull/293))
- **tree:** 动态加载节点后更新勾选状态 ([#206](https://github.com/arco-design/arco-design-vue/pull/206))

### 💅 样式更新

- **radio:** 去除 button 模式下选中加粗的效果 ([#308](https://github.com/arco-design/arco-design-vue/pull/308))
- **cascader:** 去除选项选中加粗的效果 ([#308](https://github.com/arco-design/arco-design-vue/pull/308))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- **progress:** 增加 `track-color` 属性 ([#277](https://github.com/arco-design/arco-design-vue/pull/277))
- **pagination:** 增加 `base-size` & `buffer-size` 属性 ([#275](https://github.com/arco-design/arco-design-vue/pull/275))
- 增加对 web-types 和 vetur 的智能提示支持 ([#272](https://github.com/arco-design/arco-design-vue/pull/272))
- **form:** 增加 `rules` 属性 ([#271](https://github.com/arco-design/arco-design-vue/pull/271))
- **dropdown:** 增加 `disabled` 属性 ([#270](https://github.com/arco-design/arco-design-vue/pull/270))
- **descriptions:** 增加 `align` 属性 ([#268](https://github.com/arco-design/arco-design-vue/pull/268))
- **table:** 增加 `footer` 插槽 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- **table:** 常规模式下表格宽度大于容器时会开启滚动条 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- **avatar:** 支持 `maxStyle` 和 `maxPopoverTriggerProps` 属性。 ([#242](https://github.com/arco-design/arco-design-vue/pull/242))
- **modal:** 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **drawer:** 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **popconfirm:** 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **link:** 增加通过 `icon` 属性/插槽设置图标 ([#226](https://github.com/arco-design/arco-design-vue/pull/226))
- **mention:** 增加 `type`  属性 ([#205](https://github.com/arco-design/arco-design-vue/pull/205))

### 🐛 问题修复

- **input:** 修复数字键盘回车键没有触发 `press-enter` 的问题 ([#273](https://github.com/arco-design/arco-design-vue/pull/273))
- **modal:** 修复初始触发 `open` 事件的问题 ([#267](https://github.com/arco-design/arco-design-vue/pull/267))
- **drawer:** 修复初始触发 `open` 事件的问题 ([#267](https://github.com/arco-design/arco-design-vue/pull/267))
- **menu:** `trigger-props` 不生效 ([#265](https://github.com/arco-design/arco-design-vue/pull/265))
- **menu:** 横向的菜单项收起再展开的时候没有正常显示 ([#264](https://github.com/arco-design/arco-design-vue/pull/264))

### 💅 样式更新

- **steps:** 修复竖直步骤条连线颜色的问题 ([#276](https://github.com/arco-design/arco-design-vue/pull/276))
- 修复新版浏览器中选择图标会出现外边框的问题 ([#274](https://github.com/arco-design/arco-design-vue/pull/274))
- **descriptions:** 修改 value 区域样式，支持换行文本 ([#269](https://github.com/arco-design/arco-design-vue/pull/269))
- **tree:** 让树节点的内容垂直居中 ([#260](https://github.com/arco-design/arco-design-vue/pull/260))


## 2.6.1

`2021-11-24`

### 💎 功能优化

- **table:** 数据为空时不展示滚动 ([#245](https://github.com/arco-design/arco-design-vue/pull/245))

### 🐛 问题修复

- **trigger:** 修复嵌套不同类型 `<trigger>` 时触发错误的问题 ([#244](https://github.com/arco-design/arco-design-vue/pull/244))
- **page-header:** 修复没有子标题时仍然显示分割线的问题 ([#224](https://github.com/arco-design/arco-design-vue/pull/224))
- **table:** 修复展开行按钮触发表单提交的问题 ([#210](https://github.com/arco-design/arco-design-vue/pull/210))
- **steps:** 修复 `<step>` 组件中 `status` 属性不生效的问题 ([#209](https://github.com/arco-design/arco-design-vue/pull/209))
- **form:** 修复表单附加内容样式没生效的问题 ([#208](https://github.com/arco-design/arco-design-vue/pull/208))

### 🆎 类型修正

- 修复在 `<form>` 中使用输入型组件在控制台出现类型警告的问题 ([#247](https://github.com/arco-design/arco-design-vue/pull/247))


## 2.6.0

`2021-11-19`

### 🆕 新增功能

- **input-tag:** 增加退格键的支持 ([#202](https://github.com/arco-design/arco-design-vue/pull/202))
- **select:** 增加 `footer` 插槽 ([#201](https://github.com/arco-design/arco-design-vue/pull/201))
- **textarea:** 增加 `word-length` 属性 ([#199](https://github.com/arco-design/arco-design-vue/pull/199))
- **trigger:** 增加 `prevent-focus` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))
- **select:** 增加 `trigger-props` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))
- **cascader:** 增加 `trigger-props` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))

### 🐛 问题修复

- **select:** 修复 `option` 插槽没有传出 `data` 参数的问题 ([#200](https://github.com/arco-design/arco-design-vue/pull/200))
- **upload:** 修复图片名过长时溢出的问题 ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- **upload:** 修复照片墙模式，超出长度不能换行的问题 ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- 修复 input 型组件重复获取焦点的问题 ([#196](https://github.com/arco-design/arco-design-vue/pull/196))
- **date-picker:** 修复在 form 里校验异常的问题 ([#195](https://github.com/arco-design/arco-design-vue/pull/195))

### 💅 样式更新

- **menu:** 弹出型子菜单适配暗色主题 ([#193](https://github.com/arco-design/arco-design-vue/pull/193))


## 2.5.0

`2021-11-18`

### ⚠️ 重点注意

- **select:** 将 2.4.0 添加的 `options.label` 的自定义渲染移动到 `options.render` 上 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))
- **cascader:** 将 2.4.0 添加的 `options.label` 的自定义渲染移动到 `options.render` 上 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))

### 🆕 新增功能

- **select:** `<option>` 添加 label 属性支持 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))

### 🐛 问题修复

- **tree-select:** 无法选中 key 为 0 的选项 ([#185](https://github.com/arco-design/arco-design-vue/pull/185))
- 修复 input 型组件在弹出层不能获取焦点的问题 ([#184](https://github.com/arco-design/arco-design-vue/pull/184))
- 修复弹出型组件 `z-index` 错误的问题 ([#182](https://github.com/arco-design/arco-design-vue/pull/182))


## 2.4.0

`2021-11-17`

### 💎 功能优化

- **modal:** 统一管理弹出层的 zIndex ([#167](https://github.com/arco-design/arco-design-vue/pull/167))

### 🆕 新增功能

- **cascader:** 增加 `options.value` 数字类型和 `options.label` 自定义渲染的支持 ([#176](https://github.com/arco-design/arco-design-vue/pull/176))
- **upload:** 增加 `upload-button` 和 `upload-item` 插槽 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **upload:** 增加 `success` 和 `error` 事件 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **upload:** 增加 `on-click-button` 、`custom-icon`、`directory ` 属性 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **drawer:** `width` 和 `height` 增加支持字符类型 ([#172](https://github.com/arco-design/arco-design-vue/pull/172))
- **select:** 增加 `option` 插槽 ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- **select:** `options.label` 支持自定义渲染 ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- **tree:** `key` 支持 `number`  类型 ([#169](https://github.com/arco-design/arco-design-vue/pull/169))

### 🐛 问题修复

- **cascader:** 修复搜索输入框不能滚动的问题 ([#175](https://github.com/arco-design/arco-design-vue/pull/175))
- **form:** 修复 `filed` 字段传入 null 导致报错的问题 ([#173](https://github.com/arco-design/arco-design-vue/pull/173))
- **input-tag:** 修复中文输入法问题 ([#171](https://github.com/arco-design/arco-design-vue/pull/171))
- **input-tag:** 修复 Enter 键触发 form 提交的问题 ([#171](https://github.com/arco-design/arco-design-vue/pull/171))
- **trigger:** 修复 `<svg>` 元素定位错误的问题 ([#162](https://github.com/arco-design/arco-design-vue/pull/162))
- **input-tag:** 修复disabled状态下标签仍可被关闭 ([#161](https://github.com/arco-design/arco-design-vue/pull/161))

### 💅 样式更新

- **image:** 将错误状态图标的最大尺寸设置为父元素的大小 ([#160](https://github.com/arco-design/arco-design-vue/pull/160))


## 2.3.0

`2021-11-12`

### 🆕 新增功能

- **form:** 增加 `setFields` 方法 ([#150](https://github.com/arco-design/arco-design-vue/pull/150))
- **message:** 增加 `onClose` 回调方法 ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **message:** 增加 `loading` 方法 ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **notification:** 增加 `onClose` 回调方法 ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **alert:** 增加 `#action` 插槽 ([#148](https://github.com/arco-design/arco-design-vue/pull/148))

### 🐛 问题修复

- **table:** 修复 `<table-column>` 在分组表头错误的问题 ([#151](https://github.com/arco-design/arco-design-vue/pull/151))
- **menu:** 修复嵌套自定义组件的时候父菜单没有高亮的问题 ([#147](https://github.com/arco-design/arco-design-vue/pull/147))
- **alert:** 修复组件导出名字错误的问题 ([#142](https://github.com/arco-design/arco-design-vue/pull/142))
- **textarea:** 修复 `disabled` 不生效的问题 ([#139](https://github.com/arco-design/arco-design-vue/pull/139))
- **textarea:** 修复缺失 `style/index.js` 的问题 ([#139](https://github.com/arco-design/arco-design-vue/pull/139))
- **breadcrumb:** 修复 `breadcrumb-item` 没有继承 Attribute 的问题 ([#137](https://github.com/arco-design/arco-design-vue/pull/137))
- **tree:** 修复设置  `default-checked-keys` 无效的问题 ([#131](https://github.com/arco-design/arco-design-vue/pull/131))
- 当虚拟列表 `data` 改变时重置 VNode 缓存 ([#129](https://github.com/arco-design/arco-design-vue/pull/129))


## 2.2.0

`2021-11-10`

### 🆕 新增功能

- **table:** 增加 `row-key` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- **table:** 增加 `expandable` 中的 `expandedRowRender ` 和 `icon` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- **table:** 增加 `expand-icon` 和 `expand-row` 插槽 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))

### 🐛 问题修复

- **table:** 修复表头分组中表格操作项占位错误的问题 ([#127](https://github.com/arco-design/arco-design-vue/pull/127))
- **trigger:** 修复 `disabled` 状态切换失效的问题 ([#126](https://github.com/arco-design/arco-design-vue/pull/126))
- **upload:** 修复 `limit` 属性无效的问题 ([#123](https://github.com/arco-design/arco-design-vue/pull/123))
- **typography:** 修复无法输入的问题 ([#121](https://github.com/arco-design/arco-design-vue/pull/121))


## 2.1.1

`2021-11-08`

### 💎 功能优化

- **menu:** 将弹出型 `menu` 的默认展开方式改为 hover ([#111](https://github.com/arco-design/arco-design-vue/pull/111))

### 🐛 问题修复

- **modal:** 修复 `title` 属性不生效的问题 ([#116](https://github.com/arco-design/arco-design-vue/pull/116))
- **image:** 修复图片的高度限制无效的问题 ([#115](https://github.com/arco-design/arco-design-vue/pull/115))
- **input-number:** 修复输入负号出错的问题 ([#114](https://github.com/arco-design/arco-design-vue/pull/114))
- **textarea:** 修复 `autoSize` 模式下内部循环更新的问题 ([#113](https://github.com/arco-design/arco-design-vue/pull/113))
- **popconfirm:** 修复 `ok/cancel` 按钮参数丢失的问题 ([#105](https://github.com/arco-design/arco-design-vue/pull/105))


## 2.1.0

`2021-11-05`

### 💎 功能优化

- **tree-select:** 选项的可点击范围默认占满一行 ([#90](https://github.com/arco-design/arco-design-vue/pull/90))
- **tabs:** 优化标签栏滚动方法 ([#87](https://github.com/arco-design/arco-design-vue/pull/87))
- **trigger:** 将外部关闭事件移到 `document` 上 ([#76](https://github.com/arco-design/arco-design-vue/pull/76))

### 🆕 新增功能

- **table:** 添加 `table-column` 中的 `#title` 插槽 ([#95](https://github.com/arco-design/arco-design-vue/pull/95))
- **form:** 增加 `hideAsterisk ` 功能 ([#94](https://github.com/arco-design/arco-design-vue/pull/94))
- **input:** 增加 `wordLength` 属性 ([#91](https://github.com/arco-design/arco-design-vue/pull/91))
- **spin:** 增加 `size` 属性和 `#icon` & `#element` 插槽 ([#86](https://github.com/arco-design/arco-design-vue/pull/86))
- **image:** 增加一个名为 `error-icon` 的 slot 用于支持定制错误状态的图标 ([#85](https://github.com/arco-design/arco-design-vue/pull/85))
- 增加 `日文` 支持 ([#13](https://github.com/arco-design/arco-design-vue/pull/13))

### 🐛 问题修复

- **slider:** 修复点击右键没有释放拖拽事件的问题 ([#97](https://github.com/arco-design/arco-design-vue/pull/97))
- **select:** 修复 `#empty` 插槽丢失的问题 ([#96](https://github.com/arco-design/arco-design-vue/pull/96))
- **input-number:** 修复精度失效的问题 ([#93](https://github.com/arco-design/arco-design-vue/pull/93))
- **input-tag:** 修复输入框宽度计算错误的问题 ([#89](https://github.com/arco-design/arco-design-vue/pull/89))
- **input:** 移除 `keydown` 事件的阻止默认行为 ([#84](https://github.com/arco-design/arco-design-vue/pull/84))
- **table:** 修复 `#column` 插槽不能支持Fragment的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- **table:** 修复 `scroll.x` 单独使用不生效的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- **textarea:** 修复自动高度调整不准的问题 ([#78](https://github.com/arco-design/arco-design-vue/pull/78))
- **input:** 修复 `a-input-number` 组件 `model-value` 默认值为 0 时不生效的问题 ([#75](https://github.com/arco-design/arco-design-vue/pull/75))
- **input:** 修复 `input-search` 和 `input-password` 不支持 `slot` 的问题 ([#63](https://github.com/arco-design/arco-design-vue/pull/63))
- **input:** 修复 `input-password` 切换密码可见状态时光标位置丢失的问题 ([#63](https://github.com/arco-design/arco-design-vue/pull/63))

### 💅 样式更新

- **input:** 修改 `clear-btn` 样式，解决 `select-view` 可能会抖动的问题 ([#70](https://github.com/arco-design/arco-design-vue/pull/70))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- **select:** 修复清除按钮在多选模式下不显示的问题 ([#38](https://github.com/arco-design/arco-design-vue/pull/38))
- **modal:** 修复主按钮类型错误的问题 ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
- **drawer:** 修复主按钮类型错误的问题 ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
- **table:** 修复 `scroll` 模式下，滚动条的显隐导致单元格错位 ([#29](https://github.com/arco-design/arco-design-vue/pull/29))
- **collapse:** 修复 `accordion` 模式不能收起的问题

## 2.0.2

`2021-10-26`

- 组件库默认字体调整

## 2.0.1

`2021-10-25`

- 更新 `package.json` 信息

## 2.0.0

`2021-10-24`

- 🏆 Arco Design Vue 2.0 正式版发布！
