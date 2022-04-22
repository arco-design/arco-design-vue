```yaml
changelog: true
```

## 2.24.0

`2022-04-15`

### 🆎 TypeScript

- `Option, OptionData, GroupOption` interface names are changed to `SelectOption, SelectOptionData, SelectOptionGroup` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))


## 2.23.0

`2022-04-08`

### 🆕 Feature

- add trigger slot ([#952](https://github.com/arco-design/arco-design-vue/pull/952))


## 2.22.0

`2022-04-01`

### 💎 Enhancement

- Enter event can no longer be triggered in loading state ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🆕 Feature

- Added `field-names` attribute to allow custom fields ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🐛 BugFix

- Fixed duplicate options in `allow-create` mode ([#911](https://github.com/arco-design/arco-design-vue/pull/911))


## 2.21.2

`2022-03-29`

### 🐛 BugFix

- Fix the problem that `fallback-option` attribute setting false is invalid ([#893](https://github.com/arco-design/arco-design-vue/pull/893))
- Fixed the problem that the selected label in the multi-selection mode does not display delete by default ([#886](https://github.com/arco-design/arco-design-vue/pull/886))


## 2.20.1

`2022-03-21`

### 💅 Style

- Fixed vertical centering of option #icon slots ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- Fix the problem that the omission is not displayed after the option exceeds the width ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.20.0

`2022-03-18`

### 🐛 BugFix

- Fixed the problem that the search function failed when the virtual list was opened ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- Fix the problem that the `Enter` key on the small keyboard cannot be selected ([#841](https://github.com/arco-design/arco-design-vue/pull/841))


## 2.18.0

`2022-03-04`

### 💎 Enhancement

- Select box display using flex layout ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- trigger-props properties can override default properties ([#778](https://github.com/arco-design/arco-design-vue/pull/778))

### 🐛 BugFix

- Fix the problem that the label attribute is invalid ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- Fix the problem that the properties of option are not updated synchronously ([#777](https://github.com/arco-design/arco-design-vue/pull/777))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 Feature

- Added `search-delay` property and defaulted to `500ms` ([#728](https://github.com/arco-design/arco-design-vue/pull/728))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ Important Attention

- Component uses context refactoring to allow encapsulation of Option components ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- Added `valueKey` attribute, option value supports object form ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- The class name of the <option> component is changed from arco-dropdown-option to arco-select-option, and flex is used to center the layout vertically ([#688](https://github.com/arco-design/arco-design-vue/pull/688))


## 2.16.0

`2022-01-21`

### 🆕 Feature

- Added custom icon slot ([#634](https://github.com/arco-design/arco-design-vue/pull/634))


## 2.15.0

`2022-01-14`

### 💎 Enhancement

- Optimize loading status display ([#557](https://github.com/arco-design/arco-design-vue/pull/557))


## 2.14.3

`2022-01-12`

### 🐛 BugFix

- missing arguments when calling scrollTo ([#543](https://github.com/arco-design/arco-design-vue/pull/543))


## 2.14.2

`2022-01-10`

### 🐛 BugFix

- Fix on-demand loading without imported styles ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.13.0

`2021-12-31`

### 🐛 BugFix

- Fix the problem of Chinese input method when searching ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- Fix the incomplete display of placeholder in `drawer` ([#481](https://github.com/arco-design/arco-design-vue/pull/481))


## 2.11.1

`2021-12-20`

### 🐛 BugFix

- Fix the problem that Group is unavailable when using JSX ([#427](https://github.com/arco-design/arco-design-vue/pull/427))


## 2.10.1

`2021-12-14`

### 🐛 BugFix

- Fix the problem of disabled in the options attribute ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- Fix the problem that the bordered property does not take effect, add an example ([#385](https://github.com/arco-design/arco-design-vue/pull/385))


## 2.10.0

`2021-12-10`

### 💎 Enhancement

- When the input box is editable, clicking will not close the drop-down menu ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 Feature

- Add fallback-option and show-extra-options attributes ([#347](https://github.com/arco-design/arco-design-vue/pull/347))

### 🐛 BugFix

- Fix the problem of warnings when components are used in JSX, and variables cannot be used in slots ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- Fix the problem that the drop-down menu cannot pop up when the icon is clicked for the first time in the multi-select input box ([#347](https://github.com/arco-design/arco-design-vue/pull/347))


## 2.8.0

`2021-12-01`

### 🆕 Feature

- Add support for `tagProps` ([#307](https://github.com/arco-design/arco-design-vue/pull/307))


## 2.6.0

`2021-11-19`

### 🆕 Feature

- Add `footer` slot ([#201](https://github.com/arco-design/arco-design-vue/pull/201))
- Add `trigger-props` property ([#197](https://github.com/arco-design/arco-design-vue/pull/197))

### 🐛 BugFix

- Fix the problem that the `data` parameter is not sent from the `option` slot ([#200](https://github.com/arco-design/arco-design-vue/pull/200))


## 2.5.0

`2021-11-18`

### ⚠️ Important Attention

- Move the custom rendering of `options.label` added in 2.4.0 to `options.render` ([#183](https://github.com/arco-design/arco-design-vue/pull/183))
- `<option>` Add label prop support ([#183](https://github.com/arco-design/arco-design-vue/pull/183))


## 2.4.0

`2021-11-17`

### 🆕 Feature

- Add `option` slot ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- `options.label` supports custom rendering ([#170](https://github.com/arco-design/arco-design-vue/pull/170))


## 2.1.0

`2021-11-05`

### 🐛 BugFix

- Fix the issue of `#empty` slot loss ([#96](https://github.com/arco-design/arco-design-vue/pull/96))


## 2.0.3

`2021-10-29`

### 🐛 BugFix

- Fix the clear button is not displayed in multi-select mode ([#38](https://github.com/arco-design/arco-design-vue/pull/38))

