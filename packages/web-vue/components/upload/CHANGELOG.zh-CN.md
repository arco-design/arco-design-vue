```yaml
changelog: true
```

## 2.55.2

`2024-05-10`

### 🐛 问题修复

- 修复上传组件预览样式引入缺失 ([#3101](https://github.com/arco-design/arco-design-vue/pull/3101))


## 2.55.1

`2024-03-29`


## 2.44.6

`2023-03-31`

### 🐛 问题修复

- 调整 extra-button 插槽参数 ([#2272](https://github.com/arco-design/arco-design-vue/pull/2272))


## 2.44.2

`2023-03-17`

### 🆎 类型修正

- 允许beforeUpload返回布尔值 ([#2204](https://github.com/arco-design/arco-design-vue/pull/2204))


## 2.43.0

`2023-02-10`

### 🆕 新增功能

- 新增文件列表额外按钮插槽 `#extra-button` ([#2060](https://github.com/arco-design/arco-design-vue/pull/2060))


## 2.42.0

`2023-01-13`

### 🆕 新增功能

- 增加 `showPreviewButton` 属性 ([#2049](https://github.com/arco-design/arco-design-vue/pull/2049))

### 🐛 问题修复

- 修复上传时可能导致删除文件错误的问题 ([#2048](https://github.com/arco-design/arco-design-vue/pull/2048))


## 2.41.0

`2022-12-30`

### 🆕 新增功能

- 增加 `upload` 方法 ([#2010](https://github.com/arco-design/arco-design-vue/pull/2010))

### 🐛 问题修复

- 修复 `upload` 组件在部分场景下验证上传文件符合 `accept` 格式时，判断错误的 bug。 ([#2007](https://github.com/arco-design/arco-design-vue/pull/2007))


## 2.39.1

`2022-11-25`

### 🆕 新增功能

- 更改utils文件的类型 ([#1887](https://github.com/arco-design/arco-design-vue/pull/1887))


## 2.39.0

`2022-11-18`

### 💎 功能优化

- 添加一些常见的文件类型 ([#1857](https://github.com/arco-design/arco-design-vue/pull/1857))


## 2.34.1

`2022-08-05`

### 🐛 问题修复

- 修复设置 `accept=*` 时失效的问题 ([#1488](https://github.com/arco-design/arco-design-vue/pull/1488))


## 2.33.0

`2022-07-08`

### 🐛 问题修复

- 修复在阿里云OSS中的使用问题 ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))

### 💅 样式更新

- 移除了 upload-list-item 末尾的多余空白 ([#1379](https://github.com/arco-design/arco-design-vue/pull/1379))


## 2.23.0

`2022-04-08`

### 🆕 新增功能

- 增加图标相关插槽 ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- 增加 updateFile 方法，onBeforeUpload 支持返回 File ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- 优化初始图片显示逻辑 ([#944](https://github.com/arco-design/arco-design-vue/pull/944))


## 2.22.0

`2022-04-01`

### 🐛 问题修复

- 修复 onButtonClick 属性不可用的问题 ([#907](https://github.com/arco-design/arco-design-vue/pull/907))


## 2.18.1

`2022-03-07`

### 🐛 问题修复

- 修复上传进度计算错误的问题 ([#786](https://github.com/arco-design/arco-design-vue/pull/786))
- 修复上传中，取消按钮失效的问题 ([#786](https://github.com/arco-design/arco-design-vue/pull/786))


## 2.18.0-beta.2

`2022-02-25`

### 🐛 问题修复

- 修复使用插槽 `upload-item` 报错的问题 ([#715](https://github.com/arco-design/arco-design-vue/pull/715))
- 仅在文件类型为图片时生成初始预览图片 ([#706](https://github.com/arco-design/arco-design-vue/pull/706))


## 2.14.0

`2022-01-07`

### 🆕 新增功能

- 增加 imagePreview 属性，可以使用内置图片预览功能 ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- 当 `listType` 为图片类时，默认设置 accept 为 `image/*` ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- 增加 `showOnExceedLimit` 属性 ([#517](https://github.com/arco-design/arco-design-vue/pull/517))


## 2.13.0

`2021-12-31`

### 🆕 新增功能

- 增加 `show-link` 属性 ([#483](https://github.com/arco-design/arco-design-vue/pull/483))


## 2.12.1

`2021-12-24`

### 🐛 问题修复

- 修复照片墙模式错误的问题 ([#457](https://github.com/arco-design/arco-design-vue/pull/457))


## 2.12.0

`2021-12-24`

### 🐛 问题修复

- 修复按钮模式下 tip 没有显示的问题 ([#446](https://github.com/arco-design/arco-design-vue/pull/446))
- 修复 `upload` 组件的禁用样式不生效的 bug ([#430](https://github.com/arco-design/arco-design-vue/pull/430))


## 2.11.0

`2021-12-17`

### 🆕 新增功能

- 增加 `download` 属性 ([#418](https://github.com/arco-design/arco-design-vue/pull/418))
- 新增 `show-remove-buttoon` 、`show-retry-button`、`show-cancel-button` 属性 ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- 新增 `imageLoading` 属性 ([#396](https://github.com/arco-design/arco-design-vue/pull/396))

### 🐛 问题修复

- 修复上传中的图标位置不对的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- 修复拖拽上传文件夹时，`beforeUpload` 的第二个参数获取到的不是全部文件的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- 修复拖拽上传时，鼠标进入内部文字，拖拽样式闪动的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))


## 2.6.0

`2021-11-19`

### 🐛 问题修复

- 修复图片名过长时溢出的问题 ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- 修复照片墙模式，超出长度不能换行的问题 ([#198](https://github.com/arco-design/arco-design-vue/pull/198))


## 2.4.0

`2021-11-17`

### 🆕 新增功能

- 增加 `upload-button` 和 `upload-item` 插槽 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- 增加 `success` 和 `error` 事件 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- 增加 `on-click-button` 、`custom-icon`、`directory ` 属性 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))


## 2.2.0

`2021-11-10`

### 🐛 问题修复

- 修复 `limit` 属性无效的问题 ([#123](https://github.com/arco-design/arco-design-vue/pull/123))

