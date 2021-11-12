```yaml
changelog: true
```

## 2.3.0

`2021-11-12`

### 🆕 Feature

- **form:** Add `setFields` method ([#150](https://github.com/arco-design/arco-design-vue/pull/150))
- **message:** Added `onClose` callback method ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **message:** Added `loading` method ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **notification:** Added `onClose` callback method ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **alert:** Add `#action` slot ([#148](https://github.com/arco-design/arco-design-vue/pull/148))

### 🐛 BugFix

- **table:** Fix the problem that `<table-column>` is wrong in the header of the grouping table ([#151](https://github.com/arco-design/arco-design-vue/pull/151))
- **menu:** Fix the problem that the parent menu is not selected when nesting custom components ([#147](https://github.com/arco-design/arco-design-vue/pull/147))
- **alert:** Fix the problem of incorrect name export by alert ([#142](https://github.com/arco-design/arco-design-vue/pull/142))
- **textarea:** Fix the problem that `disabled` does not take effect ([#139](https://github.com/arco-design/arco-design-vue/pull/139))
- **textarea:** Fix the issue of missing `style/index.js` ([#139](https://github.com/arco-design/arco-design-vue/pull/139))
- **breadcrumb:** Fix the problem of `breadcrumb-item` not inheriting Attribute ([#137](https://github.com/arco-design/arco-design-vue/pull/137))
- **tree:** Fix the problem that the setting of `default-checked-keys` is invalid ([#131](https://github.com/arco-design/arco-design-vue/pull/131))
- Reset VNode cache when virtual list `data` changes ([#129](https://github.com/arco-design/arco-design-vue/pull/129))


## 2.2.0

`2021-11-10`

### 🆕 Feature

- **table:** Add `row-key` prop ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- **table:** Add `expandedRowRender` and `icon` props in `expandable` ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- **table:** Add `expand-icon` and `expand-row` slots ([#128](https://github.com/arco-design/arco-design-vue/pull/128))

### 🐛 BugFix

- **table:** Fix the problem that the table operation items in the header grouping are occupied incorrectly ([#127](https://github.com/arco-design/arco-design-vue/pull/127))
- **trigger:** Fix the problem of invalid state switching of `disabled` ([#126](https://github.com/arco-design/arco-design-vue/pull/126))
- **upload:** Fix the problem of invalid `limit` prop ([#123](https://github.com/arco-design/arco-design-vue/pull/123))
- **typography:** Fixed the problem of unable input ([#121](https://github.com/arco-design/arco-design-vue/pull/121))


## 2.1.1

`2021-11-08`

### 💎 Optimization

- **menu:** Change the default expansion method of pop-up `menu` to hover ([#111](https://github.com/arco-design/arco-design-vue/pull/111))

### 🐛 BugFix

- **modal:** Fix the problem that the `title` attribute does not take effect ([#116](https://github.com/arco-design/arco-design-vue/pull/116))
- **image:** Fix the problem that the height limit of the img is invalid ([#115](https://github.com/arco-design/arco-design-vue/pull/115))
- **input-number:** Fix the problem of inputting the negative sign error ([#114](https://github.com/arco-design/arco-design-vue/pull/114))
- **textarea:** Fix the problem of internal loop update in `autoSize` mode ([#113](https://github.com/arco-design/arco-design-vue/pull/113))
- **popconfirm:** Fix the problem that the parameters of the `ok/cancel` button are lost ([#105](https://github.com/arco-design/arco-design-vue/pull/105))


## 2.1.0

`2021-11-05`

### 💎 Optimization

- **tree-select:** The clickable range of options occupies the entire row by default ([#90](https://github.com/arco-design/arco-design-vue/pull/90))
- **tabs:** Optimize the scrolling method of the tab bar ([#87](https://github.com/arco-design/arco-design-vue/pull/87))
- **trigger:** Move the `outsideClickHandler` to the `document` ([#76](https://github.com/arco-design/arco-design-vue/pull/76))

### 🆕 Feature

- **table:** Add the `#title` slot in `table-column` ([#95](https://github.com/arco-design/arco-design-vue/pull/95))
- **form:** Add `hideAsterisk` prop ([#94](https://github.com/arco-design/arco-design-vue/pull/94))
- **input:** Add `wordLength` prop ([#91](https://github.com/arco-design/arco-design-vue/pull/91))
- **spin:** Add size prop and icon & element slot ([#86](https://github.com/arco-design/arco-design-vue/pull/86))
- **image:** Add a slot named error-icon to support custom error status icon ([#85](https://github.com/arco-design/arco-design-vue/pull/85))
- Add `Japanese` support ([#13](https://github.com/arco-design/arco-design-vue/pull/13))

### 🐛 BugFix

- **slider:** Fixed the problem that the right click did not release the drag event ([#97](https://github.com/arco-design/arco-design-vue/pull/97))
- **select:** Fix the issue of `#empty` slot loss ([#96](https://github.com/arco-design/arco-design-vue/pull/96))
- **input-number:** Fix the problem of invalid accuracy ([#93](https://github.com/arco-design/arco-design-vue/pull/93))
- **input-tag:** Fix the problem that the width of the input box is calculated incorrectly ([#89](https://github.com/arco-design/arco-design-vue/pull/89))
- **input:** Remove `preventDefault` of keyDown event ([#84](https://github.com/arco-design/arco-design-vue/pull/84))
- **table:** Fix the issue that `#column` slot cannot support Fragment ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- **table:** Fix the problem that `scroll.x` does not take effect when used alone ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- **textarea:** Fix the problem of inaccurate automatic height adjustment ([#78](https://github.com/arco-design/arco-design-vue/pull/78))
- **input:** Fix the issue that the `a-input-number` component `model-value` does not take effect when the default value is 0 ([#75](https://github.com/arco-design/arco-design-vue/pull/75))
- **input:** Fix the problem that `input-search` and `input-password` do not support `slot` ([#63](https://github.com/arco-design/arco-design-vue/pull/63))
- **input:** Fix the problem that the cursor position is lost when `input-password` is switched to the visible state of the password ([#63](https://github.com/arco-design/arco-design-vue/pull/63))

### 💅 Style

- **input:** Modify the style of `clear-btn` to solve the problem that `select-view` may jitter ([#70](https://github.com/arco-design/arco-design-vue/pull/70))


## 2.0.3

`2021-10-29`

### 🐛 BugFix

- **select:** Fix the clear button is not displayed in multi-select mode ([#38](https://github.com/arco-design/arco-design-vue/pull/38))
- **modal:** Fix the problem of the wrong type of the main button ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
- **drawer:** Fix the problem of the wrong type of the main button ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
- **table:** Fix the display of scroll bar in `scroll` mode, causing cell misalignment ([#29](https://github.com/arco-design/arco-design-vue/pull/29))
- **collapse:** Fix the problem that the `accordion` mode cannot be folded

## 2.0.2

`2021-10-26`

- Component library default font adjustment

## 2.0.1

`2021-10-25`

- Update `package.json` info

## 2.0.0

`2021-10-24`

- 🏆 Arco Design Vue 2.0 official version is released!
