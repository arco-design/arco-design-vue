```yaml
changelog: true
```

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

### 💎 Optimization

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

