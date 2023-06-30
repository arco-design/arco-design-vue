```yaml
changelog: true
```

## 2.48.0

`2023-06-30`

### 🆕 Feature

- **config-provider:** Add `exchangeTime` property ([#2529](https://github.com/arco-design/arco-design-vue/pull/2529))
- **table:** Added mouse in and out events for cells ([#2489](https://github.com/arco-design/arco-design-vue/pull/2489))

### 🐛 BugFix

- **table:** add headerCell down to adjust column width highlight ([#2519](https://github.com/arco-design/arco-design-vue/pull/2519))
- **list:** fix virtual-list scrolling position is wrong when data is modified ([#2502](https://github.com/arco-design/arco-design-vue/pull/2502))


## 2.47.1

`2023-06-09`

### 🐛 BugFix

- **tree-select:** Fix the problem that the search content under the virtual list cannot be selected ([#2488](https://github.com/arco-design/arco-design-vue/pull/2488))
- **select:** Fix mouse cursor positioning issue in search mode ([#2487](https://github.com/arco-design/arco-design-vue/pull/2487))
- **badge:** Fix the problem that components fail when customizing `prefix-cls` ([#2476](https://github.com/arco-design/arco-design-vue/pull/2476))


## 2.47.0

`2023-06-02`

### ⚠️ Important Attention

- **modal:** fix modal confirm missing warning icon in the title ([#2465](https://github.com/arco-design/arco-design-vue/pull/2465))
- **input-number:** `hide-button` also takes effect when `mode="button"` ([#2461](https://github.com/arco-design/arco-design-vue/pull/2461))

### 🆕 Feature

- **empty:** Add `in-config-provider` property ([#2474](https://github.com/arco-design/arco-design-vue/pull/2474))
- **alert:** add `center` prop ([#2464](https://github.com/arco-design/arco-design-vue/pull/2464))
- **config-provider:** empty slots add component attribute ([#2448](https://github.com/arco-design/arco-design-vue/pull/2448))
- **select:** the header and footer are displayed in the empty state of select ([#2429](https://github.com/arco-design/arco-design-vue/pull/2429))
- **tree-select:** Add header and footer slots ([#2417](https://github.com/arco-design/arco-design-vue/pull/2417))
- **mention:** Add `prefix` attribute to search event ([#2356](https://github.com/arco-design/arco-design-vue/pull/2356))
- **spin:** add hideIcon property ([#2303](https://github.com/arco-design/arco-design-vue/pull/2303))
- **spin:** add tip slot ([#2303](https://github.com/arco-design/arco-design-vue/pull/2303))

### 🐛 BugFix

- **date-picker:** add getDefaultValueFormat to solve v-model for week selector and quarter selector ([#2437](https://github.com/arco-design/arco-design-vue/pull/2437))



## 2.46.2

`2023-05-31`

### 🐛 BugFix

- **modal:** fix can not set width attribute ([#2467](https://github.com/arco-design/arco-design-vue/pull/2467))


## 2.46.1

`2023-05-26`

### 🐛 BugFix

- **date-picker:** fixed arrow display logic for year, month, and quarter modes in the date range picker ([#2451](https://github.com/arco-design/arco-design-vue/pull/2451))
- **modal:** fix modal drag error when define top prop ([#2446](https://github.com/arco-design/arco-design-vue/pull/2446))
- **transfer:** fix transfer item can be selected when disabled ([#2445](https://github.com/arco-design/arco-design-vue/pull/2445))
- **modal:** Fix the problem that there is no full screen when `width` and `fullscreen` are set at the same time ([#2441](https://github.com/arco-design/arco-design-vue/pull/2441))

### 💎 Enhancement

- **table:** Add table right-click and double-click events ([#2452](https://github.com/arco-design/arco-design-vue/pull/2452))

### 🆎 TypeScript

- **modal:** fix onOk & onCancel type error in function call ([#2426](https://github.com/arco-design/arco-design-vue/pull/2426))


## 2.46.0

`2023-05-12`

### 🆕 Feature

- **trigger:** add scrollToClose prop ([#2414](https://github.com/arco-design/arco-design-vue/pull/2414))
- **image:** add actions slot ([#2389](https://github.com/arco-design/arco-design-vue/pull/2389))
- **cascader:** support full path search ([#2363](https://github.com/arco-design/arco-design-vue/pull/2363))

### 🐛 BugFix

- **table:** Fix the problem that when the dataIndex is in the path format, the sorting and summary column functions do not take effect ([#2413](https://github.com/arco-design/arco-design-vue/pull/2413))
- **divider:** Fix the problem that margin cannot be set to 0 ([#2390](https://github.com/arco-design/arco-design-vue/pull/2390))

### 💎 Enhancement

- **select:** Add a title hint to the selection box ([#2412](https://github.com/arco-design/arco-design-vue/pull/2412))

### 🆎 TypeScript

- **date-picker:** DatePicker ([#2359](https://github.com/arco-design/arco-design-vue/pull/2359))


## 2.45.3

`2023-04-28`

### 🐛 BugFix

- **select:** Fix the problem that the Enter key in the input method state will trigger the selection ([#2378](https://github.com/arco-design/arco-design-vue/pull/2378))

### 💎 Enhancement

- **drawer:** Add onOk & onCancel event parameters ([#2358](https://github.com/arco-design/arco-design-vue/pull/2358))

### 🆎 TypeScript

- **checkbox:** Fix the ts error problem when the `value` attribute uses a boolean value ([#2373](https://github.com/arco-design/arco-design-vue/pull/2373))


## 2.45.2

`2023-04-21`

### 🐛 BugFix

- **date-picker:** fix styling problem with panel-only pickers ([#2349](https://github.com/arco-design/arco-design-vue/pull/2349))

### 💅 Style

- **select:** Fix the inconsistent line-height and height of select-view-input ([#2346](https://github.com/arco-design/arco-design-vue/pull/2346))


## 2.45.1

`2023-04-14`

### 🐛 BugFix

- **image:** Fix `sizeStyle` failure issue ([#2327](https://github.com/arco-design/arco-design-vue/pull/2327))
- **cascader:** Fix the abnormal display of search results when the width of the control is short ([#2326](https://github.com/arco-design/arco-design-vue/pull/2326))
- **tabs:** fixed individual cases where tab slots are not updated ([#2325](https://github.com/arco-design/arco-design-vue/pull/2325))

### 💅 Style

- **table:** Fix the problem of displaying the horizontal scroll bar under the virtual list ([#2337](https://github.com/arco-design/arco-design-vue/pull/2337))


## 2.45.0

`2023-04-07`

### 🆕 Feature

- **transfer:** add custom header slots ([#2314](https://github.com/arco-design/arco-design-vue/pull/2314))
- **date-picker:** Add the abbreviation property to control whether the abbreviation of the month is displayed ([#2264](https://github.com/arco-design/arco-design-vue/pull/2264))
- **switch:** add text props ([#2223](https://github.com/arco-design/arco-design-vue/pull/2223))
- **tree:** add data-level and data-key attributes to tree nodes ([#2192](https://github.com/arco-design/arco-design-vue/pull/2192))

### 🐛 BugFix

- **date-picker:** Fix the problem that exchange-time fails when selecting ([#2302](https://github.com/arco-design/arco-design-vue/pull/2302))


## 2.44.7

`2023-04-03`

### 🐛 BugFix

- **trigger:** Fix the problem of reporting errors in iframe ([#2300](https://github.com/arco-design/arco-design-vue/pull/2300))


## 2.44.6

`2023-03-31`

### 🐛 BugFix

- **list:** Fix an issue that may trigger reach-bottom when scrolling up ([#2295](https://github.com/arco-design/arco-design-vue/pull/2295))
- **select:** Fix the problem that setting modelValue to undefined is invalid ([#2285](https://github.com/arco-design/arco-design-vue/pull/2285))
- **transfer:** Fix title ellipsis failure ([#2278](https://github.com/arco-design/arco-design-vue/pull/2278))
- **upload:** modify parameter transferred in extra-button slot ([#2272](https://github.com/arco-design/arco-design-vue/pull/2272))
- **time-picker:** Fix the bubbling behavior of the clear event. ([#2271](https://github.com/arco-design/arco-design-vue/pull/2271))

### 💎 Enhancement

- **trigger:** Optimize the problem that the popup position is not accurate in ShadowRoot ([#2273](https://github.com/arco-design/arco-design-vue/pull/2273))


## 2.44.3

`2023-03-24`

### 🐛 BugFix

- **date-picker:** Fix bugs with year range selector ([#2270](https://github.com/arco-design/arco-design-vue/pull/2270))
- The component package adds the `exports` flag to solve the problem of parsing to CommonJS under nuxt3 ([#2270](https://github.com/arco-design/arco-design-vue/pull/2270))
- **select:** fix blank dropdown caused by dynamic slot options ([#2265](https://github.com/arco-design/arco-design-vue/pull/2265))
- **select:** Automatic creation of empty string entries is not allowed. Dropdown option with empty string, set value to `undefined` when empty ([#2257](https://github.com/arco-design/arco-design-vue/pull/2257))

### 🆎 TypeScript

- update the buttonProps types of some components ([#2266](https://github.com/arco-design/arco-design-vue/pull/2266))


## 2.44.2

`2023-03-17`

### 🐛 BugFix

- **form:** Fix the problem that the array format is not supported in the field attribute ([#2242](https://github.com/arco-design/arco-design-vue/pull/2242))
- **slider:** Fix the problem of model-value binding error in range mode ([#2241](https://github.com/arco-design/arco-design-vue/pull/2241))
- **tree:** adjust the emit order of select and update:selectedKeys, check and update:checkedKeys ([#2228](https://github.com/arco-design/arco-design-vue/pull/2228))
- **divider:** Fix the problem that the dividing line is displayed incorrectly ([#2205](https://github.com/arco-design/arco-design-vue/pull/2205))
- **list:** list supports backend data pagination ([#2199](https://github.com/arco-design/arco-design-vue/pull/2199))
- **select:** drop-down option value supports empty string ([#2190](https://github.com/arco-design/arco-design-vue/pull/2190))
- **input:** fix issue with content modification at maximum value using non-input method ([#2188](https://github.com/arco-design/arco-design-vue/pull/2188))

### 💎 Enhancement

- **form:** Add Chinese inspection information ([#2240](https://github.com/arco-design/arco-design-vue/pull/2240))
- Added Vietnamese (vi-VN)  languages ([#2219](https://github.com/arco-design/arco-design-vue/pull/2219))
- Added Khmer(Cambodia) (km-KH) languages ([#2219](https://github.com/arco-design/arco-design-vue/pull/2219))

### 💅 Style

- **calendar:** fix some style problems ([#2239](https://github.com/arco-design/arco-design-vue/pull/2239))

### 🆎 TypeScript

- **upload:** beforeUpload allows to return a boolean value ([#2204](https://github.com/arco-design/arco-design-vue/pull/2204))
- Fix virtual list ts definition problem ([#2168](https://github.com/arco-design/arco-design-vue/pull/2168))


## 2.44.1

`2023-03-10`

### 🐛 BugFix

- **calendar:** fix the wrong import path problem


## 2.44.0

`2023-03-10`

### 🆕 Feature

- **calendar:** New calendar component ([#2217](https://github.com/arco-design/arco-design-vue/pull/2217))


## 2.43.2

`2023-02-24`

### 🐛 BugFix

- **input-number:** fix display step button in disabled state ([#2169](https://github.com/arco-design/arco-design-vue/pull/2169))
- **form:** Fix invalidation of validateStatus of FormItem ([#2158](https://github.com/arco-design/arco-design-vue/pull/2158))
- **checkbox:** Fixed checkbox retaining hover style when deselected ([#2124](https://github.com/arco-design/arco-design-vue/pull/2124))

### 💎 Enhancement

- **modal:** add update method of function call ([#2155](https://github.com/arco-design/arco-design-vue/pull/2155))
- **drawer:** add update method of function call ([#2155](https://github.com/arco-design/arco-design-vue/pull/2155))


## 2.43.1

`2023-02-17`

### 🐛 BugFix

- **date-picker:** Fix the problem that an error is returned because dayjs does not support quarter parsing ([#2110](https://github.com/arco-design/arco-design-vue/pull/2110))


## 2.43.0

`2023-02-10`

### 🆕 Feature

- **select:** Added `defaultActiveFirstOption` property ([#2107](https://github.com/arco-design/arco-design-vue/pull/2107))
- **select:** add header slot ([#2099](https://github.com/arco-design/arco-design-vue/pull/2099))
- **dropdown:** add hide-on-select props ([#2078](https://github.com/arco-design/arco-design-vue/pull/2078))
- **date-picker:** Add the `disabled-input` property to disable keyboard input ([#2072](https://github.com/arco-design/arco-design-vue/pull/2072))
- **drawer:** add `before-open` and `before-close` events ([#2064](https://github.com/arco-design/arco-design-vue/pull/2064))
- **upload:** Added file list extra button slot `#extra-button` ([#2060](https://github.com/arco-design/arco-design-vue/pull/2060))

### 🐛 BugFix

- **notification:** Fix the problem that the update duration fails ([#2106](https://github.com/arco-design/arco-design-vue/pull/2106))
- **tabs:** Hide the tab indicator when there are no matching tabs ([#2105](https://github.com/arco-design/arco-design-vue/pull/2105))
- **menu:** fix the hotreload problem ([#2091](https://github.com/arco-design/arco-design-vue/pull/2091))

### 🆎 TypeScript

- Update the type of `triggerProps` for some components ([#2090](https://github.com/arco-design/arco-design-vue/pull/2090))


## 2.42.1

`2023-02-03`

### 🐛 BugFix

- **scrollbar:** fix ts declaration error for emits ([#2077](https://github.com/arco-design/arco-design-vue/pull/2077))
- **slider:** Optimize the automatic repair of invalid input in the digital input box ([#1952](https://github.com/arco-design/arco-design-vue/pull/1952))
- **input-number:** fix step-button is not properly disabled or enabled when min or max is changed ([#1777](https://github.com/arco-design/arco-design-vue/pull/1777))


## 2.42.0

`2023-01-13`

### 🆕 Feature

- **upload:** Add `showPreviewButton` property ([#2049](https://github.com/arco-design/arco-design-vue/pull/2049))
- **slider:** add show-tooltip props ([#2037](https://github.com/arco-design/arco-design-vue/pull/2037))
- **mention:** add focus and blur methods ([#2022](https://github.com/arco-design/arco-design-vue/pull/2022))
- **date-picker:** Add blur event to support corresponding inspection in the form ([#1958](https://github.com/arco-design/arco-design-vue/pull/1958))

### 🐛 BugFix

- **upload:** Fixed an issue that could cause file deletion errors when uploading ([#2048](https://github.com/arco-design/arco-design-vue/pull/2048))
- **switch:** Fix the problem that the custom color style is wrong when the type is `line` ([#2044](https://github.com/arco-design/arco-design-vue/pull/2044))


## 2.41.1

`2023-01-06`

### 🐛 BugFix

- **tabs:** Fix the problem of scrolling exception under `capsule` type ([#2031](https://github.com/arco-design/arco-design-vue/pull/2031))
- **table:** Fix the problem that the width error may appear after the browser is zoomed when `scroll` is turned on ([#2028](https://github.com/arco-design/arco-design-vue/pull/2028))
- Fix the problem that ts cannot recognize custom properties ([#2027](https://github.com/arco-design/arco-design-vue/pull/2027))

### 💎 Enhancement

- **icon:** Optimize the `click` event of the component, and perform encapsulation and transparent transmission in the component ([#2030](https://github.com/arco-design/arco-design-vue/pull/2030))

### 🆎 TypeScript

- **checkbox:** Fix missing type for `value` values ([#2029](https://github.com/arco-design/arco-design-vue/pull/2029))


## 2.41.0

`2022-12-30`

### 🆕 Feature

- **upload:** Add `upload` method ([#2010](https://github.com/arco-design/arco-design-vue/pull/2010))
- **alert:** Add `normal` type ([#2009](https://github.com/arco-design/arco-design-vue/pull/2009))
- **message:** Add `normal` type ([#2009](https://github.com/arco-design/arco-design-vue/pull/2009))
- **date-picker:** `date-picker` supports prefix slots ([#1997](https://github.com/arco-design/arco-design-vue/pull/1997))
- **time-picker:** `time-picker` supports prefix slots ([#1997](https://github.com/arco-design/arco-design-vue/pull/1997))
- **form:** `form-item` supports tooltip property ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))
- **form:** `form-item` supports asteriskPosition property ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))
- Add spanish ([#2008](https://github.com/arco-design/arco-design-vue/pull/2008))
- Added Indonesian, French (France), German (Germany), Korean, Italian (Italy),Malay (Malaysia), Thai language files. ([#2011](https://github.com/arco-design/arco-design-vue/pull/2011))

### 🐛 BugFix

- **mention:** Fix the problem that the Enter key is invalid in textarea mode ([#2013](https://github.com/arco-design/arco-design-vue/pull/2013))
- **upload:** Fix the bug that the `upload` component judged wrongly when verifying that the uploaded file conforms to the `accept` format in some scenarios. ([#2007](https://github.com/arco-design/arco-design-vue/pull/2007))
- **typography:** Fixed ellipsis invalidation with parent container setting `white-space: nowrap` ([#1995](https://github.com/arco-design/arco-design-vue/pull/1995))
- **image:** Fix the bug that the image id may not be collected and cause preview errors ([#1992](https://github.com/arco-design/arco-design-vue/pull/1992))
- **input:** Fix the problem that the custom calculation character length will not be limited by `max-length` ([#1942](https://github.com/arco-design/arco-design-vue/pull/1942))
- **checkbox:** Set to empty array if `modevalue` is not an array ([#1940](https://github.com/arco-design/arco-design-vue/pull/1940))
- **table:** Fix the problem that there is no shadow when only the `operations` column is fixed ([#1938](https://github.com/arco-design/arco-design-vue/pull/1938))

### 💅 Style

- **select:** Unify the suffix icon of `select` component for single selection and multi-selection as `arrow-icon`. ([#2005](https://github.com/arco-design/arco-design-vue/pull/2005))


## 2.40.1

`2022-12-23`

### 🐛 BugFix

- **input:** Fix `change` event trigger logic problem ([#1990](https://github.com/arco-design/arco-design-vue/pull/1990))
- **switch:** Fixed the switch component whose type is line, size is small, and the checked state dot offset is incorrect ([#1975](https://github.com/arco-design/arco-design-vue/pull/1975))
- **list:** Fix the problem that the scroll bar appears in the grid list mode ([#1970](https://github.com/arco-design/arco-design-vue/pull/1970))
- **date-picker:** Fix the problem that the panel text display error under internationalization ([#1965](https://github.com/arco-design/arco-design-vue/pull/1965))

### 💅 Style

- **tabs:** Fix the problem that `size` does not take effect under `rounded` and `capsule` types ([#1988](https://github.com/arco-design/arco-design-vue/pull/1988))


## 2.40.0

`2022-12-09`

### 🆕 Feature

- **scrollbar:** Add scrollLeft and scrollTop methods ([#1909](https://github.com/arco-design/arco-design-vue/pull/1909))
- **table:** The change event increases the current data parameter ([#1893](https://github.com/arco-design/arco-design-vue/pull/1893))
- **avatar:** Add image-url attribute to support the use of image URLs ([#1810](https://github.com/arco-design/arco-design-vue/pull/1810))
- **auto-complete:** Add focus and blur methods ([#1809](https://github.com/arco-design/arco-design-vue/pull/1809))

### 🐛 BugFix

- **date-picker:** Fix the bug that the `feedback` attribute of the `Form` component does not take effect in the `date-picker` component. ([#1932](https://github.com/arco-design/arco-design-vue/pull/1932))
- **list:** Fix the problem that the scrollbar attribute fails when passing the virtual scrollbar attribute ([#1929](https://github.com/arco-design/arco-design-vue/pull/1929))
- **form:** Fix the bug that `validate-status` attribute of `Form` component does not take effect in `date-picker` component. ([#1928](https://github.com/arco-design/arco-design-vue/pull/1928))


## 2.39.2

`2022-12-02`

### 🐛 BugFix

- **table:** Fix the problem that thead will have a vertical scroll bar in some cases ([#1913](https://github.com/arco-design/arco-design-vue/pull/1913))
- **input:** Fix change event triggering issue and clear clearing issue ([#1912](https://github.com/arco-design/arco-design-vue/pull/1912))
- **divider:** Fix the problem that the style is wrong when setting size ([#1905](https://github.com/arco-design/arco-design-vue/pull/1905))
- **carousel:** Fix the problem that the transparent background image of `Carousel` cannot cover the previous image ([#1901](https://github.com/arco-design/arco-design-vue/pull/1901))


## 2.39.1

`2022-11-25`

### 🐛 BugFix

- Fix the problem that the Japanese language pack does not display certain properties ([#1890](https://github.com/arco-design/arco-design-vue/pull/1890))
- **pagination:** Fix the problem that the page number may exceed the number of pages when the pages become smaller ([#1879](https://github.com/arco-design/arco-design-vue/pull/1879))

### 🆎 TypeScript

- **tree-select:** update the type of trigger-props ([#1885](https://github.com/arco-design/arco-design-vue/pull/1885))


## 2.39.0

`2022-11-18`

### 🆕 Feature

- **transfer:** Added panel slot to allow custom content ([#1873](https://github.com/arco-design/arco-design-vue/pull/1873))
- **transfer:** internally replaced with a virtual scrollbar ([#1873](https://github.com/arco-design/arco-design-vue/pull/1873))
- **tree-select:** Replace the virtual scrollbar component and add the scrollbar property ([#1872](https://github.com/arco-design/arco-design-vue/pull/1872))
- **transfer:** can hide select all checkbox ([#1845](https://github.com/arco-design/arco-design-vue/pull/1845))
- **message:** Add `resetOnHover` property to pause and restart timing when the mouse moves in ([#1841](https://github.com/arco-design/arco-design-vue/pull/1841))

### 🐛 BugFix

- **space:** fix split margin ([#1864](https://github.com/arco-design/arco-design-vue/pull/1864))
- **switch:** Fix value of hook before state change ([#1859](https://github.com/arco-design/arco-design-vue/pull/1859))
- **switch:** Fix style token issue ([#1859](https://github.com/arco-design/arco-design-vue/pull/1859))
- **date-picker:** year range can't skip by 10 year ([#1847](https://github.com/arco-design/arco-design-vue/pull/1847))

### 💎 Enhancement

- **upload:** add some common file type ([#1857](https://github.com/arco-design/arco-design-vue/pull/1857))


## 2.38.3

`2022-11-11`

### 🐛 BugFix

- **table:** Fixed an issue where a warning would appear when customizing table elements in some scenarios


## 2.38.2

`2022-11-09`

### 🐛 BugFix

- **table:** Fix row selector state error ([#1849](https://github.com/arco-design/arco-design-vue/pull/1849))


## 2.38.1

`2022-11-04`

### 🐛 BugFix

- **input-tag:** Fixed delete key deleting unavailable options ([#1836](https://github.com/arco-design/arco-design-vue/pull/1836))
- Fixed some issues with virtual lists ([#1834](https://github.com/arco-design/arco-design-vue/pull/1834))
- **slider:** fix the slider show wrong position when set min value ([#1826](https://github.com/arco-design/arco-design-vue/pull/1826))
- **pagination:** Fix jumper prompt warning problem ([#1822](https://github.com/arco-design/arco-design-vue/pull/1822))
- **input:** Fix the problem of component cursor reporting error in some scenarios ([#1820](https://github.com/arco-design/arco-design-vue/pull/1820))
- **date-picker:** Fix internal property error issue ([#1818](https://github.com/arco-design/arco-design-vue/pull/1818))
- **radio:** Fix `radio-group` state not reset when resetting value ([#1813](https://github.com/arco-design/arco-design-vue/pull/1813))
- **table:** fix param when rowClass as function ([#1812](https://github.com/arco-design/arco-design-vue/pull/1812))

### 💎 Enhancement

- **icon:** Replace the flying book icon ([#1835](https://github.com/arco-design/arco-design-vue/pull/1835))


## 2.38.0

`2022-10-28`

### 🆕 Feature

- **space:** add `split` slot ([#1774](https://github.com/arco-design/arco-design-vue/pull/1774))

### 🐛 BugFix

- **select:** Fix formatLabel error when there is no data ([#1797](https://github.com/arco-design/arco-design-vue/pull/1797))
- **modal:** Fix the problem that z-index does not take effect when custom style ([#1796](https://github.com/arco-design/arco-design-vue/pull/1796))
- **radio:** Fix the problem that the state is not cleared when clearing model-value ([#1794](https://github.com/arco-design/arco-design-vue/pull/1794))
- **checkbox:** Fix the problem that the state is not cleared when clearing model-value ([#1794](https://github.com/arco-design/arco-design-vue/pull/1794))
- **form:** Do not modify the original object data of the rule ([#1779](https://github.com/arco-design/arco-design-vue/pull/1779))
- **modal:** Fix the problem that closing does not unload internal components in function calls ([#1778](https://github.com/arco-design/arco-design-vue/pull/1778))
- **drawer:** Fix the problem that closing does not unload internal components in function calls ([#1778](https://github.com/arco-design/arco-design-vue/pull/1778))

### 💅 Style

- **table:** Fix stripe style issue in dark mode ([#1795](https://github.com/arco-design/arco-design-vue/pull/1795))

### 🆎 TypeScript

- Add instance type export ([#1782](https://github.com/arco-design/arco-design-vue/pull/1782))


## 2.38.0-beta.2

`2022-10-21`

### 🐛 BugFix

- **date-picker:** Fix the problem of disabled style error under safari ([#1770](https://github.com/arco-design/arco-design-vue/pull/1770))
- **trigger:** Fix the problem of wrong arrow positioning in windows ([#1480](https://github.com/arco-design/arco-design-vue/pull/1480))
- **modal:** Fixed the problem that the unloading of incoming subcomponents would not be triggered under the function call

### 💎 Enhancement

- **cascader:** When the submenus are all disabled when optimizing multi-selection, the parent prohibits the selection ([#1771](https://github.com/arco-design/arco-design-vue/pull/1771))
- **progress:** Optimize the display logic of split points ([#1755](https://github.com/arco-design/arco-design-vue/pull/1755))
- **pagination:** Optimize number processing when entering page numbers ([#1750](https://github.com/arco-design/arco-design-vue/pull/1750))


## 2.38.0-beta.1

`2022-10-14`

### 🆕 Feature

- The table, select, and list components have added the scrollbar attribute to support switching virtual scroll bars ([#1747](https://github.com/arco-design/arco-design-vue/pull/1747))
- **notification:** notification and  notification listspace style adjustment ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** `showIcon` not working ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** support custom close icon & close element ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** support custom style ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** temove the notification corresponding to `id` ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **notification:** demo ([#1676](https://github.com/arco-design/arco-design-vue/pull/1676))
- **descriptions:** The `layout-fixed` of the table style in the description. The width will be evenly distributed when it's set to `fixed`. ([#1670](https://github.com/arco-design/arco-design-vue/pull/1670))

### 🐛 BugFix

- **transfer:** Fix can't scroll problem ([#1723](https://github.com/arco-design/arco-design-vue/pull/1723))
- **spin:** Fix the problem that size is invalid ([#1717](https://github.com/arco-design/arco-design-vue/pull/1717))

### 💎 Enhancement

- **select:** Increase the cache of selected items, and optimize the label display problem during remote search ([#1731](https://github.com/arco-design/arco-design-vue/pull/1731))
- **modal:** Functional calls can set the renderToBody parameter ([#1682](https://github.com/arco-design/arco-design-vue/pull/1682))

### 💅 Style

- **table:** Fixed the problem that summary row height was compressed when both summary row and scroll were enabled in the table ([#1733](https://github.com/arco-design/arco-design-vue/pull/1733))

### 🆎 TypeScript

- **collapse:** Fix key attribute definition of `collapse-item` to allow number ([#1743](https://github.com/arco-design/arco-design-vue/pull/1743))


## 2.37.4

`2022-09-30`

### 🐛 BugFix

- **table:** Fix default sorter&filters not working under template usage ([#1707](https://github.com/arco-design/arco-design-vue/pull/1707))
- fix popup stack ([#1659](https://github.com/arco-design/arco-design-vue/pull/1659))

### 💎 Enhancement

- **button:** Use the flex layout method to solve the centering problem when the icon size is inconsistent ([#1702](https://github.com/arco-design/arco-design-vue/pull/1702))
- **link:** Use the flex layout method to solve the centering problem when the icon size is inconsistent ([#1702](https://github.com/arco-design/arco-design-vue/pull/1702))
- **modal:** fix modal close problem ([#1696](https://github.com/arco-design/arco-design-vue/pull/1696))
- **drawer:** fix drawer close problem ([#1696](https://github.com/arco-design/arco-design-vue/pull/1696))

### 💅 Style

- **tabs:** Fix the problem that the content of the label under the `card` type is not centered ([#1704](https://github.com/arco-design/arco-design-vue/pull/1704))
- **select:** Fix the problem that the custom label color is displayed incorrectly ([#1703](https://github.com/arco-design/arco-design-vue/pull/1703))
- **collapse:** adjust the padding of collapse-item-content when expand-icon is on the right ([#1680](https://github.com/arco-design/arco-design-vue/pull/1680))


## 2.37.3

`2022-09-23`

### 🐛 BugFix

- **table:** Fix the problem that the tooltip does not display after the content changes ([#1662](https://github.com/arco-design/arco-design-vue/pull/1662))

### 💎 Enhancement

- **empty:** Optimize the custom display priority, the image slot is higher than the global empty slot ([#1673](https://github.com/arco-design/arco-design-vue/pull/1673))
- **input:** It is no longer possible to input content from the middle when optimizing the max limit ([#1672](https://github.com/arco-design/arco-design-vue/pull/1672))
- **image:** do not display toolbar when actions layout is empty ([#1668](https://github.com/arco-design/arco-design-vue/pull/1668))
- **overflow-list:** overflow quantity changes event ([#1287](https://github.com/arco-design/arco-design-vue/pull/1287))

### 🆎 TypeScript

- **table:** fix TableRowSelection type definition ([#1667](https://github.com/arco-design/arco-design-vue/pull/1667))
- **icon:** Add Icon related type declaration ([#1619](https://github.com/arco-design/arco-design-vue/pull/1619))


## 2.37.2

`2022-09-21`

### 🐛 BugFix

- **list:** Fix loading more scrollbar heights in use ([#1658](https://github.com/arco-design/arco-design-vue/pull/1658))
- Fix the problem that the component with built-in virtual scrollbar loses its style when it is loaded on demand ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **scrollbar:** Fix styling issues in Firefox ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **table:** Fixed the virtual scroll bar style error caused by maxHeight in the scroll property ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **select:** Fixed the problem that the drop-down menu did not follow the scrolling in keyboard interaction ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- **select:** Fix the problem of error reporting in some cases of built-in virtual scroll bar ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))

### 💎 Enhancement

- The return value of the component's onBeforeOk property `Promise<void>` and the `done()` method default behavior adjusted to success ([#1650](https://github.com/arco-design/arco-design-vue/pull/1650))


## 2.37.1

`2022-09-16`

### 🆕 Feature

- **overflow-list:** Added `OverflowList` component ([#1634](https://github.com/arco-design/arco-design-vue/pull/1634))
- **scrollbar:** Add virtual scrollbar component ([#1634](https://github.com/arco-design/arco-design-vue/pull/1634))
- **scrollbar:** Table, select, list components replace virtual scroll bars ([#1634](https://github.com/arco-design/arco-design-vue/pull/1634))


## 2.37.0

`2022-09-16`

### 🆕 Feature

- **typography:** Omit mode adds support for CSS mode (experimental) ([#1635](https://github.com/arco-design/arco-design-vue/pull/1635))
- **switch:** support `beforeChange` intercept change event ([#1626](https://github.com/arco-design/arco-design-vue/pull/1626))
- **link:** add loading prop ([#1616](https://github.com/arco-design/arco-design-vue/pull/1616))

### 💎 Enhancement

- **list:** support responsive grid props ([#1625](https://github.com/arco-design/arco-design-vue/pull/1625))


## 2.36.1

`2022-09-09`

### 🐛 BugFix

- **select:** Fix option slot parameter problem ([#1607](https://github.com/arco-design/arco-design-vue/pull/1607))

### 💎 Enhancement

- **modal:** The on-before-ok property supports function returning a Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))
- **drawer:** The on-before-ok property supports function returning a Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))
- **popconfirm:** The on-before-ok property supports function returning a Promise ([#1623](https://github.com/arco-design/arco-design-vue/pull/1623))
- **dropdown:** Don't fire click event when option is disabled ([#1611](https://github.com/arco-design/arco-design-vue/pull/1611))

### 🆎 TypeScript

- Added `virtual-list` interface and usage instructions ([#1614](https://github.com/arco-design/arco-design-vue/pull/1614))


## 2.36.0

`2022-09-02`

### 🆕 Feature

- **image:** hideFooter adds a new parameter to support the display of footer in an error state ([#1595](https://github.com/arco-design/arco-design-vue/pull/1595))
- **breadcrumb:** Add customUrl property ([#1594](https://github.com/arco-design/arco-design-vue/pull/1594))
- **table:** Add custom class name related prop ([#1580](https://github.com/arco-design/arco-design-vue/pull/1580))
- Add `zh-TW` support ([#1551](https://github.com/arco-design/arco-design-vue/pull/1551))
- Add `pt-PT` support ([#1551](https://github.com/arco-design/arco-design-vue/pull/1551))
- **alert:** suport custom close element ([#1544](https://github.com/arco-design/arco-design-vue/pull/1544))
- **checkbox:** Add max prop, support setting the maximum number of items that can be checked ([#1540](https://github.com/arco-design/arco-design-vue/pull/1540))
- **image:** Add fit prop ([#1534](https://github.com/arco-design/arco-design-vue/pull/1534))
- **breadcrumb:** suport separator prop ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **breadcrumb:** suport routes prop ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **breadcrumb:** suport more-icon slot ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **breadcrumb:** suport droplist prop  and slot ([#1500](https://github.com/arco-design/arco-design-vue/pull/1500))
- **page-header:** support custom back icon ([#1499](https://github.com/arco-design/arco-design-vue/pull/1499))

### 💎 Enhancement

- **table:** type of extension key ([#1580](https://github.com/arco-design/arco-design-vue/pull/1580))
- **input:** Modify password input box icon ([#1436](https://github.com/arco-design/arco-design-vue/pull/1436))

### 🆎 TypeScript

- Added export of types in dropdown and breadcrumb components ([#1594](https://github.com/arco-design/arco-design-vue/pull/1594))
- **layout:** Add ts type export ([#1571](https://github.com/arco-design/arco-design-vue/pull/1571))


## 2.35.3

`2022-08-31`

### 🐛 BugFix

- Fixed the problem that the new properties of the icon class component did not take effect


## 2.35.2

`2022-08-29`

### 🐛 BugFix

- **date-picker:** Fixed the click selection event exception when selecting the year and month of the selection panel in some modes ([#1562](https://github.com/arco-design/arco-design-vue/pull/1562))

### 💎 Enhancement

- **date-picker:** Optimized range selector also corrects order when selecting ([#1578](https://github.com/arco-design/arco-design-vue/pull/1578))
- Adjust the matchMedia method inside the component library to be compatible with Safari 13 ([#1576](https://github.com/arco-design/arco-design-vue/pull/1576))

### 💅 Style

- **pagination:** Fix the problem that the display content is compressed ([#1579](https://github.com/arco-design/arco-design-vue/pull/1579))
- **image:** Fix the problem that the close button icon is in the wrong position in preview mode ([#1577](https://github.com/arco-design/arco-design-vue/pull/1577))


## 2.35.1

`2022-08-19`

### 🐛 BugFix

- **spin:** Fix the spin problem caused by the increase of the z-index of fixed-column ([#1533](https://github.com/arco-design/arco-design-vue/pull/1533))
- **time-picker:** Fix default value of size property in time-picker ([#1513](https://github.com/arco-design/arco-design-vue/pull/1513))

### 💎 Enhancement

- **trigger:** Optimize the use of KeepAlive, close the pop-up layer when caching ([#1529](https://github.com/arco-design/arco-design-vue/pull/1529))
- **button:** Default event is not triggered on click when state is loading or disabled ([#1516](https://github.com/arco-design/arco-design-vue/pull/1516))


## 2.35.0

`2022-08-12`

### 🆕 Feature

- **icon:** support rotate prop ([#1490](https://github.com/arco-design/arco-design-vue/pull/1490))
- **icon:** Icon list supports type filtering and name search ([#1490](https://github.com/arco-design/arco-design-vue/pull/1490))
- **divider:** support split line width and style ([#1473](https://github.com/arco-design/arco-design-vue/pull/1473))
- **divider:** support split line margin ([#1473](https://github.com/arco-design/arco-design-vue/pull/1473))
- **date-picker:** `DatePicker` add range picker header label click and normal picker month header label click ([#1421](https://github.com/arco-design/arco-design-vue/pull/1421))

### 💅 Style

- **table:** adjust zIndex of a fixed col ([#1479](https://github.com/arco-design/arco-design-vue/pull/1479))


## 2.34.1

`2022-08-05`

### 🐛 BugFix

- **upload:** fix the problem of `accept=*` does not work ([#1488](https://github.com/arco-design/arco-design-vue/pull/1488))
- **menu:** Fixed an issue where the popup attribute caused warnings in newer versions of Chrome ([#1487](https://github.com/arco-design/arco-design-vue/pull/1487))

### 💎 Enhancement

- Refactor the virtual list component to fix functional issues ([#1444](https://github.com/arco-design/arco-design-vue/pull/1444))

### 💅 Style

- **cascader:** Fix style issue when dropdown panel is empty ([#1483](https://github.com/arco-design/arco-design-vue/pull/1483))


## 2.34.0

`2022-07-29`

### 🆕 Feature

- **tree:** Add node status to slot ([#1469](https://github.com/arco-design/arco-design-vue/pull/1469))
- **pagination:** Add autoAdjust property ([#1466](https://github.com/arco-design/arco-design-vue/pull/1466))
- **tabs:** Add trigger property to support changing switching mode ([#1456](https://github.com/arco-design/arco-design-vue/pull/1456))
- **auto-complete:** add `footer` slot ([#1445](https://github.com/arco-design/arco-design-vue/pull/1445))
- **dropdown:** add new prop for icon slot: `popup-visible` ([#1430](https://github.com/arco-design/arco-design-vue/pull/1430))
- **drawer:** add function call ([#1409](https://github.com/arco-design/arco-design-vue/pull/1409))

### 🐛 BugFix

- **timeline:** Fixed an issue where the timeline was incorrectly calculated when using v-if ([#1467](https://github.com/arco-design/arco-design-vue/pull/1467))

### 💎 Enhancement

- **table:** columns support reactive type updates ([#1470](https://github.com/arco-design/arco-design-vue/pull/1470))
- **table:** rowClass supports values of function types ([#1453](https://github.com/arco-design/arco-design-vue/pull/1453))
- **transfer:** item slot adds value attribute ([#1447](https://github.com/arco-design/arco-design-vue/pull/1447))
- **modal:** support hide footer in function call ([#1410](https://github.com/arco-design/arco-design-vue/pull/1410))
- **input-number:** Support `read-only` prop ([#1408](https://github.com/arco-design/arco-design-vue/pull/1408))


## 2.33.1

`2022-07-22`

### 🐛 BugFix

- **input-tag:** Fix the problem that the value parameter in the remove event is wrong after setting max-tag-count ([#1442](https://github.com/arco-design/arco-design-vue/pull/1442))
- **cascader:** Fixed the wrong position of the horizontal scroll bar of the search drop-down menu ([#1438](https://github.com/arco-design/arco-design-vue/pull/1438))
- **cascader:** Fix the problem that the cursor cannot be used after inputting content in search mode ([#1438](https://github.com/arco-design/arco-design-vue/pull/1438))
- **form:** Fix form-item content may exceed limit width ([#1437](https://github.com/arco-design/arco-design-vue/pull/1437))
- **modal:** Fix the problem that the default title class name is wrong ([#1413](https://github.com/arco-design/arco-design-vue/pull/1413))
- **typography:** cancel click propagation of suffix icon ([#1411](https://github.com/arco-design/arco-design-vue/pull/1411))

### 💎 Enhancement

- **table:** Selected rows can be displayed when selected-keys are set individually ([#1440](https://github.com/arco-design/arco-design-vue/pull/1440))


## 2.33.0

`2022-07-08`

### 🆕 Feature

- **drawer:** add header prop and slot ([#1399](https://github.com/arco-design/arco-design-vue/pull/1399))
- **collapse:** Supports custom expand icon ([#1344](https://github.com/arco-design/arco-design-vue/pull/1344))
- **tag:** support `bordered`  show border ([#1342](https://github.com/arco-design/arco-design-vue/pull/1342))

### 🐛 BugFix

- **date-picker:** Fixed an issue where dropdown menus and clear options could still be opened in readonly mode ([#1400](https://github.com/arco-design/arco-design-vue/pull/1400))
- **upload:** Fixed usage issues in Alibaba Cloud OSS ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))
- **tree:** Fix the problem of filtering data for processing in the subtree expansion animation ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))
- **tree:** Fix the problem of setting defaultExpandSelected invalid ([#1362](https://github.com/arco-design/arco-design-vue/pull/1362))

### 💅 Style

- **tabs:** Fix the problem of wrong style when focusing ([#1398](https://github.com/arco-design/arco-design-vue/pull/1398))
- **modal:** Fix the problem that the footer button is not centered ([#1391](https://github.com/arco-design/arco-design-vue/pull/1391))
- **upload:** Remove trailing space of upload-list-item ([#1379](https://github.com/arco-design/arco-design-vue/pull/1379))


## 2.32.1

`2022-07-01`

### 🐛 BugFix

- **table:** Fixed the problem that the text prompt did not follow the content update ([#1373](https://github.com/arco-design/arco-design-vue/pull/1373))
- **select:** Fixed click-to-expand issue in search mode in Firefox ([#1371](https://github.com/arco-design/arco-design-vue/pull/1371))
- **tree-select:** Fix the problem of selected value in case of modelValue is 0 ([#1370](https://github.com/arco-design/arco-design-vue/pull/1370))
- **input-number:** Fix the problem that '0' will be omitted after setting precision ([#1368](https://github.com/arco-design/arco-design-vue/pull/1368))

### 💅 Style

- **popconfirm:** Fix the problem that the icons under different types are black by default ([#1366](https://github.com/arco-design/arco-design-vue/pull/1366))


## 2.32.0

`2022-06-24`

### 🆕 Feature

- **typography:** Added `tooltip-props` class property ([#1338](https://github.com/arco-design/arco-design-vue/pull/1338))
- **table:** TableRowSelection adds the onlyCurrent property to change the default state of the table to maintain the selection state of all paging ([#1334](https://github.com/arco-design/arco-design-vue/pull/1334))
- **statistic:** support custom value style prop ([#1320](https://github.com/arco-design/arco-design-vue/pull/1320))

### 🐛 BugFix

- **modal:** Fixed the problem that when the modal box exceeds the size of the screen, the position of the modal will be misaligned ([#1336](https://github.com/arco-design/arco-design-vue/pull/1336))
- **input-tag:** Fix the problem of Chinese input method reporting an error ([#1335](https://github.com/arco-design/arco-design-vue/pull/1335))
- **tree:** check on the node in the half-selected state have a wrong result ([#1331](https://github.com/arco-design/arco-design-vue/pull/1331))
- **input-number:** fix clear error outside of form ([#1329](https://github.com/arco-design/arco-design-vue/pull/1329))

### 💎 Enhancement

- **trigger:** Events can no longer be fired during popover animations ([#1337](https://github.com/arco-design/arco-design-vue/pull/1337))
- **table:** The style added by the cellStyle class attribute is moved to the td element to solve the background color problem in some scenes ([#1334](https://github.com/arco-design/arco-design-vue/pull/1334))

### 💅 Style

- **tag:** Firefox overflow style compatibility ([#1317](https://github.com/arco-design/arco-design-vue/pull/1317))


## 2.31.0

`2022-06-17`

### 🆕 Feature

- **form:** Added parameter support for resetFields and clearValidate methods ([#1305](https://github.com/arco-design/arco-design-vue/pull/1305))
- **table:** Add new component methods, see the documentation for details ([#1304](https://github.com/arco-design/arco-design-vue/pull/1304))
- **table:** The slot defined by titleSlotName adds the column parameter ([#1304](https://github.com/arco-design/arco-design-vue/pull/1304))
- **modal:** Add bodyClass and bodyStyle ([#1303](https://github.com/arco-design/arco-design-vue/pull/1303))

### 🐛 BugFix

- fixed the problem that Virtual list `ScrollIntoView` has an wrong result ([#1301](https://github.com/arco-design/arco-design-vue/pull/1301))
- **menu:** the horizontal menu cannot be expanded after being collapsed ([#1297](https://github.com/arco-design/arco-design-vue/pull/1297))


## 2.30.2

`2022-06-11`

### 🐛 BugFix

- **table:** Fix the problem that the header is centered when align='left' ([#1278](https://github.com/arco-design/arco-design-vue/pull/1278))

### 💎 Enhancement

- **table:** Indent no longer shows when there is no expand button ([#1278](https://github.com/arco-design/arco-design-vue/pull/1278))


## 2.30.1

`2022-06-10`

### 💅 Style

- **space:** Items that use flex layout only in landscape mode ([#1277](https://github.com/arco-design/arco-design-vue/pull/1277))


## 2.30.0

`2022-06-10`

### ⚠️ Important Attention

- **table:** Due to functional requirements, `arco-table-cell` has been changed to flex layout, and the `arco-table-td-content` wrapper layer has been added outside the table content. If you have custom styles, please pay attention to the changes in the DOM structure ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 🆕 Feature

- **table:** Added `sticky-header` header ceiling function ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))
- **table:** Added `summaryCellStyle` property to table column configuration ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 🐛 BugFix

- **select:** Fixed remote search and fieldNames used at the same time, no options displayed ([#1271](https://github.com/arco-design/arco-design-vue/pull/1271))
- **input:** Fix the problem that form validation will not be triggered after input method ([#1263](https://github.com/arco-design/arco-design-vue/pull/1263))
- **input:** Fixed height issue when using front and back labels in Drawer ([#1263](https://github.com/arco-design/arco-design-vue/pull/1263))
- **modal:** Reset overflow setting on component unmount ([#1262](https://github.com/arco-design/arco-design-vue/pull/1262))
- **table:** Fixed the problem of incorrect text omission in tree data ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))
- **table:** Fix the problem of using grouped headers and fixed columns at the same time ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 💎 Enhancement

- **tabs:** Add focus styles and keyboard events ([#1264](https://github.com/arco-design/arco-design-vue/pull/1264))
- **table:** Supports the simultaneous use of virtual lists and fixed columns ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 💅 Style

- **select:** Fixed the issue that the selection box collapsed when the option label was empty ([#1274](https://github.com/arco-design/arco-design-vue/pull/1274))
- **space:** space-item is modified to flex layout to solve the problem of vertical centering of inline elements ([#1273](https://github.com/arco-design/arco-design-vue/pull/1273))
- **table:** Fix horizontal scroll shadow issue ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))


## 2.29.1

`2022-06-02`

### 🐛 BugFix

- **list:** Fixed an issue where reachBottom would not trigger in some cases ([#1228](https://github.com/arco-design/arco-design-vue/pull/1228))
- **mention:** Fix missing textarea styles when loading on demand ([#1227](https://github.com/arco-design/arco-design-vue/pull/1227))
- **space:** Fix the problem that the child component uses the key to fail ([#1223](https://github.com/arco-design/arco-design-vue/pull/1223))

### 💎 Enhancement

- Virtual lists reduce unnecessary height calculations and prevent jitter ([#1233](https://github.com/arco-design/arco-design-vue/pull/1233))
- **tree-select:** When the component is out of focus in search mode, the input value will be cleared by default ([#1232](https://github.com/arco-design/arco-design-vue/pull/1232))
- **input-tag:** When out of focus, the input value will be cleared by default ([#1232](https://github.com/arco-design/arco-design-vue/pull/1232))
- **trigger:** No longer blocks right-click default events by default ([#1231](https://github.com/arco-design/arco-design-vue/pull/1231))
- **cascader:** cascader-panel adds keyboard events ([#1230](https://github.com/arco-design/arco-design-vue/pull/1230))
- **cascader:** Fix the problem that the value of the number type fails to match ([#1230](https://github.com/arco-design/arco-design-vue/pull/1230))
- **button:** Add focus style ([#1229](https://github.com/arco-design/arco-design-vue/pull/1229))
- **input-number:** Add keyboard event, show step button when focused ([#1224](https://github.com/arco-design/arco-design-vue/pull/1224))


## 2.29.0

`2022-05-27`

### ⚠️ Important Attention

- **cascader:** Exposed parameter changed from CascaderOptionInfo to CascaderOption. Internal data is no longer included, user data is not affected ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))

### 🆕 Feature

- **tree-select:** Default support to delete selected options by tag ([#1206](https://github.com/arco-design/arco-design-vue/pull/1206))
- **dropdown:** Added `popup-max-height` property ([#1203](https://github.com/arco-design/arco-design-vue/pull/1203))
- **dropdown:** Added icon slot to submenu ([#1203](https://github.com/arco-design/arco-design-vue/pull/1203))
- **table:** Line selectors add non-strict mode support (cascading control) ([#1202](https://github.com/arco-design/arco-design-vue/pull/1202))
- **table:** Column properties add headerCellStyle and bodyCellStyle ([#1202](https://github.com/arco-design/arco-design-vue/pull/1202))
- **cascader:** Option value supports object format, add `value-key` attribute ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **cascader:** Add the `fallback` attribute to customize the display of options that do not exist ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **cascader:** Add the `expand-child` property to expand the submenu ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **date-picker:** Added property `show-confirm-btn` to customize whether to show the confirmation button ([#1198](https://github.com/arco-design/arco-design-vue/pull/1198))

### 🐛 BugFix

- **tree-select:** fixed the problem that drag and drop fails after setting fieldNames ([#1207](https://github.com/arco-design/arco-design-vue/pull/1207))
- **mention:** Fixed the cursor movement problem after typing in textarea mode ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))
- **input-number:** Fixed the issue that clear did not trigger form validation ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))
- **select:** Fix the problem of controlled invalidation of inputValue ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))

### 💎 Enhancement

- **cascader:** Optimize submenu expansion logic and keyboard events ([#1201](https://github.com/arco-design/arco-design-vue/pull/1201))
- **date-picker:** only update the date when splicing the time ([#1199](https://github.com/arco-design/arco-design-vue/pull/1199))
- Component adds accessibility ARIA attributes ([#1196](https://github.com/arco-design/arco-design-vue/pull/1196))


## 2.28.0

`2022-05-20`

### ⚠️ Important Attention

- This version has corrected the component event type, TS warning may appear, and the type can be corrected according to the prompt information

### 🆕 Feature

- **config-provider:** Added `empty` and `loading` slots ([#1180](https://github.com/arco-design/arco-design-vue/pull/1180))
- **statistic:** Add the `placeholder` attribute to display when there is no value ([#1179](https://github.com/arco-design/arco-design-vue/pull/1179))
- **table:** `expand` and `select` events add record parameter ([#1178](https://github.com/arco-design/arco-design-vue/pull/1178))
- **table:** Added `columnResize` event ([#1178](https://github.com/arco-design/arco-design-vue/pull/1178))
- **date-picker:** Added property `preview-shortcur` to customize whether to preview the result of shortcut options ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))

### 🐛 BugFix

- **cascader:** Fix the problem that the multi-selection state is displayed incorrectly in the case of lazy loading ([#1177](https://github.com/arco-design/arco-design-vue/pull/1177))
- **cascader:** Fix the problem that the lazy loading function is called multiple times when the selection box is clicked ([#1177](https://github.com/arco-design/arco-design-vue/pull/1177))
- **date-picker:** `select time` is not internationalized ([#1173](https://github.com/arco-design/arco-design-vue/pull/1173))

### 💎 Enhancement

- **date-picker:** Reset back to selected value when moving out of `shortcut` ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))
- demo code support open in Stackblitz ([#1101](https://github.com/arco-design/arco-design-vue/pull/1101))

### 💅 Style

- **textarea:** Fix the display problem of the text box after setting the height style ([#1176](https://github.com/arco-design/arco-design-vue/pull/1176))

### 🆎 TypeScript

- Fixed all component event related TS types ([#1160](https://github.com/arco-design/arco-design-vue/pull/1160))


## 2.27.1

`2022-05-16`

### 🐛 BugFix

- **select:** Fixed an issue where grouping options could not be selected when using the options property ([#1141](https://github.com/arco-design/arco-design-vue/pull/1141))

### 🆎 TypeScript

- Fix some component ts errors ([#1139](https://github.com/arco-design/arco-design-vue/pull/1139))


## 2.27.0

`2022-05-13`

### 🆕 Feature

- **tree:** `checkable` supports configuration via function ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **tree:** `selectable` supports configuration via function ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **tree:** Added property `actionOnNodeClick`, which can be used to enable the function: click on a node to trigger expansion ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **tree-select:** Added property `seletable` to support custom selectable nodes ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- **input-number:** Added modelEvent property and input event ([#1115](https://github.com/arco-design/arco-design-vue/pull/1115))
- **tabs:** Add destroyOnHide attribute ([#1107](https://github.com/arco-design/arco-design-vue/pull/1107))
- **input:** Add input-attrs attribute ([#1106](https://github.com/arco-design/arco-design-vue/pull/1106))
- **input:** Modify the blur event trigger sequence to after change ([#1106](https://github.com/arco-design/arco-design-vue/pull/1106))
- **collapse:** Add destroyOnHide property, the default will not destroy the content when hidden ([#1100](https://github.com/arco-design/arco-design-vue/pull/1100))
- **radio:** `radio-group` support  `options` prop ([#1090](https://github.com/arco-design/arco-design-vue/pull/1090))
- **checkbox:** `checkbox-group` adds `checkbox` slot ([#1087](https://github.com/arco-design/arco-design-vue/pull/1087))
- **checkbox:** `checkbox-group` supports `options` attribute to configure child elements ([#1058](https://github.com/arco-design/arco-design-vue/pull/1058))

### 🐛 BugFix

- **list:** Fix the problem that the pagination property is invalid ([#1125](https://github.com/arco-design/arco-design-vue/pull/1125))
- **pagination:** Fix the problem that size is invalid in simple mode ([#1123](https://github.com/arco-design/arco-design-vue/pull/1123))
- **typography:** fix the problem that event `edit-end` triggered twice when press enter ([#1122](https://github.com/arco-design/arco-design-vue/pull/1122))
- **select:** Fix the problem that `render` and `tagProps` in options property do not take effect ([#1114](https://github.com/arco-design/arco-design-vue/pull/1114))
- **tree:** expandAll failed when the type of key is number ([#1113](https://github.com/arco-design/arco-design-vue/pull/1113))
- **date-picker:** the value of `week-picker ` and `quarter-picker` is wrong when using `v-model` ([#1112](https://github.com/arco-design/arco-design-vue/pull/1112))
- **message:** Fix the problem that the clear method has an error when called multiple times ([#1095](https://github.com/arco-design/arco-design-vue/pull/1095))
- **modal:** Fix the problem of position offset when opening full screen after dragging ([#1070](https://github.com/arco-design/arco-design-vue/pull/1070))

### 💎 Enhancement

- **trigger:** When the right button is triggered, click the trigger element to close the drop-down box ([#1111](https://github.com/arco-design/arco-design-vue/pull/1111))
- **trigger:** Support pop-up component nesting ([#1111](https://github.com/arco-design/arco-design-vue/pull/1111))

### 💅 Style

- **table:** Fixed the problem of vertical scroll bar when there are fixed columns ([#1124](https://github.com/arco-design/arco-design-vue/pull/1124))
- **select:** Fix the problem that the mouse pointer is wrong in the disabled state when the search is turned on ([#1114](https://github.com/arco-design/arco-design-vue/pull/1114))

### 🆎 TypeScript

- **modal:** Complete missing properties in ModalConfig ([#1120](https://github.com/arco-design/arco-design-vue/pull/1120))
- **table:** Use VNodeChild instead of VNode in the interface to support a wider range of types ([#1118](https://github.com/arco-design/arco-design-vue/pull/1118))


## 2.26.0

`2022-04-29`

### 🆕 Feature

- **table:** Column configuration adds tooltip attribute ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))
- **table:** Add thead, th slots, tr, td slots add outgoing data ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))
- **list:** support `empty` slot ([#1045](https://github.com/arco-design/arco-design-vue/pull/1045))

### 🐛 BugFix

- **collapse:** Fix `showExpandIcon` property invalid ([#1060](https://github.com/arco-design/arco-design-vue/pull/1060))
- **carousel:** Fixed `trigger` and `autoPlay` property settings not working ([#1059](https://github.com/arco-design/arco-design-vue/pull/1059))

### 💎 Enhancement

- **table:** The table-column dynamic modification order does not need to manually specify the index ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))

### 💅 Style

- **modal:** Add `overflow: auto` to the body layer ([#1030](https://github.com/arco-design/arco-design-vue/pull/1030))


## 2.25.2

`2022-04-27`

### 💅 Style

- **cascader:** Fixed the width of the search drop-down menu when it was blank ([#1056](https://github.com/arco-design/arco-design-vue/pull/1056))


## 2.25.1

`2022-04-27`

### 🐛 BugFix

- **space:** Fix size attribute type detection problem ([#1052](https://github.com/arco-design/arco-design-vue/pull/1052))
- **grid:** Fix gutter attribute type detection problem ([#1052](https://github.com/arco-design/arco-design-vue/pull/1052))
- **config-provider:** Fix the problem that the setting of the size attribute is invalid in some components ([#1051](https://github.com/arco-design/arco-design-vue/pull/1051))
- **tabs:** Fixed #title slot not updating in some cases ([#1050](https://github.com/arco-design/arco-design-vue/pull/1050))
- Fixed the problem of abnormal two-way binding status of some components `popup-visible` ([#1049](https://github.com/arco-design/arco-design-vue/pull/1049))
- **table:** Fix the problem of wrong format of outgoing record parameter in extended line in `2.25.0` version ([#1047](https://github.com/arco-design/arco-design-vue/pull/1047))
- **date-picker:** the button today cannot be hidden by setting showNowBtn to false ([#1046](https://github.com/arco-design/arco-design-vue/pull/1046))
- **menu:** Fix the problem that the collected menu data is incomplete ([#1034](https://github.com/arco-design/arco-design-vue/pull/1034))

### 💅 Style

- **table:** Added internal table class names, fixed styling issues used with `descriptions` component ([#1053](https://github.com/arco-design/arco-design-vue/pull/1053))
- **input-number:** Fix the display position of the clear button ([#1048](https://github.com/arco-design/arco-design-vue/pull/1048))
- **checkbox:** Fixed the issue that the hover style would still change in the disabled state ([#1040](https://github.com/arco-design/arco-design-vue/pull/1040))


## 2.25.0

`2022-04-22`

### 🆕 Feature

- **notification:** Add footer prop ([#1029](https://github.com/arco-design/arco-design-vue/pull/1029))
- **tabs:** Add hideContent property ([#1025](https://github.com/arco-design/arco-design-vue/pull/1025))
- **table:** Add row selector and expand row two-way binding properties ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- **date-picker:** add property exchangeTime ([#1020](https://github.com/arco-design/arco-design-vue/pull/1020))
- **icon:** Added `attachment`, `archive`, `calendar-clock`, `palette`, `launch` icons ([#1017](https://github.com/arco-design/arco-design-vue/pull/1017))
- **config-provider:** Add updateAtScroll property ([#1015](https://github.com/arco-design/arco-design-vue/pull/1015))
- **table:** Add a second param `rowKey` to the `select` event ([#999](https://github.com/arco-design/arco-design-vue/pull/999))
- **config-provider:** add property `global` ([#933](https://github.com/arco-design/arco-design-vue/pull/933))

### 🐛 BugFix

- **input-number:** Fix the problem that the error attribute is invalid ([#1026](https://github.com/arco-design/arco-design-vue/pull/1026))
- Fixed an issue where Volar's intellisense didn't work ([#1022](https://github.com/arco-design/arco-design-vue/pull/1022))
- **icon:** Fixed `link`, `image-close`, `lock`, `unlock`, `sync` icons ([#1017](https://github.com/arco-design/arco-design-vue/pull/1017))

### 💎 Enhancement

- **table:** The `record` parameter of custom cell rendering supports modification ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- **tree:** When calling a method to operate a single node, add the target node information in the callback parameter ([#1021](https://github.com/arco-design/arco-design-vue/pull/1021))
- **modal:** When closing with `esc`, only the topmost popup will be closed ([#1018](https://github.com/arco-design/arco-design-vue/pull/1018))

### 💅 Style

- **menu:** Popup menu icon increased margin-right ([#1029](https://github.com/arco-design/arco-design-vue/pull/1029))

### 🆎 TypeScript

- **tag:** Fix TagProps issues ([#1024](https://github.com/arco-design/arco-design-vue/pull/1024))


## 2.24.1

`2022-04-16`

### 🐛 BugFix

- **button:** Fix `config-provide` injection invalid problem ([#986](https://github.com/arco-design/arco-design-vue/pull/986))


## 2.24.0

`2022-04-15`

### 💎 Enhancement

- **date-picker:** the selected value will merge with time when timePickerProps has value ([#981](https://github.com/arco-design/arco-design-vue/pull/981))
- **table:** When titleSlotName exists in the columns attribute, it will be used first ([#969](https://github.com/arco-design/arco-design-vue/pull/969))

### 🆕 Feature

- **modal:** Add animation name attribute ([#985](https://github.com/arco-design/arco-design-vue/pull/985))
- **button:** `button-group` supports setting props for subcomponent `button` ([#967](https://github.com/arco-design/arco-design-vue/pull/967))

### 🐛 BugFix

- **typography:** fixed the warning of `slots.default` ([#980](https://github.com/arco-design/arco-design-vue/pull/980))
- **modal:** Fixed an issue where the body would not be locked in some cases ([#968](https://github.com/arco-design/arco-design-vue/pull/968))
- **menu:** fix the problem that `auto-scroll-into-view` is invalid ([#966](https://github.com/arco-design/arco-design-vue/pull/966))
- **cascader:** Fix the problem that the half-selected state of the checkbox is displayed incorrectly ([#963](https://github.com/arco-design/arco-design-vue/pull/963))
- **steps:** Fix the problem of index error when Steps and Step components are not in direct parent-child relationship ([#959](https://github.com/arco-design/arco-design-vue/pull/959))

### 💅 Style

- **modal:** Fix the issue that the scroll bar flashes when the animation is in full screen ([#985](https://github.com/arco-design/arco-design-vue/pull/985))
- **pagination:** Add padding to pagination options ([#984](https://github.com/arco-design/arco-design-vue/pull/984))

### 🆎 TypeScript

- Increase the export of common typescript type definitions ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **select:** `Option, OptionData, GroupOption` interface names are changed to `SelectOption, SelectOptionData, SelectOptionGroup` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **table:** `TableColumn` interface name is changed to `TableColumnData` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **tree:** upgrate `FieldNames` to `TreeFieldNames` ([#977](https://github.com/arco-design/arco-design-vue/pull/977))


## 2.23.0

`2022-04-08`

### 💎 Enhancement

- **pagination:** Optimize the page number change logic when switching pageSize ([#954](https://github.com/arco-design/arco-design-vue/pull/954))
- **input:** The `clear` event of the input class component will also trigger the `change` event ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **table:** In horizontal scrolling mode, if the data is empty, the header will display a scroll bar ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **modal:** Fix the problem that the body is not locked when the scroll bar is floating ([#945](https://github.com/arco-design/arco-design-vue/pull/945))

### 🆕 Feature

- **pagination:** Added `jumper-prepend` and `jumper-append` slots ([#954](https://github.com/arco-design/arco-design-vue/pull/954))
- **image:** Add footer-class attribute ([#953](https://github.com/arco-design/arco-design-vue/pull/953))
- **cascader:** add empty slot ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **select:** add trigger slot ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **mention:** Added allow-clear property and event ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **auto-complete:** Added allow-clear property and event ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **menu:** Support set the set the maximum height of popover by `popup-max-height` ([#949](https://github.com/arco-design/arco-design-vue/pull/949))
- **table:** Add titleSlotName to the columns attribute and slotName to the filterable attribute ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **table:** table-column adds filter-content, filter-content slot ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **table:** Added summary-cell slot ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **upload:** Added icon related slots ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- **upload:** Added updateFile method, onBeforeUpload supports returning File ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- **upload:** Optimize initial image display logic ([#944](https://github.com/arco-design/arco-design-vue/pull/944))

### 🐛 BugFix

- **cascader:** Fix the problem that lazy loaded isLeaf is invalid in version 2.22.0 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **cascader:** Fixed an issue where the options property could not trigger an update in some cases ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **tree-select:** When the prop label-in-value is true, the actual parameter value of the event change is wrong ([#939](https://github.com/arco-design/arco-design-vue/pull/939))

### 💅 Style

- **image:** Fix the rounded corner style problem at the bottom of the footer area ([#953](https://github.com/arco-design/arco-design-vue/pull/953))
- **modal:** Fix the problem that title-align is left-aligned invalid in simple mode ([#945](https://github.com/arco-design/arco-design-vue/pull/945))


## 2.22.1

`2022-04-02`

### 🐛 BugFix

- **menu:** Fixed the problem that the height of menu icon is wrong ([#928](https://github.com/arco-design/arco-design-vue/pull/928))
- **table:** Fix virtual list and scrolling used together ([#926](https://github.com/arco-design/arco-design-vue/pull/926))
- **mention:** Fix the problem of warning prompts in the development environment ([#925](https://github.com/arco-design/arco-design-vue/pull/925))


## 2.22.0

`2022-04-01`

### 💎 Enhancement

- **select:** Enter event can no longer be triggered in loading state ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🆕 Feature

- **table:** Added `selectAll` method ([#920](https://github.com/arco-design/arco-design-vue/pull/920))
- **form:** Rendering elements that support modifying form item labels ([#919](https://github.com/arco-design/arco-design-vue/pull/919))
- **cascader:** Added `field-names` attribute to allow custom fields ([#912](https://github.com/arco-design/arco-design-vue/pull/912))
- **select:** Added `field-names` attribute to allow custom fields ([#911](https://github.com/arco-design/arco-design-vue/pull/911))
- **input-tag:** Added `field-names` attribute ([#910](https://github.com/arco-design/arco-design-vue/pull/910))
- **tree-select:** add property `fallback-option` ([#894](https://github.com/arco-design/arco-design-vue/pull/894))

### 🐛 BugFix

- **table:** Fix the problem of wrong virtual list width in some cases ([#920](https://github.com/arco-design/arco-design-vue/pull/920))
- **modal:** Fix auto width and drag error when `align-center="false"` ([#918](https://github.com/arco-design/arco-design-vue/pull/918))
- Fixed the problem that the bottom blank of the virtual list appears when the item height deviation is large ([#917](https://github.com/arco-design/arco-design-vue/pull/917))
- **tree-select:** Fix the problem that the null value is displayed as empty ([#916](https://github.com/arco-design/arco-design-vue/pull/916))
- **typography:** fix the problem that copy does not work ([#915](https://github.com/arco-design/arco-design-vue/pull/915))
- **select:** Fixed duplicate options in `allow-create` mode ([#911](https://github.com/arco-design/arco-design-vue/pull/911))
- **input-number:** Fixed display error when switching `mode` ([#909](https://github.com/arco-design/arco-design-vue/pull/909))
- **mention:** Fix v-model two-way binding error when selecting value ([#908](https://github.com/arco-design/arco-design-vue/pull/908))
- **upload:** Fix onButtonClick property not available ([#907](https://github.com/arco-design/arco-design-vue/pull/907))
- **menu:** The icon in the popup box is not aligned with the text ([#889](https://github.com/arco-design/arco-design-vue/pull/889))

### 💅 Style

- **form:** Form item content style increases maximum width to prevent overflow ([#919](https://github.com/arco-design/arco-design-vue/pull/919))


## 2.21.2

`2022-03-29`

### 🐛 BugFix

- **select:** Fix the problem that `fallback-option` attribute setting false is invalid ([#893](https://github.com/arco-design/arco-design-vue/pull/893))
- **select:** Fixed the problem that the selected label in the multi-selection mode does not display delete by default ([#886](https://github.com/arco-design/arco-design-vue/pull/886))


## 2.21.1

`2022-03-25`

### 🐛 BugFix

- **affix:** Fix the problem of component reporting error under SSR ([#879](https://github.com/arco-design/arco-design-vue/pull/879))


## 2.21.0

`2022-03-25`

### 💎 Enhancement

- Support SSR usage ([#872](https://github.com/arco-design/arco-design-vue/pull/872))

### 🆕 Feature

- **table:** Add summary prop ([#877](https://github.com/arco-design/arco-design-vue/pull/877))
- **tree:** add property `onlyCheckLeaf ` ([#876](https://github.com/arco-design/arco-design-vue/pull/876))
- **date-picker:** `dayStartOfWeek` support set to 0-6 ([#874](https://github.com/arco-design/arco-design-vue/pull/874))
- **tree:** support to turn off expand transition animation ([#867](https://github.com/arco-design/arco-design-vue/pull/867))

### 🐛 BugFix

- **tree-select:** Fix `max-tags` parameter name is wrong, it should be `max-tag-count` ([#873](https://github.com/arco-design/arco-design-vue/pull/873))
- Fix the problem that some components use the `popup-container` specified container to report an error when the container does not exist ([#871](https://github.com/arco-design/arco-design-vue/pull/871))
- **trigger:** Fix the problem that the outermost `div` is not hidden when it is not unmounted ([#871](https://github.com/arco-design/arco-design-vue/pull/871))
- **avatar:** Fixed an issue where a warning message would appear when there was no content ([#870](https://github.com/arco-design/arco-design-vue/pull/870))
- **tag:** Remove `mini` size type ([#860](https://github.com/arco-design/arco-design-vue/pull/860))
- **modal:** Fix the bug that the enter key triggers modal display multiple times ([#860](https://github.com/arco-design/arco-design-vue/pull/860))

### 💅 Style

- **menu:** fix the indentation of menu item is wrapped ([#866](https://github.com/arco-design/arco-design-vue/pull/866))
- **tree:** fix the connection line is displayed incorrectly ([#865](https://github.com/arco-design/arco-design-vue/pull/865))

### 🆎 TypeScript

- **tree:** Add the custom icon field of filednames ([#848](https://github.com/arco-design/arco-design-vue/pull/848))


## 2.20.2

`2022-03-24`

### 🐛 BugFix

- **table:** Fixed the problem that the `table-column` component caused continuous updating when writing object parameters directly in the template ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- **table:** Fix the problem that there is no column data when there is only one `table-column` ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- **table:** Fix the sorting problem of `table-column`, which can be solved by the `index` parameter ([#861](https://github.com/arco-design/arco-design-vue/pull/861))

### 💅 Style

- **dropdown:** Fixed vertical centering of icons in options ([#862](https://github.com/arco-design/arco-design-vue/pull/862))
- Fixed drop-down menu animation issues for some components ([#862](https://github.com/arco-design/arco-design-vue/pull/862))


## 2.20.1

`2022-03-21`

### 🐛 BugFix

- **tree:** Fix the problem that the expansion event name is wrong in the new version ([#853](https://github.com/arco-design/arco-design-vue/pull/853))

### 💅 Style

- **form:** Fix `form-item` asterisk compatibility with windicss ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **select:** Fixed vertical centering of option #icon slots ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **select:** Fix the problem that the omission is not displayed after the option exceeds the width ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **transfer:** Fix the problem that the omission is not displayed after the option exceeds the width ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.20.0

`2022-03-18`

### 🆕 Feature

- **table:** Use Context to refactor components, `table-colum` supports secondary encapsulation ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- **table:** scroll property adds `maxHeight`, `minWidth` properties ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- **cascader:** Add `cascader-panel` component ([#842](https://github.com/arco-design/arco-design-vue/pull/842))
- **descriptions:** The `column` property supports reactive configuration ([#839](https://github.com/arco-design/arco-design-vue/pull/839))
- **list:** Added `#scroll-loading` slot ([#838](https://github.com/arco-design/arco-design-vue/pull/838))
- **tree:** add instance method to tree component ([#837](https://github.com/arco-design/arco-design-vue/pull/837))

### 🐛 BugFix

- **date-picker:** the select event is not triggered when the end time selected ([#844](https://github.com/arco-design/arco-design-vue/pull/844))
- **cascader:** Fix the problem that the selected path of the drop-down menu may not match the current value ([#843](https://github.com/arco-design/arco-design-vue/pull/843))
- **select:** Fixed the problem that the search function failed when the virtual list was opened ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- **select:** Fix the problem that the `Enter` key on the small keyboard cannot be selected ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- **modal:** Fixed `close` function returning wrong in create method ([#840](https://github.com/arco-design/arco-design-vue/pull/840))
- **typography:** Fix `ellipsisText` not updating ([#833](https://github.com/arco-design/arco-design-vue/pull/833))

### 💅 Style

- **table:** Fixed the problem that the header text could not be centered after sorting was enabled ([#845](https://github.com/arco-design/arco-design-vue/pull/845))


## 2.19.0

`2022-03-11`

### ⚠️ Important Attention

- **table:** Modify the outgoing data of the sorting function sorter to enhance the usage ([#810](https://github.com/arco-design/arco-design-vue/pull/810))

### 💎 Enhancement

- `modal`, `message`, `notifaction` component function calls add support for appContext, see documentation for details ([#804](https://github.com/arco-design/arco-design-vue/pull/804))

### 🆕 Feature

- **tree:** support for setting half-checked nodes ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- **tree:** add some methods in instance: `getCheckedNodes` `getSelectedNodes` `getExpandedNodes` `getHalfCheckedNodes` ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- **drawer:** Added `hide-cancel` attribute ([#803](https://github.com/arco-design/arco-design-vue/pull/803))
- **modal:** Add `draggable` property to support draggable ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- **modal:** Added `fullscreen` property to support full screen display ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- **grid:** `a-col` will be hidden when colspan is 0 ([#797](https://github.com/arco-design/arco-design-vue/pull/797))

### 🐛 BugFix

- **descriptions:** Fix the problem of error when `data` is empty data ([#812](https://github.com/arco-design/arco-design-vue/pull/812))
- **form:** Fix the problem that the `field` property of `form-item` is invalid when there is an array in it ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- **form:** Fixed the issue that some component functions are still available after `disabled` is enabled ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- **tree:** Fix the problem of component rendering error when the node cannot be found ([#800](https://github.com/arco-design/arco-design-vue/pull/800))
- **date-picker:** Fix the problem that the offset of the range selector popup layer is wrong ([#796](https://github.com/arco-design/arco-design-vue/pull/796))


## 2.18.1

`2022-03-07`

### 🐛 BugFix

- **tabs:** Fix the problem that activeKey modification will be triggered during initialization ([#787](https://github.com/arco-design/arco-design-vue/pull/787))
- **upload:** Fix the problem of incorrect upload progress calculation ([#786](https://github.com/arco-design/arco-design-vue/pull/786))
- **upload:** Fix the problem that the cancel button does not work during uploading ([#786](https://github.com/arco-design/arco-design-vue/pull/786))


## 2.18.0

`2022-03-04`

### 💎 Enhancement

- **select:** Select box display using flex layout ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- **select:** trigger-props properties can override default properties ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- **breadcrumb:** Use Context to optimize components ([#774](https://github.com/arco-design/arco-design-vue/pull/774))
- **avatar:** Use Context to optimize components ([#773](https://github.com/arco-design/arco-design-vue/pull/773))
- **steps:** Use Context to optimize components ([#772](https://github.com/arco-design/arco-design-vue/pull/772))
- **tabs:** Use Context to optimize components and support secondary encapsulation of TabPane ([#771](https://github.com/arco-design/arco-design-vue/pull/771))
- **tabs:** key supports number type ([#771](https://github.com/arco-design/arco-design-vue/pull/771))
- **tabs:** Add autoSwitch attribute ([#771](https://github.com/arco-design/arco-design-vue/pull/771))

### 🆕 Feature

- Add definition of GlobalComponents ([#782](https://github.com/arco-design/arco-design-vue/pull/782))
- **cascader:** Added `#option`, `#label` slots ([#781](https://github.com/arco-design/arco-design-vue/pull/781))
- **table:** Scroll mode supports setting height percentage ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **table:** The column data adds the slotName property to allow specifying a rendering slot ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **table:** Added `pagination-left` and `pagination-right` slots ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **rate:** Add color attribute ([#770](https://github.com/arco-design/arco-design-vue/pull/770))
- **checkbox:** Add checkbox slot, you can customize the checkbox ([#769](https://github.com/arco-design/arco-design-vue/pull/769))
- **radio:** Add radio slot, you can customize the radio ([#769](https://github.com/arco-design/arco-design-vue/pull/769))
- **date-picker:** support quick switching of year and month in the head ([#754](https://github.com/arco-design/arco-design-vue/pull/754))

### 🐛 BugFix

- **select:** Fix the problem that the label attribute is invalid ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- **select:** Fix the problem that the properties of option are not updated synchronously ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- **list:** List items should be rendered as div ([#776](https://github.com/arco-design/arco-design-vue/pull/776))
- **slider:** Fix the problem that change will not be triggered when the input box is changed ([#775](https://github.com/arco-design/arco-design-vue/pull/775))
- **form:** Fix the problem of reset method invalid in nested data ([#768](https://github.com/arco-design/arco-design-vue/pull/768))

### 💅 Style

- **menu:** the icon of sub-menu are not centered in vertically ([#767](https://github.com/arco-design/arco-design-vue/pull/767))


## 2.18.0-beta.3

`2022-02-26`

### 💎 Enhancement

- **input:** modelValue support null ([#743](https://github.com/arco-design/arco-design-vue/pull/743))

### 🐛 BugFix

- **transfer:** Fix list display issue ([#744](https://github.com/arco-design/arco-design-vue/pull/744))


## 2.18.0-beta.2

`2022-02-25`

### ⚠️ Important Attention

- **trigger:** Add a layer of `wrapper div` to the pop-up layer to provide support for tranform animation ([#732](https://github.com/arco-design/arco-design-vue/pull/732))
- **list:** The spin component is rendered by default to prevent the component from remounting when switching states ([#730](https://github.com/arco-design/arco-design-vue/pull/730))
- **list:** Supports rendering of any child element ([#730](https://github.com/arco-design/arco-design-vue/pull/730))

### 💎 Enhancement

- **form:** When `auto-label-width` is enabled, label wrapping is not allowed to prevent calculation errors after wrapping ([#738](https://github.com/arco-design/arco-design-vue/pull/738))
- **modal:** Optimize click mask layer off ([#737](https://github.com/arco-design/arco-design-vue/pull/737))

### 🆕 Feature

- **descriptions:** Added `descriptions-item` component ([#739](https://github.com/arco-design/arco-design-vue/pull/739))
- **table:** Added `span-all` attribute ([#735](https://github.com/arco-design/arco-design-vue/pull/735))
- **trigger:** Added `show` and `hide` events ([#731](https://github.com/arco-design/arco-design-vue/pull/731))
- **cascader:** Added `search-delay` property and defaulted to `500ms` ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- **cascader:** Add the `search-option-only-label` attribute and modify the default display path label of the options in the search drop-down menu ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- **select:** Added `search-delay` property and defaulted to `500ms` ([#728](https://github.com/arco-design/arco-design-vue/pull/728))
- **form:** Validated error info add label property ([#724](https://github.com/arco-design/arco-design-vue/pull/724))
- **tree:** Add slot `icon` for customizing node icon globally ([#710](https://github.com/arco-design/arco-design-vue/pull/710))

### 🐛 BugFix

- **table:** Fix the problem that v-for cannot render when table-column is nested ([#734](https://github.com/arco-design/arco-design-vue/pull/734))
- **cascader:** Fix the problem that the selection box display is not updated after the option is updated ([#727](https://github.com/arco-design/arco-design-vue/pull/727))
- **upload:** fix error when using slot `upload-item` ([#715](https://github.com/arco-design/arco-design-vue/pull/715))
- Fixed an issue where data changes did not update the view in the border case where the scroll bar was shown and hidden ([#711](https://github.com/arco-design/arco-design-vue/pull/711))
- Fix the problem that the row height calculation does not include the border ([#711](https://github.com/arco-design/arco-design-vue/pull/711))
- **upload:** Generate initial preview image only if file type is image ([#706](https://github.com/arco-design/arco-design-vue/pull/706))
- **message:** Fixed the problem of destroying an error when calling at the same time ([#705](https://github.com/arco-design/arco-design-vue/pull/705))

### 💅 Style

- **pagination:** Fix the problem that the jumper text is not aligned under safari ([#736](https://github.com/arco-design/arco-design-vue/pull/736))
- **tooltip:** Optimized display animation, consistent with the react version ([#733](https://github.com/arco-design/arco-design-vue/pull/733))
- **popover:** Optimize display animation ([#733](https://github.com/arco-design/arco-design-vue/pull/733))
- **popconfirm:** Optimize display animation ([#733](https://github.com/arco-design/arco-design-vue/pull/733))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ Important Attention

- This version is a beta version with major changes, please use it in the production environment after careful testing
- **form:** <form-item> component refactoring to use context to manage input components. If the user has a custom input component, you can refer to the `custom input component` example to change. ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- Add injection of FormItemContext to all input components ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **radio:** Outer wrapping DOM changed from span to label ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **checkbox:** Outer wrapping DOM changed from span to label ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **select:** Component uses context refactoring to allow encapsulation of Option components ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **select:** Added `valueKey` attribute, option value supports object form ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **select:** The class name of the <option> component is changed from arco-dropdown-option to arco-select-option, and flex is used to center the layout vertically ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **dropdown:** The <doption> component modifies the vertical centering layout using flex ([#688](https://github.com/arco-design/arco-design-vue/pull/688))

### 💎 Enhancement

- **table:** Does not show pagination when the data is empty ([#684](https://github.com/arco-design/arco-design-vue/pull/684))

### 🆕 Feature

- **menu:** Responsive collapsed support ([#700](https://github.com/arco-design/arco-design-vue/pull/700))
- **grid:** support responsive configure ([#693](https://github.com/arco-design/arco-design-vue/pull/693))
- Add ssr support (beta) ([#675](https://github.com/arco-design/arco-design-vue/pull/675))

### 🐛 BugFix

- **cascader:** Fixed an issue where disabled items could still be selected via radio selectors in strict mode ([#701](https://github.com/arco-design/arco-design-vue/pull/701))
- **cascader:** Fixed an issue where search results in strict mode did not include path options ([#701](https://github.com/arco-design/arco-design-vue/pull/701))


## 2.17.0

`2022-02-11`

### 💎 Enhancement

- **input:** Increase the transparent transmission of some original attributes of the input element ([#664](https://github.com/arco-design/arco-design-vue/pull/664))
- **trigger:** Optimize the position of the arrow after auto-adjusting the position ([#655](https://github.com/arco-design/arco-design-vue/pull/655))

### 🆕 Feature

- **image:** Add slot `actions` for custom preview action items ([#679](https://github.com/arco-design/arco-design-vue/pull/679))
- **modal:** Added `title-align` attribute ([#673](https://github.com/arco-design/arco-design-vue/pull/673))

### 🐛 BugFix

- **image:** Fix the problem of wrong rotation direction ([#678](https://github.com/arco-design/arco-design-vue/pull/678))
- **image:** Fix the problem that the `Tooltip` of the action item is covered ([#677](https://github.com/arco-design/arco-design-vue/pull/677))
- **tooltip:** Fix the issue of losing trigger style when loading on demand ([#674](https://github.com/arco-design/arco-design-vue/pull/674))
- **transfer:** Fix search function should check option label ([#659](https://github.com/arco-design/arco-design-vue/pull/659))

### 💅 Style

- Fix the problem that the default color of some icons is inconsistent ([#676](https://github.com/arco-design/arco-design-vue/pull/676))
- **switch:** Fixed the occasional jitter problem of switch animation ([#656](https://github.com/arco-design/arco-design-vue/pull/656))


## 2.16.2

`2022-01-24`

### 🐛 BugFix

- **date-picker:** `headerValue` reporting error in `vue 3.2.28` ([#643](https://github.com/arco-design/arco-design-vue/pull/643))
- **table:** Fix the problem of preventing bubbling and causing lazy loading to fail ([#641](https://github.com/arco-design/arco-design-vue/pull/641))
- **table:** fix the problem that empty rows are displayed after deletion when expanding rows

### 💅 Style

- Add the fill attribute to the custom icon component to solve the problem of custom color ([#642](https://github.com/arco-design/arco-design-vue/pull/642))
- **input:** Fix `input-group` with rounded corners of input components ([#640](https://github.com/arco-design/arco-design-vue/pull/640))


## 2.16.1

`2022-01-21`

### 🐛 BugFix

- **dropdown:** `<dropdown-button>` component completes dropdown related properties ([#637](https://github.com/arco-design/arco-design-vue/pull/637))


## 2.16.0

`2022-01-21`

### 💎 Enhancement

- **table:** Internal buttons no longer fire `row-click` events ([#630](https://github.com/arco-design/arco-design-vue/pull/630))

### 🆕 Feature

- **select:** Added custom icon slot ([#634](https://github.com/arco-design/arco-design-vue/pull/634))
- **typography:** add property `copy-delay` support customize the delay time for the disappearance of copy success status ([#632](https://github.com/arco-design/arco-design-vue/pull/632))
- **date-picker:** Added attribute `value-format` to format the return value ([#631](https://github.com/arco-design/arco-design-vue/pull/631))
- **modal:** Added `before-open` and `before-close` events ([#628](https://github.com/arco-design/arco-design-vue/pull/628))
- **input:** The `<input-search>` component adds the ability to customize the content of the search button ([#625](https://github.com/arco-design/arco-design-vue/pull/625))
- **form:** Added feedback icon function for forms and corresponding input components ([#622](https://github.com/arco-design/arco-design-vue/pull/622))
- **table:** Add support for drag and drop sorting (experimental) ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **table:** Add support for resizing column widths (experimental) ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **table:** Added `tbody`, `tr`, `td` slots ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **dropdown:** Use context to refactor components to support nested use ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** value adds support for object ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** Added `dropdown-button` component ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** When the dropdown is open, add a class name to the trigger element ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **split:** Attributes `min` and `max` support setting pixel values ([#607](https://github.com/arco-design/arco-design-vue/pull/607))

### 🐛 BugFix

- **message:** fix type warning when using loading type ([#635](https://github.com/arco-design/arco-design-vue/pull/635))
- **modal:** Fix style file missing `<button>` component style reference ([#635](https://github.com/arco-design/arco-design-vue/pull/635))
- **date-picker:** do not open the popup when clear ([#633](https://github.com/arco-design/arco-design-vue/pull/633))
- **cascader:** Fixed an issue where the search could not be selected in `check-strictly` mode ([#627](https://github.com/arco-design/arco-design-vue/pull/627))
- **date-picker:** The return value should not concatenate the time when the time selection panel is not displayed ([#612](https://github.com/arco-design/arco-design-vue/pull/612))
- **typography:** Fix the problem of warning in JSX usage ([#591](https://github.com/arco-design/arco-design-vue/pull/591))
- **icon:** fix missing icon-relation icon in version 2.15.0
-
### 💅 Style

- **button:** Fix link mode text not centered ([#636](https://github.com/arco-design/arco-design-vue/pull/636))
- **input:** Fix `<input-group>` component wrapping `<select>` component style issue ([#588](https://github.com/arco-design/arco-design-vue/pull/588))


## 2.15.1

`2022-01-15`

### 🐛 BugFix

- **grid:** Fix component name registration error problem ([#581](https://github.com/arco-design/arco-design-vue/pull/581))


## 2.15.0

`2022-01-14`

### 💎 Enhancement

- The select box built into the optimization component will not be controlled by the external select box group ([#569](https://github.com/arco-design/arco-design-vue/pull/569))
- **select:** Optimize loading status display ([#557](https://github.com/arco-design/arco-design-vue/pull/557))

### 🆕 Feature

- **input-tag:** Add the `uniqueValue` attribute to support the validation that the value is not repeated during input ([#578](https://github.com/arco-design/arco-design-vue/pull/578))
- **modal:** Added `escToClose` property and enabled by default ([#577](https://github.com/arco-design/arco-design-vue/pull/577))
- **drawer:** Added `escToClose` property and enabled by default ([#577](https://github.com/arco-design/arco-design-vue/pull/577))
- **grid:** Added grid-based layout components `Grid` `Grid.Item` ([#576](https://github.com/arco-design/arco-design-vue/pull/576))
- **table:** `sortable.sorter` adds boolean type to support server-side sorting ([#575](https://github.com/arco-design/arco-design-vue/pull/575))
- Add `icon` component and provide support for iconfont.cn ([#574](https://github.com/arco-design/arco-design-vue/pull/574))
- **cascader:** Add loading prop ([#558](https://github.com/arco-design/arco-design-vue/pull/558))

### 🐛 BugFix

- **date-picker:** fix the problem of missing event parameters ([#579](https://github.com/arco-design/arco-design-vue/pull/579))

### 💅 Style

- **tag:** Fix checkable state style bug ([#570](https://github.com/arco-design/arco-design-vue/pull/570))
- **button:** Fix alignment of iconOnly buttons in button groups ([#567](https://github.com/arco-design/arco-design-vue/pull/567))
- **input:** Fix the problem of wrong background color in dark mode ([#560](https://github.com/arco-design/arco-design-vue/pull/560))


## 2.14.3

`2022-01-12`

### 🐛 BugFix

- **input:** Fix the problem that the input-search attribute is invalid in button mode ([#552](https://github.com/arco-design/arco-design-vue/pull/552))
- **input-number:** Fix the problem that the cursor position changes when inputting ([#552](https://github.com/arco-design/arco-design-vue/pull/552))
- **select:** missing arguments when calling scrollTo ([#543](https://github.com/arco-design/arco-design-vue/pull/543))


## 2.14.2

`2022-01-10`

### 🐛 BugFix

- **steps:** Fix the problem that small can be enabled in dot mode ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **form:** Label-col uses flex layout to solve the problem of wrong height under mini size ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **table:** Fix the problem that the table content exceeds the container, causing the border not to be displayed in some cases ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **select:** Fix on-demand loading without imported styles ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **input:** Fix the problem of wrong font color in disabled state in Safari browser ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **textarea:** Fix the problem that the downlink height setting is invalid in Firefox browser ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **statistic:** fix dynamic assignment issue ([#534](https://github.com/arco-design/arco-design-vue/pull/534))

### 💅 Style

- **button:** Fix onlyIcon mode icons not aligned ([#538](https://github.com/arco-design/arco-design-vue/pull/538))


## 2.14.1

`2022-01-08`

### 🐛 BugFix

- **form:** Fix the problem of the default size and style of the form ([#526](https://github.com/arco-design/arco-design-vue/pull/526))
- **config-provider:** Fix the problem of loading styles on demand ([#526](https://github.com/arco-design/arco-design-vue/pull/526))


## 2.14.0

`2022-01-07`

### 🆕 Feature

- **table:** Add hideExpandButtonOnEmpty property ([#520](https://github.com/arco-design/arco-design-vue/pull/520))
- **upload:** Increase the imagePreview property, you can use the built-in image preview function ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **upload:** When `listType` is an image class, the default accept is `image/*` ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **upload:** Added `showOnExceedLimit` prop ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **drawer:** Hide the title bar when title and closable are not set ([#515](https://github.com/arco-design/arco-design-vue/pull/515))
- **statistic:** value supports responsive modification ([#514](https://github.com/arco-design/arco-design-vue/pull/514))
- **config-provider:** Add `size` prop ([#513](https://github.com/arco-design/arco-design-vue/pull/513))

### 🐛 BugFix

- **image:** the`Image.PreviewGroup` component should collect `previewProps.src` first ([#522](https://github.com/arco-design/arco-design-vue/pull/522))
- **table:** fix x-axis resize issue ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **table:** Fix the problem that the width of the expanded row is incorrectly set when there are fixed columns ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **table:** Fix the problem that the checkbox selection all is set incorrectly when there are subtrees ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **trigger:** Fix the problem that the arrow position of the popup box is wrong in some cases ([#518](https://github.com/arco-design/arco-design-vue/pull/518))
- **input:** Fix change event trigger issue ([#516](https://github.com/arco-design/arco-design-vue/pull/516))
- **input:** Fix the problem that the style setting is in the wrong position when there are front and rear tags ([#516](https://github.com/arco-design/arco-design-vue/pull/516))

### 💅 Style

- **dropdown:** fix option suffix style issue ([#523](https://github.com/arco-design/arco-design-vue/pull/523))


## 2.13.0

`2021-12-31`

### ⚠️ Important Attention

- **form:** The `form-item` component adds a new `content-wrapper` div element to wrap the original `content` div element to support the new layout ([#488](https://github.com/arco-design/arco-design-vue/pull/488))

### 🆕 Feature

- **form:** Added `autoLabelWidth` property to support adaptive label width ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **form:** Added `labelColFlex` property to support label width setting ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **form:** Add `mergeProps` attribute, support custom attributes and event override ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **table:** Added `loadMore` property to support sub-slacker loading ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **table:** Add `filterIconAlignLeft` property ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **table:** Added `change` event to get processed data ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **upload:** Add `show-link` attribute ([#483](https://github.com/arco-design/arco-design-vue/pull/483))
- **auto-complete:** Increase input slot and option slot support ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **mention:** Increase input slot and option slot support ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **mention:** The drop-down menu under the text field type is displayed following the prompt text ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **cascader:** Added `load-more` attribute to support lazy loading of data ([#476](https://github.com/arco-design/arco-design-vue/pull/476))
- **grid:** add property `wrap` to `Row` ([#471](https://github.com/arco-design/arco-design-vue/pull/471))
- **descriptions:** The index and data parameters are added to the Value and Label slots ([#470](https://github.com/arco-design/arco-design-vue/pull/470))

### 🐛 BugFix

- **pagination:** Fix the problem that there is no clear value when the jump input box is out of focus ([#487](https://github.com/arco-design/arco-design-vue/pull/487))
- **input-tag:** Fix Chinese input method problem ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **select:** Fix the problem of Chinese input method when searching ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **select:** Fix the incomplete display of placeholder in `drawer` ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **form:** Fix the problem that the help content of the form item is displayed incorrectly ([#480](https://github.com/arco-design/arco-design-vue/pull/480))
- **table:** Fix the problem of invalid `sortOrder` emptying ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **table:** Fix the issue that the `expand-icon` slot does not take effect in the subtree ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **table:** Fix the problem that the shadow of the fixed column does not display when the table size changes dynamically ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **date-picker:** fix the proplem that property `readonly` is invalid ([#472](https://github.com/arco-design/arco-design-vue/pull/472))

### 💅 Style

- **steps:** Fix the wrong connection color problem in the next step ([#477](https://github.com/arco-design/arco-design-vue/pull/477))


## 2.12.2

`2021-12-27`

### 🐛 BugFix

- **modal:** Fix the problem of invalid modalStyle ([#459](https://github.com/arco-design/arco-design-vue/pull/459))
- **modal:** Fix the problem that the flex layout causes vertical centering and incomplete display beyond the height ([#459](https://github.com/arco-design/arco-design-vue/pull/459))


## 2.12.1

`2021-12-24`

### 🐛 BugFix

- **upload:** Fix the problem of wrong photo wall mode ([#457](https://github.com/arco-design/arco-design-vue/pull/457))


## 2.12.0

`2021-12-24`

### ⚠️ Important Attention

- **modal:** Modify the way the wrapper layer displays modal, and add the `width` and `top` attributes ([#454](https://github.com/arco-design/arco-design-vue/pull/454))
- **textarea:** The calculation of max-length no longer excludes carriage returns, which is consistent with the React version ([#452](https://github.com/arco-design/arco-design-vue/pull/452))
- **input:** The change event is only triggered when the value changes ([#452](https://github.com/arco-design/arco-design-vue/pull/452))
- **input-number:** Modify the change event to be triggered only when out of focus and press Enter to solve the problem that the control cannot be input ([#452](https://github.com/arco-design/arco-design-vue/pull/452))

### 💎 Enhancement

- **badge:** No longer render the logo when count is 0 ([#445](https://github.com/arco-design/arco-design-vue/pull/445))

### 🆕 Feature

- Icon component adds size attribute ([#455](https://github.com/arco-design/arco-design-vue/pull/455))
- **input:** `max-length` adds `errorOnly` attribute and `word-slice` attribute ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **textarea:** `max-length` adds `errorOnly` attribute and `word-slice` attribute ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **input-number:** Add support for input slot ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **link:** Add click event ([#450](https://github.com/arco-design/arco-design-vue/pull/450))
- **drawer:** Add unmount-on-close attribute ([#449](https://github.com/arco-design/arco-design-vue/pull/449))
- **switch:** Added `checked-value` and `unchecked-value` attributes ([#444](https://github.com/arco-design/arco-design-vue/pull/444))
- **switch:** Added `checked-color` and `unchecked-color` attributes ([#444](https://github.com/arco-design/arco-design-vue/pull/444))

### 🐛 BugFix

- **modal:** Fix the problem that the button content cannot be modified dynamically ([#453](https://github.com/arco-design/arco-design-vue/pull/453))
- **affix:** Fix the problem of displaying warning when used in combination with the anchor component ([#448](https://github.com/arco-design/arco-design-vue/pull/448))
- **progress:** Fix the display value precision problem ([#447](https://github.com/arco-design/arco-design-vue/pull/447))
- **upload:** Fix the problem that tip is not displayed in button mode ([#446](https://github.com/arco-design/arco-design-vue/pull/446))
- **upload:** Fix the bug that the disabled style of the `upload` component does not take effect ([#430](https://github.com/arco-design/arco-design-vue/pull/430))

### 💅 Style

- **table:** Fix the problem of extra border on the last row in table scroll mode ([#456](https://github.com/arco-design/arco-design-vue/pull/456))


## 2.11.1

`2021-12-20`

### 🐛 BugFix

- **input-tag:** Fix the problem of Chinese input failure caused by resize ([#428](https://github.com/arco-design/arco-design-vue/pull/428))
- **dropdown:** Fix the problem that Group is unavailable when using JSX ([#427](https://github.com/arco-design/arco-design-vue/pull/427))
- **select:** Fix the problem that Group is unavailable when using JSX ([#427](https://github.com/arco-design/arco-design-vue/pull/427))


## 2.11.0

`2021-12-17`

### 🆕 Feature

- **upload:** Add `download` attribute ([#418](https://github.com/arco-design/arco-design-vue/pull/418))
- **space:** add property `fill` ([#415](https://github.com/arco-design/arco-design-vue/pull/415))
- **menu:** add icon slot for`sub-menu` and `menu-item` ([#412](https://github.com/arco-design/arco-design-vue/pull/412))
- **table:** `columns` added cellStyle property ([#411](https://github.com/arco-design/arco-design-vue/pull/411))
- **upload:** add `show-remove-buttoon` and `show-retry-button` and `show-cancel-button` property ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- **upload:** add `imageLoading` property ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- **drawer:** add property  `footer` ([#394](https://github.com/arco-design/arco-design-vue/pull/394))

### 🐛 BugFix

- **upload:** Fix the problem of the wrong position of the icon in the upload ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **upload:** Fix the problem that not all files are obtained by the second parameter of `beforeUpload` when uploading folders by dragging and dropping ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **upload:** Fix the problem that the dragging style flashes when the mouse enters the internal text when dragging and uploading ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **table:** Fix the problem of inconsistent width between the header and the main body caused by the change of the table size in the fixed column mode ([#410](https://github.com/arco-design/arco-design-vue/pull/410))
- **tabs:** Fix the problem that scrolling is not recalculated when the width of the tab bar changes ([#409](https://github.com/arco-design/arco-design-vue/pull/409))
- **tabs:** Fix the problem that the indicator width cannot follow the update when the width of the label option changes ([#409](https://github.com/arco-design/arco-design-vue/pull/409))
- **input-tag:** Fix the problem that the internal input size is calculated incorrectly in some cases ([#408](https://github.com/arco-design/arco-design-vue/pull/408))
- **input-number:** Fix the problem of displaying errors when `model-value` is 0 ([#407](https://github.com/arco-design/arco-design-vue/pull/407))
- **trigger:** Fix the problem of the wrong position of the pop-up layer caused by the change of container size ([#406](https://github.com/arco-design/arco-design-vue/pull/406))
- **trigger:** Fix the problem that the pop-up layer is closed due to the hover method in nested use ([#406](https://github.com/arco-design/arco-design-vue/pull/406))
- **tree-select:** fix the problem that search is invalid when rename the key field ([#405](https://github.com/arco-design/arco-design-vue/pull/405))
- **anchor:** Fix the problem that the hash position will not be located after loading ([#400](https://github.com/arco-design/arco-design-vue/pull/400))
- **cascader:** Fix the problem that the level totalLevel is calculated incorrectly ([#399](https://github.com/arco-design/arco-design-vue/pull/399))
- **modal:** Fix the problem that the `alignCenter` property does not take effect ([#384](https://github.com/arco-design/arco-design-vue/pull/384))
- **modal:** The `alignCenter` property of the adjustment component defaults to `true` ([#384](https://github.com/arco-design/arco-design-vue/pull/384))

### 💅 Style

- **menu:** Fix the problem of height overflow when the sidebar is collapsible ([#416](https://github.com/arco-design/arco-design-vue/pull/416))


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

### 💎 Enhancement

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

### 💎 Enhancement

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

### 💎 Enhancement

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

### 💎 Enhancement

- **menu:** Change the default expansion method of pop-up `menu` to hover ([#111](https://github.com/arco-design/arco-design-vue/pull/111))

### 🐛 BugFix

- **modal:** Fix the problem that the `title` attribute does not take effect ([#116](https://github.com/arco-design/arco-design-vue/pull/116))
- **image:** Fix the problem that the height limit of the img is invalid ([#115](https://github.com/arco-design/arco-design-vue/pull/115))
- **input-number:** Fix the problem of inputting the negative sign error ([#114](https://github.com/arco-design/arco-design-vue/pull/114))
- **textarea:** Fix the problem of internal loop update in `autoSize` mode ([#113](https://github.com/arco-design/arco-design-vue/pull/113))
- **popconfirm:** Fix the problem that the parameters of the `ok/cancel` button are lost ([#105](https://github.com/arco-design/arco-design-vue/pull/105))


## 2.1.0

`2021-11-05`

### 💎 Enhancement

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
