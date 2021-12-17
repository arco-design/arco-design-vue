```yaml
changelog: true
```

## 2.10.1

`2021-12-14`

### 🐛 BugFix

- **cascader:** Fix the problem of counting errors when there is an empty sub-menu in multi-select mode ([#388](https://github.com/arco-design/arco-design-vue/pull/388))
- **dropdown:** Fix <doption> component disabled failure and attribute inheritance issues ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **select:** Fix the problem of disabled in the options attribute ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **select:** Fix the problem that the bordered property does not take effect, add an example ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **trigger:** Fix the problem that the pop-up layer size change will not trigger the update ([#382](https://github.com/arco-design/arco-design-vue/pull/382))
- **trigger:** Fix the problem that the position and adaptation in `align-point` mode do not take effect ([#382](https://github.com/arco-design/arco-design-vue/pull/382))
- **card:** Fix the problem that the content of slots is not updated ([#380](https://github.com/arco-design/arco-design-vue/pull/380))

### 💅 Style

- **popconfirm:** Fix the component style problem, and adjust the default size of the button to `mini`, which is consistent with React ([#390](https://github.com/arco-design/arco-design-vue/pull/390))
- **input-tag:** Fix the component height problem ([#383](https://github.com/arco-design/arco-design-vue/pull/383))
- **input-tag:** Fix the width of the component close button ([#383](https://github.com/arco-design/arco-design-vue/pull/383))

### 🆎 TypeScript

- **modal:** `ModalConfig` adds `simple` attribute annotation ([#389](https://github.com/arco-design/arco-design-vue/pull/389))


## 2.10.0

`2021-12-10`

### 💎 Optimization

- **select:** When the input box is editable, clicking will not close the drop-down menu ([#348](https://github.com/arco-design/arco-design-vue/pull/348))
- **cascader:** When the input box is editable, clicking will not close the drop-down menu ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 Feature

- **tabs:** Add headerPadding property and enable it by default ([#362](https://github.com/arco-design/arco-design-vue/pull/362))
- **form:** `form-item` adds layout and class name related attributes ([#361](https://github.com/arco-design/arco-design-vue/pull/361))
- **table:** Add span-method prop ([#360](https://github.com/arco-design/arco-design-vue/pull/360))
- **collapse:** key adds support for number ([#358](https://github.com/arco-design/arco-design-vue/pull/358))
- **dropdown:** Add footer slot ([#350](https://github.com/arco-design/arco-design-vue/pull/350))
- **cascader:** Add checkStrictly prop ([#349](https://github.com/arco-design/arco-design-vue/pull/349))
- **select:** Add fallback-option and show-extra-options attributes ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- **grid:** add `flex` property to `a-col` ([#340](https://github.com/arco-design/arco-design-vue/pull/340))

### 🐛 BugFix

- **input-number:** Fix the problem of repeatable input of `-` and `.` ([#359](https://github.com/arco-design/arco-design-vue/pull/359))
- **statistic:** Fix the problem that it does not take effect when precision is 0 ([#357](https://github.com/arco-design/arco-design-vue/pull/357))
- **tabs:** Fix the problem of tab closable failure in editable mode ([#356](https://github.com/arco-design/arco-design-vue/pull/356))
- **menu:** fix the problem that the width of the menu cannot fill the parent element ([#346](https://github.com/arco-design/arco-design-vue/pull/346))
- **carousel:** The out subitem is not hidden ([#343](https://github.com/arco-design/arco-design-vue/pull/343))
- **select:** Fix the problem of warnings when components are used in JSX, and variables cannot be used in slots ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- **select:** Fix the problem that the drop-down menu cannot pop up when the icon is clicked for the first time in the multi-select input box ([#347](https://github.com/arco-design/arco-design-vue/pull/347))

### 💅 Style

- **textarea:** Fix the style problem of prohibited mode ([#355](https://github.com/arco-design/arco-design-vue/pull/355))
- **message:** Use flex layout to display message ([#354](https://github.com/arco-design/arco-design-vue/pull/354))
- **modal:** Fix the problem of modal information display mode error ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- **modal:** The title bar close button is not displayed in simple mode ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- **input-tag:** Optimize label animation and close button style ([#345](https://github.com/arco-design/arco-design-vue/pull/345))


## 2.9.0

`2021-12-03`

### 🆕 Feature

- **drawer:** `Drawer` supports okButtonProps & cancelButtonProps ([#325](https://github.com/arco-design/arco-design-vue/pull/325))
- **pagination:** Modify and add slots, support template customization ([#324](https://github.com/arco-design/arco-design-vue/pull/324))
- **tree:** add prop default-expand-selected default-expand-checked auto-expand-parent ([#322](https://github.com/arco-design/arco-design-vue/pull/322))
- **steps:** add title props ([#316](https://github.com/arco-design/arco-design-vue/pull/316))

### 🐛 BugFix

- **table:** Fix the problem that the tree expand button triggers form submission ([#321](https://github.com/arco-design/arco-design-vue/pull/321))
- **spin:** Fix the problem that switching states in container mode causes sub-components to reload ([#320](https://github.com/arco-design/arco-design-vue/pull/320))
- **space:** Fix the problem of rendering v-if nodes ([#318](https://github.com/arco-design/arco-design-vue/pull/318))


## 2.8.0

`2021-12-01`

### ⚠️ Important Attention

- **spin:** No additional layer of `<div>` will be added when the container mode is not loaded

### 🆕 Feature

- **textarea:** Add support for min rows and max rows ([#309](https://github.com/arco-design/arco-design-vue/pull/309))
- **select:** Add support for `tagProps` ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **cascader:** Add support for `tagProps` ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **input-tag:** Add support for `tagProps` ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **menu:** add prop    auto-open-selected ([#306](https://github.com/arco-design/arco-design-vue/pull/306))
- **result:** Added `extra` slot and `default` slot ([#302](https://github.com/arco-design/arco-design-vue/pull/302))
- **list:** Add the display of empty data ([#296](https://github.com/arco-design/arco-design-vue/pull/296))
- Add the font-family on the body ([#287](https://github.com/arco-design/arco-design-vue/pull/287))

### 🐛 BugFix

- **form:** Fix the problem of invalid setting of null value in `setFields` method ([#311](https://github.com/arco-design/arco-design-vue/pull/311))
- **auto-complete:** Fix the problem that disabled is unavailable ([#310](https://github.com/arco-design/arco-design-vue/pull/310))
- **pagination:** Fix the problem that the input box and the number selector are not disabled when the `disabled` property is set to true ([#297](https://github.com/arco-design/arco-design-vue/pull/297))
- **drawer:** Fix the problem that the drawer is still in the fixed layout when setting the popup-container property ([#297](https://github.com/arco-design/arco-design-vue/pull/297))
- **input-number:** Fix the problem that the button does not add size in button mode ([#293](https://github.com/arco-design/arco-design-vue/pull/293))
- **tree:** Update checked keys after load more ([#206](https://github.com/arco-design/arco-design-vue/pull/206))

### 💅 Style

- **radio:** Remove the selected bold effect in button mode ([#308](https://github.com/arco-design/arco-design-vue/pull/308))
- **cascader:** Remove the option to select the bold effect ([#308](https://github.com/arco-design/arco-design-vue/pull/308))


## 2.7.0

`2021-11-26`

### 🆕 Feature

- **progress:** Add `track-color` prop ([#277](https://github.com/arco-design/arco-design-vue/pull/277))
- **pagination:** add `base-size` & `buffer-size` props ([#275](https://github.com/arco-design/arco-design-vue/pull/275))
- Added support for smart prompts for web-types and vetur ([#272](https://github.com/arco-design/arco-design-vue/pull/272))
- **form:** Add `rules` prop ([#271](https://github.com/arco-design/arco-design-vue/pull/271))
- **dropdown:** Add `disabled` prop ([#270](https://github.com/arco-design/arco-design-vue/pull/270))
- **descriptions:** Add the `align` prop ([#268](https://github.com/arco-design/arco-design-vue/pull/268))
- **table:** Add `footer` slot ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- **table:** In normal mode, the scroll bar will be turned on when the table width is larger than the container ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- **avatar:** supports `maxStyle` and `maxPopoverTriggerProps` properties. ([#242](https://github.com/arco-design/arco-design-vue/pull/242))
- **modal:** Added `on-before-ok` and `on-before-cancel` property events ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **drawer:** Added `on-before-ok` and `on-before-cancel` property events ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **popconfirm:** Added `on-before-ok` and `on-before-cancel` property events ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **link:** Add icon setting via `icon` property/slot property or slot ([#226](https://github.com/arco-design/arco-design-vue/pull/226))
- **mention:** Add `type` prop ([#205](https://github.com/arco-design/arco-design-vue/pull/205))

### 🐛 BugFix

- **input:** Fix the problem that the enter key of the numeric keyboard does not trigger `press-enter` ([#273](https://github.com/arco-design/arco-design-vue/pull/273))
- **modal:** Fix the issue of initial triggering of the `open` event ([#267](https://github.com/arco-design/arco-design-vue/pull/267))
- **drawer:** Fix the issue of initial triggering of the `open` event ([#267](https://github.com/arco-design/arco-design-vue/pull/267))
- **menu:** the prop trigger-props take no effect ([#265](https://github.com/arco-design/arco-design-vue/pull/265))
- **menu:** Horizontal menu items are not displayed normally when they are collapsed and then expanded ([#264](https://github.com/arco-design/arco-design-vue/pull/264))

### 💅 Style

- **steps:** Fix the problem of the connection color of the vertical step bar ([#276](https://github.com/arco-design/arco-design-vue/pull/276))
- Fix the problem that the outer border of the icon will appear when selecting the icon in the new version of the browser ([#274](https://github.com/arco-design/arco-design-vue/pull/274))
- **descriptions:** Modify the style of the value area to support line-wrapping text ([#269](https://github.com/arco-design/arco-design-vue/pull/269))
- **tree:** let the content of tree node centerd in vertical ([#260](https://github.com/arco-design/arco-design-vue/pull/260))


## 2.6.1

`2021-11-24`

### 💎 Optimization

- **table:** Do not scroll when data is empty ([#245](https://github.com/arco-design/arco-design-vue/pull/245))

### 🐛 BugFix

- **trigger:** Fix the problem of triggering errors when nesting different types of `<trigger>` ([#244](https://github.com/arco-design/arco-design-vue/pull/244))
- **page-header:** Fix the problem that the dividing line is still displayed when there is no subtitle ([#224](https://github.com/arco-design/arco-design-vue/pull/224))
- **table:** Fix the issue that the expand row button triggers form submission ([#210](https://github.com/arco-design/arco-design-vue/pull/210))
- **steps:** Fix the problem that the `status` attribute in the `<step>` component does not take effect ([#209](https://github.com/arco-design/arco-design-vue/pull/209))
- **form:** Fix the problem that the additional content style of the form does not take effect ([#208](https://github.com/arco-design/arco-design-vue/pull/208))

### 🆎 TypeScript

- Fix the issue of type warning in the console when using input components in `<form>` ([#247](https://github.com/arco-design/arco-design-vue/pull/247))


## 2.6.0

`2021-11-19`

### 🆕 Feature

- **input-tag:** Add support for backspace key ([#202](https://github.com/arco-design/arco-design-vue/pull/202))
- **select:** Add `footer` slot ([#201](https://github.com/arco-design/arco-design-vue/pull/201))
- **textarea:** Add `word-length` attribute ([#199](https://github.com/arco-design/arco-design-vue/pull/199))
- **trigger:** Add `prevent-focus` property ([#197](https://github.com/arco-design/arco-design-vue/pull/197))
- **select:** Add `trigger-props` property ([#197](https://github.com/arco-design/arco-design-vue/pull/197))
- **cascader:** Add `trigger-props` property ([#197](https://github.com/arco-design/arco-design-vue/pull/197))

### 🐛 BugFix

- **select:** Fix the problem that the `data` parameter is not sent from the `option` slot ([#200](https://github.com/arco-design/arco-design-vue/pull/200))
- **upload:** Fix the problem of overflow when the picture name is too long ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- **upload:** Fix the problem that the photo wall mode cannot wrap when it exceeds the length ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- Fix the problem that input type components repeatedly get focus ([#196](https://github.com/arco-design/arco-design-vue/pull/196))
- **date-picker:** Fix the problem of abnormal verification in form ([#195](https://github.com/arco-design/arco-design-vue/pull/195))

### 💅 Style

- **menu:** pop menu adapts to dark theme ([#193](https://github.com/arco-design/arco-design-vue/pull/193))


## 2.5.0

`2021-11-18`

### ⚠️ Important Attention

- **select:** Move the custom rendering of `options.label` added in 2.4.0 to `options.render` ([#183](https://github.com/arco-design/arco-design-vue/pull/183))
- **cascader:** Move the custom rendering of `options.label` added in 2.4.0 to `options.render` ([#183](https://github.com/arco-design/arco-design-vue/pull/183))

### 🆕 Feature

- **select:** `<option>` Add label prop support ([#183](https://github.com/arco-design/arco-design-vue/pull/183))

### 🐛 BugFix

- **tree-select:** cannot select the option with key 0 ([#185](https://github.com/arco-design/arco-design-vue/pull/185))
- Fix the problem that the input type component cannot get the focus in the pop-up layer ([#184](https://github.com/arco-design/arco-design-vue/pull/184))
- Fix the problem of pop-up component `z-index` error ([#182](https://github.com/arco-design/arco-design-vue/pull/182))


## 2.4.0

`2021-11-17`

### 💎 Optimization

- **modal:** Manage the zIndex of the popup ([#167](https://github.com/arco-design/arco-design-vue/pull/167))

### 🆕 Feature

- **cascader:** Add `options.value` number type and `options.label` custom rendering support ([#176](https://github.com/arco-design/arco-design-vue/pull/176))
- **upload:** Added `upload-button` and `upload-item` slots ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **upload:** Added `success` and `error` events ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **upload:** Add `on-click-button`, `custom-icon`, `directory` attributes ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **drawer:** `width` and `height` added support for character types ([#172](https://github.com/arco-design/arco-design-vue/pull/172))
- **select:** Add `option` slot ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- **select:** `options.label` supports custom rendering ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- **tree:** `key` support `number` ([#169](https://github.com/arco-design/arco-design-vue/pull/169))

### 🐛 BugFix

- **cascader:** Fix the problem that the search input box cannot be scrolled ([#175](https://github.com/arco-design/arco-design-vue/pull/175))
- **form:** Fix the problem that the input of null in the `filed` field causes an error to be reported ([#173](https://github.com/arco-design/arco-design-vue/pull/173))
- **input-tag:** Fix Chinese input method problem ([#171](https://github.com/arco-design/arco-design-vue/pull/171))
- **input-tag:** Fix the issue that the Enter key triggers form submission ([#171](https://github.com/arco-design/arco-design-vue/pull/171))
- **trigger:** Fix the problem of `<svg>` element positioning error ([#162](https://github.com/arco-design/arco-design-vue/pull/162))
- **input-tag:** fix tag can be close in the disabled state ([#161](https://github.com/arco-design/arco-design-vue/pull/161))

### 💅 Style

- **image:** set the max size of error to fit parent ([#160](https://github.com/arco-design/arco-design-vue/pull/160))


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
