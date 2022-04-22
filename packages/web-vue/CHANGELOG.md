```yaml
changelog: true
```

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
