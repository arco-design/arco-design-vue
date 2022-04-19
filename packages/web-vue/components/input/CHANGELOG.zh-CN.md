```yaml
changelog: true
```

## 2.23.0

`2022-04-08`

### 💎 功能优化

- 输入类组件的 `clear` 事件会同时触发 `change` 事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))


## 2.18.0-beta.3

`2022-02-26`

### 💎 功能优化

- modelValue 支持 null ([#743](https://github.com/arco-design/arco-design-vue/pull/743))


## 2.17.0

`2022-02-11`

### 💎 功能优化

- 增加 input 元素部分原始属性的透传 ([#664](https://github.com/arco-design/arco-design-vue/pull/664))


## 2.16.2

`2022-01-24`

### 💅 样式更新

- 修复 `input-group` 中使用 input 组件圆角问题 ([#640](https://github.com/arco-design/arco-design-vue/pull/640))


## 2.16.0

`2022-01-21`

### 🆕 新增功能

- `<input-search>` 组件增加自定义搜素按钮内容的功能 ([#625](https://github.com/arco-design/arco-design-vue/pull/625))

### 💅 样式更新

- 修复 `<input-group>` 组件包裹 `<select>` 组件的样式问题 ([#588](https://github.com/arco-design/arco-design-vue/pull/588))


## 2.15.0

`2022-01-14`

### 💅 样式更新

- 修复暗黑模式下背景颜色错误的问题 ([#560](https://github.com/arco-design/arco-design-vue/pull/560))


## 2.14.3

`2022-01-12`

### 🐛 问题修复

- 修复 input-search 在 button 模式属性失效的问题 ([#552](https://github.com/arco-design/arco-design-vue/pull/552))


## 2.14.2

`2022-01-10`

### 🐛 问题修复

- 修复在 Safari 浏览器下 disabled 状态字体颜色错误的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.0

`2022-01-07`

### 🐛 问题修复

- 修复 change 事件触发问题 ([#516](https://github.com/arco-design/arco-design-vue/pull/516))
- 修复当存在前后置标签时，样式设置位置错误的问题 ([#516](https://github.com/arco-design/arco-design-vue/pull/516))


## 2.12.0

`2021-12-24`

### ⚠️ 重点注意

- 修改 change 事件仅在值发生改变时触发 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))

### 🆕 新增功能

- `max-length` 增加 `errorOnly` 属性，增加 `word-slice` 属性 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))


## 2.7.0

`2021-11-26`

### 🐛 问题修复

- 修复数字键盘回车键没有触发 `press-enter` 的问题 ([#273](https://github.com/arco-design/arco-design-vue/pull/273))


## 2.1.0

`2021-11-05`

### 🆕 新增功能

- 增加 `wordLength` 属性 ([#91](https://github.com/arco-design/arco-design-vue/pull/91))

### 🐛 问题修复

- 移除 `keydown` 事件的阻止默认行为 ([#84](https://github.com/arco-design/arco-design-vue/pull/84))
- 修复 `a-input-number` 组件 `model-value` 默认值为 0 时不生效的问题 ([#75](https://github.com/arco-design/arco-design-vue/pull/75))
- 修复 `input-search` 和 `input-password` 不支持 `slot` 的问题 ([#63](https://github.com/arco-design/arco-design-vue/pull/63))
- 修复 `input-password` 切换密码可见状态时光标位置丢失的问题 ([#63](https://github.com/arco-design/arco-design-vue/pull/63))

### 💅 样式更新

- 修改 `clear-btn` 样式，解决 `select-view` 可能会抖动的问题 ([#70](https://github.com/arco-design/arco-design-vue/pull/70))

