```yaml
changelog: true
```

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
