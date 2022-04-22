```yaml
changelog: true
```

## 2.25.0

`2022-04-22`

### 🆕 Feature

- Add row selector and expand row two-way binding properties ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- Add a second param `rowKey` to the `select` event ([#999](https://github.com/arco-design/arco-design-vue/pull/999))

### 💎 Enhancement

- The `record` parameter of custom cell rendering supports modification ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))


## 2.24.0

`2022-04-15`

### 💎 Enhancement

- When titleSlotName exists in the columns attribute, it will be used first ([#969](https://github.com/arco-design/arco-design-vue/pull/969))

### 🆎 TypeScript

- `TableColumn` interface name is changed to `TableColumnData` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))


## 2.23.0

`2022-04-08`

### 💎 Enhancement

- In horizontal scrolling mode, if the data is empty, the header will display a scroll bar ([#948](https://github.com/arco-design/arco-design-vue/pull/948))

### 🆕 Feature

- Add titleSlotName to the columns attribute and slotName to the filterable attribute ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- table-column adds filter-content, filter-content slot ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- Added summary-cell slot ([#948](https://github.com/arco-design/arco-design-vue/pull/948))


## 2.22.1

`2022-04-02`

### 🐛 BugFix

- Fix virtual list and scrolling used together ([#926](https://github.com/arco-design/arco-design-vue/pull/926))


## 2.22.0

`2022-04-01`

### 🆕 Feature

- Added `selectAll` method ([#920](https://github.com/arco-design/arco-design-vue/pull/920))

### 🐛 BugFix

- Fix the problem of wrong virtual list width in some cases ([#920](https://github.com/arco-design/arco-design-vue/pull/920))


## 2.21.0

`2022-03-25`

### 🆕 Feature

- Add summary prop ([#877](https://github.com/arco-design/arco-design-vue/pull/877))


## 2.20.2

`2022-03-24`

### 🐛 BugFix

- Fixed the problem that the `table-column` component caused continuous updating when writing object parameters directly in the template ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- Fix the problem that there is no column data when there is only one `table-column` ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- Fix the sorting problem of `table-column`, which can be solved by the `index` parameter ([#861](https://github.com/arco-design/arco-design-vue/pull/861))


## 2.20.0

`2022-03-18`

### 🆕 Feature

- Use Context to refactor components, `table-colum` supports secondary encapsulation ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- scroll property adds `maxHeight`, `minWidth` properties ([#845](https://github.com/arco-design/arco-design-vue/pull/845))

### 💅 Style

- Fixed the problem that the header text could not be centered after sorting was enabled ([#845](https://github.com/arco-design/arco-design-vue/pull/845))


## 2.19.0

`2022-03-11`

### ⚠️ Important Attention

- Modify the outgoing data of the sorting function sorter to enhance the usage ([#810](https://github.com/arco-design/arco-design-vue/pull/810))


## 2.18.0

`2022-03-04`

### 🆕 Feature

- Scroll mode supports setting height percentage ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- The column data adds the slotName property to allow specifying a rendering slot ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- Added `pagination-left` and `pagination-right` slots ([#780](https://github.com/arco-design/arco-design-vue/pull/780))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 Feature

- Added `span-all` attribute ([#735](https://github.com/arco-design/arco-design-vue/pull/735))

### 🐛 BugFix

- Fix the problem that v-for cannot render when table-column is nested ([#734](https://github.com/arco-design/arco-design-vue/pull/734))


## 2.18.0-beta.1

`2022-02-18`

### 💎 Enhancement

- Does not show pagination when the data is empty ([#684](https://github.com/arco-design/arco-design-vue/pull/684))


## 2.16.2

`2022-01-24`

### 🐛 BugFix

- Fix the problem of preventing bubbling and causing lazy loading to fail ([#641](https://github.com/arco-design/arco-design-vue/pull/641))
- **table:** fix the problem that empty rows are displayed after deletion when expanding rows


## 2.16.0

`2022-01-21`

### 💎 Enhancement

- Internal buttons no longer fire `row-click` events ([#630](https://github.com/arco-design/arco-design-vue/pull/630))

### 🆕 Feature

- Add support for drag and drop sorting (experimental) ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- Add support for resizing column widths (experimental) ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- Added `tbody`, `tr`, `td` slots ([#619](https://github.com/arco-design/arco-design-vue/pull/619))


## 2.15.0

`2022-01-14`

### 🆕 Feature

- `sortable.sorter` adds boolean type to support server-side sorting ([#575](https://github.com/arco-design/arco-design-vue/pull/575))


## 2.14.2

`2022-01-10`

### 🐛 BugFix

- Fix the problem that the table content exceeds the container, causing the border not to be displayed in some cases ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.0

`2022-01-07`

### 🆕 Feature

- Add hideExpandButtonOnEmpty property ([#520](https://github.com/arco-design/arco-design-vue/pull/520))

### 🐛 BugFix

- fix x-axis resize issue ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- Fix the problem that the width of the expanded row is incorrectly set when there are fixed columns ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- Fix the problem that the checkbox selection all is set incorrectly when there are subtrees ([#519](https://github.com/arco-design/arco-design-vue/pull/519))


## 2.13.0

`2021-12-31`

### 🆕 Feature

- Added `loadMore` property to support sub-slacker loading ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- Add `filterIconAlignLeft` property ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- Added `change` event to get processed data ([#485](https://github.com/arco-design/arco-design-vue/pull/485))

### 🐛 BugFix

- Fix the problem of invalid `sortOrder` emptying ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- Fix the issue that the `expand-icon` slot does not take effect in the subtree ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- Fix the problem that the shadow of the fixed column does not display when the table size changes dynamically ([#478](https://github.com/arco-design/arco-design-vue/pull/478))


## 2.12.0

`2021-12-24`

### 💅 Style

- Fix the problem of extra border on the last row in table scroll mode ([#456](https://github.com/arco-design/arco-design-vue/pull/456))


## 2.11.0

`2021-12-17`

### 🆕 Feature

- `columns` added cellStyle property ([#411](https://github.com/arco-design/arco-design-vue/pull/411))

### 🐛 BugFix

- Fix the problem of inconsistent width between the header and the main body caused by the change of the table size in the fixed column mode ([#410](https://github.com/arco-design/arco-design-vue/pull/410))


## 2.10.0

`2021-12-10`

### 🆕 Feature

- Add span-method prop ([#360](https://github.com/arco-design/arco-design-vue/pull/360))


## 2.9.0

`2021-12-03`

### 🐛 BugFix

- Fix the problem that the tree expand button triggers form submission ([#321](https://github.com/arco-design/arco-design-vue/pull/321))


## 2.7.0

`2021-11-26`

### 🆕 Feature

- Add `footer` slot ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- In normal mode, the scroll bar will be turned on when the table width is larger than the container ([#266](https://github.com/arco-design/arco-design-vue/pull/266))


## 2.6.1

`2021-11-24`

### 💎 Enhancement

- Do not scroll when data is empty ([#245](https://github.com/arco-design/arco-design-vue/pull/245))

### 🐛 BugFix

- Fix the issue that the expand row button triggers form submission ([#210](https://github.com/arco-design/arco-design-vue/pull/210))


## 2.3.0

`2021-11-12`

### 🐛 BugFix

- Fix the problem that `<table-column>` is wrong in the header of the grouping table ([#151](https://github.com/arco-design/arco-design-vue/pull/151))


## 2.2.0

`2021-11-10`

### 🆕 Feature

- Add `row-key` prop ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- Add `expandedRowRender` and `icon` props in `expandable` ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- Add `expand-icon` and `expand-row` slots ([#128](https://github.com/arco-design/arco-design-vue/pull/128))

### 🐛 BugFix

- Fix the problem that the table operation items in the header grouping are occupied incorrectly ([#127](https://github.com/arco-design/arco-design-vue/pull/127))


## 2.1.0

`2021-11-05`

### 🆕 Feature

- Add the `#title` slot in `table-column` ([#95](https://github.com/arco-design/arco-design-vue/pull/95))

### 🐛 BugFix

- Fix the issue that `#column` slot cannot support Fragment ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- Fix the problem that `scroll.x` does not take effect when used alone ([#83](https://github.com/arco-design/arco-design-vue/pull/83))


## 2.0.3

`2021-10-29`

### 🐛 BugFix

- Fix the display of scroll bar in `scroll` mode, causing cell misalignment ([#29](https://github.com/arco-design/arco-design-vue/pull/29))

