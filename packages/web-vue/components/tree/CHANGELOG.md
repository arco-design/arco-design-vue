```yaml
changelog: true
```

## 2.56.0

`2024-07-26`

### 🐛 BugFix

- fix tree node folding animation ([#3234](https://github.com/arco-design/arco-design-vue/pull/3234))


## 2.55.1

`2024-03-29`

### 💅 Style

- fix scrollHeight calculation exception problem ([#3044](https://github.com/arco-design/arco-design-vue/pull/3044))


## 2.55.0

`2024-03-15`

### 🆕 Feature

- The `title` slot has a new `title` parameter ([#3024](https://github.com/arco-design/arco-design-vue/pull/3024))


## 2.54.6

`2024-03-01`

### 🐛 BugFix

- resolve invalid property name console warning issue ([#2995](https://github.com/arco-design/arco-design-vue/pull/2995))


## 2.54.3

`2024-01-19`


## 2.45.0

`2023-04-07`

### 🆕 Feature

- add data-level and data-key attributes to tree nodes ([#2192](https://github.com/arco-design/arco-design-vue/pull/2192))


## 2.44.2

`2023-03-17`

### 🐛 BugFix

- adjust the emit order of select and update:selectedKeys, check and update:checkedKeys ([#2228](https://github.com/arco-design/arco-design-vue/pull/2228))


## 2.34.0

`2022-07-29`

### 🆕 Feature

- Add node status to slot ([#1469](https://github.com/arco-design/arco-design-vue/pull/1469))


## 2.33.0

`2022-07-08`

### 🐛 BugFix

- Fix the problem of filtering data for processing in the subtree expansion animation ([#1397](https://github.com/arco-design/arco-design-vue/pull/1397))
- Fix the problem of setting defaultExpandSelected invalid ([#1362](https://github.com/arco-design/arco-design-vue/pull/1362))


## 2.32.0

`2022-06-24`

### 🐛 BugFix

- check on the node in the half-selected state have a wrong result ([#1331](https://github.com/arco-design/arco-design-vue/pull/1331))


## 2.27.0

`2022-05-13`

### 🆕 Feature

- `checkable` supports configuration via function ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- `selectable` supports configuration via function ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))
- Added property `actionOnNodeClick`, which can be used to enable the function: click on a node to trigger expansion ([#1119](https://github.com/arco-design/arco-design-vue/pull/1119))

### 🐛 BugFix

- expandAll failed when the type of key is number ([#1113](https://github.com/arco-design/arco-design-vue/pull/1113))


## 2.25.0

`2022-04-22`

### 💎 Enhancement

- When calling a method to operate a single node, add the target node information in the callback parameter ([#1021](https://github.com/arco-design/arco-design-vue/pull/1021))


## 2.24.0

`2022-04-15`

### 🆎 TypeScript

- upgrate `FieldNames` to `TreeFieldNames` ([#977](https://github.com/arco-design/arco-design-vue/pull/977))


## 2.21.0

`2022-03-25`

### 🆕 Feature

- add property `onlyCheckLeaf ` ([#876](https://github.com/arco-design/arco-design-vue/pull/876))
- support to turn off expand transition animation ([#867](https://github.com/arco-design/arco-design-vue/pull/867))

### 💅 Style

- fix the connection line is displayed incorrectly ([#865](https://github.com/arco-design/arco-design-vue/pull/865))

### 🆎 TypeScript

- Add the custom icon field of filednames ([#848](https://github.com/arco-design/arco-design-vue/pull/848))


## 2.20.1

`2022-03-21`

### 🐛 BugFix

- Fix the problem that the expansion event name is wrong in the new version ([#853](https://github.com/arco-design/arco-design-vue/pull/853))


## 2.20.0

`2022-03-18`

### 🆕 Feature

- add instance method to tree component ([#837](https://github.com/arco-design/arco-design-vue/pull/837))


## 2.19.0

`2022-03-11`

### 🆕 Feature

- support for setting half-checked nodes ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- add some methods in instance: `getCheckedNodes` `getSelectedNodes` `getExpandedNodes` `getHalfCheckedNodes` ([#809](https://github.com/arco-design/arco-design-vue/pull/809))

### 🐛 BugFix

- Fix the problem of component rendering error when the node cannot be found ([#800](https://github.com/arco-design/arco-design-vue/pull/800))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 Feature

- Add slot `icon` for customizing node icon globally ([#710](https://github.com/arco-design/arco-design-vue/pull/710))


## 2.9.0

`2021-12-03`

### 🆕 Feature

- add prop default-expand-selected default-expand-checked auto-expand-parent ([#322](https://github.com/arco-design/arco-design-vue/pull/322))


## 2.8.0

`2021-12-01`

### 🐛 BugFix

- Update checked keys after load more ([#206](https://github.com/arco-design/arco-design-vue/pull/206))


## 2.7.0

`2021-11-26`

### 💅 Style

- let the content of tree node centerd in vertical ([#260](https://github.com/arco-design/arco-design-vue/pull/260))


## 2.4.0

`2021-11-17`

### 🆕 Feature

- `key` support `number` ([#169](https://github.com/arco-design/arco-design-vue/pull/169))


## 2.3.0

`2021-11-12`

### 🐛 BugFix

- Fix the problem that the setting of `default-checked-keys` is invalid ([#131](https://github.com/arco-design/arco-design-vue/pull/131))

