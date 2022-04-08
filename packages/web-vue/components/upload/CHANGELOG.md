```yaml
changelog: true
```

## 2.23.0

`2022-04-08`

### 🆕 Feature

- Added icon related slots ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- Added updateFile method, onBeforeUpload supports returning File ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- Optimize initial image display logic ([#944](https://github.com/arco-design/arco-design-vue/pull/944))


## 2.22.0

`2022-04-01`

### 🐛 BugFix

- Fix onButtonClick property not available ([#907](https://github.com/arco-design/arco-design-vue/pull/907))


## 2.18.1

`2022-03-07`

### 🐛 BugFix

- Fix the problem of incorrect upload progress calculation ([#786](https://github.com/arco-design/arco-design-vue/pull/786))
- Fix the problem that the cancel button does not work during uploading ([#786](https://github.com/arco-design/arco-design-vue/pull/786))


## 2.18.0-beta.2

`2022-02-25`

### 🐛 BugFix

- fix error when using slot `upload-item` ([#715](https://github.com/arco-design/arco-design-vue/pull/715))
- Generate initial preview image only if file type is image ([#706](https://github.com/arco-design/arco-design-vue/pull/706))


## 2.14.0

`2022-01-07`

### 🆕 Feature

- Increase the imagePreview property, you can use the built-in image preview function ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- When `listType` is an image class, the default accept is `image/*` ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- Added `showOnExceedLimit` prop ([#517](https://github.com/arco-design/arco-design-vue/pull/517))


## 2.13.0

`2021-12-31`

### 🆕 Feature

- Add `show-link` attribute ([#483](https://github.com/arco-design/arco-design-vue/pull/483))


## 2.12.1

`2021-12-24`

### 🐛 BugFix

- Fix the problem of wrong photo wall mode ([#457](https://github.com/arco-design/arco-design-vue/pull/457))


## 2.12.0

`2021-12-24`

### 🐛 BugFix

- Fix the problem that tip is not displayed in button mode ([#446](https://github.com/arco-design/arco-design-vue/pull/446))
- Fix the bug that the disabled style of the `upload` component does not take effect ([#430](https://github.com/arco-design/arco-design-vue/pull/430))


## 2.11.0

`2021-12-17`

### 🆕 Feature

- Add `download` attribute ([#418](https://github.com/arco-design/arco-design-vue/pull/418))
- add `show-remove-buttoon` and `show-retry-button` and `show-cancel-button` property ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- add `imageLoading` property ([#396](https://github.com/arco-design/arco-design-vue/pull/396))

### 🐛 BugFix

- Fix the problem of the wrong position of the icon in the upload ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- Fix the problem that not all files are obtained by the second parameter of `beforeUpload` when uploading folders by dragging and dropping ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- Fix the problem that the dragging style flashes when the mouse enters the internal text when dragging and uploading ([#417](https://github.com/arco-design/arco-design-vue/pull/417))


## 2.6.0

`2021-11-19`

### 🐛 BugFix

- Fix the problem of overflow when the picture name is too long ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- Fix the problem that the photo wall mode cannot wrap when it exceeds the length ([#198](https://github.com/arco-design/arco-design-vue/pull/198))


## 2.4.0

`2021-11-17`

### 🆕 Feature

- Added `upload-button` and `upload-item` slots ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- Added `success` and `error` events ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- Add `on-click-button`, `custom-icon`, `directory` attributes ([#174](https://github.com/arco-design/arco-design-vue/pull/174))


## 2.2.0

`2021-11-10`

### 🐛 BugFix

- Fix the problem of invalid `limit` prop ([#123](https://github.com/arco-design/arco-design-vue/pull/123))

