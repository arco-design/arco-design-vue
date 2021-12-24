```yaml
changelog: true
```

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

