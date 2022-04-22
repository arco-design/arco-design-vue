```yaml
changelog: true
```

## 2.22.0

`2022-04-01`

### 🆕 Feature

- Rendering elements that support modifying form item labels ([#919](https://github.com/arco-design/arco-design-vue/pull/919))

### 💅 Style

- Form item content style increases maximum width to prevent overflow ([#919](https://github.com/arco-design/arco-design-vue/pull/919))


## 2.20.1

`2022-03-21`

### 💅 Style

- Fix `form-item` asterisk compatibility with windicss ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.19.0

`2022-03-11`

### 🐛 BugFix

- Fix the problem that the `field` property of `form-item` is invalid when there is an array in it ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- Fixed the issue that some component functions are still available after `disabled` is enabled ([#807](https://github.com/arco-design/arco-design-vue/pull/807))


## 2.18.0

`2022-03-04`

### 🐛 BugFix

- Fix the problem of reset method invalid in nested data ([#768](https://github.com/arco-design/arco-design-vue/pull/768))


## 2.18.0-beta.2

`2022-02-25`

### 💎 Enhancement

- When `auto-label-width` is enabled, label wrapping is not allowed to prevent calculation errors after wrapping ([#738](https://github.com/arco-design/arco-design-vue/pull/738))

### 🆕 Feature

- Validated error info add label property ([#724](https://github.com/arco-design/arco-design-vue/pull/724))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ Important Attention

- <form-item> component refactoring to use context to manage input components. If the user has a custom input component, you can refer to the `custom input component` example to change. ([#697](https://github.com/arco-design/arco-design-vue/pull/697))


## 2.16.0

`2022-01-21`

### 🆕 Feature

- Added feedback icon function for forms and corresponding input components ([#622](https://github.com/arco-design/arco-design-vue/pull/622))


## 2.14.2

`2022-01-10`

### 🐛 BugFix

- Label-col uses flex layout to solve the problem of wrong height under mini size ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.1

`2022-01-08`

### 🐛 BugFix

- Fix the problem of the default size and style of the form ([#526](https://github.com/arco-design/arco-design-vue/pull/526))


## 2.13.0

`2021-12-31`

### ⚠️ Important Attention

- The `form-item` component adds a new `content-wrapper` div element to wrap the original `content` div element to support the new layout ([#488](https://github.com/arco-design/arco-design-vue/pull/488))

### 🆕 Feature

- Added `autoLabelWidth` property to support adaptive label width ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- Added `labelColFlex` property to support label width setting ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- Add `mergeProps` attribute, support custom attributes and event override ([#486](https://github.com/arco-design/arco-design-vue/pull/486))

### 🐛 BugFix

- Fix the problem that the help content of the form item is displayed incorrectly ([#480](https://github.com/arco-design/arco-design-vue/pull/480))


## 2.10.0

`2021-12-10`

### 🆕 Feature

- `form-item` adds layout and class name related attributes ([#361](https://github.com/arco-design/arco-design-vue/pull/361))


## 2.8.0

`2021-12-01`

### 🐛 BugFix

- Fix the problem of invalid setting of null value in `setFields` method ([#311](https://github.com/arco-design/arco-design-vue/pull/311))


## 2.7.0

`2021-11-26`

### 🆕 Feature

- Add `rules` prop ([#271](https://github.com/arco-design/arco-design-vue/pull/271))


## 2.6.1

`2021-11-24`

### 🐛 BugFix

- Fix the problem that the additional content style of the form does not take effect ([#208](https://github.com/arco-design/arco-design-vue/pull/208))


## 2.4.0

`2021-11-17`

### 🐛 BugFix

- Fix the problem that the input of null in the `filed` field causes an error to be reported ([#173](https://github.com/arco-design/arco-design-vue/pull/173))


## 2.3.0

`2021-11-12`

### 🆕 Feature

- Add `setFields` method ([#150](https://github.com/arco-design/arco-design-vue/pull/150))


## 2.1.0

`2021-11-05`

### 🆕 Feature

- Add `hideAsterisk` prop ([#94](https://github.com/arco-design/arco-design-vue/pull/94))

