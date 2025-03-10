```yaml
changelog: true
```

## 2.57.0

`2025-03-10`

### 🐛 BugFix

- fix where form id attribute was consumed and could not be propagated ([#3450](https://github.com/arco-design/arco-design-vue/pull/3450))


## 2.54.0

`2023-12-15`


## 2.51.2

`2023-09-15`

### 🐛 BugFix

- scroll-to-first-error throws error in nested form items ([#2707](https://github.com/arco-design/arco-design-vue/pull/2707))


## 2.51.0

`2023-09-01`

### 🆕 Feature

- add scroll into view to the field ([#2680](https://github.com/arco-design/arco-design-vue/pull/2680))


## 2.44.2

`2023-03-17`

### 🐛 BugFix

- Fix the problem that the array format is not supported in the field attribute ([#2242](https://github.com/arco-design/arco-design-vue/pull/2242))

### 💎 Enhancement

- Add Chinese inspection information ([#2240](https://github.com/arco-design/arco-design-vue/pull/2240))


## 2.43.2

`2023-02-24`

### 🐛 BugFix

- Fix invalidation of validateStatus of FormItem ([#2158](https://github.com/arco-design/arco-design-vue/pull/2158))


## 2.41.0

`2022-12-30`

### 🆕 Feature

- `form-item` supports tooltip property ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))
- `form-item` supports asteriskPosition property ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))


## 2.40.0

`2022-12-09`

### 🐛 BugFix

- Fix the bug that `validate-status` attribute of `Form` component does not take effect in `date-picker` component. ([#1928](https://github.com/arco-design/arco-design-vue/pull/1928))


## 2.38.0

`2022-10-28`

### 🐛 BugFix

- Do not modify the original object data of the rule ([#1779](https://github.com/arco-design/arco-design-vue/pull/1779))


## 2.33.1

`2022-07-22`

### 🐛 BugFix

- Fix form-item content may exceed limit width ([#1437](https://github.com/arco-design/arco-design-vue/pull/1437))


## 2.31.0

`2022-06-17`

### 🆕 Feature

- Added parameter support for resetFields and clearValidate methods ([#1305](https://github.com/arco-design/arco-design-vue/pull/1305))


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

