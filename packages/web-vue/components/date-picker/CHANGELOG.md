```yaml
changelog: true
```

## 2.47.0

`2023-06-02`

### 🐛 BugFix

- add getDefaultValueFormat to solve v-model for week selector and quarter selector ([#2437](https://github.com/arco-design/arco-design-vue/pull/2437))


## 2.46.1

`2023-05-26`

### 🐛 BugFix

- fixed arrow display logic for year, month, and quarter modes in the date range picker ([#2451](https://github.com/arco-design/arco-design-vue/pull/2451))


## 2.46.0

`2023-05-12`

### 🆎 TypeScript

- DatePicker ([#2359](https://github.com/arco-design/arco-design-vue/pull/2359))


## 2.45.2

`2023-04-21`

### 🐛 BugFix

- fix styling problem with panel-only pickers ([#2349](https://github.com/arco-design/arco-design-vue/pull/2349))


## 2.45.0

`2023-04-07`

### 🆕 Feature

- Add the abbreviation property to control whether the abbreviation of the month is displayed ([#2264](https://github.com/arco-design/arco-design-vue/pull/2264))

### 🐛 BugFix

- Fix the problem that exchange-time fails when selecting ([#2302](https://github.com/arco-design/arco-design-vue/pull/2302))


## 2.44.3

`2023-03-24`

### 🐛 BugFix

- Fix bugs with year range selector ([#2270](https://github.com/arco-design/arco-design-vue/pull/2270))


## 2.43.1

`2023-02-17`

### 🐛 BugFix

- Fix the problem that an error is returned because dayjs does not support quarter parsing ([#2110](https://github.com/arco-design/arco-design-vue/pull/2110))


## 2.43.0

`2023-02-10`

### 🆕 Feature

- Add the `disabled-input` property to disable keyboard input ([#2072](https://github.com/arco-design/arco-design-vue/pull/2072))


## 2.42.0

`2023-01-13`

### 🆕 Feature

- Add blur event to support corresponding inspection in the form ([#1958](https://github.com/arco-design/arco-design-vue/pull/1958))


## 2.41.0

`2022-12-30`

### 🆕 Feature

- `date-picker` supports prefix slots ([#1997](https://github.com/arco-design/arco-design-vue/pull/1997))


## 2.40.1

`2022-12-23`

### 🐛 BugFix

- Fix the problem that the panel text display error under internationalization ([#1965](https://github.com/arco-design/arco-design-vue/pull/1965))


## 2.40.0

`2022-12-09`

### 🐛 BugFix

- Fix the bug that the `feedback` attribute of the `Form` component does not take effect in the `date-picker` component. ([#1932](https://github.com/arco-design/arco-design-vue/pull/1932))


## 2.39.0

`2022-11-18`

### 🐛 BugFix

- year range can't skip by 10 year ([#1847](https://github.com/arco-design/arco-design-vue/pull/1847))


## 2.38.1

`2022-11-04`

### 🐛 BugFix

- Fix internal property error issue ([#1818](https://github.com/arco-design/arco-design-vue/pull/1818))


## 2.38.0-beta.2

`2022-10-21`

### 🐛 BugFix

- Fix the problem of disabled style error under safari ([#1770](https://github.com/arco-design/arco-design-vue/pull/1770))


## 2.35.2

`2022-08-29`

### 🐛 BugFix

- Fixed the click selection event exception when selecting the year and month of the selection panel in some modes ([#1562](https://github.com/arco-design/arco-design-vue/pull/1562))

### 💎 Enhancement

- Optimized range selector also corrects order when selecting ([#1578](https://github.com/arco-design/arco-design-vue/pull/1578))


## 2.35.0

`2022-08-12`

### 🆕 Feature

- `DatePicker` add range picker header label click and normal picker month header label click ([#1421](https://github.com/arco-design/arco-design-vue/pull/1421))


## 2.33.0

`2022-07-08`

### 🐛 BugFix

- Fixed an issue where dropdown menus and clear options could still be opened in readonly mode ([#1400](https://github.com/arco-design/arco-design-vue/pull/1400))


## 2.29.0

`2022-05-27`

### 🆕 Feature

- Added property `show-confirm-btn` to customize whether to show the confirmation button ([#1198](https://github.com/arco-design/arco-design-vue/pull/1198))

### 💎 Enhancement

- only update the date when splicing the time ([#1199](https://github.com/arco-design/arco-design-vue/pull/1199))


## 2.28.0

`2022-05-20`

### 🆕 Feature

- Added property `preview-shortcur` to customize whether to preview the result of shortcut options ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))

### 🐛 BugFix

- `select time` is not internationalized ([#1173](https://github.com/arco-design/arco-design-vue/pull/1173))

### 💎 Enhancement

- Reset back to selected value when moving out of `shortcut` ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))


## 2.27.0

`2022-05-13`

### 🐛 BugFix

- the value of `week-picker ` and `quarter-picker` is wrong when using `v-model` ([#1112](https://github.com/arco-design/arco-design-vue/pull/1112))


## 2.25.1

`2022-04-27`

### 🐛 BugFix

- the button today cannot be hidden by setting showNowBtn to false ([#1046](https://github.com/arco-design/arco-design-vue/pull/1046))


## 2.25.0

`2022-04-22`

### 🆕 Feature

- add property exchangeTime ([#1020](https://github.com/arco-design/arco-design-vue/pull/1020))


## 2.24.0

`2022-04-15`

### 💎 Enhancement

- the selected value will merge with time when timePickerProps has value ([#981](https://github.com/arco-design/arco-design-vue/pull/981))


## 2.21.0

`2022-03-25`

### 🆕 Feature

- `dayStartOfWeek` support set to 0-6 ([#874](https://github.com/arco-design/arco-design-vue/pull/874))


## 2.20.0

`2022-03-18`

### 🐛 BugFix

- the select event is not triggered when the end time selected ([#844](https://github.com/arco-design/arco-design-vue/pull/844))


## 2.19.0

`2022-03-11`

### 🐛 BugFix

- Fix the problem that the offset of the range selector popup layer is wrong ([#796](https://github.com/arco-design/arco-design-vue/pull/796))


## 2.18.0

`2022-03-04`

### 🆕 Feature

- support quick switching of year and month in the head ([#754](https://github.com/arco-design/arco-design-vue/pull/754))


## 2.16.2

`2022-01-24`

### 🐛 BugFix

- `headerValue` reporting error in `vue 3.2.28` ([#643](https://github.com/arco-design/arco-design-vue/pull/643))


## 2.16.0

`2022-01-21`

### 🆕 Feature

- Added attribute `value-format` to format the return value ([#631](https://github.com/arco-design/arco-design-vue/pull/631))

### 🐛 BugFix

- do not open the popup when clear ([#633](https://github.com/arco-design/arco-design-vue/pull/633))
- The return value should not concatenate the time when the time selection panel is not displayed ([#612](https://github.com/arco-design/arco-design-vue/pull/612))


## 2.15.0

`2022-01-14`

### 🐛 BugFix

- fix the problem of missing event parameters ([#579](https://github.com/arco-design/arco-design-vue/pull/579))


## 2.13.0

`2021-12-31`

### 🐛 BugFix

- fix the proplem that property `readonly` is invalid ([#472](https://github.com/arco-design/arco-design-vue/pull/472))


## 2.6.0

`2021-11-19`

### 🐛 BugFix

- Fix the problem of abnormal verification in form ([#195](https://github.com/arco-design/arco-design-vue/pull/195))

