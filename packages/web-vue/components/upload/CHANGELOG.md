```yaml
changelog: true
```

## 2.55.2

`2024-05-10`

### 🐛 BugFix

- import missing image styles for upload component ([#3101](https://github.com/arco-design/arco-design-vue/pull/3101))


## 2.55.1

`2024-03-29`


## 2.44.6

`2023-03-31`

### 🐛 BugFix

- modify parameter transferred in extra-button slot ([#2272](https://github.com/arco-design/arco-design-vue/pull/2272))


## 2.44.2

`2023-03-17`

### 🆎 TypeScript

- beforeUpload allows to return a boolean value ([#2204](https://github.com/arco-design/arco-design-vue/pull/2204))


## 2.43.0

`2023-02-10`

### 🆕 Feature

- Added file list extra button slot `#extra-button` ([#2060](https://github.com/arco-design/arco-design-vue/pull/2060))


## 2.42.0

`2023-01-13`

### 🆕 Feature

- Add `showPreviewButton` property ([#2049](https://github.com/arco-design/arco-design-vue/pull/2049))

### 🐛 BugFix

- Fixed an issue that could cause file deletion errors when uploading ([#2048](https://github.com/arco-design/arco-design-vue/pull/2048))


## 2.41.0

`2022-12-30`

### 🆕 Feature

- Add `upload` method ([#2010](https://github.com/arco-design/arco-design-vue/pull/2010))

### 🐛 BugFix

- Fix the bug that the `upload` component judged wrongly when verifying that the uploaded file conforms to the `accept` format in some scenarios. ([#2007](https://github.com/arco-design/arco-design-vue/pull/2007))


## 2.39.1

`2022-11-25`

### 🆕 Feature

- chang the type of utils file ([#1887](https://github.com/arco-design/arco-design-vue/pull/1887))


## 2.39.0

`2022-11-18`

### 💎 Enhancement

- add some common file type ([#1857](https://github.com/arco-design/arco-design-vue/pull/1857))


## 2.34.1

`2022-08-05`

### 🐛 BugFix

- fix the problem of `accept=*` does not work ([#1488](https://github.com/arco-design/arco-design-vue/pull/1488))


## 2.33.0

`2022-07-08`

### 🐛 BugFix

- Fixed usage issues in Alibaba Cloud OSS ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))

### 💅 Style

- Remove trailing space of upload-list-item ([#1379](https://github.com/arco-design/arco-design-vue/pull/1379))


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

