```yaml
changelog: true
```

## 2.24.0

`2022-04-15`

### 🐛 BugFix

- Fix the problem that the half-selected state of the checkbox is displayed incorrectly ([#963](https://github.com/arco-design/arco-design-vue/pull/963))


## 2.23.0

`2022-04-08`

### 🆕 Feature

- add empty slot ([#952](https://github.com/arco-design/arco-design-vue/pull/952))

### 🐛 BugFix

- Fix the problem that lazy loaded isLeaf is invalid in version 2.22.0 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- Fixed an issue where the options property could not trigger an update in some cases ([#952](https://github.com/arco-design/arco-design-vue/pull/952))


## 2.22.0

`2022-04-01`

### 🆕 Feature

- Added `field-names` attribute to allow custom fields ([#912](https://github.com/arco-design/arco-design-vue/pull/912))


## 2.20.0

`2022-03-18`

### 🆕 Feature

- Add `cascader-panel` component ([#842](https://github.com/arco-design/arco-design-vue/pull/842))

### 🐛 BugFix

- Fix the problem that the selected path of the drop-down menu may not match the current value ([#843](https://github.com/arco-design/arco-design-vue/pull/843))


## 2.18.0

`2022-03-04`

### 🆕 Feature

- Added `#option`, `#label` slots ([#781](https://github.com/arco-design/arco-design-vue/pull/781))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 Feature

- Added `search-delay` property and defaulted to `500ms` ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- Add the `search-option-only-label` attribute and modify the default display path label of the options in the search drop-down menu ([#729](https://github.com/arco-design/arco-design-vue/pull/729))

### 🐛 BugFix

- Fix the problem that the selection box display is not updated after the option is updated ([#727](https://github.com/arco-design/arco-design-vue/pull/727))


## 2.18.0-beta.1

`2022-02-18`

### 🐛 BugFix

- Fixed an issue where disabled items could still be selected via radio selectors in strict mode ([#701](https://github.com/arco-design/arco-design-vue/pull/701))
- Fixed an issue where search results in strict mode did not include path options ([#701](https://github.com/arco-design/arco-design-vue/pull/701))


## 2.16.0

`2022-01-21`

### 🐛 BugFix

- Fixed an issue where the search could not be selected in `check-strictly` mode ([#627](https://github.com/arco-design/arco-design-vue/pull/627))


## 2.15.0

`2022-01-14`

### 🆕 Feature

- Add loading prop ([#558](https://github.com/arco-design/arco-design-vue/pull/558))


## 2.13.0

`2021-12-31`

### 🆕 Feature

- Added `load-more` attribute to support lazy loading of data ([#476](https://github.com/arco-design/arco-design-vue/pull/476))


## 2.11.0

`2021-12-17`

### 🐛 BugFix

- Fix the problem that the level totalLevel is calculated incorrectly ([#399](https://github.com/arco-design/arco-design-vue/pull/399))


## 2.10.1

`2021-12-14`

### 🐛 BugFix

- Fix the problem of counting errors when there is an empty sub-menu in multi-select mode ([#388](https://github.com/arco-design/arco-design-vue/pull/388))


## 2.10.0

`2021-12-10`

### 💎 Enhancement

- When the input box is editable, clicking will not close the drop-down menu ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 Feature

- Add checkStrictly prop ([#349](https://github.com/arco-design/arco-design-vue/pull/349))


## 2.8.0

`2021-12-01`

### 🆕 Feature

- Add support for `tagProps` ([#307](https://github.com/arco-design/arco-design-vue/pull/307))

### 💅 Style

- Remove the option to select the bold effect ([#308](https://github.com/arco-design/arco-design-vue/pull/308))


## 2.6.0

`2021-11-19`

### 🆕 Feature

- Add `trigger-props` property ([#197](https://github.com/arco-design/arco-design-vue/pull/197))


## 2.5.0

`2021-11-18`

### ⚠️ Important Attention

- Move the custom rendering of `options.label` added in 2.4.0 to `options.render` ([#183](https://github.com/arco-design/arco-design-vue/pull/183))


## 2.4.0

`2021-11-17`

### 🆕 Feature

- Add `options.value` number type and `options.label` custom rendering support ([#176](https://github.com/arco-design/arco-design-vue/pull/176))

### 🐛 BugFix

- Fix the problem that the search input box cannot be scrolled ([#175](https://github.com/arco-design/arco-design-vue/pull/175))

